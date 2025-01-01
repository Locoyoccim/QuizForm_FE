import moment from "moment";
import { commentsProps } from "../interfaces/indexInterface";
import useDeleteComment from "../services/useDeleteComment";
import { useContext, useState } from "react";
import Alert from "../components/modals/Alert";
import { UserProvider } from "../providers/userContext";

interface localProps {
    details: commentsProps;
    onDelete: (comment_id: number) => void;
}

function Comments({ details, onDelete }: localProps) {
    const userContext = useContext(UserProvider);
    const { deleteComment } = useDeleteComment();
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

    const formatDate = (date: string) => {
        return moment(date).format("MMM Do YY");
    };

    const handleDelete = async () => {
        try {
            await deleteComment(`comment/${details.id}/`);
            setAlert({ type: "success", message: "Comment deleted successfully!" });
            onDelete(details.id);
        } catch (error) {
            console.log(error);
            setAlert({ type: "error", message: "Failed to delete comment." });
        }
    };

    return (
        <div className="border border-success mb-3 p-3 rounded-4 position-relative">
            {alert && (
                <Alert
                    alertMsj={alert}
                    showAlert={!!alert}
                    closeAlert={() => setAlert(null)}
                />
            )}
            <p className="p-0 m-0 fs-6">{details.comment}</p>
            <p className="p-0 m-0 fs-6 opacity-50">{details.name}</p>
            <p className="p-0 m-0 fs-6 opacity-50">{formatDate(details.updated_at)}</p>
            {userContext?.user?.role === "admin" ||
            userContext?.user?.name === details.name ? (
                <button
                    onClick={handleDelete}
                    className="btn btn-outline-danger border-0 position-absolute bottom-0 end-0"
                >
                    <i className="bi bi-trash3 fs-5"></i>
                </button>
            ) : null}
        </div>
    );
}

export default Comments;
