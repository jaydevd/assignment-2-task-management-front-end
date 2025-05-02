import axios from "axios";

const useForgotPassword = (email) => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const body = { email };
            console.log("body: ", body);
            const response = await axios.post(`http://localhost:5000/user/auth/forgot-password`, body, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            return response

        } catch (error) {
            console.log(error);
        }
    }
    return fetchData();
}
export default useForgotPassword;