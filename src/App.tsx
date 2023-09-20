import { Route, Routes } from "react-router-dom";
import {
  Catalog,
  CategoryDetail,
  Contact,
  FilterCatalog,
  Home,
  Services,
  ServicesDetail,
  Useful,
  UsefulDetail,
} from "./pages";
import {
  AdminCarDatails,
  AdminCarusel,
  AdminCatalog,
  AdminHome,
  Form,
  Login,
} from "./admin";
import Sitemap from "./Sitemap";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<CategoryDetail />} />
        <Route path="/filter-catalog/:id" element={<FilterCatalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/useful" element={<Useful />} />
        <Route path="/useful/:id" element={<UsefulDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServicesDetail />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/catalog" element={<AdminCatalog />} />
        <Route path="/admin/catalog/:id" element={<AdminCarDatails />} />
        <Route path="/admin/form" element={<Form />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/carusel" element={<AdminCarusel />} />
        <Route path="/sitemap.xml" element={<Sitemap />} />
      </Routes>
    </>
  );
}

export default App;
