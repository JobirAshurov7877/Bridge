import slider_card_1 from "../assets/3dcarblue.png";
import slider_card_2 from "../assets/f3732919dd3b392341c64871a0a4ff3d.png";
import slider_card_3 from "../assets/image 4.png";
// import rr_logo from "../assets/Rolls_Royce_Cullinan_rolls logo 1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Slider3D = () => {
  const [swipperIndex, setSwipperIndex] = useState<number>(0);
  const { scene } = useGLTF("/chevrolet_impala_1967-_supernatural.glb");
  return (
    <div className="slider_car mt-16  items-center w-full">
      <Swiper
        slidesPerView={3}
        spaceBetween={100}
        centeredSlides={true}
        navigation={{
          nextEl: ".swiper-button-next-l-d3",
          prevEl: ".swiper-button-prev-r-d3",
        }}
        loop={true}
        modules={[Pagination, Navigation]}
        onSlideChange={(swiper: { realIndex: number }) =>
          setSwipperIndex(swiper?.realIndex)
        }
        className="mySwiper w-full hidden md:flex items-end"
      >
        <SwiperSlide className="h-300px">
          <Canvas
            // @ts-ignore
            pixelRatio={[1, 2]}
            camera={{ position: [-50, 15, 15], fov: 10 }}
          >
            <ambientLight intensity={1} />
            <Suspense fallback={null}>
              <primitive object={scene} />;
            </Suspense>
            <OrbitControls />
          </Canvas>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slider_card_2}
            alt=""
            width={500}
            className="    object-cover h-full"
          />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <img
            src={slider_card_3}
            width={500}
            alt=""
            className=" h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slider_card_1}
            alt=""
            width={500}
            className=" object-contain "
          />
        </SwiperSlide>
        <SwiperSlide className="h-full">
          <img
            src={slider_card_3}
            width={500}
            alt=""
            className=" h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slider_card_1}
            alt=""
            width={500}
            className=" object-contain "
          />
        </SwiperSlide>
      </Swiper>
      <div className="dealday_navigationBox hidden md:block absolute w-full left-0 mt-7 ">
        <div className=" flex  text-[#0D0D0D80] items-center justify-center">
          <div className="swiper-button-prev-r-d3 cursor-pointer">
            <ChevronLeftIcon />
          </div>
          <p className="lining-nums mr-2 font-bold">{swipperIndex + 1}</p>
          <div className="line bg-[#0D0D0D80] h-[2px] w-[290px]"></div>
          <p className="lining-nums ml-2 font-bold">6</p>
          <div className="swiper-button-next-l-d3 cursor-pointer">
            <ChevronRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider3D;
