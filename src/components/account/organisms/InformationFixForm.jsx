import { useState, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userInfo } from "../../../apis/mypage";
import { InputBox } from "../atoms/InputBox";
import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";
import RadioButton from "../atoms/RadioButton";
import SelectTag from "../atoms/SelectTag";
import COUNTRY from "../constants/COUNTRY";
import { useNavigate } from "react-router-dom";

// 수정 필요 사항
// email -> readOnly
// age -> Input component 수정
// 전체 form css 뜸 수정

const InformationFixForm = ({ data, inputProps }) => {
  const defaultValues = Object.keys(data?.user || {}).reduce((acc, key) => {
    acc[key] = data?.user[key] || "";
    return acc;
  }, {});

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      passwordCheck: "",
    },
  });
  const navigate = useNavigate();
  const { watch, control, handleSubmit, setError, clearErrors } = methods;
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const phone = watch("phone");
  const password = watch("password");
  const passwordCheck = watch("passwordcheck");
  const age = watch("age");

  const [categoryList, setCategoryList] = useState("");
  const [country, setCountry] = useState(data?.user?.country);

  const handleOptionChange = (country) => {
    setCountry(country);
  };
  const [role, setRole] = useState(data?.user?.role);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handlePasswordConfirm = () => {
    if (password && passwordCheck) {
      if (password !== passwordCheck) {
        setError(
          "passwordcheck",
          { message: "Passwords do not match" },
          { shouldFocus: true }
        );
        return false;
      } else {
        clearErrors("passwordcheck");
        return true;
      }
    }
  };

  const [changedValues, setChangedValues] = useState({});

  useEffect(() => {
    setChangedValues({
      firstName,
      lastName,
      phone,
      password,
      age,
      role,
      country,
      categoryList,
    });
  }, [firstName, lastName, phone, password, age, role, country, categoryList]);

  const mutation = useMutation((newData) => userInfo(newData), {
    onSuccess: () => {
      alert("정보가 성공적으로 수정되었습니다.");
    },
    onError: () => {
      alert("정보 수정에 실패했습니다.");
    },
  });

  const onSubmit = async () => {
    const passwordIsValid = handlePasswordConfirm();

    if (passwordIsValid) {
      mutation.mutate(changedValues);
    }
  };

  const renderController = (inputField) => {
    return (
      <Controller
        name={inputField.name}
        key={inputField.name}
        control={methods.control}
        defaultValue=""
        rules={inputField.rules}
        render={({ field, fieldState }) => (
          <InputBox
            {...field}
            id={inputField.name}
            label={inputField.label}
            variant={inputField.variant}
            type={inputField.type}
            placeholder={inputField.placeholder}
            error={fieldState.invalid}
            helperText={fieldState.invalid ? fieldState.error.message : ""}
          />
        )}
      />
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-[500px] mb-10">
          <div className="flex gap-10">
            {inputProps
              .filter(
                (props) =>
                  props.name === "firstName" || props.name === "lastName"
              )
              .map(renderController)}
          </div>
          {inputProps
            .filter(
              (inputField) =>
                inputField.name !== "firstName" &&
                inputField.name !== "lastName"
            )
            .map(renderController)}
          <Controller
            name="age"
            control={methods.control}
            render={({ field }) => <input {...field} label="age" />}
          />
          <RadioButton
            name="role"
            value="Mentor"
            type="radio"
            onChange={handleRoleChange}
            checked={role === "Mentor"}
          >
            Mentor
          </RadioButton>
          <RadioButton
            name="role"
            value="Mentee"
            type="radio"
            onChange={handleRoleChange}
            checked={role === "Mentee"}
          >
            Mentee
          </RadioButton>
          <Dropdown
            name="country"
            options={COUNTRY.map((country) => country.name)}
            onSelectedChange={handleOptionChange}
            selected={country}
          />
          <SelectTag />
          <div className="">
            <Button color="orange" size="lg" type="submit">
              Edit
            </Button>
            <Button
              color="white"
              size="lg"
              onClick={() => navigate("/mypage/information")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default InformationFixForm;
