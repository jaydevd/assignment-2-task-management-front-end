import axios from "axios";
import { useEffect, useState } from "react";

const useMemberList = (id) => {

    const [members, setMembers] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const page = 1;
                const limit = 10;

                const response = await axios.get(`http://localhost:5000/admin/project/list-members?projectId=${id}&page=${page}&limit=${limit}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                const members = response.data.data.members;
                const count = response.data.data.count;
                console.log(members, count);

                setMembers(members);
                setTotal(count);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    return { members, total };
}
export default useMemberList;