import { createContext } from "react";
import { CarData } from "../admin/pages/AdminHome";

const FilterContext = createContext<CarData[]>([]);

export default FilterContext;
