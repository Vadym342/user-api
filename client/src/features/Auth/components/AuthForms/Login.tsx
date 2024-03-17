import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginUserDatatype } from "../../types/user.types";
import { AuthService } from "../../api/auth.service";
import { useAppDispatch } from "../../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { login, setCheckerForm } from "../../slice/auth.slice";
import { toast } from "react-toastify";
import { emailRegex } from "../../constants/constants";
import { AuthHeader } from "./AuthHeader/AuthHeader";
import { PasswordVisible } from "../../../../assets/ShowPassword/passwordVisibleSVG";
import { PasswordUnVisible } from "../../../../assets/ShowPassword/passwordUnVisibleSVG";
import { AuthBodyContainer } from "./AuthBody/AuthBody";
import { Button } from "../../../../shared/components/buttons/buttons";
import { setInfoToLocalStorage } from "../../../../helpers/localstorage.helper";

interface IFormInput {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSwitchForm = () => {
    dispatch(setCheckerForm(false));
  };

  const onSubmit: SubmitHandler<IFormInput> = async (
    data: LoginUserDatatype
  ) => {
    try {
      const response = await AuthService.login(data);

      if (response?.data?.token) {
        setInfoToLocalStorage("token", response?.data?.token);
        dispatch(login(response));
        navigate("/");
        toast.success("Logged in.");
        handleSwitchForm();
      }

      if (response?.errors.length) {
        toast.error(response?.errors[0].message);
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <AuthBodyContainer>
      <AuthHeader />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-gray-700 text-sm font-bold">Email</label>
        <input
          {...register("email", {
            required: true,
            maxLength: 96,
            pattern: emailRegex,
          })}
          className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="Email"
          type="text"
          placeholder="Email"
        />
        {errors.email && (
          <div className="-mt-2 text-red-500 text-sm">
            <span>
              {errors.email.type === "required" && "This field is required"}
              {errors.email.type === "maxLength" && "Max length 96 symbols"}
              {errors.email.type === "pattern" &&
                "Should be in email format 'someEmail@gmail.com'"}
            </span>
          </div>
        )}

        <div className="relative container">
          <label className="block text-gray-700 text-sm font-bold">
            Password
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            {...register("password", {
              required: true,
              minLength: 5,
              maxLength: 20,
            })}
            className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            placeholder="password"
          />
          <button
            className="mt-5 absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <PasswordVisible /> : <PasswordUnVisible />}
          </button>
          {errors.password && (
            <div className="-mt-2 text-red-500 text-sm">
              <span>
                {errors.password.type === "required" &&
                  "This field is required"}
                {errors.password.type === "minLength" && "Max length 5 symbols"}
                {errors.password.type === "maxLength" &&
                  "Max length 20 symbols"}
              </span>
            </div>
          )}
        </div>

        <div className="mb-5 pb-1 pt-1 text-center">
          <div className="w-full">
            <Button type="submit" children="Log In" btnStyle="secondary" />
          </div>
        </div>

        <div className="flex items-center justify-between pb-6">
          <p className="mb-0 mr-2">Create account?</p>
          <div>
            <button
              type="button"
              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              onClick={handleSwitchForm}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </AuthBodyContainer>
  );
};
