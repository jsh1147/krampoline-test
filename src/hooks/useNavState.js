import { useState } from "react";
import { useLocation } from "react-router-dom";

export function useNavState() {
  const currentUrl = useLocation()
    .pathname.replace(/\d/, "")
    .replace(/^\/+|\/+$/g, "");
  const [selectedmainNav, setselectedMainNav] = useState("Watching");

  return { currentUrl, selectedmainNav, setselectedMainNav };
}
