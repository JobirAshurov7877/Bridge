import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Grid, Modal, TextField, Stack } from "@mui/material";
import useFetch from "../../hooks/UseFetch";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { baseURL } from "../../utils/BaseUrl";
import Cookies from "js-cookie";
import { LoadingButton } from "@mui/lab";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

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
interface resType {
  id: number;
  categories_logo: string;
  categories_name: string;
  categories_seria_id: {
    id: number;
    name: string;
  }[];
}

const EditCatalogModal = ({
  initilaData,
  getData,
}: {
  initilaData: resType;
  getData: () => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const animatedComponents = makeAnimated();
  const token = Cookies.get("token");
  const [loading, setLoading] = React.useState<boolean>(false);

  const [data, setData] = React.useState({
    categories_name: initilaData?.categories_name,
    img: initilaData.categories_logo,
    categories_seria: initilaData.categories_seria_id.map((e) => e.id), // Type assertion for categories_seria
  });

  console.log(initilaData);

  const { response } = useFetch({
    method: "GET",
    url: `${baseURL}/api/super_admin/categories_seria_car_list/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);

  const colourOptions = response?.data?.map(
    (item: { id: number; name: string }) => ({
      value: item.id,
      label: item.name,
    })
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map(
      (option: any) => option.value as number
    ); // Type assertion

    setData({ ...data, categories_seria: selectedValues });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setData({ ...data, img: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `${baseURL}/api/super_admin/categories_car_detail/${initilaData?.id}/`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const responseData = await response.json();
    getData();
    setLoading(false);
    handleClose();
    console.log(responseData);
  };

  return (
    <div>
      <button
        className="block w-auto md:inline-block  px-4 py-3 md:py-2 bg-orange-100 text-orange-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
        onClick={handleClickOpen}
      >
        Редактировать
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                type="text"
                name="categories_name"
                fullWidth
                size="small"
                onChange={handleInputChange}
                value={data.categories_name}
                placeholder={"Имя"}
              />
            </Grid>
            <Grid item xs={4} color={"#fff"}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                color={"success"}
              >
                Загрузить файл
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
              </Button>
            </Grid>
          </Grid>
          <div style={{ marginTop: "5px", marginBottom: "5px" }}>
            <Select
              components={animatedComponents}
              isMulti
              defaultValue={initilaData?.categories_seria_id?.map((item) => ({
                value: item?.id,
                label: item?.name,
              }))}
              options={colourOptions}
              onChange={handleSelectChange}
            />
          </div>
          <Stack
            alignItems={"center"}
            justifyContent={"end"}
            direction={"row"}
            gap={1}
          >
            {loading ? (
              <LoadingButton loading variant="outlined">
                Submit
              </LoadingButton>
            ) : (
              <button
                type="submit"
                className="block w-[90px] md:inline-block  px-4 py-3 md:py-2 bg-[#00915053] text-light-green-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              >
                Save
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
};
export default EditCatalogModal;
