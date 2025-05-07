import { useState } from "react";
import TaskList from "./TaskList";

const ProjectList = ({ socket, projects, total }) => {

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    const [name, setName] = useState(null);
    const [page, setPage] = useState();

    const pageCount = Math.ceil(total / 5);
    console.log(pageCount, total);

    let pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <>
            {
                projects.map(project => {
                    return (
                        <div key={project.id} className="my-1 cursor-pointer w-full text-start px-4 py-4 bg-neutral-100 rounded-md">
                            <h3 className="text-3xl font-bold my-3">{project.name}</h3>
                            <TaskList projectId={project.id} userId={userId} socket={socket} />
                        </div>
                    )
                }
                )
            }
            {pageCount >= 1 && (
                <div className="flex gap-1 mx-auto w-fit">
                    <div>
                        {
                            page > 1 &&
                            <button className="border px-4 py-2 rounded-sm cursor-pointer" onClick={() => setPage(page - 1)}>Previous</button>
                        }
                    </div>
                    <div>
                        {
                            pages &&
                            pages.map((count) => {
                                return (
                                    <button key={uuidv4()} className="border px-4 py-2 rounded-sm cursor-pointer" onClick={() => setPage(count)}>{count}</button>
                                )
                            })
                        }
                    </div>
                    <div>
                        {
                            page < pageCount &&
                            <button className='border px-4 py-2 rounded-sm cursor-pointer' onClick={() => setPage(page + 1)}>Next</button>
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default ProjectList;