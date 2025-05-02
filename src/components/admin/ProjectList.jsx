import { useState } from 'react';
import useGetUsers from '../../hooks/admin/dropDown/useGetUsers';
import MemberList from './MemberList';

const ProjectList = ({ projects, total }) => {

    const [member, setMember] = useState('');
    const [isAddMember, setIsAddMember] = useState(false);
    const users = useGetUsers();

    return (
        <>
            {
                projects.map(project => {
                    return (
                        <div key={project.id} className="my-1 cursor-pointer w-full text-start px-4 py-4 bg-neutral-100 rounded-md">
                            <h3>{project.name}</h3>
                            <MemberList projectId={project.id} />
                        </div>
                    )
                }
                )
            }

        </>
    )
}

export default ProjectList;