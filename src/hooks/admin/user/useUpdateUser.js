import axios from "axios";

const useUpdateUser = (body) => {
    console.log("body(useAssignTask) : ", body);
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const date = Math.floor(+Date.parse(body.dueDate) / 1000);
            body['dueDate'] = date;

            const response = await axios.post(`http://localhost:5000/admin/task/assign`, body, {
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
export default useUpdateUser;