import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignUp from "../../hooks/user/auth/useSignUp";

const SignUp = ({ socket, username, setUsername }) => {
    const [formData, setFormData] = useState({
        name: '',
        position: 'intern',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        gender: '',
        joinedAt: '',
    })

    const navigate = useNavigate();

    const onChange = (e) => {
        console.log(e.target.name, ": ", e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        try {
            e.preventDefault();

            console.log(formData);
            const response = await useSignUp(formData);
            console.log(response);

            setUsername(formData.name);
            socket.emit('register', formData.name);

            navigate('/user/dashboard');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-neutral-300">
            <form onSubmit={onSubmit} className="w-4/12 flex flex-col gap-5 p-5 bg-neutral-200 rounded-lg">
                <h1 className="text-3xl font-medium border-b pb-3 mb-4">User Sign up</h1>

                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm">Full name</label>
                    <input type="text" name="name" onChange={onChange} className="bg-white mt-1 rounded-md px-4 py-2 border-0" />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm">Email address</label>
                    <input type="email" name="email" onChange={onChange} className="bg-white mt-1 rounded-md px-4 py-2 border-0" />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="phoneNumber" className="text-sm">Phone number</label>
                    <input type="number" name="phoneNumber" onChange={onChange} className="bg-white mt-1 rounded-md px-4 py-2 border-0" />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="joinedAt" className="text-sm">Joining date</label>
                    <input type="date" name="joinedAt" onChange={onChange} className="bg-white mt-1 rounded-md px-4 py-2 border-0" />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="position" className="text-sm">Choose your position</label>
                    <select name="position" onChange={onChange} className="bg-neutral-100 mt-1 rounded-md px-4 py-2 border-0 cursor-pointer">
                        <option value="intern">Intern</option>
                        <option value="jr-sde">Jr. SDE</option>
                        <option value="sr-sde">Sr. SDE</option>
                        <option value="tech-lead">Tech lead</option>
                        <option value="manager">Manager</option>
                        <option value="tester">Tester</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="gender" className="text-sm">Gender</label>
                    <div className="flex flex-col gap-3 bg-neutral-100 mt-1 rounded-md px-4 py-4">
                        <div>
                            <input type="radio" name="gender" onChange={onChange} value="male" className="text-sm cursor-pointer" /> Male
                        </div>
                        <div>
                            <input type="radio" name="gender" onChange={onChange} value="female" className="text-sm cursor-pointer" /> Female
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="text-sm">Address</label>
                    <textarea name="address" onChange={onChange} className="bg-white mt-1 rounded-md px-4 py-2 border-0 resize-none" />
                </div>

                <div className="flex flex-col gap-1 ">
                    <label htmlFor="password" className="text-sm">Password</label>
                    <input type="password" name="password" onChange={onChange} className="bg-white mt-1 rounded-md px-4 py-2 border-0" />
                </div>

                <div className="w-full flex flex-col gap-1 mt-3">
                    <button type="submit" className="w-full bg-sky-400 text-white rounded-md py-2 cursor-pointer">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;