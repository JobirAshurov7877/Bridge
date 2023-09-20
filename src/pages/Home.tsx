import { AccordionCustomStyles, DealDay, WhyUs } from "../components";
import { styles } from "../utils/styles";
import { Link } from "react-router-dom";
import phone_3d from "../assets/3diconsphone.png";
import notes_3d from "../assets/3diconsnotes.png";
import search_3d from "../assets/3diconssearch.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation, EffectFade, Autoplay } from "swiper/modules";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import Slider3D from "../components/Slider3D";
import OurPrivilegesSlider from "../components/Our-privileges-slider";
import { BsArrowRight } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import { WhyUscontent, social_icon } from "../utils/constants";
import aboutcompanybanner1 from "../assets/cb9e5cca87906f5f22193ee82581dff6.png";
import aboutcompanybanner2 from "../assets/341a6f0d6c3f5d1bd8a05db9eac37ba6.png";
import axios from "axios";
import { baseURL } from "../utils/BaseUrl";
import grouptrase_r from "../assets/Mask grouptrase_r.png";
import grouptrase_l from "../assets/Mask grouptrase_l.png";

type caruselData = {
  header: string;
  title: string;
  id: number;
  car_id: {
    id: number;
    car_price: number;
    car_name: string;
    images: {
      car_id: number;
      car_img: string;
      id: number;
    }[];
  };
};

