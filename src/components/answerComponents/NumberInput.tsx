import { inputProps } from "../../interfaces/indexInterface";

function NumberInput({ onChange }: inputProps) {
    return (
        <input
            type="number"
            className="form-control"
            placeholder="0"
            onChange={(e) => onChange(Number(e.target.value))}
        />
    );
}

export default NumberInput;