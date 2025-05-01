import { useNavigate } from "react-router-dom";

const isAdmin = () => {
    const navigate = useNavigate();
    try {
        const token = localStorage.getItem("token");
        console.log("isAdmin");

        if (token) {
            navigate('/admin/dashboard');
        }
        else {
            console.log("token not found");
            navigate('/admin/login');
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export default isAdmin;