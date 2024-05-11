import { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';

interface PublicRoutesProps {
  exact: boolean | undefined;
  path: string;
  component: FunctionComponent;
}

const PublicRoutes = ({ exact, path, component }: PublicRoutesProps): JSX.Element => {
  return <Route exact={exact} path={path} component={component} />;
};

export default PublicRoutes;
