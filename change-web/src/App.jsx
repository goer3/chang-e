import { HashRouter } from 'react-router-dom';
import { AuthRouter, GetRoutes } from './router/routes.jsx';

const App = () => {
  return (
    <HashRouter>
      <AuthRouter>
        <GetRoutes />
      </AuthRouter>
    </HashRouter>
  );
};

export default App;
