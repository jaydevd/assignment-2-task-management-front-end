import axios from "axios";

const useAddComment = (comment) => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("body: ", body);
            const body = { comment };
            const response = await axios.post(`http://localhost:5000/admin/comment/add`, body, {
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

export default useAddComment;