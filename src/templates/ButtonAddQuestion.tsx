interface buttonAdd {
    addQuestion: (type: "num" | "text" | "option") => void;
    icon: string;
    option: "num" | "text" | "option";
}

function ButtonAddQuestion({ icon, addQuestion, option }: buttonAdd) {
    return (
        <button className="btn btn-outline-primary" onClick={() => addQuestion(option)}>
            <i className={`bi bi-${icon}`}></i>
        </button>
    );
}

export default ButtonAddQuestion;
