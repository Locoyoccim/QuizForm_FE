import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./providers/ThemeProvider.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/LogIn.tsx";
import UserForms from "./pages/UserForms.tsx";
import Dashboard from "./components/Dashboard.tsx";
import CreateNewForm from "./pages/CretaNewForm.tsx";
import AnswerPage from "./pages/AnswerPage.tsx";
import FormsContext from "./providers/FormsContext.tsx";
import Answered from "./pages/Answered.tsx";
import Answers from "./components/answered/Answers.tsx";
import UserContext from "./providers/userContext.tsx";
import AuthProvider from "./providers/AuthProvider.tsx";
import AnswerQuiz from "./pages/AnswerQuiz.tsx";
import SearchResult from "./pages/SearchResult.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import SignUp from "./pages/SignUp.tsx";
import EditForm from "./pages/EditForm";

const route = createBrowserRouter([
    {
        path: "dashboard/",
        element: <ProtectedRoute element={App} />,
        children: [
            { index: true, element: <ProtectedRoute element={Dashboard} /> },
            { path: "my_forms/", element: <ProtectedRoute element={UserForms} /> },
            {
                path: "new-form/:title/:pk/",
                element: <ProtectedRoute element={CreateNewForm} />,
            },
            {
                path: "answer/:form_id/",
                element: <ProtectedRoute element={AnswerPage} />,
            },
            { path: "answered/", element: <ProtectedRoute element={Answered} /> },
            { path: "answers/:form_id/", element: <ProtectedRoute element={Answers} /> },
            { path: "answer-quiz/", element: <ProtectedRoute element={AnswerQuiz} /> },
            { path: "search-forms/", element: <ProtectedRoute element={SearchResult} /> },
            {
                path: "search-forms/:search/",
                element: <ProtectedRoute element={SearchResult} />,
            },
            {
                path: "edit-form/:title/:pk/",
                element: <ProtectedRoute element={EditForm} />,
            },
        ],
    },
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "create-user/",
        element: <SignUp />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <UserContext>
            <ThemeProvider>
                <FormsContext>
                    <RouterProvider router={route} />
                </FormsContext>
            </ThemeProvider>
        </UserContext>
    </AuthProvider>
);
