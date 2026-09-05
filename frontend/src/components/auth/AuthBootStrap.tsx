import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Router } from '../../app.routes';
import { getMeService } from '../../features/auth/services/auth.api.service';
import { useAuthDispatch } from '../../features/auth/store/hooks';
import { setUserData } from '../../features/auth/store/user.slice';
import LoadingScreen from '../shared/LoadingScreen';
const AuthBootStrap = () => {
    const dispatch = useAuthDispatch();

    const meQuery = useQuery({
        queryKey: ['auth', 'me'],
        queryFn: getMeService,
        retry: false,
    })
    useEffect(() => {
        if (meQuery.data) {
            dispatch(setUserData(meQuery.data));
        }
    }, [dispatch, meQuery.data]);
    if (meQuery.isPending) {
        return <LoadingScreen />
    }
    return (
        <RouterProvider router={Router} />
    )
}

export default AuthBootStrap