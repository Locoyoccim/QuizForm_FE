import { useEffect, useState } from "react";
import Button from "../templates/Button";
import TableForms from "../components/TableForms";
import CardForm from "../components/CardForm";
import useSearch from "../services/useSearch";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

function SearchResult() {
    const { t } = useTranslation();
    const [listMode, setListMode] = useState<boolean>(false);
    const { data, getResults } = useSearch();
    const { search } = useParams();

    const changeMode = () => {
        setListMode(!listMode);
    };

    useEffect(() => {
        if (search) {
            getResults(`search-forms/?query=${search}`);
        }
    }, [search]);

    return (
        <section className="p5 position-relative">
            <div className="p-4 d-flex container col-lg-12 col-md-9 col-12 justify-content-between align-items-center">
                <div className="d-flex gap-3 align-items-center">
                    <p className="fs-1 p-0 m-0">{t("search Results")}</p>
                </div>
                <div className="d-flex gap-2">
                    <Button
                        icon="bi-card-heading"
                        variant="btn-outline-primary"
                        title=""
                        action={changeMode}
                    />
                    <Button
                        icon="bi-list-ul"
                        variant="btn-outline-primary"
                        title=""
                        action={changeMode}
                    />
                </div>
            </div>
            <div className="d-flex gap-3 flex-wrap ">
                {listMode ? (
                    <div className="table-responsive container">
                        <table className="table container col-lg-8 col-md-10">
                            <tbody>
                                {data.map((item) => (
                                    <TableForms
                                        key={item.id}
                                        formProps={item}
                                        to="/dashboard/answer/"
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div
                        role="button"
                        className="flex-wrap d-flex gap-3 px-4 container col-lg-12 col-md-9 col-12"
                    >
                        {data.map((item, index) => (
                            <CardForm
                                key={index}
                                formProps={item}
                                to="/dashboard/answer/"
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default SearchResult;
