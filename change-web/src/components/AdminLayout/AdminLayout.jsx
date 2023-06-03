import './AdminLayout.less';

// Admin Layout 布局
const AdminLayout = ({ children }) => {
  return (
    <div>
      <h1>Hello World</h1>
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
