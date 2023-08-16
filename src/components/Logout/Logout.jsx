import { axios } from "../../api/axios"


const Logout=()=>{


axios.post("/logout").then(setUser(null));



}















