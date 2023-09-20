import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-[-90deg]" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const AccordionCustomStyles = () => {
  const [open, setOpen] = useState<number>(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <div className="mt-16">
      <Accordion
        open={open === 1}
        icon={<Icon id={1} open={open} />}
        className="mb-2 rounded-md border border-primary bg-white px-[11px] md:px-[44px] md:py-[7px] "
      >
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className=" border-none text-[12px] md:text-[23px] font-bold font-raleway text-primary"
        >
          Можно ли посмотреть автомобили?
        </AccordionHeader>
        <AccordionBody className="font-raleway font-medium text-[12px] md:text-[18px] max-w-[1000px] w-full">
          Да можно, перед покупокой делается фото видеообзор. На всех этапах
          идет сопровождение сделает ответы фото видно поэтапно 1. Покупка 2.
          Отправка 3. таможня dreams.
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 2}
        icon={<Icon id={2} open={open} />}
        className="mb-2 rounded-md border border-primary bg-white px-[11px] md:px-[44px] md:py-[7px] "
      >
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="bg-white border-none text-[12px] md:text-[23px] font-bold font-raleway text-primary"
        >
          Как производиться оплата?
        </AccordionHeader>
        <AccordionBody className="font-raleway font-medium text-[12px] md:text-[18px] max-w-[1000px] w-full">
          Оплата производится по нескольким вариантам, безналичными, наличными,
          и криптовалютой. Так же будет возможность подключить банки кредиты.
        </AccordionBody>
      </Accordion>

      <Accordion
        open={open === 3}
        icon={<Icon id={3} open={open} />}
        className="mb-2 rounded-md border border-primary bg-white px-[11px] md:px-[44px] md:py-[7px] "
      >
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className="bg-white border-none text-[12px] md:text-[23px] font-bold font-raleway text-primary"
        >
          Сколько стоит растаможка автомобиля?
        </AccordionHeader>
        <AccordionBody className="font-raleway font-medium text-[12px] md:text-[18px] max-w-[1000px] w-full">
          Растаможка автомобилей зависит от выбора модели мотора и года
          автомобиля
        </AccordionBody>
      </Accordion>
      <Accordion
        open={open === 4}
        icon={<Icon id={4} open={open} />}
        className="mb-2 rounded-md border border-primary bg-white px-[11px] md:px-[44px] md:py-[7px] text-primary"
      >
        <AccordionHeader
          onClick={() => handleOpen(4)}
          className="bg-white border-none text-[12px] md:text-[23px] font-bold font-raleway text-primary"
        >
          Сколько ждать заказанный автомобиль?
        </AccordionHeader>
        <AccordionBody className="font-raleway font-medium text-[12px] md:text-[18px] max-w-[1000px] w-full">
          Сроки заказа автомобиля зависят от страны вывоза в среднем от 2-х
          недель до 3-Х месяцев.
        </AccordionBody>
      </Accordion>
    </div>
  );
};
export default AccordionCustomStyles;
