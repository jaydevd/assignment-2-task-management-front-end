import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Navbar from "../../components/admin/Navbar";
import ProjectList from "../../components/admin/ProjectList";
import { useCreateProject } from "../../hooks/admin";

const Dashboard = ({ socket }) => {
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [projects, setProjects] = useState(null);
    const [total, setTotal] = useState(0);
    // const { projectList: projects, totalProjects: total } = useProjectList(page);

    const [newProject, setNewProject] = useState({
        name: ''
    })

    const pageCount = Math.ceil(total / 5);
    console.log(pageCount, total);

    let pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }
    console.log("pages: ", pages);

    const navigate = useNavigate();

    // const [fcmToken, setFcmToken] = useState(null);
    const [isCreateProject, setIsCreateProject] = useState(false);

    // const getFcmToken = async () => {
    //     const token = await getToken(messaging, {
    //         vapidKey: "BK10DcC3gnh2lzJMrWiZL8OcjVC9ph754GPRSakfGYanLp76pJHlW8Xq2Pb1rtlQU8NwV-XLmbsYx35vhNyIqA0",
    //     });
    //     setFcmToken(token);
    // };
    // getFcmToken();

    const onCreateProject = (e) => {
        e.preventDefault();
        console.log(newProject);
        const response = useCreateProject(newProject).then(() => {
            console.log(response);
            setIsCreateProject(false);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const limit = 5;

                const response = await axios.get(`http://localhost:5000/admin/project/list?name=${name}&page=${page}&limit=${limit}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                const projects = response.data.data.projects;
                const count = response.data.data.count;

                setProjects(projects);
                setTotal(count);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [page, name]);

    const handleProjectInputChange = (e) => {
        console.log(e.target.value);
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Navbar />
            {
                isCreateProject &&
                <div className="absolute flex justify-center items-center h-[92vh] w-full bg-gray-400/30">
                    <div className="w-3/12 rounded-lg bg-white flex flex-col gap-6 p-10">
                        <h4 className="text-2xl">Create New Project</h4>
                        <form onSubmit={(e) => onCreateProject(e)} className="">
                            <input type="text" name="name" className="bg-gray-200 rounded-md px-4 py-2 w-full" placeholder="project name" value={newProject.name} onChange={handleProjectInputChange} />
                            <button type="submit" className="px-4 py-2 rounded-md cursor-pointer mt-5 w-full bg-sky-400 text-white">Add Project</button>
                        </form>
                    </div>
                </div>
            }
            <div className="w-10/12 flex flex-col gap-5 mx-auto my-10 rounded-xl p-5 min-h-[50vh] bg-gray-300">
                <div className="relative flex flex-col gap-2">
                    <button className="absolute -top-7 right-0 m-6 px-4 py-2 rounded-full bg-sky-400 text-white cursor-pointer" onClick={() => setIsCreateProject(true)}>Create New</button>
                    <h2 className="text-2xl">
                        Projects
                    </h2>
                </div>
                <div className="">
                    <form>
                        <input type="text" name="name" placeholder="search a project by it's name" onChange={(e) => setName(e.target.value)} className='w-96 bg-gray-100 px-4 py-2 rounded-sm' />
                    </form>
                </div>
                <div className="">
                    {
                        projects && projects.length > 0 ? (
                            <ProjectList projects={projects} total={total} />
                        ) : (
                            <div className="rounded-md py-42 bg-gray-100 flex justify-center items-center h-full">
                                <p className="text-5xl font-medium text-gray-300">
                                    No Projects Found
                                </p>
                            </div>
                        )
                    }
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
            </div>
        </>
    )
}

export default Dashboard;