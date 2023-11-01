import { useState } from "react";

// initialInputValue = { inputName: inputValue }
export function useInputsState(initialInputValue) {
  const [inputValue, setInputValue] = useState(initialInputValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  return { inputValue, handleInputChange };
}
