import { useLayoutEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Controller } from "swiper/modules";

import SwiperCore from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { CarData } from "../pages/AdminHome";
import { baseURL } from "../../utils/BaseUrl";
import CarImageEditModal from "./CarImageEditModal";

const AdminThumbnail = ({
  data,
  getData,
}: {
  data: CarData | undefined;
  getData: () => void;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  console.log(data);
  const swiper1Ref = useRef<React.MutableRefObject<null>>(null);
  const swiper2Ref = useRef();

  useLayoutEffect(() => {
    if (swiper1Ref.current !== null) {
      // @ts-ignore
      swiper1Ref.current.controller.control = swiper2Ref.current;
    }
  }, []);

  return (
    <div className="z-50 h-full w-full">
      <Swiper
        onSwiper={(swiper) => {
          if (swiper1Ref.current !== null) {
            // @ts-ignore
            swiper1Ref.current = swiper;
          }
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
            <div className="relative w-full h-full">
              <img
                src={`${baseURL}${item.car_img}`}
                alt="img"
                className="object-cover w-full h-[300px]"
              />
              <CarImageEditModal getData={getData} id={item?.id} />
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
        className="w-full mt-2  h-20"
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
    </div>
  );
};
export default AdminThumbnail;
