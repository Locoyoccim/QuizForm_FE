import { FormEvent, useContext, useState } from "react";
import SideBar from "./SideBar";
import ToggleDarkMode from "../templates/darkMode/ToggleDarkMode";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../i18n";
import { UserProvider } from "../providers/userContext";

function NavBar() {
    const userContext = useContext(UserProvider)
    const { t, i18n } = useTranslation();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const HandleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/dashboard/search-forms/${searchValue}`);
        }
    };

    return (
        <>
            <SideBar isCollapsed={isCollapsed} handleCollapse={HandleCollapse} />
            <nav
                className="navbar bg-body-tertiary border-bottom"
                style={{
                    marginLeft: !isCollapsed ? 200 : 0,
                    transition: "all 0.3s ease",
                }}
            >
                <div className="container-fluid">
                    <a
                        className="navbar-brand"
                        style={{
                            marginLeft: !isCollapsed ? 0 : 50,
                            transition: "all 0.3s ease",
                        }}
                    >
                        {userContext?.user?.name}
                    </a>
                    <form className="d-flex" role="search" onSubmit={handleSubmit}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder={t('search')}
                            aria-label="Search"
                            name="search"
                            value={searchValue}
                            onChange={handleInputChange}
                        />
                        <button className="btn btn-outline-success" type="submit">
                            {t('search')}
                        </button>
                    </form>
                    <div className="d-flex gap-3 justify-content-center align-items-center">
                        <select
                            className="form-select w-50"
                            onChange={(e) => changeLanguage(e.target.value)}
                            defaultValue={i18n.language}
                        >
                            <option value="en">EN</option>
                            <option value="es">ES</option>
                            <option value="ru">RU</option>
                        </select>
                        <ToggleDarkMode />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
