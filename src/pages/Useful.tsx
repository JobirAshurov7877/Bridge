import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { baseURL } from "../utils/BaseUrl";
import WestIcon from "@mui/icons-material/West";
import axios from "axios";

export type resData = {
  id: number;
  img: string;
  text: string;
  title: string;
  header: string;
};

const Useful = () => {
  const [data, setData] = useState<resData[]>();

  const getData = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/super_admin/useful/`);
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
      link={`https://www.bridgeavto.ru/useful/`}
      subtitle={`Полезное`}
      title="Свежие новости и советы: продажа и покупка авто легко и выгодно"
      desc="Узнайте последние новости и ценные советы о продаже и покупке автомобилей!"
    >
      <div className="usefull  mx-[20px] md:mx-[130px]  font-bold md:font-extrabold grid-cols-1 md:grid-cols-3">
        <div className=" section_head flex justify-between items-center mt-[40px] md:mt-[100px]">
          <h1 className="title text-[23px] uppercase md:text-[50px]">
            Полезное
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
        <div className="section_body my-4 grid gap-4  grid-cols-1   md:grid-cols-3">
          {data?.map((item) => (
            <div
              key={item?.id}
              className="card w-full md:max-w-[470px] min-h-[445px] flex flex-col items-center justify-between"
            >
              <div className="card_head w-full p-4 md:p-7">
                <img
                  src={`${baseURL}${item?.img}`}
                  alt=""
                  className="w-full h-[190px] md:h-[255px] object-cover "
                />
              </div>
              <div className="card_body my-5  font-medium ">
                <h3 className="none ss:block text-center font-bold text-[24px] ">
                  {item?.title}
                </h3>
                <p
                  style={{ wordBreak: "break-word" }}
                  className="desc break-words text-[#0c121c7f] text-center text-[11px] md:text-[17px] w-[90%] m-auto  "
                >
                  {item?.text}
                </p>
              </div>
              <Link
                to={`/useful/${item?.id}`}
                className="uppercase font-semibold text-[12px] md:text-[16px] w-[75%] py-3 flex justify-center items-center  border  border-primary mb-8"
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

export default Useful;
