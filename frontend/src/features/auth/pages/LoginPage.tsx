import { useQueryClient } from "@tanstack/react-query";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "../../../../firebase";
import { loginService } from "../services/auth.api.service";
import { useAppDispatch } from "../store/hooks";
import { setUserData } from "../store/user.slice";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const handleLogin = async () => {
        try {
            setisLoading(true);
            const data = await signInWithPopup(auth, googleProvider);
            const token = await data.user.getIdToken();
            const res = await loginService(token);
            dispatch(setUserData(res.user));
            queryClient.setQueryData(['auth', 'me'], res.user);
            navigate("/dashboard", { replace: true });
        } finally {
            setisLoading(false);
        }
    }
    return (
        <div className='relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-50 px-4 transition-colors duration-300 dark:bg-[#07070c]'>
            <div className='pointer-events-none absolute -top-32 left-1/2 hidden h-150 w-150 -translate-x-1/2 rounded-full bg-white/5 blur-[120px] dark:block ' />
            <div className='relative w-full max-w-sm rounded-2xl border border-slate-200/70 bg-white/80 p-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur-xl dark:border-white/8 dark:bg-white/3 dark:shadow-black/40'>
                <div className='mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-lg shadow-black/5 dark:border-transparent'>
                    <span className='text-lg font-bold text-slate-900'>AI</span>
                </div>
                <h2 className='mb-2 text-xl font-bold text-slate-900 dark:text-white'>Welcome to Vertex AI</h2>
                <p className='mb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400'>Sign in to access your projects and continue building.</p>

                <button className='flex w-full items-center justify-center gap-3 rounded-lg vorder border-slate-200 bg-white py-2.5 text-sm font-stretch-semi-expanded text-slate-800 shadow-sm transition-colors duration-150 hover:bg-slate-50 disabled:opacity-70 dark:border-transparent dark:bg-white dark:hover:bg-slate-100' disabled={isLoading} onClick={handleLogin} >
                    <FcGoogle className='text-3xl' />
                    <p className='font-medium'>
                        {isLoading ? "Signing in ..." : "Continue with Google"}
                    </p>
                </button>
                <p
                    className='mt-5 font-medium text-xs text-slate-400 dark:text-slate-600'>By continuing you agree to our Terms of Service and Privacy Policy.</p>
            </div>
        </div>
    )
}

export default LoginPage