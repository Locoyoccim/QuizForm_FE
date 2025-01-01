import CardForm from "../components/CardForm";
import Button from "../templates/Button";
import TableForms from "../components/TableForms";
import { useContext, useEffect, useState } from "react";
import ModalFormName from "../components/modals/ModalFormName";
import { formsProvider } from "../providers/FormsContext";
import Alert from "../components/modals/Alert";
import { useTranslation } from "react-i18next";

function UserForms() {
    const { t } = useTranslation();
    const [listMode, setListMode] = useState<boolean>(false);
    const contextForms = useContext(formsProvider);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMsj, setAlertMsj] = useState({ message: "", type: "" });

    const closeAlert = () => setShowAlert(false);

    const changeMode = () => {
        setListMode(!listMode);
    };

    const changeAlertMsj = (message: string, type: string) => {
        setAlertMsj({ message, type });
    };

    useEffect(() => {
        setShowAlert(true);
    }, [alertMsj]);

    return (
        <div>
            <Alert closeAlert={closeAlert} alertMsj={alertMsj} showAlert={showAlert} />
            <section className="pb-5 position-relative">
                <ModalFormName
                    changeAlertMsj={changeAlertMsj}
                    setShowAlert={setShowAlert}
                />
                <div className="p-4 d-flex container col-lg-12 col-md-9 col-12 justify-content-between align-items-center">
                    <div className="d-flex gap-3 align-items-center">
                        <p className="fs-1 p-0 m-0">{t("your Forms")}</p>
                        <button
                            type="button"
                            className="btn btn-outline-success d-flex gap-2 align-items-center"
                            data-bs-toggle="modal"
                            data-bs-target="#createModal"
                        >
                            {t("new")}
                            <i className="bi bi-plus-circle"></i>
                        </button>
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
                                    {contextForms?.state.map((item) => (
                                        <TableForms
                                            key={item.id}
                                            setShowAlert={setShowAlert}
                                            changeAlertMsj={changeAlertMsj}
                                            formProps={item}
                                            to={`/dashboard/edit-form/${item.title}/`}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div
                            role="button"
                            className="flex-wrap d-flex gap-3 px-4 container col-lg-12 col-md-9 col-12"
                        >
                            {contextForms?.state.map((item) => (
                                <CardForm
                                    key={item.id}
                                    setShowAlert={setShowAlert}
                                    changeAlertMsj={changeAlertMsj}
                                    formProps={item}
                                    to={`/dashboard/edit-form/${item.title}/`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default UserForms;
