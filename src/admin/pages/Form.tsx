import AdminLayout from "../Admin-layout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { baseURL } from "../../utils/BaseUrl";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

type resData = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
};
const Form = () => {
  const [data, setData] = useState<resData[]>();

  const getData = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.get(
        `${baseURL}/api/super_admin/save_contact/`,
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <AdminLayout title="">
      <div className="px-[70px] py-[40px] font-raleway">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ИМЯ</b>
                </TableCell>
                <TableCell align="center">
                  <b>ПОЧТА</b>
                </TableCell>
                <TableCell align="center">
                  <b>НОМЕР</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                    {row?.full_name}
                  </TableCell>
                  <TableCell align="center">{row?.email}</TableCell>
                  <TableCell align="center">{row?.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
};

export default Form;
