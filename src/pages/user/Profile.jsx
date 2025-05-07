import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import { useUpdateProfile } from "../../hooks/user";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const joinedAt = new Date(user.joinedAt * 1000);
    console.log(joinedAt);
    const navigate = useNavigate();

    const [isEditProfile, setIsEditProfile] = useState(false);
    const [profile, setProfile] = useState({
        name: user.name,
        address: user.address,
        phoneNumber: user.phoneNumber,
        gender: user.gander,
        position: user.position,
        email: user.email,
        joinedAt: user.joinedAt
    });

    const onProfileSubmit = (e) => {
        e.preventDefault();
        const response = useUpdateProfile(profile);
        console.log(response);
        setIsEditProfile(false);
    }

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }

    return (
        <>
            {
                isEditProfile &&
                <div className="absolute flex justify-center items-center h-[92vh] w-full bg-gray-400/30 z-50">
                    <div className="w-3/12 rounded-lg bg-white flex flex-col gap-6 p-10">
                        <h4 className="text-2xl">Edit Profile</h4>
                        <form onSubmit={(e) => onProfileSubmit(e)}>
                            <div className="flex flex-col gap-4" >
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm px-1 font-medium text-gray-400">Full name</span>
                                    <input type="text" name="name" className="bg-gray-100 mt-1 rounded-md px-4 py-2 border-0" value={profile.name} onChange={handleInputChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm px-1 font-medium text-gray-400">Email address</span>
                                    <input type="text" name="email" className="bg-gray-100 mt-1 rounded-md px-4 py-2 border-0" value={profile.email} onChange={handleInputChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm px-1 font-medium text-gray-400">Phone number</span>
                                    <input type="text" name="phoneNumber" className="bg-gray-100 mt-1 rounded-md px-4 py-2 border-0" value={profile.phoneNumber} onChange={handleInputChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm px-1 font-medium text-gray-400">Address</span>
                                    <textarea name="address" className="bg-gray-100 mt-1 rounded-md px-4 py-2 border-0 resize-none h-24" value={profile.address} onChange={handleInputChange} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm px-1 font-medium text-gray-400">Position</span>
                                    <select name="position" onChange={handleInputChange} className="bg-neutral-100 mt-1 rounded-md px-4 py-2 border-0 cursor-pointer">
                                        <option value="intern">Intern</option>
                                        <option value="jr-sde">Jr. SDE</option>
                                        <option value="sr-sde">Sr. SDE</option>
                                        <option value="tech-lead">Tech lead</option>
                                        <option value="manager">Manager</option>
                                        <option value="tester">Tester</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="gender" className="text-sm px-1 font-medium text-gray-400">Gender</label>
                                    <div className="flex flex-col gap-3 bg-neutral-100 mt-1 rounded-md px-4 py-4" defaultValue={profile.gender}>
                                        <div>
                                            <input type="radio" name="gender" onChange={handleInputChange} value="male" className="text-sm cursor-pointer" /> Male
                                        </div>
                                        <div>
                                            <input type="radio" name="gender" onChange={handleInputChange} value="female" className="text-sm cursor-pointer" /> Female
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm px-1 font-medium text-gray-400">Joining date</span>
                                    <input type="date" name="joinedAt" className="bg-gray-100 mt-1 rounded-md px-4 py-2 border-0" value={profile.joinedAt} onChange={handleInputChange} />
                                </div>
                            </div>
                            <button type="submit" className="px-4 py-2 rounded-md cursor-pointer mt-5 w-full bg-sky-400 text-white">Save Changes</button>
                        </form>
                    </div>
                </div>
            }
            <Navbar />
            <div className="w-10/12 mx-auto my-3">
                <button onClick={() => navigate('/user/dashboard')} className=" rounded-full bg-gray-800 text-gray-100 px-5 py-3 cursor-pointer">Back</button>
            </div>
            <div className="w-10/12 relative flex flex-col gap-5 mx-auto my-3 rounded-xl p-5 min-h-[50vh] bg-gray-300">
                <button onClick={() => setIsEditProfile(true)} className="z-50 absolute top-5 right-5 px-3 py-1 rounded-md bg-sky-400 text-white text-sm cursor-pointer">edit profile</button>
                <div className="relative flex flex-col gap-2">
                    <h2 className="text-2xl">
                        {user.name}
                    </h2>
                </div>
                <div className="flex flex-col gap-4" >
                    <div className="flex flex-col gap-1">
                        <span>Email address</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span>Phone number</span>
                        <span>{user.phoneNumber}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span>Address</span>
                        <span>{user.address}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span>Joining date</span>
                        <span>{joinedAt.toISOString().slice(0, 10)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span>Gender</span>
                        <span>{user.gender}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span>Position</span>
                        <span>{user.position}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;