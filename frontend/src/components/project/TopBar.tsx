import { motion } from "motion/react";
import { FiCode, FiEye } from "react-icons/fi";
import { useProjectSelector } from "../../features/projects/store/hooks";
import { useFileDispatch, useFileSelector } from "../../features/files/store/hooks";
import { setShowPreview } from "../../features/files/store/file.slice";
interface TopBarProps {
}

const TopBar = ({ }: TopBarProps) => {
    const { currentProject } = useProjectSelector(state => state.project);
    const dispatch = useFileDispatch();
    const { showPreview } = useFileSelector(state => state.fileOperations);
    return (
        <div className="relative flex h-12 items-center justify-between border-b border-white/6 bg-[#111113]/90 px-4 backdrop-blur-xl">
            {/* Left section */}
            <div className="flex items-center gap-3">
                <div className="text-white bg-clip-text text-lg font-bold ">
                    Vertex AI
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-md text-sm font-semibold leading-6 text-white">
                        📁
                    </div>
                    <div className="max-w-56 truncate text-sm font-medium text-zinc-300  ">
                        {currentProject?.name}
                    </div>
                </div>
            </div>
            {/* Right section */}
            <div className="flex items-center gap-1.5">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => dispatch(setShowPreview(!showPreview))}
                    title={showPreview ? "Show Editor" : "Show Preview"}
                    className={`relative flex items-center justify-center rounded-lg p-2 transition-colors ${showPreview ? "text-sky-400" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                >
                    <motion.div className="absolute inset-0 rounded-lg bg-white/6"
                        transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
                    />
                    {showPreview ? <FiEye strokeWidth={2} size={16} className="relative" /> : <FiCode className="relative" strokeWidth={2} size={16} />}
                </motion.button>
            </div>
        </div>
    )
}

export default TopBar