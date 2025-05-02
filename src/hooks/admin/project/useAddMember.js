import axios from "axios";

const useAddMember = (body) => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`http://localhost:5000/admin/project/add-member`, body, {
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
export default useAddMember;