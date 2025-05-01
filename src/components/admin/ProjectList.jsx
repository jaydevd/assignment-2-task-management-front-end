import { v4 as uuidv4 } from 'uuid';
import Project from './Project';

const ProjectList = ({ projects, total }) => {
    const [project, setProject] = useState({});
    const [showProject, setShowProject] = useState(false);

    return (
        <>
            {
                projects.map(project => {
                    return <ul key={uuidv4()} className="my-1">
                        <button className="cursor-pointer w-full text-start px-4 py-4 bg-neutral-100 rounded-md" onClick={() => { setShowProject(true); setProject(project) }}>
                            {project.name}
                        </button>
                    </ul>
                }
                )
            }
            {
                showProject &&
                <Project project={project} />
            }
        </>
    )
}

export default ProjectList;