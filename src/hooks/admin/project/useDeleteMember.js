const useDeleteMember = (id) => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("project: ", project);
            const body = { id };
            const response = await axios.post(`http://localhost:5000/admin/project/delete-member`, body, {
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
export default useDeleteMember;