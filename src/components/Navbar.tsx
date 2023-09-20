import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { navList, social_icon } from "../utils/constants";
import burger from "../assets/burger.svg";
import phoneIcon from "../assets/Vectorphone.png";
import mobilLogo from "../assets/mobil_logo.png";
import mobilBurger from "../assets/mobil_burger.png";
import { styles } from "../utils/styles";
import { useState } from "react";

const Navbar = () => {
  const [navShow, setNavShow] = useState<boolean>(false);
  return (
    <>
      <div
        className={`navbar ${styles.flexBetween}  hidden md:flex  text-white gap-20   bg-primary px-5 h-[110px] md:h-[160px] ss:px-10  `}
      >
        <div className=" flex gap-8 items-center">
          <div className="logo ">
            <Link to={"/"}>
              <img src={logo} alt="logo bridge auto" className="w-[220px]" />
            </Link>
          </div>
          <div className="burger" onClick={() => setNavShow(true)}>
            <img src={burger} alt="buger" className="w-[30px]" />
          </div>
        </div>

        <ul
          className={`nav_list ${styles.flexBetween} max-w-[700px] w-[100%] text-[14px] hidden md:flex  md:text-[15px]  bg-primary md:relative lg:text-[18px]  ] `}
        >
          {navList.map((navs) => (
            <li key={navs.name} className="nav_link">
              <Link to={navs.path} className="xs:font-bold  ">
                {navs.name}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className={`contact ${styles.flexCenter}   md:min-w-[200px]  lg:min-w-[250px] ${styles.mainBtn} lining-nums`}
        >
          <img src={phoneIcon} alt="phone-icon" />
          +7 (928) 461-41-41
        </a>
      </div>

      <div
        className={`mobile_navlist_top md:hidden w-full h-[75px]  relative px-4 ${styles.flexBetween} `}
      >
        <Link to={"/"} className="z-10">
          <img src={mobilLogo} alt="logo" width={130} className="logo z-10" />
        </Link>
        <img
          src={mobilBurger}
          alt="burger "
          className="burger"
          width={20}
          onClick={() => setNavShow(true)}
        />
      </div>

      <div
        className={`mobile_navlist ${
          styles.flexCollumCenter
        }  md:hidden top-0 right-[-1000px] z-[999] transition-all fixed bg-white  w-[220px] h-[100vh] pb-10 ${
          navShow ? "right-[0px]" : "right-[-1000px]"
        }`}
      >
        <div
          className={`mobile_navlist_top w-full h-[75px]  relative px-4 ${styles.flexBetween} `}
        >
          <Link to={"/"} className="z-10">
            <img src={mobilLogo} alt="logo" width={130} className="logo z-10" />
          </Link>
          <img
            src={mobilBurger}
            alt="burger "
            className="burger"
            width={20}
            onClick={() => setNavShow(false)}
          />
        </div>
        <ul className={`${styles.flexCollumCenter} gap-6 `}>
          {navList.map((navs) => (
            <li key={navs.name}>
              <Link
                to={navs.path}
                className="font-extrabold text-primary text-[14px]"
              >
                {navs.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className={`social ${styles.flexCenter} gap-6`}>
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
        <a
          href="#"
          className={`contact ${styles.flexCenter}  ${styles.mainBtn} text-white text-[11px] font-bold px-6 lining-nums`}
        >
          <img src={phoneIcon} alt="phone-icon " width={15} />
          +7 (928) 461-41-41
        </a>
      </div>
    </>
  );
};

export default Navbar;
