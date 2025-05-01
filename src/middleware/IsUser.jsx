import { useNavigate } from "react-router-dom";

const isAdmin = async () => {
    try {
        const navigate = useNavigate();
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/user/dashboard');
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export default isAdmin;