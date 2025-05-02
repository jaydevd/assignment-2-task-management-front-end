const useCommentList = () => {
    const [commentList, setCommentList] = useState([]);
    const [totalComments, setTotalComments] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const page = 1;
                const limit = 10;

                const response = await axios.get(`http://localhost:5000/admin/comment/list?page=${page}&limit=${limit}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                const comments = response.data.data.projects;
                const count = response.data.data.count;

                setCommentList(comments);
                setTotalComments(count);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return { commentList, totalComments };
}
export default useCommentList;