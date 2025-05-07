import axios from "axios";
import { useState } from "react";
import { onMessageListener, requestFirebaseNotificationPermission } from "../../../public/firebase-config";
import { useAddComment, useTaskList, useUpdateTask } from "../../hooks/user";

const TaskList = ({ socket, userId, projectId }) => {

    const { tasks, total } = useTaskList(projectId);
    const [isUpdateTask, setIsUpdateTask] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [isWriteComment, setIsWriteComment] = useState(false);
    const [comments, setComments] = useState([]);
    const [totalComments, setTotalComments] = useState(0);
    const [fcmToken, setFcmToken] = useState(null);

    const [task, setTask] = useState({
        status: 'in-progress',
        taskId: ''
    });

    socket.on('comment', (comment) => {
        if (userRole == 'manager') {
            setComments([...comments, comment]);
        }
    });

    // socket.on('task-update', (from, updateTask) => {
    //     console.log(tasks);
    //     console.log(updateTask);
    //     tasks.forEach(task => {
    //         if (task.id == updateTask.id) {
    //             tasks.pop(task);
    //             tasks.push(updateTask);
    //             return;
    //         }
    //     });

    // })

    const [comment, setComment] = useState({
        comment: '',
        taskId: ''
    });

    const fetchComments = async (taskId) => {
        try {
            const token = localStorage.getItem("token");

            const page = 1;
            const limit = 10;

            const response = await axios.get(`http://localhost:5000/user/comment/list?taskId=${taskId}&page=${page}&limit=${limit}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            const comments = response.data.data.comments;
            const count = response.data.data.count;

            setComments(comments);
            setTotalComments(count);

        } catch (error) {
            console.log(error);
        }
    }

    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const onTaskUpdate = async (e) => {
        e.preventDefault();
        const response = await useUpdateTask(task);
        console.log(response);

        requestFirebaseNotificationPermission().then(token => {
            if (token) {
                console.log("new fcm token: ", token);
                socket.emit('task-update', { ...task, to: userId, fcmToken: token });

                onMessageListener().then(payload => {
                    console.log("Received in foreground:", payload);

                    // Optional: Show custom notification or toast
                    new Notification(payload.notification.title, {
                        body: payload.notification.body,
                    });
                });
            }
        });

        console.log("notification sent");

        setIsUpdateTask(false);
    }

    const onCommentChange = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value });
    }

    const onWriteComment = async (e) => {
        e.preventDefault();
        const response = await useAddComment(comment);
        setIsWriteComment(false);
        socket.emit('comment', { ...comment, fcmToken });
    }

    return (
        <div>
            {
                isUpdateTask &&
                <div className="absolute flex justify-center items-center h-[92vh] w-full bg-gray-400/30">
                    <div className="w-3/12 rounded-lg bg-white flex flex-col gap-6 p-10">
                        <h4 className="text-2xl">Change Task Status</h4>
                        <form onSubmit={(e) => onTaskUpdate(e)} className="flex flex-col gap-4">
                            <select name="status" onChange={onChange} className='bg-gray-200 rounded-md px-4 py-2 w-full'>
                                <option value="in-progress">In Progress</option>
                                <option value="pending">Pending</option>
                                <option value="done">Completed</option>
                                <option value="postponed">Postponed</option>
                            </select>
                            <button type="submit" className="px-4 py-2 rounded-md cursor-pointer mt-5 w-full bg-neutral-300">Update Status</button>
                        </form>
                    </div>
                </div>
            }
            {
                tasks && tasks.length > 0 ? (
                    tasks.map((task) => {
                        return (
                            <ul key={task.id}>
                                <li>{task.title}</li>
                                <li>{task.status}</li>
                                <li>{task.dueDate}</li>
                                <button onClick={() => { setIsUpdateTask(true); setTask({ ...task, taskId: task.id }) }} className="bg-neutral-300 rounded-full px-3 py-1 text-sm">Update task</button>
                                <button className="w-fit px-3 py-1 rounded-sm bg-black text-white text-sm" onClick={() => { fetchComments(task.id); setShowComments(true) }}>read comments</button>
                                <button className="w-fit px-3 py-1 rounded-sm bg-black text-white text-sm" onClick={() => { setIsWriteComment(true); setComment({ ...comment, taskId: task.id }) }}>write comment</button>
                                {
                                    showComments && comments && comments.length > 0 ? (
                                        comments.map(comment => {
                                            return (
                                                <ul key={comment.id}>
                                                    <li>{comment.user}: {comment.comment}</li>
                                                </ul>
                                            )
                                        })
                                    ) : (
                                        <p></p>
                                    )
                                }
                                {
                                    showComments && comments.length == 0 && <p>No comments found</p>
                                }
                            </ul>
                        )
                    })
                ) : (
                    <div>No tasks found</div>
                )
            }
            {
                isWriteComment &&
                <div className="absolute flex justify-center items-center h-[92vh] w-full bg-gray-400/30">
                    <div className="w-3/12 rounded-lg bg-white flex flex-col gap-6 p-10">
                        <form onSubmit={(e) => onWriteComment(e)} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title">Comment</label>
                                <input type="text" name="comment" onChange={onCommentChange} className="bg-gray-200 rounded-md px-4 py-2 w-full" />
                            </div>
                            <button type="submit" className="px-4 py-2 rounded-md cursor-pointer mt-5 w-full bg-neutral-300">send</button>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default TaskList;