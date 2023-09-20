import facebook from "../assets/g10facebook.svg";
import telegram from "../assets/Path-3telegram.svg";
import instagram from "../assets/Vectorinstagram.svg";
import whatsapp from "../assets/Vectorwhatsap.svg";

import banner1 from "../assets/Rectangle 3.png";
import banner2 from "../assets/Rectangle 4.png";
import banner3 from "../assets/Rectangle 5.png";
import banner4 from "../assets/Rectangle 7mainBanner3.png";
import banner5 from "../assets/Rectangle 6mainBanner5.png";
import banner6 from "../assets/Rectangle 6mainBanner6.png";

import phone_3d from "../assets/3dicons (1).png";
import fire_3d from "../assets/30ca786287ec7fed5317bc92b89f2bea.png";
import target_3d from "../assets/7dd75870a6cc68ca23141ad200cab238.png";
import camera_3d from "../assets/ea8ee34823904097b07ba3e01ad87074.png";

export const navList = [
  {
    name: "Главная",
    path: "/",
  },
  {
    name: "Каталог",
    path: "/catalog",
  },
  {
    name: "Услуги",
    path: "/services",
  },
  {
    name: "Полезное",
    path: "/useful",
  },
  {
    name: "Контакты",
    path: "/contact",
  },
];

export const social_icon = [
  {
    img: facebook,
    alt: "facebook",
    link: "#",
  },
  {
    img: telegram,
    alt: "telegram",
    link: "#",
  },
  {
    img: instagram,
    alt: "instagram",
    link: "#",
  },
  {
    img: whatsapp,
    alt: "whatsapp",
    link: "#",
  },
];

export const heroText = [
  {
    h1: "Подбор и доставка автомобилей под ключ с зарубежных стран",
    name: "BMW  3 g20 2023",
    price: "от 3.990.000 р",
    link: "/",
    img: banner1,
  },
  {
    h1: "Комплексный автомобильный сервис с закупкой и доставкой авто из-за границы",
    name: "Zeekr",
    price: "от 4.540.000 р  ",
    link: "/",
    img: banner2,
  },
  {
    h1: "Элегантный и мощный Audi Q8 - воплощение совершенства на дороге!",
    name: "Audi Q8",
    price: "от 11.200.000 р",
    link: "/",
    img: banner3,
  },
  {
    h1: "Наслаждайтесь комфортом и динамикой вместе с BMW X5!",
    name: "НОВЫЙ BMW X5",
    price: "от  11.200.000 р",
    link: "/",
    img: banner4,
  },
  {
    h1: "Переживите незабываемые моменты с Mercedes-Benz GLS!",
    name: "Mercedes Gls 450",
    price: "230.000$",
    link: "/",
    img: banner5,
  },
  {
    h1: "Доверьте поиск своего идеального автомобиля профессиональному брокеру",
    name: "Li 9",
    price: "от 3.990.000 р",
    link: "/",
    img: banner6,
  },
];

export const WhyUscontent = [
  {
    icon: phone_3d,
    title: "Оплата по частям",
    desc: " Оплата  идет частями в процентовки 70%-5%-25% Или второй вариант вносите аванс 10% оставшаяся часть 90% при получение автомобиля.",
  },
  {
    icon: fire_3d,
    title: "Проверка Авто",
    desc: "Покупатель может лично увидеть автомобиль, проверить его состояние, провести тест-драйв и получить информацию о его истории. ",
  },
  {
    icon: target_3d,
    title: "продажа вашего авто",
    desc: "Поможем вам в продаже вашего собсвтвенного авто, или же вы сможете сдать его нам в Trade-in ",
  },
  {
    icon: camera_3d,
    title: "Фото и видео отчеты",
    desc: "Предоставляем фото и видео отчетов на каждом этапе покупки, перевозки машины. Гарантируем полную отвественность и безопасность вашего авто! ",
  },
];
