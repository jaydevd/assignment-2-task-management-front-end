import { getToken } from "firebase/messaging";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/admin/Navbar";
import ProjectList from "../../components/admin/ProjectList";
import { useCreateProject, useProjectList } from "../../hooks/admin";
import { messaging } from './../../../public/firebase-config';

const createProject = (project) => {
    return useCreateProject(project);
}

const Dashboard = ({ socket }) => {
    const [project, setProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [total, setTotal] = useState(0);
    const { projectList, totalProjects } = useProjectList();
    const [newProject, setNewProject] = useState({
        name: ''
    })

    useEffect(() => {
        setProjects(projectList);
    }, [projectList]);

    useEffect(() => {
        setTotal(totalProjects);
    }, [totalProjects]);

    const navigate = useNavigate();

    const [fcmToken, setFcmToken] = useState(null);
    const [isCreateProject, setIsCreateProject] = useState(false);

    const getFcmToken = async () => {
        const token = await getToken(messaging, {
            vapidKey: "BK10DcC3gnh2lzJMrWiZL8OcjVC9ph754GPRSakfGYanLp76pJHlW8Xq2Pb1rtlQU8NwV-XLmbsYx35vhNyIqA0",
        });
        setFcmToken(token);
    };
    getFcmToken();

    const onCreateProject = (e) => {
        e.preventDefault();
        console.log(newProject);
        const response = useCreateProject(newProject).then(() => {
            console.log(response);
            setIsCreateProject(false);
        });
    }

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
                    <button className="absolute bottom-0 right-0 m-6 px-4 py-2 rounded-full bg-sky-400 text-white cursor-pointer" onClick={() => setIsCreateProject(true)}>Create New</button>
                    <h2 className="text-2xl">
                        Projects
                    </h2>
                    <p>Total projects: {total}</p>
                </div>
                <div className="">
                    {
                        projects && projects.length > 0 ? (
                            <ProjectList projects={projects} total={total} setProject={setProject} />
                        ) : (
                            <div className="rounded-md py-42 bg-gray-100 flex justify-center items-center h-full">
                                <p className="text-5xl font-medium text-gray-300">
                                    No Projects Found
                                </p>
                            </div>
                        )
                    }
                </div>
            </div >
        </>
    )
}

export default Dashboard;