import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "swiper/css/pagination";
import "swiper/css/scrollbar";
import banner from "../assets/Rectangle 3.png";
import banner2 from "../assets/Rectangle 79.png";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";

const Slider = () => {
  const swiperParams = {
    navigation: {
      nextEl: ".swiper-button-next", // Custom next button CSS selector
      prevEl: ".swiper-button-prev", // Custom previous button CSS selector
    },
    modules: [Pagination, Navigation, EffectFade, Autoplay],
    slidesPerView: 1,
    effect: "fade",
    pagination: { clickable: true },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  };

  return (
    <div>
      <Swiper {...swiperParams}>
        <SwiperSlide>
          <div className={`blur-div h-[80vh] w-full blur-load`}>
            <img
              loading="lazy"
              src={banner}
              className="w-[100%] h-[100%] object-cover rounded-t-lg"
              alt={"flower"}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`blur-div h-[80vh] w-full blur-load`}>
            <img
              loading="lazy"
              src={banner2}
              className="w-[100%] h-[100%] object-cover rounded-t-lg"
              alt={"flower"}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`h-[80vh] blur-div w-full blur-load`}>
            <img
              loading="lazy"
              src={banner}
              className="w-[100%] h-[100%] object-cover rounded-t-lg"
              alt={"flower"}
            />
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Custom navigation buttons */}
      <div className="navigationBox">
        <div className="swiper-button-prev">Previous</div>
        <div className="swiper-button-next">Next</div>
      </div>
    </div>
  );
};

export default Slider;
