import { useParams } from "react-router-dom";
import useGetAnswers from "../../services/useGetAnswers";
import { useEffect } from "react";
import moment from "moment";
import CommentSection from "../CommentSection";

function Answers() {
    const { form_id } = useParams<{ form_id: string }>();
    const { fetchAnswers, data } = useGetAnswers();

    useEffect(() => {
        if (form_id) {
            fetchAnswers(`get-answer/${form_id}/`);
        }
    }, [form_id]);

    const formateDate = (date: string) => {
        return moment(date).format("MMM Do YY");
    };

    return (
        <>
            <section className="text-capitalize container col-11 mt-2 p-4 col-md-8 col-lg-6 border border-info rounded-5">
                <div>
                    <h1>{data[0]?.form_id}</h1>
                    <p className="m-0 p-0">
                        <strong>User:</strong> {data[0]?.user_name}
                    </p>
                    <p className="m-0 p-0 mb-3">
                        <strong>Answered: </strong> {formateDate(data[0]?.created_at)}
                    </p>
                </div>
                <div>
                    {data.map((item) => (
                        <div key={item.id}>
                            <h4>- {item.question_id}</h4>
                            <p>
                                <strong>R:</strong> {item.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            {form_id && <CommentSection form_id={form_id} />} 
        </>
    );
}

export default Answers;
