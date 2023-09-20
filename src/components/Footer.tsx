
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { navList } from "../utils/constants";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/BaseUrl";

type footerData = {
  categories_name: string;
  id: number;
};

const Footer = () => {
  const [footerList, setFooterList] = useState<footerData[]>([]);

  const getData = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/super_admin/car_type/`);
      setFooterList(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <footer
      className={`bg-[#4A4F54]  pt-16 px-[20px] md:px-[130px] text-white py-4 min-h-[350px] flex justify-between flex-col`}
    >
      <div
        className={`box_footer_item   grid grid-cols-2  lg:grid-cols-4 gap-9 `}
      >
        <div className="w-[180px] md:w-auto">
          <div className="box_head">
            <Link to={"/"}>
              <img src={logo} alt="logo" className=" w-full md:w-[230px]" />
            </Link>
          </div>
          <div className="box_body mt-5 text-[#ffffff99]">
            <p className="text-[8px] xs:text-[15px] text-[#ffffff99] font-medium">
              Клиенты доверяют нам и возвращаются с просьбой продать или
              обменять авто. Мы гарантируем продуманное и удачное решение.
            </p>
            <div className="iconbox flex gap-2 mt-2">
              <a href="#" className="">
                <InstagramIcon style={{ fontSize: "20px" }} />
              </a>
              <a href="#">
                <TelegramIcon style={{ fontSize: "20px" }} />
              </a>
              <a href="#">
                <WhatsAppIcon style={{ fontSize: "20px" }} />
              </a>
            </div>
          </div>
        </div>

        <div className=" lg:translate-x-16 translate-x-8 w-[80%]">
          <div className="box_head">
            <h3 className="footer_textline inline-block text-[12px] uppercase xs:text-[23px]  font-semibold">
              Карта сайта
            </h3>
          </div>
          <div className="box_body mt-2">
            <ul>
              {navList.map((nav) => (
                <li key={nav.name}>
                  <Link
                    className="text-[12px] xs:text-[17px] fp text-[#FFFFFFCC] tracking-wider "
                    to={nav.path}
                  >
                    {nav.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="order-last md:order-none lg:translate-x-12 translate-x-8 w-[80%]  ">
          <div className="box_head">
            <h3 className="footer_textline inline-block uppercase text-[17px] xs:text-[23px]  font-semibold">
              Марки
            </h3>
          </div>
          <div className="box_body mt-2">
            <ul>
              <li
                className={`text-[13px] xs:text-[17px]   flex flex-col text-[#FFFFFFCC]  font-medium `}
              >
                {footerList?.map((item) => (
                  <Link to={`/filter-catalog/${item?.id}`} key={item?.id}>
                    {item?.categories_name}
                  </Link>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="w-[180px] md:w-auto">
          <div className="box_head">
            <h3 className="footer_textline inline-block text-[12px] uppercase xs:text-[23px]  font-semibold">
              Связаться с нами!
            </h3>
          </div>
          <div className="box_body mt-2 text-[12px] xs:text-[17px] font-medium leading-5 md:leading-6 text-[#FFFFFFCC]">
            <a href="#" className={"flex items-center gap-2"}>
              <FmdGoodOutlinedIcon style={{ fontSize: "18px" }} />
              <span className="lining-nums">Санкт-Петербург, Лужская 16</span>
            </a>
            <a href="#" className={"flex items-center gap-2"}>
              <LocalPhoneOutlinedIcon style={{ fontSize: "18px" }} />
              <span className="lining-nums">+7 (928) 461-41-41</span>
            </a>
            <a href="#" className={"flex items-center gap-2"}>
              <EmailOutlinedIcon style={{ fontSize: "18px" }} />
              <span className="lining-nums">Bridge-auto.info@mail.ru</span>
            </a>
          </div>
        </div>
      </div>
      <p className="text-center proportional-nums lining-nums mt-3 uppercase text-[11px] md:text-[18px]">
        @Copyright 2023 Bridge Auto
      </p>
    </footer>
  );
};

export default Footer;
