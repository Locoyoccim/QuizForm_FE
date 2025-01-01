import { formProps } from "../interfaces/indexInterface";
import moment from "moment";
import "./formStyles.css";
import useDeleteForm from "../services/useDeleteForm";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserProvider } from "../providers/userContext";
import Button from "../templates/Button";
import useGetLikes from "../services/useGetLikes";
import usePostLikes from "../services/usePostLikes";

interface cardProps {
    formProps: formProps;
    setShowAlert?: (e: boolean) => void;
    changeAlertMsj?: (message: string, type: string) => void;
    to: string;
}

function TableForms({ to, formProps, setShowAlert, changeAlertMsj }: cardProps) {
    const { likes } = useGetLikes(`likes/${formProps.id}/`);
    const { postLike } = usePostLikes();
    const [likesCount, setLikes] = useState<number | undefined>();
    const formateDate = moment
        .utc(formProps.created_at, "YYYY-MM-DD HH:mm:ss.SSSSSS")
        .local()
        .fromNow();
    const { deleteForm } = useDeleteForm();
    const userContext = useContext(UserProvider);

    const onDelete = () => {
        const form_id = { id: formProps.id };
        try {
            deleteForm("forms-info/", form_id, formProps);
            changeAlertMsj?.("Form deleted successfully", "warning");
            setShowAlert?.(true);
            setTimeout(() => {
                setShowAlert?.(false);
            }, 2500);
        } catch (e) {
            console.log(e);
            changeAlertMsj?.("Error, try again", "danger");
        }
    };

    useEffect(() => {
        setLikes(likes);
    }, [likes]);

    const sendLike = async () => {
        const newCount = await postLike(`likes/${formProps.id}/`);
        if (newCount) setLikes(newCount);
    };

    return (
        <>
            <Link
                to={`${to}${formProps.id}/`}
                role="button"
                className="border-bottom container text-body d-flex justify-content-between align-items-center tableForm text-decoration-none"
                style={{ height: 50 }}
            >
                <div className="bg-transparent d-flex gap-3 w-25">
                    <i className="bi bi-clipboard-fill"></i>
                    <p className="p-0 m-0 bg-transparent">{formProps.title}</p>
                </div>
                <p className="p-0 m-0 bg-transparent">{formateDate}</p>
                <div className="z-3 bg-transparent" style={{ width: 58 }}>
                    <Button
                        icon="bi-hand-thumbs-up-fill"
                        variant="btn-primary p-1 m-0 h-25"
                        title={likesCount ? likesCount?.toString() : "0"}
                        action={sendLike}
                    />
                </div>
                {userContext?.user?.role == "admin" ? (
                    <button
                        onClick={onDelete}
                        className="btn text-danger fs-5 bg-transparent"
                    >
                        <i className="bi bi-trash3-fill"></i>
                    </button>
                ) : null}
            </Link>
        </>
    );
}

export default TableForms;
