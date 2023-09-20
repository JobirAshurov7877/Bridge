import { Link } from "react-router-dom";
import Layout from "../Layout";
import axios from "axios";
import { baseURL } from "../utils/BaseUrl";
import { useEffect, useState } from "react";
import { resData } from "./Useful";
import WestIcon from "@mui/icons-material/West";

const Services = () => {
  const [data, setData] = useState<resData[]>();

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/super_admin/services_for_client/`
      );
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout
      link={`https://www.bridgeavto.ru/services/`}
      subtitle={`Услуги`}
      title="Обмен старого авто на новое: выгодно продайте свой старый автомобиль с нами! Находимся в Москве "
      desc="олучите лучшую цену за ваш старый автомобиль или обменяйте его на совершенно новое транспортное средство!"
    >
      <div className="services mx-[30px]  my-[50px] text-[23px] md:mx-[130px]">
        <div className="section_head  flex justify-between items-center mt-[40px] md:mt-[100px]">
          <h1 className="title text-[23px] font-extrabold uppercase md:text-[50px]">
            Услуги для <br /> клиентов
          </h1>
          <Link to={"/"} className="back_btn hidden md:flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 85 85"
              fill="none"
              className="w-20"
            >
              <circle
                cx="43"
                cy="42"
                r="22"
                fill="#0C121C"
                fill-opacity="0.05"
              />
              <circle
                cx="42.5"
                cy="42.5"
                r="42.5"
                fill="#0C121C"
                fill-opacity="0.1"
              />
            </svg>
            <div className=" flex items-center gap-2 -translate-x-8">
              <WestIcon sx={{ fontSize: "35px" }} />
              <span className=" md:text-[23px] font-bold leading-7">
                На <br />
                главную
              </span>
            </div>
          </Link>
        </div>
        <div className="section_body grid grid-cols-1 gap-3 md:grid-cols-3 my-5 ">
          {data?.map((item) => (
            <div className="card w-full md:w-auto min-h-[317px] flex flex-col justify-between items-center">
              <div className="card_head w-full p-4 md:p-7">
                <img
                  src={`${baseURL}${item?.img}`}
                  alt=""
                  className="w-full h-[190px] md:h-[255px] object-cover "
                />
              </div>
              <div className="card_body my-5 font-medium mx-[35px]">
                <h3 className="none ss:block text-center font-extrabold text-[24px] md:[28px] uppercase">
                  {item?.title}
                </h3>
                <p className="desc text-primary font-medium leading- text-center text-[13px] md:text-[16px] w-[90%] m-auto ">
                  {item?.text}
                </p>
              </div>
              <Link
                to={`/services/${item?.id}`}
                className="uppercase font-semibold bg-primary text-white text-[12px] md:text-[16px] w-[75%] py-3 flex justify-center items-center  border  border-primary mb-8"
              >
                Подробнее
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Services;
