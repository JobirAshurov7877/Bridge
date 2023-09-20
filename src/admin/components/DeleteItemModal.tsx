import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import { baseURL } from "../../utils/BaseUrl";
import { LoadingButton } from "@mui/lab";
import Cookies from "js-cookie";
import axios from "axios";
export interface ColourOption {
  readonly value: string;
  readonly label: string;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteItemModal = ({
  url,
  getData,
}: {
  url: string;
  getData: () => void;
}) => {
  const token = Cookies.get("token");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteData = async () => {
    handleClose();
    try {
      setLoading(true);
      const response = await axios.delete(`${baseURL}/api/super_admin/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
    getData();
  };

  return (
    <div>
      <button
        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-100 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
        onClick={handleClickOpen}
      >
        Удалить
      </button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50  mx-4 md:relative">
          <div className="md:flex items-center">
            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p className="font-bold">Удалить элемент</p>
              <p className="text-sm text-gray-700 mt-1">
                Удалив элемент, вы потеряете все свои данные. Этот действие
                необратимо.
              </p>
            </div>
          </div>
          <div className="text-center md:text-right mt-4 md:flex md:justify-end">
            <button
              onClick={handleClose}
              className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
            >
              Отмена
            </button>

            {loading ? (
              <LoadingButton loading variant="outlined">
                delete
              </LoadingButton>
            ) : (
              <button
                onClick={deleteData}
                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-100 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
              >
                Удалить
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteItemModal;
