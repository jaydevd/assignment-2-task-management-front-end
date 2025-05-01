import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ socket, username, setUsername }) => {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        gender: '',
        joinedAt: ''
    })

    const navigate = useNavigate();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(formData);
            const result = await axios.post('http://localhost:5000/user/auth/signup', formData);
            const token = result.data.data.token;
            console.log(result);
            console.log(token);
            localStorage.setItem("token", token);
            setUsername(formData.name);
            socket.emit('register', formData.name);
            navigate('/user/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form onSubmit={onSubmit} className="w-3/12 flex flex-col gap-5 p-5 bg-neutral-300">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm">Full name</label>
                    <input type="text" name="name" onChange={onChange} className="bg-neutral-100 mt-1 rounded-md px-4 py-2 border-0" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm">Email address</label>
                    <input type="email" name="email" onChange={onChange} className="bg-neutral-100 mt-1 rounded-md px-4 py-2 border-0" />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm">Choose your Role</label>
                    <div className="flex gap-4">
                        <input type="radio" name="role" onChange={onChange} value="employee" className="bg-neutral-100 mt-1 text-sm rounded-md px-4 py-2 border-0" /> Employee
                        <input type="radio" name="role" onChange={onChange} value="admin" className="bg-neutral-100 mt-1 text-sm rounded-md px-4 py-2 border-0" /> Admin
                    </div>
                </div>
                <div className="flex flex-col gap-1 ">
                    <label htmlFor="password" className="text-sm">Password</label>
                    <input type="password" name="password" onChange={onChange} className="bg-neutral-100 mt-1 rounded-md px-4 py-2 border-0" />
                </div>

                <div className="w-full flex flex-col gap-1 mt-3">
                    <button type="submit" className="w-full bg-sky-400 text-white rounded-md py-2 cursor-pointer">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;