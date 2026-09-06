import { motion } from "motion/react";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiFolder, FiStar, FiZap } from "react-icons/fi"
interface SIDEBARPROPS {
    activeSession: "projects" | "starred";
    setActiveSession: React.Dispatch<React.SetStateAction<"projects" | "starred">>;
}
const SideBar = ({ activeSession, setActiveSession }: SIDEBARPROPS) => {
    const [isExpanded, setisExpanded] = useState(false);
    return (
        <div className="flex h-full md:w-64 shrink-0 flex-col border-r border-slate-200/70 bg-white/60 px-3 py-5 font-sans backdrop-blur-xl transition-colors duration-300 dark:border-white/6 dark:bg-white/2">
            {/* expand button */}
            <button className="absolute p-2 top-2 -right-4 border z-30 bg-zinc-300 hover:bg-zinc-400 rounded-xl md:hidden" onClick={() => setisExpanded(!isExpanded)}>{isExpanded ? <FiChevronLeft /> : <FiChevronRight />}</button>
            {/* Meun options */}
            <div className="flex flex-col gap-1">
                <motion.div
                    className={`relative cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${activeSession === "projects" ? "text-slate-900 dark:text-white" : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/4 dark:hover:text-slate-200"}`}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveSession("projects")}
                >
                    {activeSession === "projects" && <div className="absolute inset-0 rounded-lg border border-slate-900/10 bg-slate-900/5 dark:border-white/10 dark:bg-white/10" />}
                    <FiFolder strokeWidth={2} className="relative" size={17} />
                    <span className="relative">Projects</span>
                </motion.div>
                <motion.div
                    className={`relative cursor-pointer flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${activeSession === "starred" ? "text-slate-900 dark:text-white" : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/4 dark:hover:text-slate-200"}`}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveSession("starred")}
                >
                    {activeSession === "starred" && <div className="absolute inset-0 rounded-lg border border-slate-900/10 bg-slate-900/5 dark:border-white/10 dark:bg-white/10" />}
                    <FiStar strokeWidth={2} className="relative" size={17} />
                    <span className="relative">Starred</span>
                </motion.div>
            </div>

            {/* Payment options for credits */}
            <div className='my-4 h-px bg-slate-200/70 dark:bg-white/6 '>
                <div className="rounded-xl border border-slate-200/70 bg-white/70 p-3.5 shadow-sm backdrop-blur-xl dark:border-white/7 dark:bg-white/3 dark:shadow-none">
                    <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Updrade Plan</p>
                    <p className="mb-3 text-xs leading-snug text-slate-400 dark:text-slate-500">Upgrade to Pro for more credits</p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white shadow-sm transition-opacity duration-150 hover:opacity-90 dark:bg-white dark:text-slate-900"
                    >
                        <FiZap fill="currentColor" />
                        Upgrade Now
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default SideBar