import { social_icon } from "../utils/constants";

const Social = () => {
  return (
    <div className="h-[75vh]  hidden md:flex flex-col w-24 items-center justify-between pt-24  absolute">
      {social_icon.map((item) => (
        <a
          key={item.alt}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={item.img} alt={item.alt} width={17} />
        </a>
      ))}
    </div>
  );
};

export default Social;
