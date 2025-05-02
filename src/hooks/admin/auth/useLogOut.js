const useLogOut = () => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`http://localhost:5000/admin/auth/logout`, {
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
export default useLogOut;