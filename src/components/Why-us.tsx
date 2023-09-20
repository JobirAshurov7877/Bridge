const WhyUs = ({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) => {
  return (
    <div className="card w-[300px] md:w-auto min-h-[255px] md:min-h-[450px] px-[20px] py-3 text-primary text-center">
      <div className="card_head">
        <img
          src={icon}
          className="w-[72px]  m-auto md:w-[130px] md:h-[130px]"
          alt="icon"
        />
        <h3 className="card_title font-extrabold text-[14px] md:text-[25px] uppercase my-3 ">
          {title}
        </h3>
      </div>
      <div className="card_body">
        <div className="card_desc mb-3 md:mb-6">
          <p className="text-[10px] lining-nums leading-5 md:text-[17px] font-medium md:leading-7 text-[#0d0d0dcc]">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
