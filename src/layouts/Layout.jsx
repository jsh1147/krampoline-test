import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import { getUser } from "../apis/user";

import Loader from "../components/account/atoms/Loader";
import ScrollToTop from "./ScrollToTop";
import GNB from "./GNB";
import Footer from "./Footer";

export default function Layout() {
  const { data, isLoading } = useQuery(["getUser"], getUser);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative">
      <ScrollToTop />
      <GNB profileImage={data?.user?.profileImage} />
      <main className="pt-20 pb-20 min-h-screen bg-green-100 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
