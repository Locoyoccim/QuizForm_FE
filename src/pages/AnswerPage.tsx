import { useContext, useEffect, useState } from "react";
import ToAnswer from "../components/answerComponents/ToAnswer";
import { answerType } from "../interfaces/indexInterface";
import useGetQuestions from "../services/useGetQuestions";
import { useNavigate, useParams } from "react-router-dom";
import usePostAnswer from "../services/usePostAnswers";
import { UserProvider } from "../providers/userContext";
import CommentSection from "../components/CommentSection";

function AnswerPage() {
    const { form_id } = useParams<{ form_id: string }>();
    const { questions, getQuestions } = useGetQuestions();
    const userContext = useContext(UserProvider);
    const [responses, setResponses] = useState<answerType[]>([]);
    const { postAnswer } = usePostAnswer();
    const navigate = useNavigate();

    useEffect(() => {
        if (form_id) {
            getQuestions(`get-question/${form_id}/`);
        }
    }, [form_id]);

    useEffect(() => {
        setResponses(
            questions.map((question) => ({
                question_id: question.question_id,
                answer: "",
                user_id: userContext?.user?.id || 0,
            }))
        );
    }, [questions]);

    const handleResponseChange = (
        question_id: number | string,
        newResponse: number | string
    ) => {
        setResponses((prev) =>
            prev.map((resp) =>
                resp.question_id === question_id ? { ...resp, answer: newResponse } : resp
            )
        );
    };

    const handleSubmit = async () => {
        if (form_id) {
            const response = await postAnswer(`get-answer/${form_id}/`, responses);
            if (response) navigate("/dashboard/my_forms/");
        }
    };

    return (
        <>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="container col-11 mt-2 p-4 col-md-8 col-lg-6 border border-info rounded-5"
            >
                <h1 className="p-0 m-0">{questions[0]?.form_title}</h1>
                <p className="mb-4 p-0 m-0">{questions[0]?.description}</p>
                {questions.map((question, index) => (
                    <ToAnswer
                        key={index}
                        {...question}
                        onResponseChange={handleResponseChange}
                    />
                ))}
                <button type="button" onClick={handleSubmit} className="btn btn-primary">
                    Send my answer
                </button>
            </form>
            {form_id && <CommentSection form_id={form_id} />}
        </>
    );
}

export default AnswerPage;
