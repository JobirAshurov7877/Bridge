import AdminLayout from "../Admin-layout";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Card, CardBody } from "@material-tailwind/react";
import { AddCarusel, DeleteItemModal, EditCarusel } from "../components";
import { baseURL } from "../../utils/BaseUrl";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

type resType = {
  header: string;
  title: string;
  id: number;
  car_id: {
    id: number;
    images: {
      car_id: number;
      car_img: string;
      id: number;
    }[];
  };
};

const AdminCarusel = () => {
  const token = Cookies.get("token");
  const [data, setData] = useState<resType[]>([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/super_admin/header_list/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response?.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data);

  useEffect(() => {
    getData();
  }, []);
  return (
    <AdminLayout title="">
      <div className="px-[70px] py-[40px]">
        <Card className="py-5">
          <div className="ml-5 flex gap-2">
            <div className="">
              <AddCarusel getData={getData} />
            </div>
          </div>
          <CardBody>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className="text-[20px]">
                    <TableCell>
                      <b>Изображение</b>
                    </TableCell>
                    <TableCell align="left">
                      <b>Заголовок</b>
                    </TableCell>
                    <TableCell align="left">Описание</TableCell>

                    <TableCell align="right">Действие</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((item) => (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <img
                          src={`${baseURL}${item?.car_id?.images[0].car_img}`}
                          alt=""
                          className="w-[150px]"
                        />
                      </TableCell>
                      <TableCell align="left">{item?.header}</TableCell>
                      <TableCell align="left">{item?.title}</TableCell>

                      <TableCell align="right">
                        <Grid>
                          <Grid marginBottom={1}>
                            <EditCarusel getData={getData} initilaData={item} />
                          </Grid>
                          <Grid>
                            <DeleteItemModal
                              url={`header_detail/${item?.id}/`}
                              getData={getData}
                            />
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCarusel;
