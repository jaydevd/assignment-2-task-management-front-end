import axios from "axios";
import { useEffect, useState } from "react";

const useGetUsers = () => {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const page = 1;
                const limit = 10;

                const response = await axios.get(`http://localhost:5000/admin/drop-down/users`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });

                const users = response.data.data;
                setUserList(users);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return userList;
}
export default useGetUsers;