import { useRef } from "react";

export function useInputsRef(initialInputValue) {
  const inputValue = useRef(initialInputValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    inputValue.current = { ...inputValue.current, [name]: value };
  };

  return { inputValue, handleInputChange };
}
