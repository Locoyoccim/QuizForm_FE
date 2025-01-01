import { useState, ChangeEvent, useEffect } from "react";
import CheckBox from "./CheckBox";
import Button from "../../templates/Button";
import { eventChange, questionProps } from "../../interfaces/indexInterface";

function Questions({
    id,
    type,
    question,
    options,
    answer,
    updateQuestion,
    manageResponse,
    updateOptions,
}: questionProps) {
    const [textQuestion, setTextQuestion] = useState(question);
    const [localOptions, setLocalOptions] = useState<string[]>(options);

    const manejarCambioPregunta = (e: eventChange) => {
        setTextQuestion(e.target.value);
        updateQuestion(id, e.target.value, localOptions);
    };

    const getOptions = (value: string, index: number) => {
        setLocalOptions((prev) => {
            const newOptions = [...prev];
            newOptions[index] = value;
            updateOptions(id, newOptions);
            return newOptions;
        });
    };

    const addCheckBox = () => {
        setLocalOptions((prev) => [...prev, ""]);
    };

    useEffect(() => {
        updateOptions(id, localOptions);
    }, [localOptions]);

    const removeCheckBox = () => {
        setLocalOptions(localOptions.slice(0, -1));
    };

    const manejarRespuestaChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = type === "num" ? Number(e.target.value) : e.target.value;
        manageResponse(id, value);
    };

    return (
        <div className="mb-4">
            {/* Change Question */}
            <div className="form-group mb-2 d-flex align-items-center">
                <input
                    type="text"
                    className="form-control text-capitalize"
                    value={textQuestion}
                    onChange={manejarCambioPregunta}
                    placeholder="you're question"
                />
                <i className="bi bi-grip-vertical fs-2"></i>
            </div>
            {/* Text */}
            {type === "text" && (
                <div className="form-group text-capitalize">
                    <textarea
                        className="form-control"
                        rows={3}
                        value={answer as string}
                        onChange={(e) => manejarRespuestaChange(e)}
                        placeholder="Answer"
                        style={{ resize: "none" }}
                    />
                </div>
            )}
            {/* múltiple */}
            {type === "option" && (
                <div className="text-capitalize position-relative d-flex justify-content-between align-items-center">
                    <div>
                        {localOptions.map((option, index) => (
                            <CheckBox
                                index={index}
                                key={index}
                                value={option}
                                getOptions={getOptions}
                            />
                        ))}
                    </div>
                    <div className="d-flex gap-2 position-absolute top-0 end-0">
                        <Button
                            icon="bi-plus-lg"
                            title=""
                            variant="btn-outline-success"
                            action={addCheckBox}
                        />
                        <Button
                            icon="bi-trash3"
                            title=""
                            variant="btn-outline-danger"
                            action={removeCheckBox}
                        />
                    </div>
                </div>
            )}
            {/* Num */}
            {type === "num" && (
                <div className="form-group w-25">
                    <input
                        type="number"
                        className="form-control"
                        value={answer as number}
                        onChange={manejarRespuestaChange}
                        placeholder="Num"
                    />
                </div>
            )}
        </div>
    );
}

export default Questions;
