import { useState } from "react";
import Questions from "../components/creatorForms/Questions";
import Button from "../templates/Button";
import { PreguntaType } from "../interfaces/indexInterface";
import { useNavigate, useParams } from "react-router-dom";
import usePostQuestion from "../services/usePostQuestion";
import BtnAdd from "../templates/ButtonAddQuestion";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

function CreateNewForm() {
    const [form, setForm] = useState<PreguntaType[]>([]);
    const { title, pk } = useParams();
    const { postQuestions } = usePostQuestion();
    const navigate = useNavigate();

    const addQuestion = (type: "text" | "option" | "num") => {
        setForm([
            ...form,
            {
                form_title: title?.toString(),
                question_id: form.length,
                type,
                question: "",
                options: type === "option" ? [""] : [],
                answer: "",
                required: true,
                description: ''
            },
        ]);
    };

    const updateQuestion = (id: number, question: string, options: string[]) => {
        setForm((prevForm) =>
            prevForm.map((item) =>
                item.question_id === id ? { ...item, question, options } : item
            )
        );
    };

    const updateOptions = (id: number, options: string[]) => {
        setForm((prev) => {
            const data = [...prev];
            data[id].options = options;
            return data;
        });
    };

    const manageAnswer = (id: number, answer: string | number) => {
        setForm((prevForm) =>
            prevForm.map((item) => (item.question_id === id ? { ...item, answer } : item))
        );
    };

    const removeLastQuestion = () => {
        setForm(form.slice(0, -1));
    };

    const handleSubmit = async () => {
        try {
            await postQuestions(`get-question/${pk}/`, form);
            navigate("/dashboard/");
        } catch {
            alert("Error al enviar la pregunta");
        }
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(form); // Clona el estado actual
        const [reorderedItem] = items.splice(result.source.index, 1); // Extrae el ítem movido
        items.splice(result.destination.index, 0, reorderedItem); // Inserta en la nueva posición
    
        setForm(items); // Actualiza el estado
        console.log("Updated form:", items); // Valida en consola
    };

    return (
        <section className="text-capitalize container col-11 mt-2 p-4 col-md-8 col-lg-6 border border-info rounded-5">
            <h1 className="Form Title">{title}</h1>
            <div className="mb-4 d-flex gap-2">
                <BtnAdd addQuestion={addQuestion} option="text" icon="fonts" />
                <BtnAdd addQuestion={addQuestion} option="num" icon="123" />
                <BtnAdd addQuestion={addQuestion} option="option" icon="card-checklist" />
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable-questions">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {form.map((question, index) => (
                                <Draggable
                                    key={question.question_id}
                                    draggableId={`draggable-${question.question_id}`}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <Questions
                                                id={question.question_id}
                                                type={question.type}
                                                question={question.question}
                                                options={question.options}
                                                answer={question.answer}
                                                updateQuestion={updateQuestion}
                                                manageResponse={manageAnswer}
                                                updateOptions={updateOptions}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Button
                variant="btn-success mt-4"
                icon=""
                title="Save Form"
                action={handleSubmit}
            />
            <Button
                action={removeLastQuestion}
                variant="btn-outline-danger mx-2 mt-4"
                icon=""
                title="Remove Last"
            />
        </section>
    );
}

export default CreateNewForm;
