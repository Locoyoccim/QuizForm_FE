import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import OptionInput from "./OptionInput";
import { answerProps } from "../../interfaces/indexInterface";


function ToAnswer({ question_id, type, question, options, answer, onResponseChange }: answerProps) {
    const handleChange = (newResponse: string | number) => {
        onResponseChange(question_id, newResponse);
    };

    return (
        <div className="mb-4">
            <h5>{question}</h5>
            {type === "text" && (
                <TextInput value={answer} onChange={handleChange} />
            )}
            {type === "num" && (
                <NumberInput value={answer} onChange={handleChange} />
            )}
            {type === "option" && (
                <OptionInput options={options} value={answer} onChange={handleChange} />
            )}
        </div>
    );
}

export default ToAnswer;