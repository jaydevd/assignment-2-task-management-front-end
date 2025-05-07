import { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Navbar from "../../components/user/Navbar";
import ProjectList from "../../components/user/ProjectList";

const Dashboard = ({ socket }) => {
    const [project, setProject] = useState(null);
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [projects, setProjects] = useState([]);
    const [total, setTotal] = useState(0);
    // const [fcmToken, setFcmToken] = useState(null);

    const pageCount = Math.ceil(total / 5);
    console.log(pageCount, total);

    let pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }
    console.log("pages: ", pages);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const limit = 5;

                const response = await axios.get(`http://localhost:5000/user/project/list?name=${name}&page=${page}&limit=${limit}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                const projects = response.data.data.projects;
                const count = response.data.data.count;
                console.log(projects, total);

                setProjects(projects);
                setTotal(count);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [page, name]);

    const onSubmit = (e) => {
        e.preventDefault();
    }

    // const navigate = useNavigate();

    // const getFcmToken = async () => {
    //     const token = await getToken(messaging, {
    //         vapidKey: "BK10DcC3gnh2lzJMrWiZL8OcjVC9ph754GPRSakfGYanLp76pJHlW8Xq2Pb1rtlQU8NwV-XLmbsYx35vhNyIqA0",
    //     });
    //     setFcmToken(token);
    // };
    // getFcmToken();

    return (
        <>
            <Navbar />
            <div className="w-10/12 flex flex-col gap-5 mx-auto my-10 rounded-xl p-5 min-h-[50vh] bg-gray-300">
                <div className="relative flex flex-col gap-2">
                    <h2 className="text-2xl">
                        Projects
                    </h2>
                    <form onSubmit={onSubmit}>
                        <input type="text" name="name" placeholder="search a project by it's name" onChange={(e) => setName(e.target.value)} className='w-96 bg-gray-100 px-4 py-2 rounded-sm' />
                        <button type="submit" className="hidden">Submit</button>
                    </form>
                </div>
                <div className="">
                    {
                        projects && projects.length > 0 ? (
                            <ProjectList projects={projects} socket={socket} />
                        ) : (
                            <div className="rounded-md py-42 bg-gray-100 flex justify-center items-center h-full">
                                <p className="text-5xl font-medium text-gray-300">
                                    No Projects Found
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
            {pageCount >= 1 && (
                <div className="flex gap-1 mx-auto w-fit">
                    <div>
                        {
                            page > 1 &&
                            <button className="border px-4 py-2 rounded-sm cursor-pointer" onClick={() => setPage(page - 1)}>Previous</button>
                        }
                    </div>
                    <div>
                        {
                            pages &&
                            pages.map((count) => {
                                return (
                                    <button key={uuidv4()} className="border px-4 py-2 rounded-sm cursor-pointer" onClick={() => setPage(count)}>{count}</button>
                                )
                            })
                        }
                    </div>
                    <div>
                        {
                            page < pageCount &&
                            <button className='border px-4 py-2 rounded-sm cursor-pointer' onClick={() => setPage(page + 1)}>Next</button>
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard;