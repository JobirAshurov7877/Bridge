import { useEffect, useState } from "react";
import AdminLayout from "../Admin-layout";
import axios from "axios";
import { baseURL } from "../../utils/BaseUrl";
import { useParams } from "react-router-dom";
import { CarData } from "./AdminHome";

import { AdminThumbnail } from "../components";

const AdminCatalogDatails = () => {
  const { id } = useParams();
  const [data, setData] = useState<CarData | undefined>();

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/super_admin/car_model_detail/${id}/`
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
    <AdminLayout title="">
      <div className="catalog-detail  px-[20px]  md:px-[70px] mb-[170px]">
        <div className="section_body mt-8 flex flex-row items-center gap-16 ">
          <div className="form_box flex-1 lining-nums">
            <h3 className=" font-bold text-[23px] ss:text-[33px]">
              {data?.car_categories?.categories_name}{" "}
              {data?.car_categories_seria?.name} {data?.car_name}
            </h3>
            <h4 className="md:text-[35px]">{data?.car_price}</h4>
            <div
              className={` flex items-center  my-12 gap-4 leading-8 text-[13px] font-bold md:text-[20px] md:leading-8 lining-nums`}
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
              className={` flex items-center gap-4 leading-6 text-[13px] font-bold md:text-[20px] md:leading-8 lining-nums`}
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
          </div>
          <div className="img_box flex-1">
            <div className="w-[600px] h-[300px]">
              <AdminThumbnail data={data} getData={getData} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCatalogDatails;
