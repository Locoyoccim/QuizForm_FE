import { formProps } from "../interfaces/indexInterface";
import FormIMG from "../assets/form.jpg";
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

function CardForm({ formProps, setShowAlert, changeAlertMsj, to }: cardProps) {
    console.log(formProps);
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
        <div
            className="card position-relative cardForm d-flex"
            style={{ width: "12.2em" }}
        >
            <Link className="text-decoration-none text-body" to={`${to}${formProps.id}/`}>
                <img src={FormIMG} className="card-img-top" alt="form image" />
                <div className="card-body">
                    <h5 className="card-title p-0 m-0">{formProps.title}</h5>
                    <p className="card-text p-0 m-0">{formProps.name}</p>
                    <p className="card-text p-0 m-0">{formateDate}</p>
                </div>
            </Link>
            <div
                className="position-absolute top-0 start-100 translate-middle z-3"
                style={{ width: 58}}
            >
                <Button
                    icon="bi-hand-thumbs-up-fill"
                    variant="btn-primary p-1 m-0 h-25"
                    title={likesCount ? likesCount?.toString() : "0"}
                    action={sendLike}
                />
            </div>
            {userContext?.user?.role == "admin" ||
            userContext?.user?.name === formProps.name ? (
                <div className="position-absolute text-danger z-3 bottom-0 end-0">
                    <button className="btn text-info icon_card fs-6 p-0 m-1">
                        <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                        onClick={onDelete}
                        className="btn text-danger icon_card fs-6 p-0 m-1"
                    >
                        <i className="bi bi-trash3-fill"></i>
                    </button>
                </div>
            ) : null}
        </div>
    );
}

export default CardForm;
