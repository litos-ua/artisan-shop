import {getTokenFromLocalStorage} from "../utils";

export const configObj ={
    axiosUrl: "http://192.168.0.31/api/",
    adminUserId: 3,
    getToken: getTokenFromLocalStorage,
}