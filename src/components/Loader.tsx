import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
  return (
    <div className="absolute top-0 left-0  justify-center w-full h-full  flex items-center ">
      <div className=" h-full w-full fixed left-0 top-0 backdrop:blur-lg bg-[#00000090] "></div>
      <CircularProgress />
    </div>
  );
}
