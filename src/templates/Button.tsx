import { buttonTemplateProps } from "../interfaces/indexInterface";

function Button({ variant, icon, title, action }: buttonTemplateProps) {
    return (
        <button
            onClick={action}
            type="button"
            className={`btn ${variant} z-3`}
            style={{ height: 40 }}
        >
            {title} <i className={`bi ${icon}`}></i>
        </button>
    );
}

export default Button;
