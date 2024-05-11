import "styles/global.less";
import { ConfigProvider } from "antd";
import { Suspense, useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
// import ConfirmModal from 'components/ConfirmModal';
// import ErrorBoundary from 'components/ErrorBoundary';
// import i18n from 'i18n';
// import { getProfileUserRequest } from "providers/AuthProvider/slice";
import { indexRoutes, PrivateRoutes, PublicRoutes } from "routes";
import Helper from "utils/Helper";

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    const termAndConditionStatus = localStorage.getItem(
      "termAndConditionStatus"
    );

    if (Helper.getAuthToken() && termAndConditionStatus !== "PENDING") {
      // dispatch(getProfileUserRequest());
    }
  }, []);

  return (
    <div className="app-container">
      {/* <ConfirmModal /> */}
      <ConfigProvider autoInsertSpaceInButton={false}>
        {/* <ErrorBoundary> */}
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Switch>
              {indexRoutes.map((route: any) => {
                if (!route.requireLogin) {
                  return (
                    <PublicRoutes
                      exact={route.exact}
                      path={route.path}
                      component={route.component}
                      key={route.path}
                    />
                  );
                }
                return (
                  <PrivateRoutes
                    exact={route.exact}
                    path={route.path}
                    component={route.component}
                    key={route.path}
                  />
                );
              })}
            </Switch>
          </BrowserRouter>
        </Suspense>
        {/* </ErrorBoundary> */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
        />
      </ConfigProvider>
    </div>
  );
};

export default App;
