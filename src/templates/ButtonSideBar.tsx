import { buttonNavProps } from "../interfaces/indexInterface";

function NavButton({tittle, icon, action}: buttonNavProps) {
    return (
        <button className="d-flex gap-3 btn" role="button" onClick={action}>
            <i className={`bi ${icon}`}></i>
            <span>{tittle}</span>
        </button>
    );
}

export default NavButton;