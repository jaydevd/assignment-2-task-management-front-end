import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="px-20 py-5 mx-auto flex justify-between bg-gray-700">
            <ul className="flex gap-4 items-center">
                <li className="text-white text-xl">
                    Task Management
                </li>

            </ul>
            <ul>
                <li className="text-gray-300 font-bold hover:text-white text cursor-pointer duration-200">
                    <button onClick={() => navigate('/user/profile')}>
                        Profile
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;