const Home = () => {
  const [swipperIndex, setSwipperIndex] = useState<number>(0);
  const [fedeActive, setFedeActive] = useState<boolean>(false);
  const [data, setData] = useState<caruselData[]>([]);

  const handleSlideChange = (swiper: { activeIndex: number }) => {
    setSwipperIndex(swiper.activeIndex);
    setTimeout(() => {
      setFedeActive(false);
    }, 1000);
    setFedeActive(true);
  };
  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/super_admin/header_for_site/`
      );
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    AOS.init();
    getData();
  }, []);

  return (
    <Layout
      link={`https://www.bridgeavto.ru/`}
      subtitle={`Доставка авто из Кореи и Германии под ключ!`}
      title="Доставка авто из Кореи и Германии под ключ!"
      desc="Продажа и доставка авто из Германии и Кореи с полной растаможкой в Москве!"
    >
      <>
        {data.length !== 0 ? (
          <section className="main  flex flex-col md:flex-row md:gap-10 w-full">
            <div className="box  py-10 text-center flex flex-col justify-between pl-0 md:text-start md:pl-[100px] mx-auto w-[270px] ss:w-full ss:flex-1">
              <h1
                className={` ${
                  fedeActive ? "main_text_fede" : ""
                } text-[19px] mt-14 md:text-[43px] lg:text-[43px] xl:text-[47px] font-extrabold uppercase`}
              >
                {data[swipperIndex]?.header}
              </h1>

              <p className="desc text-[#0c121cb2] text-[12px] md:text-[22px] font-medium mt-3">
                {data[swipperIndex]?.title}
              </p>
              <div className="car_detail lining-nums text-start mt-6 hidden md:block">
                <h3 className="name text-[27px] font-semibold">
                  {data[swipperIndex]?.car_id?.car_name}
                </h3>
                <h3 className="price text-[21px] mb-14">
                  {data[swipperIndex]?.car_id?.car_price}
                </h3>
                <Link
                  to={`catalog/${data[swipperIndex]?.car_id?.id}`}
                  className={`${styles.mainBtn} text-white text-[16px] px-11 py-3 `}
                >
                  Заказать сейчас
                </Link>
              </div>
            </div>
            <div className="box flex-1 h-full w-full md:w-[48%]">
              <div className=" relative slider_box w-full h-auto md:h-[80vh] lg:h-[600px]">
                <div>
                  <Swiper
                    slidesPerView={1}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    effect={"fade"}
                    fadeEffect={{ crossFade: true }}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    modules={[Pagination, EffectFade, Autoplay, Navigation]}
                    className=" p-0 h-full"
                    onSlideChange={handleSlideChange}
                  >
                    {data?.map((item) => (
                      <SwiperSlide>
                        <div
                          className={`blur-div h-[50vh] md:h-[80vh] lg:h-[600px] w-full blur-load`}
                        >
                          <img
                            loading="lazy"
                            src={`${baseURL}${item?.car_id?.images[0]?.car_img}`}
                            className=" object-cover h-full md:rounded-bl-2xl md:rounded-tr rounded-b-none rounded-br-none "
                            alt={"flower"}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Custom navigation buttons */}
                  <div className="navigationBox">
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                  </div>
                </div>
              </div>

              <div className="car_detail lining-nums text-center mt-3 ss:hidden">
                <h3 className="name text-[15px] font-semibold">
                  {data[swipperIndex]?.car_id?.car_name}
                </h3>
                <h3 className="price text-[11px] mb-4">
                  {data[swipperIndex]?.car_id?.car_price}
                </h3>
                <Link
                  to={`catalog/${data[swipperIndex]?.car_id?.id}`}
                  className={`${styles.mainBtn} text-white text-[10px] w-[155px] mx-auto py-3 block`}
                >
                  Заказать сейчас
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <div
            role="status"
            className=" md:pl-[100px] mx-auto h-[100vh] animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-start"
          >
            <div className="w-full flex-1 flex flex-col justify-center px-6 md:px-0 md:gap-2 h-[200px] md:h-[80vh]">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] w-full mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] w-full mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] w-full mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] w-full mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
            </div>
            <div className="flex flex-1 items-center justify-center w-full h-[300px] md:h-[80vh] bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
              </svg>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        )}

        {/*  */}
        <section className="deal_day px-[30px] w-full  md:px-[100px] py-[80px]">
          <div className={`section_head mb-7 md:mb-16 ${styles.flexBetween} `}>
            <div className="flex-1">
              <h2
                data-aos="fade-up"
                className=" title_line text-[19px] md:text-[50px] font-extrabold inline-block  uppercase"
              >
                Предложение дня!
              </h2>
            </div>
            <div
              className={`hidden  sellect_category md:${styles.flexBetween} flex-[.5]`}
            >
              <div
                className={`dropdown ${styles.flexCenter} gap-2  w-[170px]`}
              ></div>
              <Link
                to={"/catalog"}
                className={`${styles.mainBtn} text-[13px] lg:text-[16px] text-white px-6`}
              >
                Смотреть все машины
              </Link>
            </div>
          </div>
          <DealDay url="car_fourth" />
        </section>

        {/*  */}
        <section className="our-working px-0 py-[100px] md:px-[100px]">
          <div className=" flex-1">
            <h2 className=" title_line title inline-block font-extrabold text-[19px] md:text-[50px] uppercase mb-10  px-[30px] md:px-0">
              Как мы работаем?
            </h2>
          </div>
          <div className="section_body">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                data-aos="zoom-in"
                className="card w-[300px] md:w-auto min-h-[255px] md:min-h-[450px] px-[42px] py-3 text-primary text-center relative"
              >
                <img
                  src={grouptrase_r}
                  alt=""
                  className="absolute h-[80px] md:h-[110px] right-[0px] bottom-0"
                />
                <div className="card_head">
                  <img
                    src={phone_3d}
                    className="w-[72px]  m-auto md:w-[130px] md:h-[130px]"
                    alt="phone"
                  />
                  <h3 className="card_title  font-extrabold text-[14px] md:text-[25px] uppercase my-3 ">
                    Узнайте стоимость
                  </h3>
                </div>
                <div className="card_body">
                  <div className="card_desc mb-3 md:mb-6">
                    <p className="text-[11px] md:text-[18px] font-medium md:leading-7 text-[#0D0D0D]">
                      Оставьте заявку на бесплатный расчет, наш менеджер
                      сориентирует Вас по ценообразованию и расскажет об этапах
                      сотрудничества и оплаты
                    </p>
                  </div>
                  <Link
                    to={"/"}
                    className={`${styles.mainBtn} w-[130px] m-auto py-2 md:py-3 text-white uppercase block font-semibold text-[8px] md:text-[14px] md:w-[235px]`}
                  >
                    Расчитать стоимость
                  </Link>
                </div>
              </div>

              <div
                data-aos="zoom-in"
                className="card w-[300px] md:w-auto md:min-h-[450px] px-[42px]  py-3 text-primary text-center relative"
              >
                <img
                  src={grouptrase_r}
                  alt=""
                  className="absolute h-[80px] md:h-[110px] right-[0px] bottom-0"
                />
                <div className="card_head">
                  <img
                    src={notes_3d}
                    className="w-[72px]  m-auto md:w-[130px] md:h-[126px]"
                    alt="phone"
                  />
                  <h3 className="card_title font-extrabold text-[14px] md:text-[25px] uppercase my-3">
                    Заключите договор
                  </h3>
                </div>
                <div className="card_body">
                  <div className="card_desc mb-3 md:mb-6">
                    <p className="text-[11px] md:text-[18px] font-medium md:leading-7 text-[#0D0D0D]">
                      Для работы с нашей компанией Вам потребуется заключить с
                      нами агентский договор на покупку автомобиля, в котором
                      пропишем конечную стоимость автомобиля
                    </p>
                  </div>
                  <Link
                    to={"/"}
                    className={`text-[#0D5A2E] text-[10px] md:text-[18px] underline`}
                  >
                    Образец договора
                  </Link>
                </div>
              </div>

              <div
                data-aos="zoom-in"
                className="card w-[300px] md:min-h-[450px] md:w-auto h-auto  px-[42px]  py-3 text-primary text-center relative"
              >
                <img
                  src={grouptrase_r}
                  alt=""
                  className="absolute h-[80px] md:h-[110px] right-[0px] bottom-0"
                />
                <div className="card_head">
                  <img
                    src={search_3d}
                    className="w-[72px]  m-auto md:w-[130px]  md:h-[126px]"
                    alt="phone"
                  />
                  <h3 className="card_title font-extrabold text-[14px] md:text-[25px] uppercase my-3">
                    Узнайте стоимость
                  </h3>
                </div>
                <div className="card_body">
                  <div className="card_desc mb-3 md:mb-6">
                    <p className="text-[11px] md:text-[18px] font-medium md:leading-7 text-[#0D0D0D]">
                      Если Вы ищете новый автомобиль, то мы по Вашим запросам
                      (цвет, комплектация, доп. опции) найдем для Вас авто с
                      официального салона или закажем его на заводе
                    </p>
                  </div>
                </div>
              </div>

              {/* 4-si pastan to'liq ekran widthni egallasin */}
              <div data-aos="zoom-in" className=" col-span-1 md:col-span-4 ">
                <div className="card w-[300px]  md:w-auto min-h-[255px] md:min-h-[450px] px-[24px]  py-3 text-primary text-center relative">
                  <img
                    src={grouptrase_r}
                    alt=""
                    className="absolute h-[70px]  md:h-[150px] right-[0px] bottom-0"
                  />
                  <img
                    src={grouptrase_l}
                    alt=""
                    className="absolute h-[150px] left-[40px] bottom-0"
                  />
                  <div className="card_head">
                    <h3 className="card_title font-extrabold text-[14px] md:text-[40px] uppercase my-3">
                      Узнайте стоимость
                    </h3>
                  </div>
                  <div className="card_body">
                    <div className="card_desc mb-3 md:mb-6 max-w-[860px] w-full">
                      <p className="text-[11px] md:text-[20px] font-medium md:leading-7 text-[#0D0D0D]">
                        Выкупаем автомобиль, готовим к отправке и выстраиваем
                        логистику в Россию. Если авто моложе 3х лет, то доставим
                        через Бишкек напрямую к Вам
                      </p>
                      <p className="text-[11px] md:text-[18px] font-medium md:leading-7 mt-4 text-[#0D0D0D]">
                        После доставки авто в РФ, мы его растаможим, пройдем
                        лабораторию и поможем поставить на учет. После окончание
                        сделки мы не прощаемся с клиентами и помогаем им в
                        дальнейшем в их делах!
                      </p>
                    </div>
                    <Link
                      to={"/"}
                      className={`${styles.mainBtn} w-[130px] md:w-[245px] m-auto text-white block uppercase font-semibold text-[8px] md:text-[14px]  px-5  py-2 md:px-9 md:py-4`}
                    >
                      Связаться с нами
                    </Link>
                    <div className="iconbox flex justify-center items-center mt-3 gap-3">
                      <a href="#">
                        <img src={social_icon[2].img} alt="icn" />
                      </a>
                      <a href="#">
                        <img src={social_icon[1].img} alt="icn" />
                      </a>
                      <a href="#">
                        <img src={social_icon[3].img} alt="icn" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Slider3D />
          </div>
        </section>

        {/*  */}
        <section className="why-us py-5 md:py-16 px-0 md:px-[100px] font-extrabold overflow-hidden">
          <div className="section_head">
            <h2 className="title_line inline-block uppercase my-9 text-[19px] px-[30px] md:px-[0] md:text-[50px]">
              Почему мы?
            </h2>
          </div>
          <div
            data-aos="flip-up"
            className="section_body grid items-center grid-cols-1 md:grid-cols-4 gap-4"
          >
            {WhyUscontent.map((item) => (
              <WhyUs icon={item.icon} title={item.title} desc={item.desc} />
            ))}
          </div>
        </section>

        {/*  */}
        <section className="deal_day px-[30px]  md:px-[100px] py-[70px]">
          <DealDay url="car_filter_fourth" />
          <div className="section_slider_card flex justify-between flex-col md:flex-row"></div>
        </section>

        <section className=" ourPrivileges px-[20px] w-full m-auto  md:px-[100px] py-[70px]  ">
          <h2 className="title title_line inline-block mb-12 text-[19px] md:text-[50px] font-extrabold  flex-1 uppercase">
            Наши привелегии!
          </h2>
          <OurPrivilegesSlider />
        </section>

        <section className=" about-company px-[30px]  md:px-[100px] py-[70px]  ">
          <h2 className="title_line inline-block text-[19px] my-7 md:text-[50px] font-extrabold  flex-1 uppercase">
            О компании!
          </h2>
          <div className="sectionBody mt-14">
            <div className="box flex-col md:flex-row flex  items-start md:items-center gap-6 ">
              <img
                src={aboutcompanybanner2}
                alt=""
                className="w-full xs:w-[60%] rounded-lg z-10"
              />
              <div className=" tracking-wide -translate-y-9 translate-x-7 md:translate-x-0 md:translate-y-0 z-[99] relative md:text-[40px] text-[16px] font-extrabold uppercase before:absolute before:-translate-x-3 before:bg-primary before:w-6 before:h-12  md:before:hidden">
                <h4 className="">
                  Автомобили <br /> в наличии
                </h4>
                <div className="box flex items-end  h-full ">
                  <Link
                    to={"/catalog"}
                    className={`${styles.flexBetween} text-[10px] mt-6 translate-x-9 md:translate-x-0 md:text-[17px] font-medium text-[#0D5A2E] gap-2`}
                  >
                    Перейти в каталог
                    <BsArrowRight className="text-[12px] md:text-[22px]" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="box flex items-center justify-between gap-5 ">
              <div className=" ">
                <h4 className="md:text-[40px] font-extrabold uppercase">
                  Bridge Auto
                </h4>
                <div className="box flex items-end  h-full ">
                  <p className="text-[8px] md:text-[16px] font-semibold leading-3 md:leading-8">
                    <span className="uppercase">Bridge Auto</span> - ваш
                    надежный партнер по импорту автомобилей из зарубежных стран
                    в Россию. Мы специализируемся на привозе авто
                    премиум-класса, спортивных моделей и классических машин.
                    Гарантируем высокое качество и прозрачность сделок. Поможем
                    подобрать авто по вашим предпочтениям и организуем весь
                    процесс покупки, включая таможенное оформление. Более
                    долгосрочное сотрудничество и высокий уровень обслуживания -
                    наш приоритет.
                  </p>
                </div>
              </div>
              <img
                src={aboutcompanybanner1}
                alt=""
                className="w-[43%] -translate-y-5 rounded-lg hidden md:block"
              />
            </div>
          </div>
        </section>

        {/*  */}
        <section className="px-[15px] mt-32 md:px-[100px] mb-10 ">
          <h2 className="title title_line inline-block text-[19px] md:text-[50px] font-extrabold  flex-1 uppercase">
            Частые вопросы!
          </h2>
          <AccordionCustomStyles />
        </section>
        {/*  */}
        <section className="questions  w-full  px-[20px] mb-3 flex md:px-[130px]">
          <div className="card text-center w-full h-[174px] md:min-h-[360px] px-[5px] relative">
            <img
              src={grouptrase_l}
              alt=""
              className="absolute h-[50%] left-[10px] bottom-0"
            />
            <img
              src={grouptrase_r}
              alt=""
              className="absolute h-[50%] right-[10px] bottom-0"
            />
            <h3 className="card_title text-[12px] md:text-[40px] font-extrabold uppercase md:mb-6">
              Есть вопросы? С радостью ответим!
            </h3>
            <p className="card_desc gap-5 text-[#0c121cb2] text-[9px] md:text-[22px] font-medium w-[190px] md:w-full">
              Напишите, что Вас интересует, и мы свяжемся с Вами
            </p>
            <Link
              to={"/contact"}
              className={`${styles.mainBtn} mt-5 py-2 px-5 md:mt-7 text-white text-[8px] md:text-[16px]`}
            >
              Связаться с нами
            </Link>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Home;
