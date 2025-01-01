import axios from "axios";
import { userProps } from "../interfaces/indexInterface";
import { Api_Url } from "./config";

function usePutUser() {


    const putUser = (Endpoint: string, data: userProps) =>{
        axios.put(`${Api_Url}/${Endpoint}`, data)
        .then((response)=>{
            console.log(response.data)
        }).catch((e)=>{
            console.log(e)
        })
    }

    return {putUser};
}

export default usePutUser;