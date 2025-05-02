import axios from "axios";
import { useEffect, useState } from "react";

const useTaskList = (userId, projectId) => {
    const [tasks, setTasks] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const page = 1;
                const limit = 10;

                const response = await axios.get(`http://localhost:5000/admin/task/list?userId=${userId}&projectId=${projectId}&page=${page}&limit=${limit}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                const tasks = response.data.data.tasks;
                const count = response.data.data.count;

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