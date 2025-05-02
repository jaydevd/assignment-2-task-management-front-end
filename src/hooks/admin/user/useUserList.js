const useUserList = () => {
    const [userList, setUserList] = useState([]);
    const [totalTask, setTotalTask] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const page = 1;
                const limit = 10;

                const response = await axios.get(`http://localhost:5000/admin/manage-user/list?page=${page}&limit=${limit}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                const tasks = response.data.data.tasks;
                const count = response.data.data.count;

                setTaskList(tasks);
                setTotalTask(count);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return { taskList, totalTask };
}
export default useUserList;