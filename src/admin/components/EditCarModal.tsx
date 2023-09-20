import React from "react";
import Select from "react-select";
import { TransitionProps } from "@mui/material/transitions";
import { useState } from "react";
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
import { CarData } from "../pages/AdminHome";

type ConvertedData = { value: number; label: string };

type seriesData = {
  categories_name: string;
  id: number;
  categories_seria_id: {
    id: number;
    name: string;
  }[];
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditCarModal = ({
  initData,
  getData,
}: {
  initData: CarData;
  getData: () => void;
}) => {
  console.log(initData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState({
    car_name: initData?.car_name || "",
    car_price: initData?.car_price,
    car_year_of_issue: initData?.car_year_of_issue || "",
    car_millage: initData?.car_millage,
    car_volume: initData?.car_volume || "",
    car_box: initData?.car_box || "",
    car_power: initData?.car_power || "",
    car_engene_size: initData?.car_engene_size || "",
    car_door_seats: initData?.car_door_seats || "",
    car_drive_unit: initData?.car_drive_unit || "",
    car_state: initData?.car_state || "",
    car_acceleration_to_100: initData?.car_acceleration_to_100 || "",
    car_color: initData?.car_color || "",
    car_max_speed: initData?.car_max_speed || "",
    car_monthly_payment: initData?.car_monthly_payment,
    car_categories: initData?.car_categories?.id || "",
    car_categories_seria: initData?.car_categories_seria.id,
    car_decriptions: initData?.car_decriptions,
    created_at: initData?.created_at || "",
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

      for (const key in data) {
        // @ts-ignore
        if (data[key] !== null && data[key] !== undefined) {
          // @ts-ignore
          formData.append(key, data[key]);
        }
      }

      const response = await axios.put(
        `${baseURL}/api/super_admin/car_model_detail/${initData?.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
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

  const seriesOption = arr?.map((item: seriesData) =>
    item.categories_seria_id.map((e) => ({
      value: e.id,
      label: e.name,
    }))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <button
          onClick={handleOpen}
          className="block w-auto md:inline-block  px-4 py-3 md:py-2 bg-orange-100 text-orange-900 rounded-lg font-bold text-sm md:ml-2 md:order-2"
        >
          Редактировать
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
          <Typography fontWeight={"bold"}>fvcd</Typography>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                name="car_categories"
                options={colourOptions}
                onChange={(e) =>
                  setData({ ...data, car_categories: e?.value || "" })
                }
                value={colourOptions?.find(
                  (option) => option.value === data.car_categories
                )} // Set the selected value
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isSearchable={true}
                name="seria "
                options={seriesOption ? seriesOption[0] : []}
                onChange={(e) =>
                  setData({ ...data, car_categories_seria: e?.value })
                }
                value={seriesOption?.find(
                  (option: { value: number }) =>
                    option.value === data.car_categories_seria
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="car_name"
                onChange={handleInputChange}
                placeholder={"Имя"}
                fullWidth
                size="small"
                value={data.car_name}
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
                value={data.car_price}
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
                value={data.car_monthly_payment}
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
                value={data.car_year_of_issue}
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
                value={data.car_millage}
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
                value={data.car_volume}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="car_power"
                onChange={handleInputChange}
                placeholder={"Мощность"}
                fullWidth
                size="small"
                value={data.car_power}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_box"
                placeholder={"Коробка"}
                fullWidth
                size="small"
                value={data.car_box}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_engene_size"
                placeholder={"Тип двигателя"}
                fullWidth
                size="small"
                value={data.car_engene_size}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_drive_unit"
                placeholder={"Привод"}
                fullWidth
                size="small"
                value={data.car_drive_unit}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_door_seats"
                placeholder={"Дверей/Мест"}
                fullWidth
                size="small"
                value={data.car_door_seats}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_color"
                placeholder={"Цвет"}
                fullWidth
                size="small"
                value={data.car_color}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                onChange={handleInputChange}
                name="car_state"
                placeholder={"Состояние:"}
                fullWidth
                size="small"
                value={data.car_state}
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
                value={data.car_max_speed}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                onChange={handleInputChange}
                name="car_acceleration_to_100"
                placeholder={"Разгон до 100 км/ч"}
                fullWidth
                size="small"
                type="number"
                value={data.car_acceleration_to_100}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                onChange={handleInputChange}
                name="car_decriptions"
                placeholder={"Описание"}
                fullWidth
                size="small"
                value={data?.car_decriptions}
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
                value={data.created_at}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <Stack
                  alignItems={"center"}
                  justifyContent={"end"}
                  direction={"row"}
                  gap={1}
                >
                  <button
                    type="submit"
                    className="block w-auto md:inline-block  px-4 py-3 md:py-2 bg-[#00915053] text-light-green-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
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
};
export default EditCarModal;
