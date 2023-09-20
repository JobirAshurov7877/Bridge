import { Link } from "react-router-dom";
import { styles } from "../utils/styles";
import { BsArrowRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import axios from "axios";
import { baseURL } from "../utils/BaseUrl";
import { useEffect, useState } from "react";
import { CarData } from "../admin/pages/AdminHome";
import { SkeletonCards } from ".";

const DealDay = ({ url }: { url: string }) => {
  const [data, setData] = useState<CarData[]>([]);
  const [swipperIndex, setSwipperIndex] = useState<number>(0);

  const getData = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/api/super_admin/${url}/`);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="w-full">
        {data.length === 0 ? (
          <SkeletonCards />
        ) : (
          <>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loopedSlides={3}
              navigation={{
                nextEl: ".swiper-button-next-l",
                prevEl: ".swiper-button-prev-r",
              }}
              loop={true}
              modules={[Pagination, Navigation]}
              className="mySwiper w-full hidden md:grid "
              onSlideChange={(swiper: { realIndex: number }) =>
                setSwipperIndex(swiper?.realIndex)
              }
            >
              {data?.map((item) => (
                <SwiperSlide key={item?.id}>
                  <div
                    data-aos="zoom-in"
                    className="deal_day_card  min-w-[100%] md:min-w-[360px]"
                  >
                    <div className="card_head ">
                      <img
                        src={`${baseURL}${item?.images[0]?.car_img}`}
                        alt="cars"
                        className="w-[265px] md:w-full h-[220px] m-auto object-cover"
                      />
                    </div>
                    <div className="card_body">
                      <div
                        className={`car_name ${styles.flexCenter} gap-2 mt-5`}
                      >
                        <img
                          src={item?.car_categories?.categories_logo}
                          alt="logo"
                          className="w-7"
                        />
                        <h3 className="text-[14px] md:text-[25px] font-bold uppercase">
                          {item?.car_categories?.categories_name}{" "}
                          {item?.car_categories_seria?.name} {item?.car_name}
                        </h3>
                      </div>
                      <div
                        className={`car_details flex justify-between items-end text-[11px] md:text-[16px] mt-5 md:mt-8`}
                      >
                        <div className="box lining-nums leading-7 md:leading-10">
                          <h5 className={`text-primary font-medium`}>
                            Объем/
                            <span className="text-[#0c121c7f]">
                              {item?.car_volume}
                            </span>
                          </h5>
                          <h5 className={`text-primary font-medium`}>
                            Цвет кузова/
                            <span className="text-[#0c121c7f]">
                              {item?.car_color}
                            </span>
                          </h5>

                          <h5 className={`text-primary font-medium`}>
                            Год выпуска/
                            <span className="text-[#0c121c7f]">
                              {item?.car_year_of_issue} год
                            </span>
                          </h5>
                        </div>
                        <div className="box flex items-end  h-full ">
                          <Link
                            to={`/catalog/${item?.id}`}
                            className={`${styles.flexBetween} md:text-[15px] -translate-y-2 font-medium text-[#0D5A2E] gap-2`}
                          >
                            Подробнее{" "}
                            <BsArrowRight className="text-[15px] md:text-[20px]" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {data.length !== 0 ? (
              <div className="dealday_navigationBox absolute w-full left-0 mt-7 hidden md:block">
                <div className=" flex  text-[#0D0D0D80] items-center justify-center">
                  <div className="swiper-button-prev-r cursor-pointer">
                    <ChevronLeftIcon />
                  </div>
                  <p className="lining-nums mr-2 font-bold">
                    {swipperIndex + 1}
                  </p>
                  <div className="line bg-[#0D0D0D80] h-[2px] w-[290px]"></div>
                  <p className="lining-nums ml-2 font-bold">{data?.length}</p>
                  <div className="swiper-button-next-l cursor-pointer">
                    <ChevronRightIcon />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
      <div className="flex section_slider_card relative md:hidden gap-4 justify-between flex-col md:flex-row">
        <>
          {data?.map((item) => (
            <div className="deal_day_card " key={item?.id}>
              <div className="card_head my-5">
                <img
                  src={`${baseURL}${item?.images[0]?.car_img}`}
                  alt="cars"
                  className="w-[265px] md:w-[300px]  h-[150px] m-auto object-cover"
                />
              </div>
              <div className="card_body mx-5">
                <div className={`car_name ${styles.flexCenter} gap-2 mt-5`}>
                  <img
                    src={item?.car_categories?.categories_logo}
                    alt="logo"
                    className="w-7"
                  />
                  <h3 className="text-[14px] md:text-[25px] font-bold uppercase">
                    {item?.car_categories?.categories_name}{" "}
                    {item?.car_categories_seria?.name} {item?.car_name}
                  </h3>
                </div>
                <div
                  className={`car_details flex justify-between items-end text-[11px] md:text-[18px] mt-5 md:mt-8`}
                >
                  <div className="box lining-nums leading-7 md:leading-10">
                    <h5 className={`text-primary font-medium`}>
                      Объем/
                      <span className="text-[#0c121c7f]">
                        {item?.car_volume}
                      </span>
                    </h5>
                    <h5 className={`text-primary font-medium`}>
                      Цвет кузова/
                      <span className="text-[#0c121c7f]">
                        {item?.car_color}
                      </span>
                    </h5>

                    <h5 className={`text-primary font-medium`}>
                      Год выпуска/
                      <span className="text-[#0c121c7f]">
                        {item?.car_year_of_issue} год
                      </span>
                    </h5>
                  </div>
                  <div className="box flex items-end  h-full ">
                    <Link
                      to={`/catalog/${item?.id}`}
                      className={`${styles.flexBetween} font-medium text-[#0D5A2E] gap-2`}
                    >
                      Подробнее{" "}
                      <BsArrowRight className="text-[15px] md:text-[22px]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      </div>
    </>
  );
};

export default DealDay;
