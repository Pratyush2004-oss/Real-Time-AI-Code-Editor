import { useEffect } from "react";
import { useProjectDispatch, useProjectSelector } from "../../features/projects/store/hooks";
import { useGetProjectListQuery } from "../../features/projects/tanstack-query";
import { setProjectList } from "../../features/projects/store/project.slice";
import { FiFolder } from "react-icons/fi";

interface RecentProjectListProps {


}
const RecentProjectList = ({ }: RecentProjectListProps) => {
    const dispatch = useProjectDispatch();
    const { data: projectData, isLoading, isError, error } = useGetProjectListQuery();
    const projects = useProjectSelector(state => state.project.projectList);
    useEffect(() => {
        projectData && dispatch(setProjectList(projectData));
    }, [projectData, dispatch]);
    return (
        <div>
            {isLoading && (
                <p className="mt-4 text-sm text-slate-500">Loading projects...</p>
            )}

            {isError && (
                <p className="mt-4 text-sm text-red-500">{error.message}</p>
            )}

            {!isLoading && !isError && projects.length === 0 && (
                <div className="mb-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/40 py-16 text-center dark:border-white/1 dark:bg-white/1">
                    <div
                        className="mb-4 flex size-14 items-center justify-center rounded-full bg-slate-900/5 dark:bg-white/10"
                    >
                        <FiFolder size={24} className="text-slate-500 dark:text-white" />
                    </div>
                    <h2 className="mb-1.5 text-lg font-semibold text-slate-900 dark:text-white">No projects yet</h2>
                    <p className="mb-5 max-w-xs text-sm text-slate-500 dark:text-slate-500">Create a project and start building something amazing!</p>
                </div>
            )}

            {projects.length > 0 && (
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3 bg-red-500 p-8">
                    {projects.map((project) => (
                        <div key={project._id}>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RecentProjectList