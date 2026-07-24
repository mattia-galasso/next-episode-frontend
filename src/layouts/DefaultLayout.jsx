import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import Notification from "../components/Notification";

export default function DefaultLayout() {
  return (
    <>
      {/* HEADER */}
      <header className="fixed-top">
        <Navbar />
      </header>

      {/* LOADING CONTEXT */}
      <Loading />

      {/* NOTIFICATION CONTEXT */}
      <Notification />

      {/* MAIN CONTENT */}
      <main>
        <Outlet />
      </main>
    </>
  );
}
