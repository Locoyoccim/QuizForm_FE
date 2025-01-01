import ButtonSideBar from "../templates/ButtonSideBar";
import { navBarProps } from "../interfaces/indexInterface";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useTranslation } from "react-i18next";

function SideBar({ isCollapsed, handleCollapse }: navBarProps) {
    const { t } = useTranslation();
    const context = useContext(AuthContext);
    const location = useLocation();

    const isActive = (pathname: string) => {
        return location.pathname === pathname ? "bg-secondary rounded-2" : "";
    };

    return (
        <>
            <button
                className="btn btn-outline-danger position-fixed border-0 p-0 top-0 ms-3 start-0 z-3"
                onClick={handleCollapse}
                style={{
                    width: 35,
                    height: 35,
                    marginTop: 10,
                }}
            >
                <i
                    className={`bi ${isCollapsed ? "bi-layout-sidebar-inset" : "bi-x"}`}
                    style={{ fontSize: "24px" }}
                ></i>
            </button>
            <nav
                className={`z-1 bg-body-tertiary border-end position-relative overflow-hidden d-flex flex-column gap-2 vh-100 position-fixed px-3 pt-4 ${
                    isCollapsed ? "w-0 opacity-0 " : "sidebar-width"
                }`}
                style={{
                    width: isCollapsed ? "0" : "255px",
                    transition: "all 0.3s ease",
                }}
            >
                <div className="d-flex gap-3 align-items-center mt-4">
                    <i className="bi bi-window-fullscreen"></i>
                    <h4 className="m-0">FormsApp</h4>
                </div>
                <span className="fw-light">{t('Forms Management')}</span>
                <hr className="mb-4" />
                <Link
                    to={"/dashboard/"}
                    className={`text-decoration-none ${isActive("/dashboard/")}`}
                >
                    <ButtonSideBar icon="bi bi-easel" tittle={t('dashboard')} />
                </Link>
                <Link
                    className={`text-decoration-none ${isActive("/dashboard/my_forms/")}`}
                    to={"my_forms/"}
                >
                    <ButtonSideBar icon="bi bi-archive" tittle={t('My Forms')} />
                </Link>
                <Link
                    className={`text-decoration-none ${isActive("/dashboard/answered/")}`}
                    to={"/dashboard/answered/"}
                >
                    <ButtonSideBar icon="bi bi-people" tittle={t("Answered")} />
                </Link>
                <Link
                    className={`text-decoration-none ${isActive(
                        "/dashboard/answer-quiz/"
                    )}`}
                    to={"/dashboard/answer-quiz/"}
                >
                    <ButtonSideBar icon="bi bi-ui-checks" tittle={t("Answer Quiz")} />
                </Link>
                <Link
                    className={`text-decoration-none ${isActive(
                        "/dashboard/search-forms/"
                    )}`}
                    to={"/dashboard/search-forms/"}
                >
                    <ButtonSideBar icon="bi bi-search" tittle={t("search")} />
                </Link>

                <Link className="text-decoration-none" to={"/login/"}>
                    <button
                        type="button"
                        className="btn position-absolute bottom-0 start-50 translate-middle-x mb-4"
                        style={{ width: 200 }}
                        onClick={() => context.Logout()}
                    >
                        <i className="bi bi-door-open"></i> {t('logout')}
                    </button>
                </Link>
            </nav>
        </>
    );
}

export default SideBar;
