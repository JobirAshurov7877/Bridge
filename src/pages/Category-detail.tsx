import { Link, useParams } from "react-router-dom";
import Layout from "../Layout";
import axios from "axios";
import { baseURL } from "../utils/BaseUrl";
import { useEffect, useState } from "react";
import { CarData } from "../admin/pages/AdminHome";
import { ThumbnailSlider } from "../components";
import { styles } from "../utils/styles";

const CategoryDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<CarData | undefined>();
  const [postData, setPostData] = useState({
    full_name: "",
    phone: null as null | number,
    email: "",
  });
  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/super_admin/car_model_site_detail/${id}/`
      );
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${baseURL}/api/super_admin/save_contact_post/`,
        postData
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout
      link={`https://www.bridgeavto.ru/catalog/${id}`}
      subtitle={`Каталог | ${data?.car_name}`}
      title={`Каталог | ${data?.car_name}`}
      desc=""
    >
      <div className="catalog-detail  px-[20px]  md:px-[130px] mb-[170px]">
        <div className="section_body mt-8 items-start flex flex-col-reverse lg:flex-row gap-16 ">
          <div className="form_box flex-1 w-[100%] lining-nums">
            <h3 className=" font-bold text-[23px] ss:text-[33px]">
              {data?.car_categories?.categories_name}{" "}
              {data?.car_categories_seria?.name} {data?.car_name}
            </h3>
            <h4 className="md:text-[35px]">{data?.car_price} руб.</h4>
            <div
              className={` flex items-center  my-12 gap-4 leading-8 text-[13px] font-semibold md:text-[20px] md:leading-8 lining-nums`}
            >
              <div className="flex flex-col text-[#0c121c7f]">
                <span>Год выпуска:</span>
                <span>Пробег:</span>
                <span>Объем:</span>
                <span>Мощность:</span>
                <span>Тип двигателя:</span>
              </div>
              <div className="box  flex flex-col uppercase">
                <span>
                  {data?.car_year_of_issue ? data?.car_year_of_issue : "-"}
                </span>
                <span>{data?.car_millage ? data?.car_millage : "-"}</span>
                <span>{data?.car_volume ? data?.car_volume : "-"}</span>
                <span>{data?.car_power ? data?.car_power : "-"}</span>
                <span>
                  {data?.car_engene_size ? data?.car_engene_size : "-"}
                </span>
              </div>
            </div>
            <div
              className={` flex items-center gap-4 leading-6 text-[13px] font-semibold md:text-[20px] md:leading-8 lining-nums`}
            >
              <div className="flex flex-col text-[#0c121c7f]">
                <span>Привод:</span>
                <span>Дверей/Мест:</span>
                <span>Цвет:</span>
                <span>Состояние:</span>
                <span>Макс.скорость:</span>
                <span>Разгон до 100 км/ч:</span>
              </div>
              <div className="box  flex flex-col uppercase">
                <span>{data?.car_drive_unit ? data?.car_drive_unit : "-"}</span>
                <span>{data?.car_door_seats ? data?.car_door_seats : "-"}</span>
                <span>{data?.car_color ? data?.car_color : "-"}</span>
                <span>{data?.car_state ? data?.car_state : "-"}</span>
                <span>{data?.car_max_speed ? data?.car_max_speed : "-"}</span>
                <span>
                  {data?.car_acceleration_to_100
                    ? data?.car_acceleration_to_100
                    : "-"}
                </span>
              </div>
            </div>
            <form
              className="bg-white  rounded  pt-6 pb-8 mb-4 "
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <input
                  className="  appearance-none border font-semibold border-[#0c121cb2] text-[14px] md:text-[18px] text-[#0c121c7f]  rounded w-full py-3 px-4 md:py-4 md:px-8 leading-tight focus:outline-none "
                  id="username"
                  name="full_name"
                  type="text"
                  placeholder="Имя"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <input
                  className="border-[#0c121cb2]  text-[14px]  font-semibold appearance-none md:text-[18px] border  rounded w-full py-3 px-4 md:py-4 md:px-8 text-[#0c121c7f]  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="number"
                  type="number"
                  name="phone"
                  placeholder="+7(926) 000-00-00"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <input
                  className="border-[#0c121cb2]   text-[14px] font-semibold appearance-none md:text-[18px] border  rounded w-full py-3 px-4 md:py-4 md:px-8 text-[#0c121c7f]  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <input
                  className="border-[#0c121cb2] uppercase text-[12px] text-white bg-primary font-semibold md:font-bold appearance-none md:text-[18px] border   w-full py-3 px-4 md:py-4 md:px-8 cursor-pointer  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="submit"
                  type="submit"
                  placeholder="+7(926) 000-00-00"
                  value={"Связаться с нами"}
                />
              </div>
            </form>
          </div>

          <div className="img_box w-100% flex-1  flex flex-col">
            <div className="max-w-[330px] md:max-w-[700px] m-auto w-[100%] mb-8">
              <ThumbnailSlider data={data} />
            </div>
            <p className="mt-14">{data?.car_decriptions}</p>
          </div>
        </div>
        <div className="card text-center w-full h-[174px] md:min-h-[360px] px-[5px] relative">
          <img
            src="/src/assets/Mask grouptrase_l.png"
            alt=""
            className="absolute h-[50%] left-[10px] bottom-0"
          />
          <img
            src="/src/assets/Mask grouptrase_r.png"
            alt=""
            className="absolute h-[50%] right-[10px] bottom-0"
          />
          <h3 className="card_title text-[12px] md:text-[40px] font-extrabold uppercase md:mb-6">
            Есть вопросы? С радостью ответим!
          </h3>
          <p className="card_desc gap-5 text-[#0c121cb2] text-[9px] md:text-[22px] font-medium w-[190px] md:w-full">
            Напишите, что Вас интересует, и мы свяжемся с Вами
          </p>
          <Link
            to={"/"}
            className={`${styles.mainBtn} mt-5 py-2 px-5 md:mt-7 text-white text-[8px] md:text-[16px]`}
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryDetail;
