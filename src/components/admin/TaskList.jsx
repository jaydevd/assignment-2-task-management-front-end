import { useState } from "react";
import { useAssignTask, useTaskList } from "../../hooks/admin";

const TaskList = ({ userId, projectId }) => {
    const { tasks, total } = useTaskList(userId, projectId);
    const [isAssignTask, setIsAssignTask] = useState(false);
    const [task, setTask] = useState({
        title: '',
        dueDate: '',
        status: '',
        projectId: projectId,
        userId: userId
    })

    // const { userId, title, dueDate, status, projectId } = req.body;
    const onChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const onAssignTask = async (e) => {
        e.preventDefault();
        const response = await useAssignTask(task);
        setIsAssignTask(false);
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
            <p>Total tasks: {total}</p>
            <button onClick={() => setIsAssignTask(true)} className="bg-neutral-300 rounded-full px-3 py-1 text-sm">Assign task</button>
            {
                tasks && tasks.length > 0 ? (
                    tasks.map((task) => {
                        return (
                            <ul key={task.id}>
                                <li>{task.title}</li>
                                <li>{task.status}</li>
                                <li>{task.dueDate}</li>
                            </ul>
                        )
                    })
                ) : (
                    <div>No tasks found</div>
                )
            }
        </div>
    )
}

export default TaskList;