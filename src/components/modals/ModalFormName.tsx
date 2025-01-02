import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import usePostForm from "../../services/usePostForm";
import { modalAlert } from "../../interfaces/indexInterface";
import { UserProvider } from "../../providers/userContext";

function ModalFormName({ changeAlertMsj, setShowAlert }: modalAlert) {
    const titleFormRef = useRef<HTMLInputElement>(null);
    const descriptionFormRef = useRef<HTMLTextAreaElement>(null);
    const { postForm } = usePostForm();
    const userContext = useContext(UserProvider);
    const navigate = useNavigate();

    const SendToBackEnd = async () => {
        const title = titleFormRef.current?.value;
        const description = descriptionFormRef.current?.value;
        const user_id: number = userContext?.user?.id ?? 0;
        const newForm = {
            user_id: user_id,
            title: title,
            description: description,
        };
        console.log(newForm);
        try {
            const response = await postForm("forms-info/", newForm);
            changeAlertMsj("Created, you'll redirect", "success");
            setShowAlert(true);
            const id = response.id;
            setTimeout(() => {
                setShowAlert(false);
                navigate(`/dashboard/new-form/${title}/${id}/`);
                if (titleFormRef.current) titleFormRef.current.value = "";
                if (descriptionFormRef.current) descriptionFormRef.current.value = "";
            }, 2500);
        } catch (e) {
            console.log(e);
            changeAlertMsj("Error, try again", "danger");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2500);
        }
    };

    return (
        <div
            className="modal fade"
            aria-labelledby="createModalLabel"
            aria-hidden="true"
            id="createModal"
            tabIndex={-1}
        >
            <div className="modal-dialog modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Name for your new form</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label
                                htmlFor="exampleFormControlInput1"
                                className="form-label"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="Enter title"
                                ref={titleFormRef}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descriptionTextArea" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="descriptionTextArea"
                                rows={2}
                                ref={descriptionFormRef}
                            ></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={SendToBackEnd}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalFormName;
