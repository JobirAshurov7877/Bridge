import carimg from "../assets/Group 20.png";
import carmask from "../assets/Mask group (1).png";
import mask from "../assets/OurPrivilegesSlider-mask.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useState } from "react";

const OurPrivilegesSlider = () => {
  const [swipperIndex, setSwipperIndex] = useState<number>(0);
 
  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-l-o",
          prevEl: ".swiper-button-prev-r-o",
        }}
        loop={true}
        autoplay={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper w-full"
        onSlideChange={(swiper: { realIndex: number }) =>
          setSwipperIndex(swiper?.realIndex)
        }
      >
        <SwiperSlide>
          <div className="  md:bg-primary w-full h-auto md:h-[420px] flex items-center relative ">
            <img
              src={mask}
              alt="img"
              className="absolute h-[40%] md:h-[70%]  right-0 z-10 bottom-0"
            />
            <div className="box_l w-[45%] h-full relative">
              <img src="" alt="" />
              <img src={carimg} alt="" className="h-full  object-cover" />
            </div>
            <div className="box_r w-[55%] h-full ">
              <img
                src={carmask}
                alt=""
                className=" hidden md:block absolute w-[70%]  h-full top-0   right-0"
              />
              <div className="text z-[999] m-auto mt-0 md:mt-16 text-primary md:text-white relative w-full md:max-w-[450px]  h-full ring-0 flex flex-col    ">
                <h4 className="text-[15px] md:text-[45px] font-extrabold uppercase">
                  Услуга Trade-in
                </h4>
                <p className="text-[8px] md:text-[16px] font-semibold">
                  Получите максимальную стоимость за старый авто. Обновите
                  автомобиль легко и выгодно с Trade-in. Запишитесь на
                  бесплатную оценку на сайте и выберите идеальное авто из
                  ассортимента.{" "}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="  md:bg-primary w-full h-auto md:h-[420px] flex items-center relative ">
            <img
              src={mask}
              alt="img"
              className="absolute h-[40%] md:h-[70%]  right-0 z-10 bottom-0"
            />
            <div className="box_l w-[45%] h-full relative">
              <img src="" alt="" />
              <img src={carimg} alt="" className="h-full  object-cover" />
            </div>
            <div className="box_r w-[55%] h-full ">
              <img
                src={carmask}
                alt=""
                className=" hidden md:block absolute w-[70%]  h-full top-0   right-0"
              />
              <div className="text z-[999] m-auto mt-0 md:mt-16 text-primary md:text-white relative w-full md:max-w-[450px]  h-full ring-0 flex flex-col    ">
                <h4 className="text-[15px] md:text-[45px] font-extrabold uppercase">
                  Услуга Trade-in
                </h4>
                <p className="text-[8px] md:text-[16px] font-semibold">
                  Получите максимальную стоимость за старый авто. Обновите
                  автомобиль легко и выгодно с Trade-in. Запишитесь на
                  бесплатную оценку на сайте и выберите идеальное авто из
                  ассортимента.{" "}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="  md:bg-primary w-full h-auto md:h-[420px] flex items-center relative ">
            <img
              src={mask}
              alt="img"
              className="absolute h-[40%] md:h-[70%]  right-0 z-10 bottom-0"
            />
            <div className="box_l w-[45%] h-full relative">
              <img src="" alt="" />
              <img src={carimg} alt="" className="h-full  object-cover" />
            </div>
            <div className="box_r w-[55%] h-full ">
              <img
                src={carmask}
                alt=""
                className=" hidden md:block absolute w-[70%]  h-full top-0   right-0"
              />
              <div className="text z-[999] m-auto mt-0 md:mt-16 text-primary md:text-white relative w-full md:max-w-[450px]  h-full ring-0 flex flex-col    ">
                <h4 className="text-[15px] md:text-[45px] font-extrabold uppercase">
                  Услуга Trade-in
                </h4>
                <p className="text-[8px] md:text-[16px] font-semibold">
                  Получите максимальную стоимость за старый авто. Обновите
                  автомобиль легко и выгодно с Trade-in. Запишитесь на
                  бесплатную оценку на сайте и выберите идеальное авто из
                  ассортимента.{" "}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="  md:bg-primary w-full h-auto md:h-[420px] flex items-center relative ">
            <img
              src={mask}
              alt="img"
              className="absolute h-[40%] md:h-[70%]  right-0 z-10 bottom-0"
            />
            <div className="box_l w-[45%] h-full relative">
              <img src="" alt="" />
              <img src={carimg} alt="" className="h-full  object-cover" />
            </div>
            <div className="box_r w-[55%] h-full ">
              <img
                src={carmask}
                alt=""
                className=" hidden md:block absolute w-[70%]  h-full top-0   right-0"
              />
              <div className="text z-[999] m-auto mt-0 md:mt-16 text-primary md:text-white relative w-full md:max-w-[450px]  h-full ring-0 flex flex-col    ">
                <h4 className="text-[15px] md:text-[45px] font-extrabold uppercase">
                  Услуга Trade-in
                </h4>
                <p className="text-[8px] md:text-[16px] font-semibold">
                  Получите максимальную стоимость за старый авто. Обновите
                  автомобиль легко и выгодно с Trade-in. Запишитесь на
                  бесплатную оценку на сайте и выберите идеальное авто из
                  ассортимента.{" "}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="dealday_navigationBox left-0  absolute w-full  mt-7  px-8 md:block">
        <div className=" flex  text-[#0D0D0D80] items-center justify-center">
          <div className="swiper-button-prev-r-o cursor-pointer">
            <ChevronLeftIcon />
          </div>
          <p className="lining-nums mr-2 font-bold">{swipperIndex + 1}</p>
          <div className="line bg-[#0D0D0D80] h-[2px] w-[290px]"></div>
          <p className="lining-nums ml-2 font-bold"> 4</p>
          <div className="swiper-button-next-l-o cursor-pointer ">
            <ChevronRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPrivilegesSlider;
