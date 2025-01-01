import bg from "../assets/bg_desktop.jpg";
import neonTitle from "../assets/19629.jpg";
import Button from "../templates/Button";
import GetUser from "../services/GetUser";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../components/modals/Alert";
import { useTranslation } from "react-i18next";

function Login() {
    const {t} = useTranslation();
    const { fetchUser } = GetUser();
    const navigate = useNavigate();
    const [logData, setLogData] = useState({
        email: "",
        password: "",
    });
    const [alert, setAlert] = useState({
        showAlert: false,
        message: { type: "", message: "" },
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogData({ ...logData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await fetchUser(logData);
            if (response) {
                navigate("/dashboard");
            } else {
                setAlert({
                    showAlert: true,
                    message: { type: "danger", message: "Invalid credentials" },
                });
                setTimeout(() => {
                    setAlert({ ...alert, showAlert: false });
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="login d-grid d-lg-flex" style={{ height: "100vh" }}>
            <div className="d-flex col-12 col-lg-6 d-flex align-items-center justify-content-center">
                <article
                    className="card d-grid p-4 col-8"
                    style={{ boxShadow: "1px -1px 37px -1px #808080" }}
                >
                    <div className="mb-3">
                        <img src={neonTitle} alt="neon tittle" className="w-100" />
                    </div>
                    <form>
                        <div className="mb-3">
                            <label form="exampleInputEmail1" className="form-label">
                                {t('Email Address')}
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name="email"
                                onChange={(e) => handleChange(e)}
                            />
                            <div id="emailHelp" className="form-text">
                                {t('email msj')}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label form="exampleInputPassword1" className="form-label">
                                {t('Password')}
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="exampleInputPassword1"
                                name="password"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="showPasswordCheck"
                                onChange={(e) => setShowPassword(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="showPasswordCheck">
                                {t('Show Password')}
                            </label>
                        </div>
                        <Button
                            title={t("submit")}
                            variant="btn-primary"
                            action={handleSubmit}
                        />
                        <Link to="/create-user/">
                            <Button
                                title={t("create account")}
                                variant="btn-outline-primary ms-2 border-0"
                            />
                        </Link>
                    </form>
                    <Alert
                        showAlert={alert.showAlert}
                        alertMsj={alert.message}
                        closeAlert={() => setAlert({ ...alert, showAlert: false })}
                    />
                </article>
            </div>
            <div
                className="d-none d-lg-block col-6"
                style={{ objectFit: "cover", height: "100vh" }}
            >
                <img src={bg} alt="img" className="w-100 h-100 object-cover" />
            </div>
        </section>
    );
}

export default Login;
