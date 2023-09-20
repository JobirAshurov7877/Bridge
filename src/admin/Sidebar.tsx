import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import logo from "../assets/logo.png";

const AdminSidebar = () => {
  const [open, setOpen] = useState(true);
  const Menus: {
    title: string;
    path: string;
  }[] = [
    { title: "Добавить машину", path: "/admin" },
    { title: "Каталог", path: "/admin/catalog" },
    { title: "Заявку", path: "/admin/form/" },
    { title: "Карусель", path: "/admin/carusel/" },
  ];
  return (
    <div className="flex flex-col">
      <div
        className={` ${
          open ? "w-72" : "w-0 "
        } min-h-[100vh] flex flex-col   h-full bg-primary  ${
          open && "p-5"
        }  pt-8 relative duration-300`}
      >
        <FiMenu
          className={`absolute text-white cursor-pointer  -right-9 top-10 w-8 h-5
            text-[25px] rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-1000  ${
              !open && "scale-0"
            }`}
          >
            {" "}
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu) => (
            <Link to={Menu.path}>
              <li
                key={Menu.title}
                className={`flex  rounded-md ${
                  open && "px-4"
                } cursor-pointer hover:bg-light-white py-4 text-gray-300 text-sm items-center gap-x-4 
             ${Menu.path === location.pathname && "bg-light-green-800"} `}
              >
                <span
                  className={`${
                    !open && "hidden"
                  } text-[18px] font-semibold origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AdminSidebar;
