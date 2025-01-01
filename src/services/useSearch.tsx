import { useState } from "react";
import { formProps } from "../interfaces/indexInterface";
import axios from "axios";
import { Api_Url } from "./config";

function useSearch() {
    const [data, setData] = useState<formProps[]>([]);

    const getResults = (EndPoint: string) => {
        axios.get(`${Api_Url}/${EndPoint}`).then((res) => {
            setData(res.data);
        })
    };

    return { data, getResults };
}

export default useSearch;
