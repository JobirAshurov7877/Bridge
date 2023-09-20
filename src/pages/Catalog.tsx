import { styles } from "../utils/styles";
import { Link } from "react-router-dom";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { CarData } from "../admin/pages/AdminHome";
import { baseURL } from "../utils/BaseUrl";
import axios from "axios";
import { Pagination } from "@mui/material";
import { FilterModal } from "../components";
const Catalog = () => {
  const [data, setData] = useState<CarData[]>([]);

  const [page, setPage] = useState<number>(0);
  const [pageId, setPageId] = useState<number>(1);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/super_admin/pagination_car/?page=${pageId}`
      );

      setData(data?.data?.results);
      setPage(data?.data?.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout
      title="Каталог авто из Кореи и Германии: продажа, доставка и растаможка в Москве"
      link="https://www.bridgeavto.ru/catalog"
      subtitle="Каталог"
      desc="Ищете автомобили из Кореи или Европы с доставкой и растаможкой в Москве? Тогда вам к нам!"
    >
      <div className="catalog px-[20px]  md:px-[130px] mb-[170px]">
        <div className={`catalog_head ${styles.flexBetween}`}>
          <h1 className="title text-[23px] md:text-[50px] font-extrabold my-[50px] uppercase">
            Каталог
          </h1>
          <div className={`dropdown hidden md:${styles.flexCenter} gap-2`}>
            <FilterModal setData={setData} />
          </div>
        </div>
        <div className="catalog_body gap-16 md:gap-5 grid place-items-center grid-cols-1 md:grid-cols-3 mt-8">
          {data?.map((item) => (
            <div className="card max-w-[330px] md:max-w-[540px] min-h-[520px] md:min-h-[600px] w-full ">
              <div className="card_head md:h-[280px]">
                <img
                  src={`${baseURL}${item.images[0]?.car_img}`}
                  alt="car"
                  className="h-[230px] md:h-full  w-full  object-cover"
                />
              </div>
              <div className="card_body mt-[20px] px-[12px] md:py-7 md:px-[20px] lining-nums ">
                <h3 className="car_name uppercase text-[18px] md:text-[28px] font-bold">
                  {item?.car_categories?.categories_name}{" "}
                  {item?.car_categories_seria?.name} {item?.car_name}
                </h3>
                <div
                  className={`car_features flex items-center mt-4 gap-12 leading-6 text-[13px] font-semibold md:text-[20px] md:leading-8`}
                >
                  <div className="flex flex-col">
                    <span>Пробег:</span>
                    <span>Объем:</span>
                    <span>Тип двигателя:</span>
                  </div>
                  <div className="box text-[#0c121c7f] flex flex-col">
                    <span>{item?.car_millage ? item?.car_millage : "-"}</span>
                    <span>{item?.car_volume ? item?.car_volume : "-"}</span>
                    <span>
                      {item?.car_engene_size ? item?.car_engene_size : "-"}
                    </span>
                  </div>
                </div>
                <div className="car_price font-bold mt-3">
                  <h5 className="text-[14px] md:text-[20px]">Стоимость Авто</h5>
                  <h3 className="text-[21px] md:text-[30px]">
                    {item?.car_price ? item?.car_price : "-"} $
                  </h3>
                </div>
                <Link
                  to={`/catalog/${item?.id}`}
                  className={`${styles.mainBtn} flex items-center justify-center w-full m-auto mt-4 text-white text-[12px] md:text-[17px] font-bold uppercase py-3`}
                >
                  Оставить заявку
                </Link>
              </div>
            </div>
          ))}
        </div>
        <>
          <Pagination
            count={
              page % 20 != 0 ? Math.floor(page / 20) + 1 : Math.floor(page / 20)
            }
            onChange={(e: React.ChangeEvent<unknown>, value) => {
              setPageId(value);
            }}
            variant="outlined"
            color="primary"
            shape="rounded"
            sx={{ display: "flex", justifyContent: "end", marginTop: "40px" }}
          />
        </>
      </div>
    </Layout>
  );
};

export default Catalog;
