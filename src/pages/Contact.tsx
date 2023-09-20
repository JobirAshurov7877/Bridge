import Layout from "../Layout";

const Contact = () => {
  return (
    <Layout
      link={`https://www.bridgeavto.ru/contact/`}
      subtitle="Контакт"
      title="Наши контакты: свяжитесь с нами для продажи или покупки автомобиля. Находимся в Москве"
      desc="Свяжитесь с нами для быстрой и надежной продажи или доставки автомобилей из Кореи и Германии в Москву!"
    >
      <div className="mx-[30px]  my-[50px] text-[23px]  md:mx-[130px] flex flex-col md:flex-row">
        <div className="text flex-1">
          <h2 className="font-extrabold uppercase md:text-[50px]">
            Не стесняйтесь <br /> обращаться к нам
          </h2>
          <div
            className={` flex items-center  my-12 gap-4 leading-8 text-[11px] font-bold md:text-[20px] md:leading-10 lining-nums`}
          >
            <div className="flex flex-col text-[#0c121c7f]">
              <span>Телефон:</span>
              <span>Адресс:</span>
              <span>E-mail:</span>
            </div>
            <div className="box  flex flex-col uppercase">
              <span>+7 (928) 461-41-41</span>
              <span>Санкт-Петербург, Лужская 16</span>
              <span>Bradge-auto.info@mail.ru</span>
            </div>
          </div>
          <div
            className={` flex items-center gap-4 leading-6 text-[13px] font-bold md:text-[20px] md:leading-8 lining-nums`}
          >
            <div className="flex flex-col text-[#0c121c7f]">
              <span>Рабочие дни:</span>
              <span>Рабочие часы:</span>
            </div>
            <div className="box  flex flex-col uppercase">
              <span>Пн-сб</span>
              <span>10.00-21.00</span>
            </div>
          </div>
        </div>
        <div className="map w-full h-[500px]  flex-1 my-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d577332.5683088285!2d36.726176852026086!3d55.581033386160605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54afc73d4b0c9%3A0x3d44d6cc5757cf4c!2sMoskva%2C%20Rossiya!5e0!3m2!1suz!2s!4v1695129360060!5m2!1suz!2s"
            width={"100%"}
            height={"100%"}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
