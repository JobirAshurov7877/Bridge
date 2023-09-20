import { Helmet } from "react-helmet";
import AdminSidebar from "./Sidebar";
import Header from "./components/Header";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const AdminLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>

      <main>
        <div className="flex ">
          <AdminSidebar />
          <div className="content w-full bg-gray-100">
            <Header />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
