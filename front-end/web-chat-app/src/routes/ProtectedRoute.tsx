import { ComponentType, useState } from "react";
import { Route } from "react-router-dom";

import { withAuthenticationRequired } from "@auth0/auth0-react";

interface ProtectedRouteType {
  component: ComponentType<unknown>;
  exact: boolean | undefined;
  path: string;
}

const ProtectedRoute = ({
  component,
  path,
  ...args
}: ProtectedRouteType): JSX.Element => {
  console.log(args);


  /**
   * Using `element` props of <Route> in React Router v6 is essensially a `render()` function.
   * Since we're using HOC here, we must declare Component only once to prevent React
   * from considering this Component different after each render. Otherwise, it will do remount every render.
   *
   * Ref: https://reactjs.org/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method
   *
   * The unnecessary remount makes poor performance, lost all states of this component and its children,
   * causing many part to reload data. UX is also bad.
   */
  const [Component] = useState(() => {
    return withAuthenticationRequired(component, {
      onRedirecting: function renderRedirect() {
        return <div>loading</div>;
      },
    });
  });

  return <Route component={(props:any) => <Component {...props} />} {...args} />;
};

export default ProtectedRoute;
