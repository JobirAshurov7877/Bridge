import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    Cookies.remove("token");
    navigate("/admin/login");
  };
  return (
    <div className="flex items-center justify-end pr-4 w-full h-[100px] bg-primary">
      <div className="btn text-[19px] font-bold w-24 flex items-center justify-center  rounded-md bg-light-green-800 cursor-pointer hover:bg-light-white py-4 text-gray-300 text-sm gap-x-4 ">
        <button onClick={handleSubmit}>Выйти</button>
      </div>
    </div>
  );
};

export default Header;
