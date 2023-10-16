import { Outlet } from "react-router-dom";

import Footer from "./Footer";

export default function AccountLayout() {
  return (
    <div className="relative">
      <main className="pt-10 pb-20 min-h-screen bg-green-100 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
