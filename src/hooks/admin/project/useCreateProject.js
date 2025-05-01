import axios from "axios";

const useCreateProject = (project) => {
    
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("project: ", project);
            const response = await axios.post(`http://localhost:5000/admin/project/create`, project, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            // console.log("response: ", response);
            return response

        } catch (error) {
            console.log(error);
        }
    }
    return fetchData();
}

export default useCreateProject;