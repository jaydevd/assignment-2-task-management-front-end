import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../../hooks/user";

const ForgotPassword = ({ socket, username, setUsername }) => {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const onChange = (e) => {
        setEmail(e.target.value);
    };
    const [emailSent, setEmailSent] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await useForgotPassword(email);
            console.log(response);
            if (response.status == 200) setEmailSent(true);
            navigate("/user/login");

        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold py-4 text-center">Reset Password</h1>
            <div className="w-3/12 h-fit bg-neutral-200 rounded-xl">
                <form className="w-full p-8 flex flex-col gap-6" onSubmit={onSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sky-600/70 ps-1">Email address</label>
                        <input type="email" name="email" id="email" onChange={onChange} className="px-4 py-2 text-md bg-neutral-100 rounded-md" placeholder="email@domain.com" required />
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-400 text-white rounded-md py-2 w-full cursor-pointer">Submit</button>
                    </div>
                </form>
            </div>
            {
                emailSent &&
                <p>
                    Email sent, please visit the link given in the mail to reset your password.
                </p>
            }
        </div>
    )
}

export default ForgotPassword;