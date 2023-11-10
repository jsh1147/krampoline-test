import { useState, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { InputBox, InputOnly } from "../atoms/InputBox";
import Button from "../../common/Button";
import { editInfo } from "../../../apis/mypage";
import Dropdown from "../../common/Dropdown";
import RadioButton from "../atoms/RadioButton";
import SelectTag from "../atoms/SelectTag";
import COUNTRY from "../constants/COUNTRY";
import { useNavigate } from "react-router-dom";
import Title from "../atoms/Title";
import BasicDatePicker from "../atoms/DatePicker";
import dayjs from "dayjs";
import { codeToName, nameToCode } from "../../../utils/account/country";
import { passwordCheck } from "../../../apis/user";

const InformationFixForm = ({ data, inputProps }) => {
  const info = data?.data?.data;

  const defaultValues = Object.keys(info || {}).reduce((acc, key) => {
    acc[key] = info[key] || "";
    return acc;
  }, {});

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      password: "",
      birthDate: dayjs(info?.birthDate),
    },
  });

  const navigate = useNavigate();
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = methods;
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const phone = watch("phone");
  const password = watch("password");
  const newPassword = watch("newPassword");
  const passwordCheck = watch("passwordcheck");
  const birthDate = watch("birthDate");
  const introduction = watch("introduction");

  const [profileImage, setProfileImage] = useState(info?.profileImage);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  const [email, setEmail] = useState(info?.email);

  const [country, setCountry] = useState(codeToName(info?.country));

  const handleOptionChange = (country) => {
    setCountry(country);
  };
  const [role, setRole] = useState(info?.role);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const [categoryList, setCategoryList] = useState(info?.categoryList);

  const handlecategoryList = (newCategoryList) => {
    setCategoryList(newCategoryList);
  };

  const handlePasswordCheck = async (password) => {
    try {
      const response = await passwordCheck(password);

      console.log("Response:", response);
      return true;
    } catch (error) {
      if (error?.response?.data?.status === "fail") {
        setError(
          "password",
          { message: "please enter your origin password" },
          { shouldFocus: true }
        );
        return false;
      }
      return false;
    }
  };

  const handlePasswordConfirm = () => {
    if (newPassword && passwordCheck) {
      if (newPassword !== passwordCheck) {
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
    const submitData = new FormData();

    if (profileImage instanceof File) {
      submitData.append("file", profileImage);
    } else {
      submitData.append("file", profileImage);
    }

    submitData.append(
      "requestDTO",
      new Blob(
        [
          JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            password: newPassword,
            role: role,
            country: nameToCode(country),
            birthDate: birthDate ? dayjs(birthDate).format("YYYY-MM-DD") : "",
            categoryList: categoryList,
            phone: phone,
            introduction: introduction,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    setChangedValues(submitData);
  }, [
    firstName,
    lastName,
    newPassword,
    country,
    birthDate,
    phone,
    role,
    categoryList,
    introduction,
    profileImage,
  ]);
  console.log(profileImage);

  const mutation = useMutation(editInfo, {
    onSuccess: () => {
      alert("정보가 성공적으로 수정되었습니다.");
      navigate("/mypage/information");
    },
    onError: () => {
      alert("정보 수정에 실패했습니다.");
    },
  });

  const onSubmit = (formData) => {
    const OriginPasswordCheck = handlePasswordCheck(password);
    const passwordIsValid = handlePasswordConfirm();

    if (passwordIsValid && OriginPasswordCheck) {
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
            multiline={inputField.multiline}
            rows={inputField.rows}
            placeholder={inputField.placeholder}
            error={fieldState.invalid}
            helperText={fieldState.invalid ? fieldState.error.message : ""}
          />
        )}
      />
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <main className="max-w-[500px]">
            <InputOnly readOnly={true} name="email" value={email}></InputOnly>
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
              name="birthDate"
              control={methods.control}
              render={(field) => (
                <BasicDatePicker
                  {...field}
                  control={methods.control}
                  name="birthDate"
                  value="birthDate"
                />
              )}
            />
            <RadioButton
              name="role"
              value="MENTOR"
              type="radio"
              onChange={handleRoleChange}
              checked={role === "MENTOR"}
            >
              Mentor
            </RadioButton>
            <RadioButton
              name="role"
              value="MENTEE"
              type="radio"
              onChange={handleRoleChange}
              checked={role === "MENTEE"}
            >
              Mentee
            </RadioButton>
            <Dropdown
              name="country"
              options={COUNTRY.map((country) => country.name)}
              onSelectedChange={handleOptionChange}
              selected={country}
              className="bg-white"
            />
            <input
              type="file"
              label="Profile Image Upload"
              accept="image/jpg, image/png, image/jpeg"
              onChange={handleFileChange}
            />
            <section className=" p-4  mt-10 mb-10">
              <Title className="mb-10">Chooese Your Favorites! </Title>
              <SelectTag
                name="categoryList"
                selected={categoryList}
                onSelectedChange={handlecategoryList}
              />
            </section>
            <div className="flex justify-between">
              <Button
                color="white"
                size="lg"
                onClick={() => navigate("/mypage/information")}
              >
                Cancel
              </Button>
              <Button color="orange" size="lg" type="submit">
                Edit
              </Button>
            </div>
          </main>
        </form>
      </FormProvider>
    </>
  );
};

export default InformationFixForm;
