import { eventChange } from "../../interfaces/indexInterface";

interface checkBoxProps {
    getOptions: (value: string, index: number) => void;
    value: string;
    index: number
}

function CheckBox({ getOptions, value, index }: checkBoxProps) {

    const onChange = (e: eventChange) => {
        const value: string = e.target.value;
        getOptions(value, index);
    };

    return (
        <div className="d-flex align-items-center">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" />
            </div>
            <div className="col-sm-6 mb-2 d-flex w-100">
                <input
                    type="text"
                    className="form-control"
                    placeholder={`Option ${index}`}
                    onChange={(e) => onChange(e)}
                    value={value}
                />
            </div>
        </div>
    );
}

export default CheckBox;
