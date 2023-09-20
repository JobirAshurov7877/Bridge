import { Helmet } from "react-helmet";
import { Footer, Navbar } from "./components";
import Social from "./components/Social";

const Layout = ({
  title,
  desc,
  children,
  link,
  subtitle,
}: {
  title: string;
  desc: string;
  link: string;
  subtitle: string;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta name="robots" content="max-image-preview:large" />
        <meta property="og:title" content={subtitle} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={link} />
        <meta property="og:site_name" content="Bridge Auto" />
      </Helmet>
      <Navbar />
      <Social />
      <main className="min-h-[100vh]">{children}</main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Bridge Auto",
  link: "https://www.bridgeavto.ru",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
};

export default Layout;
