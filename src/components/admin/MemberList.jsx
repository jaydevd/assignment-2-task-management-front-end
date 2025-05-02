import { useState } from 'react';
import { useAddMember, useGetUsers, useMemberList } from '../../hooks/admin';
import DropDown from '../DropDown';
import TaskList from './TaskList';

const MemberList = ({ projectId }) => {

    const [isAddMember, setIsAddMember] = useState(false);
    const { members, total } = useMemberList(projectId);
    console.log(members);

    const [member, setMember] = useState({
        userId: '',
        projectId,
        role: 'developer'
    });

    const users = useGetUsers();

    const onAddMember = async (e) => {
        e.preventDefault();
        try {
            setMember({ ...member, projectId: projectId.id });
            const response = await useAddMember(member);
            console.log(response);
            setIsAddMember(false);

        } catch (error) {
            console.log(error);
        }
    }

    const onChange = (e) => {
        console.log(e.target.name, ": ", e.target.value);
        setMember({ ...member, [e.target.name]: e.target.value });
    }

    return (
        <>
            {
                isAddMember &&
                <div className="absolute flex justify-center items-center h-[92vh] w-full bg-gray-400/30">
                    <div className="w-3/12 rounded-lg bg-white flex flex-col gap-6 p-10">
                        <h4 className="text-2xl">Add Member</h4>
                        <form onSubmit={(e) => onAddMember(e)} className="flex flex-col gap-4">
                            <DropDown name={"userId"} onChange={onChange} options={users} classes="bg-gray-200 rounded-md px-4 py-2 w-full" />
                            <select name="role" onChange={onChange} className='bg-gray-200 rounded-md px-4 py-2 w-full'>
                                <option value="developer">Developer</option>
                                <option value="tester">Tester</option>
                                <option value="manager">Manager</option>
                                <option value="team-lead">Team lead</option>
                            </select>
                            <button type="submit" className="px-4 py-2 rounded-md cursor-pointer mt-5 w-full bg-sky-400 text-white">Add Member</button>
                        </form>
                    </div>
                </div>
            }
            <div>
                <p>
                    Total members: {total}
                </p>
                <button className="px-3 py-1 text-sm bg-neutral-300 rounded-full" onClick={() => (setIsAddMember(true))}>Add member</button>
            </div>

            {members && members.length > 0 ? (

                members.map((member) => {
                    return <div key={member.id} className="my-1 cursor-pointer w-full flex flex-col gap-3 text-start px-4 py-4 bg-neutral-100 rounded-md">
                        <h4>
                            {member.name}
                        </h4>
                        <TaskList userId={member.user_id} projectId={projectId} />
                    </div>
                })
            ) : (
                <div>Add members to the project</div>
            )
            }
        </>
    )
}

export default MemberList;