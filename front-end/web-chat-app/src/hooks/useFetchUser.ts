import { useEffect } from 'react';
// import { getCurrentUserRequest } from 'providers/AuthProvider/slice';
import { useAppDispatch, useAppSelector } from 'store';
import Helper from 'utils/Helper';

const useFetchUser = (
  isInitializing?: boolean,
): { isAuthorizing: string; isLoading: boolean; currentUser: unknown } => {
  const dispatch = useAppDispatch();
  const isAuthorizing = useAppSelector((state) => state.auth.isAuthorizing);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (Helper.getAuthToken()) {
      // dispatch(getCurrentUserRequest({ isAuthorizing: isInitializing }));
    }
  }, [dispatch, isInitializing]);

  return { isAuthorizing, isLoading, currentUser };
};

export default useFetchUser;
