import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/AdminLayout/AdminLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PageNotFound from './pages/error/404';

const App = () => {
  return (
    <AdminLayout>
      <Routes>
        {/*路由跳转*/}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        {/*控制台路由*/}
        <Route path="/dashboard" element={<Dashboard />} />
        {/*不匹配的路由*/}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </AdminLayout>
  );
};

export default App;
