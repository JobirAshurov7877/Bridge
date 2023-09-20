import * as React from "react";
import Modal from "@mui/material/Modal";
import { styles } from "../utils/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import axios from "axios";
import { baseURL } from "../utils/BaseUrl";
import { CarData } from "../admin/pages/AdminHome";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
interface filterProps {
  setData: (value: CarData[]) => void;
}

const FilterModal = ({ setData }: filterProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categories, setCategories] = React.useState([]);
  const [categoriesId, setCategoriesId] = React.useState("");
  const [series, setSeries] = React.useState([]);
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
  
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/api/super_admin/all_categories/`
      );
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeSeries = async (e: any) => {
    setCategoriesId(e.target.value as string);
    try {
      const { data } = await axios.get(
        `${baseURL}/api/super_admin/filter_for_categories/${e.target.value}`
      );
      setSeries(data?.categories_seria_id);
      c
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseURL}/api/super_admin/car_filter_for_many_categories/`,
        { get_id: categoriesId, list_param: personName }
      );

      setData(data);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className={`${styles.mainBtn} text-[13px] lg:text-[16px] text-white px-6`}
      >
        Фильтр автомобиля
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 700,
            width: "100%",
            background: "background.paper",
            borderRadius: "5px",
            padding: "30px",
            height: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <div style={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Каталог</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Каталог"
                value={categoriesId}
                onChange={handleChangeSeries}
                required
              >
                {categories?.map(
                  (item: {
                    id: number;
                    categories_name: string;
                    categories_logo: string;
                  }) => (
                    <MenuItem value={item?.id}>
                      {item?.categories_name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <FormControl
              sx={{ marginTop: "20px" }}
              disabled={series.length == 0}
              fullWidth
            >
              <InputLabel id="demo-multiple-checkbox-label">Series</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                onChange={handleChange}
                input={<OutlinedInput label="Cерия" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
                value={personName}
                required
              >
                {series.map((item: any) => (
                  <MenuItem key={item?.id} value={item?.id}>
                    <Checkbox checked={personName.indexOf(item?.id) > -1} />
                    <ListItemText primary={item?.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="action">
            <button
              onClick={handleSubmit}
              className={`${styles.mainBtn} text-[13px] lg:text-[16px] text-white px-6`}
            >
              Фильтр автомобиля
            </button>
            <button
              onClick={handleClose}
              className={`${styles.mainBtn} text-[13px] lg:text-[16px] text-white px-6`}
            >
              Отмена
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FilterModal;
