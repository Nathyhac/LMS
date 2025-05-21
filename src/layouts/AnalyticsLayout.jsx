import { Routes, Route, Outlet } from "react-router-dom";
import SideNav from "../Component/SideNav";
import NavBar from "../Component/navBar";

export default function AnalyticsLayout() {
  return (
    <div className="bg-gray-100 flex w-screen">
      <SideNav />
      <main className="px-4 flex flex-col w-screen justify-center">
        <div className="mx-2">
          <NavBar />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
