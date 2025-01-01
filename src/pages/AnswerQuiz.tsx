import { useTranslation } from "react-i18next";
import CardForm from "../components/CardForm";
import TableForms from "../components/TableForms";
import { UserProvider } from "../providers/userContext";
import useGetForms from "../services/useGetForms";
import Button from "../templates/Button";
import { useContext, useState } from "react";

function AnswerQuiz() {
    const { t } = useTranslation();
    const userContext = useContext(UserProvider);
    const [listMode, setListMode] = useState<boolean>(false);
    const { forms } = useGetForms(`unanswered-forms/${userContext?.user?.id}/`);

    const filteredForms = forms.filter((form) => form.name != userContext?.user?.name);
    console.log(filteredForms);
    const changeMode = () => {
        setListMode(!listMode);
    };

    return (
        <section className="pb-5 position-relative">
            <div className="p-4 container  align-items-center">
                <div className="d-flex gap-3 align-items-center justify-content-between mb-3">
                    <div className="d-flex gap-3 align-items-center">
                        <p className="fs-1 p-0 m-0">{t('Answer Any Quiz')}</p>
                    </div>
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
                        <div className="table-responsive container">
                            <table className="table container col-lg-8 col-md-10">
                                <tbody>
                                    {filteredForms.map((item, index) => (
                                        <TableForms
                                            key={index}
                                            formProps={item}
                                            to="/dashboard/answer/"
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div
                            role="button"
                            className="flex-wrap d-flex gap-3 px-4 container col-lg-12 col-md-11 col-12"
                        >
                            {filteredForms.map((item, index) => (
                                <CardForm
                                    key={index}
                                    formProps={item}
                                    to="/dashboard/answer/"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default AnswerQuiz;
