import { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Controller } from "swiper/modules";
import "./slide.css";
import SwiperCore from "swiper";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { CarData } from "../admin/pages/AdminHome";
import { baseURL } from "../utils/BaseUrl";

const ThumbnailSlider = ({ data }: { data: CarData | undefined }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();

  const swiper1Ref = useRef<React.MutableRefObject<null>>(null);
  const swiper2Ref = useRef();

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      // @ts-ignore
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  return (
    <div className="z-50 h-full w-auto  relative">
      <Swiper
        onSwiper={(swiper) => {
          if (swiper1Ref.current !== null) {
            // @ts-ignore
            swiper1Ref.current = swiper;
          }
        }}
        navigation={{
          nextEl: ".swiper-button-next-l-t",
          prevEl: ".swiper-button-prev-r-t",
        }}
        spaceBetween={10}
        slidesPerView={1}
        grabCursor={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Controller]}
        className="relative w-full bg-transparent"
      >
        {data?.images?.map((item) => (
          <SwiperSlide>
            <div className="relative w-auto h-full">
              <img
                src={`${baseURL}${item.car_img}`}
                alt="img"
                className="object-cover w-full  h-[300px]   md:h-[500px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        loop={true}
        spaceBetween={2}
        slidesPerView={5}
        watchSlidesProgress
        touchRatio={0.2}
        slideToClickedSlide={true}
        onSwiper={setThumbsSwiper}
        modules={[Navigation, Thumbs, Controller, FreeMode]}
        className="w-full mt-2 hidden lg:flex  h-[100px]"
      >
        {data?.images?.map((item) => (
          <SwiperSlide>
            <img
              src={`${baseURL}${item.car_img}`}
              alt="img"
              className="object-cover w-full h-full bg-transparent"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="dealday_navigationBox absolute w-full left-0 mt-7  block">
        <div className=" flex  text-[#0D0D0D80] items-center justify-center">
          <div className="swiper-button-prev-r-t cursor-pointer">
            <ChevronLeftIcon />
          </div>
          <div className="line bg-[#0D0D0D80] h-[2px] w-[220px] md:w-[290px]"></div>
          <div className="swiper-button-next-l-t cursor-pointer">
            <ChevronRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThumbnailSlider;
