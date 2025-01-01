import { useContext, useEffect, useState } from "react";
import TableForms from "./TableForms";
import { formsProvider } from "../providers/FormsContext";
import Alert from "./modals/Alert";
import useGetUsers from "../services/useGetUsers";
import useGetAnswer from "../services/useGetAnswer";
import { userProps } from "../interfaces/indexInterface";
import { UserProvider } from "../providers/userContext";
import UserModal from "./modals/UserModal";
import { useTranslation } from "react-i18next";

function Dashboard() {
    const { t } = useTranslation();
    const context = useContext(formsProvider);
    const userContext = useContext(UserProvider);
    const { users } = useGetUsers("get-users/");
    const [usersData, setUsersData] = useState<userProps[]>(users);
    const { answers } = useGetAnswer(`get-answers/`);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMsj, setAlertMsj] = useState({ message: "", type: "" });
    const activeForms = context?.state.filter((form) => form.status === "active");
    const [selectedUser, setSelectedUser] = useState<userProps>({
        id: 0,
        name: "",
        role: "",
        email: "",
        last_login: "",
    });

    useEffect(() => {
        setUsersData(users);
    }, [users]);

    const closeAlert = () => setShowAlert(false);

    const changeAlertMsj = (message: string, type: string) => {
        setAlertMsj({ message, type });
    };

    const roleChange = (role: string, id: number) => {
        setUsersData((prev) =>
            prev.map((user) => {
                if (user.id === id) {
                    return { ...user, role };
                }
                return user;
            })
        );
    };

    return (
        <>
            <UserModal user={selectedUser} roleChange={roleChange} />
            <Alert closeAlert={closeAlert} alertMsj={alertMsj} showAlert={showAlert} />
            <div className="container mt-4">
                <h2 className="mb-4">{t("general summary")}</h2>
                <div className="row mb-4">
                    <div className="col-md-4">
                        <div className="card p-3 border border-info">
                            <h2>{t("total forms")}</h2>
                            <p className="display-4">{context?.state.length}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-3 border border-info">
                            <h2>{t("total answers")}</h2>
                            <p className="display-4">{answers.length}</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card p-3 border border-info">
                            <h2>{t("active forms")}</h2>
                            <p className="display-4">{activeForms?.length}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card p-3 border border-info">
                            <h2>{t("your recent forms")}</h2>
                            {context?.state.slice(0, 5).map((item, index) => (
                                <div key={index} className="table-responsive">
                                    <TableForms
                                        setShowAlert={setShowAlert}
                                        changeAlertMsj={changeAlertMsj}
                                        formProps={item}
                                        to="/dashboard/answer/"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {userContext?.user?.role === "admin" ? (
                        <div className="col-md-4">
                            <div className="card p-3 border border-info overflow-auto" style={{maxHeight: 275}}>
                                <h2>{t("users")}</h2>
                                {usersData.map((user, index) => (
                                    <button
                                        type="button"
                                        onClick={() => setSelectedUser(user)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        key={index}
                                        className="btn p-2 d-flex justify-content-between align-items-center tableForm"
                                    >
                                        <p className="p-0 m-0 text-capitalize">
                                            {user.name}
                                        </p>
                                        <p className="p-0 m-0">{user.role}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Dashboard;
