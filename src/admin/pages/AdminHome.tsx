import AdminLayout from "../Admin-layout";
import { Link } from "react-router-dom";
import { AddCarModal, DeleteItemModal, EditCarModal } from "../components";
import { Card, CardBody } from "@material-tailwind/react";
import Cookies from "js-cookie";
import { baseURL } from "../../utils/BaseUrl";
import { useEffect, useState } from "react";
import axios from "axios";

export type CarData = {
  car_acceleration_to_100: number;
  car_box: string;
  car_color: string;
  car_door_seats: string;
  car_drive_unit: string;
  car_engene_size: string;
  car_name: string;
  car_power: string;
  car_state: string;
  car_year_of_issue: string;
  created_at: string;
  car_max_speed: number;
  car_millage: number;
  car_volume: number;
  car_price: number;
  car_monthly_payment: number;
  car_decriptions: string;
  id: number;
  car_categories: {
    id: number;
    categories_logo: string;
    categories_name: string;
    categories_seria_id: {
      id: number;
      name: string;
    }[];
  };
  car_categories_seria: {
    id: number;
    name: string;
  };
  images: {
    id: number;
    car_img: string;
    car_id: number;
  }[];
};

const AdminHome = () => {
  const [data, setData] = useState<CarData[]>();
  const token = Cookies.get("token");
  console.log(data);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/super_admin/car_model_list/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <AdminLayout title="admin">
      <div className="px-[70px] ">
        <Card className="my-5">
          <CardBody>
            <div className="flex py-5">
              <AddCarModal getData={getData} />
            </div>
            <div className="catalog gap-16 md:gap-5 grid  grid-cols-3 mt-2">
              {data?.map((item) => (
                <div className="card max-w-[330px] md:max-w-[300px] w-full ">
                  <Link to={`/admin/catalog/${item?.id}`}>
                    <>
                      <div className="card_head p-2">
                        <img
                          src={`${baseURL}${item?.images[0]?.car_img}`}
                          alt="cars"
                          className="h-[160px]  w-full object-cover rounded-md"
                        />
                      </div>
                      <div className="card_body py-5 px-[20px] lining-nums ">
                        <h3 className="car_name uppercase text-[18px] font-bold">
                          {item?.car_categories.categories_name}{" "}
                          {item?.car_categories_seria.name} {item?.car_name}
                        </h3>
                        <div
                          className={`car_features flex items-center mt-2 gap-12 leading-6 text-[15px] font-semibold  `}
                        >
                          <div className="flex flex-col">
                            <span>Пробег:</span>
                            <span>Объем:</span>
                            <span>Тип двигателя:</span>
                          </div>
                          <div className="box text-[#0c121c7f] flex flex-col">
                            <span> {item?.car_millage}</span>
                            <span>{item?.car_volume}</span>
                            <span>{item?.car_engene_size}</span>
                          </div>
                        </div>
                        <div className="car_price flex items-center gap-2 font-bold mt-1">
                          <h5 className="text-[14px] ">Стоимость Авто</h5>
                          <h3 className="text-[21px] ">{item?.car_price}$</h3>
                        </div>
                      </div>
                    </>
                  </Link>
                  <div className="actions flex pb-3">
                    <EditCarModal initData={item} getData={getData} />
                    <DeleteItemModal
                      url={`car_model_detail/${item?.id}/`}
                      getData={getData}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminHome;
