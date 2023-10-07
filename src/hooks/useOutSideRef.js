import { useEffect, useRef } from "react";

const useOutsideRef = (onClickOutside) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("event", event);
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);

  return ref;
};

export default useOutsideRef;
