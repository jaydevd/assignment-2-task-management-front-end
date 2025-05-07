import axios from "axios";
import { useEffect, useState } from "react";

const useTaskList = (projectId) => {
    const [tasks, setTasks] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const page = 1;
                const limit = 10;

                const dueDate = Math.floor(Date.now() / 1000);
                console.log(projectId);

                const response = await axios.get(`http://localhost:5000/user/task/list?dueDate=${dueDate}&projectId=${projectId}&page=${page}&limit=${limit}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                console.log(response);

                const tasks = response.data.data.tasks;
                const count = response.data.data.count;
                console.log(count);

                setTasks(tasks);
                setTotal(count);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return { tasks, total };
}

export default useTaskList;