import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TextField from "@mui/material/TextField";
import useFetch from "../../hooks/UseFetch";
import { baseURL } from "../../utils/BaseUrl";
import Cookies from "js-cookie";
import LoadingButton from "@mui/lab/LoadingButton";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddSeries() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const token = Cookies.get("token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { sendData, loading, response } = useFetch({
    method: "post",
    url: `${baseURL}/api/super_admin/categories_seria_car_list/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { name },
  });
  console.log(response?.data);

  const handlePost: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    sendData();
    setName("");
  };
  return (
    <div>
      <button
        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-blue-300 text-blue-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
        onClick={handleClickOpen}
      >
        Добавить серию
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>{"Добавить серию"}</DialogTitle>
        <DialogContent>
          <Grid
            component="form"
            py={1}
            spacing={2}
            container
            onSubmit={handlePost}
          >
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                size="small"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={4}>
              {loading ? (
                <LoadingButton loading variant="outlined">
                  Submit
                </LoadingButton>
              ) : (
                <button
                  type="submit"
                  className="block font-bold w-full md:inline-block md:w-full px-4 py-2  bg-blue-200 text-blue-900  rounded-lg  text-md md:ml-2 md:order-2"
                >
                  Добавить
                </button>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <button
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
            onClick={handleClose}
          >
            Отмена
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
