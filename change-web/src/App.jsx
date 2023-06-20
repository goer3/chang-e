import { HashRouter } from 'react-router-dom';
import { AuthRouter, GetRouteList } from './router/router.jsx';

// 路由入口
const App = () => {
  return (
    <HashRouter>
      <AuthRouter>
        <GetRouteList />
      </AuthRouter>
    </HashRouter>
  );
};

export default App;
