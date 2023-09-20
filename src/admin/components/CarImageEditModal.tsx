import React, { useState } from "react";
import { baseURL } from "../../utils/BaseUrl";
import axios from "axios";
import { Box, Dialog, Slide, Stack } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CarImageEditModal = ({
  id,
  getData,
}: {
  id: number;
  getData: () => void;
}) => {
  const [img, setImage] = useState<File | null>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const formData = new FormData();

    if (img) {
      formData.append("img", img);
    }
    e.preventDefault();
    try {
      await axios.put(
        `${baseURL}/api/super_admin/car_image_details/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getData();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <button
          onClick={handleOpen}
          className="block absolute z-[9999] top-2 left-2 w-auto md:inline-block  px-4 py-3 md:py-2 bg-orange-100 text-orange-900 rounded-lg font-bold text-sm md:ml-2 md:order-2"
        >
          Редактировать изображение
        </button>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"md"}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <div
            style={{ padding: "35px" }}
            className=" font-sans text-gray-900 bg-gray-300 border-box"
          >
            <div className="flex justify-center w-full mx-auto sm:max-w-lg">
              <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                <div className="mt-10 mb-10 text-center">
                  <h2 className="text-2xl font-semibold mb-2">
                    Загрузите свои файлы
                  </h2>
                </div>
                <div className="relative w-4/5 h-32 max-w-xs mb-10  bg-gray-100 rounded-lg shadow-inner">
                  <input
                    onChange={handleFileChange}
                    type="file"
                    id="file-upload"
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
                  >
                    <p className="z-10 text-xs font-light text-center text-gray-500">
                      Загрузить изображение (.jpg, png...)
                    </p>
                    <svg
                      className="z-10 w-8 h-8 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                  </label>
                </div>
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
        </Box>
      </Dialog>
    </div>
  );
};

export default CarImageEditModal;
