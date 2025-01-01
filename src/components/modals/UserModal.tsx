import moment from "moment";
import { userProps } from "../../interfaces/indexInterface";
import usePutUser from "../../services/usePutUser";
import { useEffect, useRef } from "react";

interface userModalProps {
    user: userProps;
    roleChange: (role: string, id: number) => void;
}

function UserModal({ user, roleChange }: userModalProps) {
    const { putUser } = usePutUser();
    const roleRef = useRef<HTMLSelectElement>(null);

    const formatDate = (date: string) => {
        return moment(date).format("MMM Do YY");
    };

    useEffect(() => {
        if (roleRef.current?.value) {
            roleRef.current.value = user.role;
        }
    }, [user.role]);

    const sendChange = () => {
        if (roleRef.current?.value) {
            const newData = {
                id: user.id,
                role: roleRef.current.value,
                email: user.email,
                name: user.name,
                last_login: user.last_login,
            };
            putUser("get-users/", newData);
            roleChange(roleRef.current.value, user.id);
        } else {
            console.error("Role is undefined");
        }
    };

    return (
        <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            User <strong className="text-uppercase">{user?.name}</strong>{" "}
                            Details
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Email:</h2>
                            <p className="p-0 m-0">{user?.email}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Role:</h2>
                            <select
                                defaultValue={user?.role}
                                className="form-select w-25"
                                aria-label="Default select example"
                                ref={roleRef}
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Last Login:</h2>
                            <p className="p-0 m-0">{formatDate(user?.last_login)}</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            onClick={sendChange}
                            type="button"
                            className="btn btn-primary"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserModal;
