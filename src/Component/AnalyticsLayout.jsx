import { Routes, Route, Outlet } from "react-router-dom";
import MySidebar from "./MySidebar";
import NavBar from "./navBar";

export default function AnalyticsLayout() {
  return (
    <div className="bg-gray-100 flex w-screen">
      <MySidebar />
      <main className="px-4 flex flex-col w-screen justify-center">
        <div className="mx-2">
          <NavBar />
        </div>
        <Outlet />
        <h1>footer</h1>
      </main>
    </div>
  );
}
