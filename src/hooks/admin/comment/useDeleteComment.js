const useDeleteComment = (id) => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const body = { id };
            console.log("body: ", body);
            const response = await axios.post(`http://localhost:5000/admin/comment/delete`, body, {
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
export default useDeleteComment;