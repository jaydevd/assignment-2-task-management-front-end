import axios from "axios";

const useUpdateProfile = (body) => {
    console.log("body(useUpdateProfile) : ", body);
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const date = Math.floor(+Date.parse(body.joinedAt) / 1000);
            body['dueDate'] = date;

            const response = await axios.post(`http://localhost:5000/user/profile/update`, body, {
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
export default useUpdateProfile;