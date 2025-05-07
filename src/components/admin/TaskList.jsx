import axios from "axios";
import { useEffect, useState } from "react";
import { useAddComment, useAssignTask, useTaskList } from "../../hooks/admin";

const TaskList = ({ userId, projectId }) => {
    const { tasks, total } = useTaskList(userId, projectId);
    const [isAssignTask, setIsAssignTask] = useState(false);
    const [page, setPage] = useState(1);
    const [task, setTask] = useState({
        title: '',
        dueDate: '',
        status: '',
        projectId: projectId,
        userId: userId
    })

    const [showComments, setShowComments] = useState(false);
    const [totalComments, setTotalComments] = useState(0);
    const [isWriteComment, setIsWriteComment] = useState(false);
    const [comment, setComment] = useState({
        comment: '',
        taskId: '',
        userId: ''
    });

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const limit = 5;

                const response = await axios.get(`http://localhost:5000/admin/comment/list?page=${page}&limit=${limit}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                const comments = response.data.data.projects;
                const count = response.data.data.count;

                setComments(comments);
                setTotalComments(count);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [page]);

    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const onCommentChange = (e) => {
        setComment(e.target.value);
    }

    const onAssignTask = async (e) => {
        e.preventDefault();
        const response = await useAssignTask(task);
        setIsAssignTask(false);
    }

    const onWriteComment = (e) => {
        e.preventDefault();
        const response = useAddComment(comment);
    }

    return (
        <div>
            {
                isAssignTask &&
                <div className="absolute flex justify-center items-center h-[92vh] w-full bg-gray-400/30">
                    <div className="w-3/12 rounded-lg bg-white flex flex-col gap-6 p-10">
                        <h4 className="text-2xl">Add Member</h4>
                        <form onSubmit={(e) => onAssignTask(e)} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title">Task title</label>
                                <input type="text" name="title" onChange={onChange} className="bg-gray-200 rounded-md px-4 py-2 w-full" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="dueDate">Task due date</label>
                                <input type="date" name="dueDate" onChange={onChange} className="bg-gray-200 rounded-md px-4 py-2 w-full" />
                            </div>
                            <select name="status" onChange={onChange} className='bg-gray-200 rounded-md px-4 py-2 w-full'>
                                <option value="in-progress">In Progress</option>
                                <option value="pending">Pending</option>
                                <option value="done">Completed</option>
                                <option value="postponed">Postponed</option>
                            </select>
                            <button type="submit" className="px-4 py-2 rounded-md cursor-pointer mt-5 w-full bg-neutral-300">Assign Task</button>
                        </form>
                    </div>
                </div>
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
            <button onClick={() => setIsAssignTask(true)} className="bg-neutral-300 rounded-full px-3 py-1 text-sm">Assign task</button>
            {
                tasks && tasks.length > 0 ? (
                    tasks.map((task) => {
                        return (
                            <ul key={task.id} className="flex flex-col gap-2">
                                <li>{task.title}</li>
                                <li>{task.status}</li>
                                <li>{task.dueDate}</li>
                                <button className="w-fit px-3 py-1 rounded-sm bg-black text-white text-sm" onClick={() => showComments(true)}>read comments</button>
                                <button className="w-fit px-3 py-1 rounded-sm bg-black text-white text-sm" onClick={() => setIsWriteComment(true)}>write comment</button>
                            </ul>
                        )
                    })
                ) : (
                    <div>No tasks found</div>
                )
            }
            {
                showComments && comments && comments.length > 0 ? (
                    comments.map((comment) => {
                        return (
                            <div>
                                <p>{comment.comment}</p>
                                <p>{comment.name}</p>
                            </div>
                        )
                    })
                ) : (
                    <div>No comments</div>
                )
            }
        </div>
    )
}

export default TaskList;