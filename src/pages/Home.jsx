import { useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar";

const Home = () => {

    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="flex w-10/12 mx-auto flex-col justify-center my-10 min-h-96 gap-5">
                <h2 className="text-3xl font-bold">Title</h2>
                <p className="w-4/12">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Maiores illum assumenda dicta ad necessitatibus expedita
                    itaque quod sequi quae quidem exercitationem,
                    totam doloremque accusamus eius, quaerat odit facere
                    sapiente officia.
                </p>
                <button className="bg-sky-500 rounded-md text-white px-4 py-2 w-fit cursor-pointer" onClick={() => navigate('/user/login')}>Log in</button>
            </div>
        </>
    )
}

export default Home;