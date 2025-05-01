const Navbar = () => {
    return (
        <nav className="px-20 py-5 mx-auto flex bg-gray-700">
            <ul className="flex gap-4 items-center">
                <li className="text-white text-xl">
                    Task Management
                </li>
                <li className="text-gray-300 text-sm">
                    Admin Panel
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;