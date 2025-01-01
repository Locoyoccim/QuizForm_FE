import { inputProps } from "../../interfaces/indexInterface";

function TextInput({ onChange }: inputProps) {
    return (
        <input
            type="text"
            className="form-control"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default TextInput;
