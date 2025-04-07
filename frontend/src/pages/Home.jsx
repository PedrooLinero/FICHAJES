import { Outlet } from "react-router";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import CargarArchivos from "../components/CargarArchivos";

function Home() {
  return (
    <>
      <Menu />
      <CargarArchivos />
      <Outlet />
      <Footer />
    </>
  );
}

export default Home;
