import axios from "axios";

const useSignUp = (body) => {
    const fetchData = async () => {
        try {
            const date = Math.floor(+Date.parse(body.joinedAt) / 1000);

            body['joinedAt'] = date;
            console.log("body: ", body);

            const response = await axios.post(`http://localhost:5000/user/auth/signup`, body);

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

export default useSignUp;