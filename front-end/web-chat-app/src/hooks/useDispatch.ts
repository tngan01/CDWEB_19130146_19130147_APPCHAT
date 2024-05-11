import { Dispatch } from 'react';
import { useDispatch as useOriginalDispatch } from 'react-redux';

import { useAuth0 } from '@auth0/auth0-react';

/**
 * Attempt to silently get the `access_token` and append it to the useDispatch.
 *
 * If there is no valid token , redirect user to Auth0 login screen.
 *
 * ```
 * // Usage
 * // Use it as the normal useDispatch import from  react-redux library
 * import { useDispatch } from 'hooks/useCustomDispatch';
 * const dispatch = useDispatch();
 * ```
 *
 * @returns redux store's `dispatch` function
 */

declare global {
  interface Window {
    sessionExpiredAlert: unknown;
  }
}

const useDispatch = (): Dispatch<unknown> => {
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const originalDispatch = useOriginalDispatch();

  const getToken = async () => {
    try {
      return await getAccessTokenSilently({});
    } catch (e) {
      /*
       * Handle force login again after revoke token, such as after change password.
       * If use `getAccessTokenWithPopup`, user can close the popup, leading to confusing behavior.
       * Therefore, opt to use `loginWithRedirect` instead.
       */
      if (e.error === 'login_required') {
      } else if (e.error === 'invalid_grant' && !window.sessionExpiredAlert) {
        window.sessionExpiredAlert = true;

        loginWithRedirect({
          appState: {
            returnTo: `${window.location.pathname}${window.location.search}`,
          },
        });
      } else {
        console.error(e);
      }
    }
  };

  return async (action: { payload: { token: string } }, ...args: unknown[]) => {
    const token = await getToken();

    token && action.payload && (action.payload.token = token);
    return originalDispatch(action);
  };
};

export default useDispatch;
