const useResetPassword = async (password) => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            const body = { password };

            const response = await axios.post(`http://localhost:5000/admin/auth/reset-password`, body, {
                params: { token }
            });

            return response

        } catch (error) {
            console.log(error);
        }
    }
    return fetchData();
}

export default useResetPassword;