import axios from "axios";

const useAddComment = (comment) => {
    const fetchData = async () => {
        try {
            console.log(comment);
            const token = localStorage.getItem("token");
            const response = await axios.post(`http://localhost:5000/user/comment/add`, comment, {
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