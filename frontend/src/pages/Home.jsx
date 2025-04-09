import { Outlet } from "react-router";
import Menu from "../components/Menu";
import CargarArchivos from "../components/CargarArchivos";

function Home() {
  return (
    <>
      <Menu />
      <CargarArchivos />
      <Outlet />
    </>
  );
}

export default Home;
