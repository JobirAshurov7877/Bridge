const Sitemap = () => {
  const routes = [
    "/",
    "/catalog",
    "/catalog/:id",
    "/filter-catalog/:id",
    "/contact",
    "/useful",
    "/useful/:id",
    "/services",
    "/services/:id",
  ];

  const baseUrl = "https://www.bridgeavto.ru";

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map(
          (route) => `
        <url>
          <loc>${`${baseUrl}${route}`}</loc>
        </url>
      `
        )
        .join("")}
    </urlset>
  `;

  return <div dangerouslySetInnerHTML={{ __html: sitemap }} />;
};

export default Sitemap;
