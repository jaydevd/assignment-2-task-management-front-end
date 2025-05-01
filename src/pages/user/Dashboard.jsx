import { getToken } from "firebase/messaging";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { messaging } from './../../../public/firebase-config';

const Dashboard = ({ socket }) => {

    const navigate = useNavigate();

    const [comment, setComment] = useState({
        taskID: '',
        comment: ''
    });
    const [projects, setProjects] = useState([]);
    const [isComment, setIsComment] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [fcmToken, setFcmToken] = useState(null);

    const getFcmToken = async () => {
        const token = await getToken(messaging, {
            vapidKey: "BK10DcC3gnh2lzJMrWiZL8OcjVC9ph754GPRSakfGYanLp76pJHlW8Xq2Pb1rtlQU8NwV-XLmbsYx35vhNyIqA0",
        });
        setFcmToken(token);
    };
    getFcmToken();

    socket.on('update_task', ({ updateTask }) => {
        console.log(updateTask);
        if (tasks) {
            tasks.forEach((task) => {
                if (task.id == updateTask.id) {
                    task = updateTask;
                }
            })
        }
    });

    const onChange = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value });
    }

    return (
        <>
            <h1>Task Management</h1>
            <h2>
                Projects
            </h2>
            <div>
                {!projects &&
                    <div>No projects found</div>
                }
                {
                    projects &&
                    projects.map((project) => {
                        return <ul key={uuidv4()}>
                            <button className="px-3 py-1 bg-gray-800 text-white rounded-md m-3 cursor-pointer">{project.name}</button>
                        </ul>
                    })
                }
            </div >
        </>
    )
}

export default Dashboard;