import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import GNB from "./GNB";
import { getUser } from "../apis/user";
import { useQuery } from "@tanstack/react-query";

export default function Layout() {
  const { data } = useQuery(["getUser"], getUser);

  return (
    <div className="relative">
      <GNB data={data} />
      <main className="pt-20 pb-20 min-h-screen bg-green-100 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
