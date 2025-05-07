import axios from "axios";

const useUpdateTask = (body) => {
    console.log("body(useAssignTask) : ", body);
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(`http://localhost:5000/user/task/update`, body, {
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

export default useUpdateTask;