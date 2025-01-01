import { alertProps } from "../../interfaces/indexInterface";

function Alert({ alertMsj, showAlert, closeAlert }: alertProps) {
    return (
        <div
            id="liveAlertPlaceholder"
            className={`alert alert-${
                alertMsj.type
            } alert-dismissible fade ${showAlert ? "show" : ""} position-fixed bottom-0 start-50 translate-middle-x px-5`}
            role="alert"
            style={{ zIndex: 1050 }}
        >
            <p className="m-0 p-0 text-center">{alertMsj.message}</p>
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeAlert}
            ></button>
        </div>
    );
}

export default Alert;
