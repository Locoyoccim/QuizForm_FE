import bg from "../assets/bg_desktop.jpg";
import neonTitle from "../assets/19629.jpg";
import Button from "../templates/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateUser from "../services/CreateUser";
import { newUserProps } from "../interfaces/indexInterface";
import Alert from "../components/modals/Alert";
import { useTranslation } from "react-i18next";

function SignUp() {
    const { t } = useTranslation();
    const { createUser } = CreateUser();
    const navigate = useNavigate();
    const [signUpData, setSignUpData] = useState<newUserProps>({
        email: "",
        name: "",
        password: "",
    });
    const [alertMsj, setAlertMsj] = useState({ message: "", type: "" });
    const [showAlert, setShowAlert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const closeAlert = () => setShowAlert(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(signUpData.email)) {
            setAlertMsj({
                message: "Invalid email format. Please enter a valid email.",
                type: "danger",
            });
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2500);
            return;
        }

        try {
            const response = await createUser(signUpData);
            if (response) {
                setAlertMsj({
                    message: "Account created successfully. Please log in.",
                    type: "success",
                });
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    navigate("/");
                }, 2000);
            } else {
                setAlertMsj({
                    message: "Sign up failed. Please try again.",
                    type: "danger",
                });
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 2500);
            }
        } catch (error) {
            console.log(error);
            setAlertMsj({
                message: "An error occurred. Please try again.",
                type: "danger",
            });
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2500);
        }
    };

    return (
        <section className="signup d-grid d-lg-flex" style={{ height: "100vh" }}>
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
                            <label form="exampleInputName1" className="form-label">
                                {t('name')}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputName1"
                                name="name"
                                onChange={(e) => handleChange(e)}
                            />
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
                            title={t("sing up")}
                            variant="btn-primary"
                            action={handleSubmit}
                        />
                        <Button
                            title={t("back to login")}
                            variant="btn-outline-primary ms-2 border-0"
                            action={() => navigate("/login")}
                        />
                    </form>
                </article>
            </div>
            <div
                className="d-none d-lg-block col-6"
                style={{ objectFit: "cover", height: "100vh" }}
            >
                <img src={bg} alt="img" className="w-100 h-100 object-cover" />
            </div>
            <Alert alertMsj={alertMsj} showAlert={showAlert} closeAlert={closeAlert} />
        </section>
    );
}

export default SignUp;
