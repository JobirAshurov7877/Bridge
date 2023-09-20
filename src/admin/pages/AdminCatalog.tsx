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
import {
  AddCatalogModal,
  AddSeries,
  DeleteItemModal,
  EditCatalogModal,
} from "../components";
import { baseURL } from "../../utils/BaseUrl";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
type resType = {
  id: number;
  categories_logo: string;
  categories_name: string;
  categories_seria_id: {
    id: number;
    name: string;
  }[];
};

const AdminCatalog = () => {
  const token = Cookies.get("token");
  const [data, setData] = useState<resType[]>();

  const getData = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/super_admin/categories_car_list/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setData(response?.data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(data)

  useEffect(() => {
    getData();
  }, []);
  return (
    <AdminLayout title="">
      <div className="px-[70px] py-[40px]">
        <Card className="py-5">
          <div className="ml-5 flex gap-2">
            <div className="">
              <AddCatalogModal getData={getData} />
            </div>
            <div className="">
              <AddSeries />
            </div>
          </div>
          <CardBody>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow className="text-[20px]">
                    <TableCell>
                      <b>Логотип</b>
                    </TableCell>
                    <TableCell align="left">
                      <b>Имя</b>
                    </TableCell>
                    <TableCell align="left">Серия</TableCell>

                    <TableCell align="right">Действие</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((row: resType) => (
                    <TableRow
                      key={row?.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <img
                          src={row?.categories_logo}
                          alt="img"
                          className="w-[130px] h-[70px] object-contain rounded-md"
                        />
                      </TableCell>
                      <TableCell align="left">{row.categories_name}</TableCell>
                      <TableCell align="left">
                        <Grid container width={300} columnGap={1} rowGap={1}>
                          {row?.categories_seria_id.map((e) => (
                            <Grid xs={2}>
                              <button className="block w-auto md:inline-block  px-4 py-3 md:py-2 bg-[#00915053] text-light-green-900 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                                {e.name}
                              </button>
                            </Grid>
                          ))}
                        </Grid>
                      </TableCell>

                      <TableCell align="right">
                        <Grid>
                          <Grid marginBottom={1}>
                            <EditCatalogModal
                              getData={getData}
                              initilaData={row}
                            />
                          </Grid>
                          <Grid>
                            <DeleteItemModal
                              url={`categories_car_detail/${row.id}/`}
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

export default AdminCatalog;
