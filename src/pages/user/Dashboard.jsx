import axios from 'axios';
import { getToken } from "firebase/messaging";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { messaging } from './../../../public/firebase-config';

const Dashboard = ({ socket }) => {

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
        // setTask(updateTask);
    });

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem("user");
                console.log(token);
                const result = await axios.get('http://localhost:5000/user/project/list', {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setProjects(result.data.data);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        getProjects();
    }, []);

    const getTasks = async (projectID) => {
        try {
            const token = localStorage.getItem("user");
            console.log(token);
            const result = await axios.get('http://localhost:5000/user/task/list', {
                query: {
                    id: projectID
                },
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            setTasks(result.data.data);
            console.log(result);
        } catch (error) {

        }
    }

    const Comment = async (e) => {
        e.preventDefault();
        try {
            if (comment !== '') {
                const fromUser = socket.id;
                const token = localStorage.getItem("user");
                console.log(token);
                const result = await axios.post('http://localhost:5000/user/task/comment', comment, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                console.log("result from dashboard comment: ", result);
                console.log("send comment: ", comment);
                const __createdtime__ = Date.now();
                // Send message to server.
                // socket.emit('comment', { to: toUser, comment: comment });
                setComment('');
                setIsComment(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                            <button onClick={() => getTasks(project.id)} className="px-3 py-1 bg-gray-800 text-white rounded-md m-3 cursor-pointer">{project.name}</button>
                        </ul>
                    })
                }
                {
                    tasks &&
                    tasks.map((task) => {
                        return <ul key={uuidv4()}>
                            <li>task: {task.description}</li>
                            <li>status: {task.status}</li>
                            <button onClick={() => { setComment({ ...comment, taskID: task.id }); setIsComment(true) }} className="px-3 py-1 bg-gray-800 text-white rounded-md m-3 cursor-pointer">Comment</button>
                        </ul>
                    })
                }
            </div >
            {isComment &&
                <div className='absolute flex justify-center items-center w-full h-screen'>
                    <form onSubmit={(e) => Comment(e)} className="flex flex-col gap-2">
                        <input type="text" name="comment" id="comment" value={comment.comment} onChange={onChange} placeholder="Add Comment" />
                        <button type="submit">Comment</button>
                    </form>
                </div>
            }
        </>
    )
}

export default Dashboard;