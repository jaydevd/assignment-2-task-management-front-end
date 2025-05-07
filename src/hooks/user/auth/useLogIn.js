import axios from "axios";

const useLogIn = (body) => {
    const fetchData = async () => {
        try {
            console.log("body: ", body);
            const response = await axios.post(`http://localhost:5000/user/auth/login`, body);

            const token = response.data.data.token;
            const user = response.data.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            return response

        } catch (error) {
            console.log(error);
        }
    }
    return fetchData();
}

export default useLogIn;