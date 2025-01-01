import Button from "../templates/Button";
import Comments from "../components/Comments";
import usePostComment from "../services/usePostComment";
import { useContext, useEffect, useState } from "react";
import { commentsProps, postCommentProps } from "../interfaces/indexInterface";
import Alert from "../components/modals/Alert";
import { UserProvider } from "../providers/userContext";
import useGetComments from "../services/useGetComments";
import { useTranslation } from "react-i18next";

function CommentSection({ form_id }: { form_id: string }) {
    const { t } = useTranslation();
    const userContext = useContext(UserProvider);
    const { postComment } = usePostComment();
    const { comments } = useGetComments(`comments/${form_id}/`);
    const [localComments, setLocalComments] = useState<commentsProps[]>([]);
    const [data, setData] = useState<string>("");
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

    useEffect(() => {
        setLocalComments(comments);
    }, [comments]);

    const handleSubmit = async () => {
        const newComment: postCommentProps = {
            user_id: userContext?.user?.id || 0,
            comment: data,
        };
        try {
            const response = await postComment(`comments/${form_id}/`, newComment);
            setAlert({ type: "success", message: t("Comment posted successfully!") }); // Usar t para traducción
            setLocalComments((prevData) => [...prevData, response]);
            setData("");
        } catch (error) {
            console.log(error);
            setAlert({ type: "error", message: t("Failed to post comment.") }); // Usar t para traducción
        }
    };

    const onDelete = (comment_id: number) => {
        setLocalComments((prevData) => prevData.filter((item) => item.id != comment_id));
    };

    return (
        <section className="container col-11 mt-2 p-4 col-md-8 col-lg-6 border border-info rounded-5">
            <h1>{t("comments")}</h1>
            {alert && (
                <Alert
                    alertMsj={alert}
                    showAlert={!!alert}
                    closeAlert={() => setAlert(null)}
                />
            )}
            {localComments.map((item, index) => (
                <Comments key={index} details={item} onDelete={onDelete} />
            ))}
            <textarea
                className="form-control"
                aria-label="With textarea"
                placeholder={t("leave comment")}
                value={data}
                onChange={(e) => setData(e.target.value)}
            ></textarea>
            <Button title={t("send")} variant="btn-success mt-2" action={handleSubmit} />
        </section>
    );
}
export default CommentSection;
