import * as React from "react";

import Box from "@mui/material/Box";
import { Grid, Modal, TextField, Stack } from "@mui/material";

import Select from "react-select";
import makeAnimated from "react-select/animated";

import { baseURL } from "../../utils/BaseUrl";
import Cookies from "js-cookie";
import { LoadingButton } from "@mui/lab";
import Textarea from "@material-tailwind/react/components/Textarea";
import axios from "axios";
import { CarData } from "../pages/AdminHome";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "10px",
  p: 4,
};

export default function AddCarusel({ getData }: { getData: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const animatedComponents = makeAnimated();
  const token = Cookies.get("token");

  const [data, setData] = React.useState({
    header: "",
    title: "",
    car_id: null as number | null,
  });

  const [cars, setCars] = React.useState<CarData[]>([]);

  const getsellectvalue = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/super_admin/car_model_list/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCars(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getsellectvalue();
  }, []);

  const colourOptions = cars?.map((item: { id: number; car_name: string }) => ({
    value: item.id,
    label: item.car_name,
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: any) => {
    setData({ ...data, car_id: e.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${baseURL}/api/super_admin/header_list/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    getData();
    setLoading(false);
    handleClose();
  };

  return (
    <div>
      <button
        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-light-green-400 text-light-green-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
        onClick={handleClickOpen}
      >
        Добавить карусель
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <Select
              components={animatedComponents}
              options={colourOptions}
              onChange={handleSelectChange}
            />
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                name="header"
                fullWidth
                size="small"
                onChange={handleInputChange}
                value={data.header}
                placeholder={"Имя"}
              />
            </Grid>
            <Grid item xs={12}>
              <Textarea
                name="title"
                // @ts-ignore
                onChange={handleInputChange}
                placeholder="Описание"
                className="focus:border-0 focus:outline-none"
              />
            </Grid>
          </Grid>

          <Stack
            mt={5}
            alignItems={"center"}
            justifyContent={"end"}
            direction={"row"}
            gap={2}
          >
            {loading ? (
              <LoadingButton loading variant="outlined">
                Submit
              </LoadingButton>
            ) : (
              <button
                type="submit"
                className="block w-auto md:inline-block  px-4 py-3 md:py-2 bg-[#00915053] text-light-green-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              >
                Сохранять
              </button>
            )}
            <button
              onClick={handleClose}
              className="block w-[90px] md:inline-block  px-4 py-3 md:py-2 bg-red-100 text-red-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
            >
              Отмена
            </button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
