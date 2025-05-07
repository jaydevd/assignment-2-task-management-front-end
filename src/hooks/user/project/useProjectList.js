import axios from "axios";
import { useEffect, useState } from "react";

const useProjectList = (page, name) => {
    const [projectList, setProjectList] = useState([]);
    const [totalProjects, setTotalProjects] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(token);

                const limit = 5;

                const response = await axios.get(`http://localhost:5000/user/project/list?name=${name}&page=${page}&limit=${limit}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                const projects = response.data.data.projects;
                const count = response.data.data.count;

                setProjectList(projects);
                setTotalProjects(count);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return { projectList, totalProjects };
}

export default useProjectList;