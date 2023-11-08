import COUNTRY from "../../components/account/constants/COUNTRY";

export const nameToCode = (name) => {
  const country = COUNTRY.find((country) => country.name === name);
  return country ? country.code : null;
};

export const codeToName = (code) => {
  const country = COUNTRY.find((country) => country.code === code);
  return country ? country.name : null;
};
