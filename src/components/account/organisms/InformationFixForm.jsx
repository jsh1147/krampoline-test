import { useState, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userInfo } from "../../../apis/mypage";
import { InputBox, InputOnly } from "../atoms/InputBox";
import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";
import RadioButton from "../atoms/RadioButton";
import SelectTag from "../atoms/SelectTag";
import COUNTRY from "../constants/COUNTRY";
import { useNavigate } from "react-router-dom";
import Title from "../atoms/Title";
import BasicDatePicker from "../atoms/DatePicker";
import dayjs from "dayjs";
import { codeToName, nameToCode } from "../../../utils/account/country";

// 프로필 사진 등록

const InformationFixForm = ({ data, inputProps }) => {
  const defaultValues = Object.keys(data?.user || {}).reduce((acc, key) => {
    acc[key] = data?.user[key] || "";
    return acc;
  }, {});

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      age: dayjs(data?.user?.age),
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
  const introduction = watch("introduction");

  const [profileImage, setProfileImage] = useState(data?.user?.profileImage);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // 사용자가 선택한 파일 가져오기
    if (file) {
      setProfileImage(file);
    }
  };

  const [email, setEmail] = useState(data?.user?.email);

  const [country, setCountry] = useState(codeToName(data?.user?.country));

  const handleOptionChange = (country) => {
    setCountry(country);
  };
  const [role, setRole] = useState(data?.user?.role);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const [categoryList, setCategoryList] = useState(data?.user?.categoryList);

  const handlecategoryList = (newCategoryList) => {
    setCategoryList(newCategoryList);
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
    let birth = null;
    if (age && age.$d) {
      birth = dayjs(age.$d).format("YYYY-MM-DD");
    }
    setChangedValues({
      firstName,
      lastName,
      phone,
      password,
      age: birth,
      email,
      role,
      introduction,
      country: nameToCode(country),
      categoryList,
      profileImage,
    });
  }, [
    firstName,
    lastName,
    phone,
    password,
    age,
    introduction,
    role,
    country,
    email,
    categoryList,
    profileImage,
  ]);

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

    const formData = new FormData();

    for (const [key, value] of Object.entries(changedValues)) {
      formData.append(key, value);
    }

    if (profileImage instanceof File) {
      formData.append("profileImage", profileImage);
    }

    if (passwordIsValid) {
      mutation.mutate({
        data: formData,
      });
      console.log(changedValues);
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
              name="age"
              control={methods.control}
              render={(field) => (
                <BasicDatePicker
                  {...field}
                  control={methods.control}
                  name="age"
                  value="age"
                />
              )}
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
