import { useState } from "react";
import CardForm from "../components/CardForm";
import TableForms from "../components/TableForms";
import useGetAnswer from "../services/useGetAnswer";
import Button from "../templates/Button";
import { useTranslation } from "react-i18next";

function Answered() {
    const { t } = useTranslation();
    const { answers } = useGetAnswer("get-answers/");
    const [listMode, setListMode] = useState<boolean>(false);

    const changeMode = () => {
        setListMode(!listMode);
    };

    return (
        <section className="p-4 container col-lg-12 col-md-9 col-12 ">
            <div className="mb-3 d-flex gap-3 align-items-center justify-content-between">
                <p className="fs-1 p-0 m-0">{t("Answered Forms")}</p>
                <div className="d-flex gap-2">
                    <Button
                        icon="bi-card-heading"
                        variant="btn-outline-primary"
                        title=""
                        action={changeMode}
                    />
                    <Button
                        icon="bi-list-ul"
                        variant="btn-outline-primary"
                        title=""
                        action={changeMode}
                    />
                </div>
            </div>
            <div className="d-flex gap-3 flex-wrap ">
                {listMode ? (
                    <div className="table-responsive w-100">
                        <table className="table container col-lg-8 col-md-10">
                            <tbody>
                                {answers.map((item, index) => (
                                    <TableForms
                                        key={index}
                                        formProps={item}
                                        to="/dashboard/answers/"
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    answers.map((answer, index) => (
                        <CardForm
                            key={index}
                            formProps={answer}
                            to="/dashboard/answers/"
                        />
                    ))
                )}
            </div>
        </section>
    );
}

export default Answered;
