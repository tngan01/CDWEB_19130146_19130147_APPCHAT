import { FunctionComponent, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Helper from 'utils/Helper';

interface PrivateRoutesProps {
  exact: boolean;
  path: string;
  component: FunctionComponent;
}

const PrivateRoutes = ({
  exact,
  path,
  component,
}: PrivateRoutesProps): JSX.Element => {
  const history = useHistory();
  const token = Helper.getAuthToken();
  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, [token, history]);
  return <Route exact={exact} path={path} component={component} />;
};

export default PrivateRoutes;
