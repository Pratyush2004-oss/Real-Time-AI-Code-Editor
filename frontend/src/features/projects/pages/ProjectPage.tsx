import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ActivityBar from "../../../components/project/ActivityBar";
import Explorer from "../../../components/project/Explorer";
import TopBar from "../../../components/project/TopBar";
import LoadingScreen from "../../../components/shared/LoadingScreen";
import { useProjectDispatch } from "../store/hooks";
import { setCurrentProject } from "../store/project.slice";
import { useGetSingleProjectInformationQuery } from "../tanstack-query";

const ProjectPage = () => {
  const params = useParams();
  const { projectId } = params;
  const dispatch = useProjectDispatch();
  const { data: project, isLoading, isError } = useGetSingleProjectInformationQuery(projectId!);
  const [showExplorer, setShowExplorer] = useState(false);
  const [showAichat, setShowAichat] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    project && dispatch(setCurrentProject(project!));
  }, [project, dispatch]);

  if (isLoading) return <LoadingScreen />
  // if there will be error in fetching the project from the backend then route back to home page
  if (isError) return <Navigate to="/" />
  return (
    <div className="relative flex flex-col h-screen overflow-hidden bg-[#0a0a0c]">
      <div className="pointer-events-none absolute -top-40 left-1/3 size-96 rounded-full bg-sky-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -top-20 right-1/4 size-80 rounded-full bg-violet-500/10 blur-[140px]" />

      {/* top bar */}
      <TopBar setShowPreview={setShowPreview} showPreview={showPreview} />

      {/* main content */}
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar
          showExplorer={showExplorer}
          showAichat={showAichat}
          showTerminal={showTerminal}
          setShowExplorer={setShowExplorer}
          setShowTerminal={setShowTerminal}
          setShowAichat={setShowAichat}
        />

        <AnimatePresence initial={false}>
          {showExplorer && <Explorer projectId={projectId!} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ProjectPage