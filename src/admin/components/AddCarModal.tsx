import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import Select from "react-select";
import { TransitionProps } from "@mui/material/transitions";
import {
  Dialog,
  Grid,
  Slide,
  Typography,
  TextField,
  Box,
  Stack,
} from "@mui/material";
import UseFetch from "../../hooks/UseFetch";
import { baseURL } from "../../utils/BaseUrl";
import Cookies from "js-cookie";
import axios from "axios";

type ConvertedData = { value: number; label: string };

type SeriesData = {
  categories_name: string;
  id: number;
  categories_seria_id: {
    id: number;
    name: string;
  }[];
};
type OptionType = {
  value: string | number;
  label: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCardModal({ getData }: { getData: () => void }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [uploaded_images, setUploaded_images] = useState<File[]>();

  const [data, setData] = useState({
    car_name: "",
    car_price: null as number | null,
    car_year_of_issue: "",
    car_millage: "",
    car_volume: "",
    car_box: "",
    car_power: "",
    car_engene_size: "",
    car_door_seats: "",
    car_drive_unit: "",
    car_state: "",
    car_acceleration_to_100: "",
    car_color: "",
    car_max_speed: "",
    car_decriptions: "",
    car_monthly_payment: null as null | number,
    car_categories: null as number | null | undefined,
    car_categories_seria: null as number | null | undefined,
    created_at: null as number | null | undefined,
  });

  const token = Cookies.get("token");
  const { response } = UseFetch({
    method: "GET",
    url: `${baseURL}/api/super_admin/categories_car_list/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append text fields to the FormData object
      for (const key in data) {
        // @ts-ignore
        if (data[key] !== null && data[key] !== undefined) {
          // @ts-ignore
          formData.append(key, data[key]);
        }
      }

      if (uploaded_images) {
        for (let i = 0; i < uploaded_images.length; i++) {
          formData.append("uploaded_images", uploaded_images[i]);
        }
      }

      axios.post(`${baseURL}/api/super_admin/car_model_list/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      getData();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const colourOptions: ConvertedData[] = response?.data?.map(
    (item: { id: number; categories_name: string }) => ({
      value: item.id,
      label: item.categories_name,
    })
  );

  const arr = response?.data.filter(
    (item: { id: number; categories_name: string }) =>
      item.id === data.car_categories
  );

  const seriesOption = arr?.map((item: SeriesData) =>
    item.categories_seria_id.map((e) => ({
      value: e.id,
      label: e.name,
    }))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleCategoryChange = (selectedOption: OptionType | null) => {
    // Use parseInt to convert the selectedOption value to a number, or set it to null if it's null or undefined.
    const newValue = selectedOption
      ? parseInt(selectedOption.value as string, 10)
      : null;
    setData({ ...data, car_categories: newValue });
  };

  const handleSeriesChange = (selectedOption: OptionType | null) => {
    // Use parseInt to convert the selectedOption value to a number, or set it to null if it's null or undefined.
    const newValue = selectedOption
      ? parseInt(selectedOption.value as string, 10)
      : null;
    setData({ ...data, car_categories_seria: newValue });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <button
          onClick={handleOpen}
          className="block w-[90px] md:inline-block  px-4 py-3 md:py-2 bg-[#00915053] text-light-green-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
        >
          <AddIcon />
        </button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"lg"}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          style={{ padding: "35px" }}
        >
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                name="car_categories"
                options={colourOptions}
                onChange={handleCategoryChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                name="seria"
                options={seriesOption ? seriesOption[0] : []}
                onChange={handleSeriesChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="car_name"
                onChange={handleInputChange}
                placeholder={"Имя"}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="car_price"
                onChange={handleInputChange}
                placeholder={"Цена"}
                fullWidth
                type="number"
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="car_monthly_payment"
                onChange={handleInputChange}
                placeholder={"Цена за месяц"}
                fullWidth
                size="small"
                type="number"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="car_year_of_issue"
                onChange={handleInputChange}
                placeholder={"Год выпуска"}
                fullWidth
                type="text"
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="car_millage"
                placeholder={"Пробег"}
                type="number"
                fullWidth
                size="small"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="car_volume"
                onChange={handleInputChange}
                placeholder={"Объем"}
                fullWidth
                type="number"
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="car_power"
                onChange={handleInputChange}
                placeholder={"Мощность"}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_box"
                placeholder={"Коробка"}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_engene_size"
                placeholder={"Тип двигателя"}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_drive_unit"
                placeholder={"Привод"}
                fullWidth
                size="small"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_door_seats"
                placeholder={"Дверей/Мест"}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_color"
                placeholder={"Цвет"}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_state"
                placeholder={"Состояние:"}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                onChange={handleInputChange}
                name="car_max_speed"
                placeholder={"Макс.скорость"}
                fullWidth
                type="number"
                size="small"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                onChange={handleInputChange}
                name="car_acceleration_to_100"
                placeholder={"Разгон до 100 км/ч"}
                fullWidth
                type="number"
                size="small"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                onChange={handleInputChange}
                name="car_decriptions"
                placeholder={"Описание"}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                onChange={handleInputChange}
                name="created_at"
                type="date"
                placeholder={"создан в"}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <Typography>Загрузить:</Typography>
                <ImageUploader
                  accept="accept=image/*"
                  buttonText="Выберите изображение"
                  onChange={(e) => setUploaded_images(e)}
                  imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                  maxFileSize={5242880}
                  fileSizeError=" file size is too big"
                  fileTypeError=" is not supported file extension"
                />
                <div>
                  <Typography>Загруженные изображения:</Typography>
                  <div className="flex gap-1">
                    {uploaded_images?.map((picture, index) => (
                      <img
                        width={100}
                        key={index}
                        src={URL.createObjectURL(picture)}
                        alt={`Rasm ${index}`}
                      />
                    ))}
                  </div>
                </div>
                <Stack
                  alignItems={"center"}
                  justifyContent={"end"}
                  direction={"row"}
                  gap={1}
                >
                  <button
                    type="submit"
                    className="block w-[120px] md:inline-block  px-4 py-3 md:py-2 bg-[#00915053] text-light-green-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                  >
                    Сохранять
                  </button>
                  <button
                    onClick={handleClose}
                    className="block w-[90px] md:inline-block  px-4 py-3 md:py-2 bg-red-100 text-red-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                  >
                    Отмена
                  </button>
                </Stack>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}
