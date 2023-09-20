import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { resData } from "./Useful";
import axios from "axios";
import { baseURL } from "../utils/BaseUrl";
const ServicesDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<resData>();
  const [postData, setPostData] = useState({
    full_name: "",
    phone: null as null | number,
    email: "",
  });

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/super_admin/services_for_client_open/${id}/`
      );
      setData(data[0]);
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
      link={`https://www.bridgeavto.ru/services/${id}`}
      subtitle={`Услуги | ${data?.header}`}
      title={`Услуги | ${data?.header}`}
      desc=""
    >
      <div className="services-detail mx-[30px]  my-[50px] text-[23px] md:mx-[130px]">
        <div className="section_head">
          <h1 className="title text-[23px] font-extrabold  uppercase md:text-[50px] ">
            {data?.header}
          </h1>
        </div>
        <div className="section_body mt-8 flex flex-col-reverse md:flex-row gap-16 ">
          <div className="form_box flex-1">
            <h3 className=" font-bold text-[23px] ss:text-[33px]">
              {data?.title}
            </h3>
            <p className=" text-[13px] md:text-[19px] text-[rgba(12,18,28,0.8)] md:text-[#0c121c7f] leading-6 md:leading-8 font-medium my-5">
              {data?.text}
            </p>
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
          <div className="img_box flex-1">
            <img
              src={`${baseURL}${data?.img}`}
              className="w-full md:h-[500px] object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicesDetail;
