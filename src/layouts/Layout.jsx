import { Outlet } from "react-router-dom";

import Footer from "./Footer.jsx";
import GNB from "./GNB.jsx";

export default function Layout() {
  return (
    <div className="relative">
      <GNB />
      <main className="pt-20 pb-20 min-h-screen bg-green-100 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
