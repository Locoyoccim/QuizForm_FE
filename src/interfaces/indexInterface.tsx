import { ChangeEvent, Dispatch, ReactNode } from "react";

export interface buttonNavProps {
    tittle: string;
    icon: string;
    action?: () => void;
}

export interface navBarProps {
    isCollapsed: boolean;
    handleCollapse: () => void;
}
export interface childrenContext {
    children: ReactNode;
}
export interface ThemeContextProps {
    darkMode: boolean;
    setDarkMode: Dispatch<React.SetStateAction<boolean>>;
}

export interface buttonTemplateProps {
    variant: string;
    icon?: string;
    title: string;
    action?: () => void;
}

export interface formProps {
    id: number;
    name: string;
    title: string;
    description?: string;
    status?: string;
    updated_at?: string;
    created_at: string;
}

export type eventChange = ChangeEvent<HTMLInputElement>;

export interface questionProps {
    id: number;
    type: "text" | "option" | "num" | string;
    question: string;
    options: string[];
    answer: string | number;
    updateQuestion: (id: number, pregunta: string, opciones: string[]) => void;
    manageResponse: (id: number, respuesta: string | number) => void;
    updateOptions: (id: number, options: string[]) => void;
}

export interface PreguntaType {
    form_title?: string;
    question_id: number;
    type: "text" | "option" | "num" | string;
    question: string;
    options: string[];
    answer: string | number;
    required: boolean;
    description: string;
}

export interface answerType {
    question_id: number | string;
    user_id: number;
    answer: string | number;
}

export interface answerProps {
    question_id: number | string;
    type: string;
    question: string;
    options: string[];
    answer: string | number;
    onResponseChange: (
        question_id: number | string,
        newResponse: string | number
    ) => void;
}

export interface inputProps {
    value?: string | number;
    onChange: (e: number | string) => void;
    options?: string[];
}

interface messageAlertProps {
    message: string;
    type: string;
}

export interface alertProps {
    alertMsj: messageAlertProps;
    showAlert: boolean;
    closeAlert: () => void;
}

export interface modalAlert {
    setShowAlert: (e: boolean) => void;
    changeAlertMsj: (message: string, type: string) => void;
}

export interface answerCardProps {
    id: number;
    title: string;
    created_at: string;
    name: string;
}

export interface answeredQuestions {
    id: number;
    question_id: string;
    form_id: number;
    user_name: string;
    answer: string;
    created_at: string;
}

export interface userProps {
    id: number;
    name: string;
    role: string;
    email: string;
    last_login: string;
}

export interface newUserProps {
    name: string;
    email: string;
    password: string;
}

export interface postCommentProps {
    user_id: number;
    comment: string;
}

export interface commentsProps {
    id: number;
    form_id?: number;
    name: string;
    created_at?: string;
    updated_at: string;
    comment: string;
}
