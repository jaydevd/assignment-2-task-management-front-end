import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="px-20 py-5 mx-auto flex justify-between bg-gray-700">
            <ul>
                <li className="text-white text-xl">
                    Task Management
                </li>
            </ul>
            <ul>
                <li><button className="px-3 py-1 rounded-md border border-sky-400 text-sky-400 cursor-pointer" onClick={() => navigate('/user/signup')}>Sign up</button></li>
            </ul>
        </nav>
    )
}

export default Navbar;