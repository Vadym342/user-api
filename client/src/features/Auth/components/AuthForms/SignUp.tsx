import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailRegex } from "../../constants/constants";
import { AuthService } from "../../api/auth.service";
import { toast } from "react-toastify";
import { UserDataType } from "../../types/user.types";
import { useAppDispatch } from "../../../../store/hooks";
import { setCheckerForm } from "../../slice/auth.slice";
import { AuthHeader } from "./AuthHeader/AuthHeader";
import { PasswordVisible } from "../../../../assets/ShowPassword/passwordVisibleSVG";
import { PasswordUnVisible } from "../../../../assets/ShowPassword/passwordUnVisibleSVG";
import { AuthBodyContainer } from "./AuthBody/AuthBody";
import { Button } from "../../../../shared/components/buttons/buttons";

interface IFormInput {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
}

export const SignUp: FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const dispatch = useAppDispatch();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleSwitchForm = () => {
    dispatch(setCheckerForm(true));
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: UserDataType) => {
    try {
      const response = await AuthService.registration({
        ...data,
        age: +data.age,
      });

      if (response?.status) {
        toast.success("User has been created");
        dispatch(setCheckerForm(true));
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

        <label className="block text-gray-700 text-sm font-bold">
          FirstName
        </label>
        <input
          {...register("firstName", { required: true, maxLength: 100 })}
          className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="FirstName"
        />
        {errors.firstName && (
          <div className="-mt-2 text-red-500 text-sm">
            <span>
              {errors.firstName.type === "required" && "This field is required"}
              {errors.firstName.type === "maxLength" &&
                "Max length 100 symbols"}
            </span>
          </div>
        )}

        <label className="block text-gray-700 text-sm font-bold">
          LastName
        </label>
        <input
          {...register("lastName", { required: true, maxLength: 100 })}
          className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="LastName"
        />
        {errors.lastName && (
          <div className="-mt-2 text-red-500 text-sm">
            <span>
              {errors.lastName.type === "required" && "This field is required"}
              {errors.lastName.type === "maxLength" && "Max length 100 symbols"}
            </span>
          </div>
        )}

        <label className="block text-gray-700 text-sm font-bold">Age</label>
        <input
          {...register("age", { required: true, min: 18, max: 100 })}
          className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          placeholder="Age"
        />
        {errors.age && (
          <div className="-mt-2 text-red-500 text-sm">
            {errors.age.type === "required" && "This field is required"}
            {errors.age.type === "min" && "Min value equal to 18"}
            {errors.age.type === "max" && "Max value equal to 100"}
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
            <Button type="submit" children="Sign up" btnStyle="secondary" />
          </div>
        </div>

        <div className="flex items-center justify-between pb-6">
          <p className="mb-0 mr-2">Have an account?</p>
          <div>
            <button
              onClick={handleSwitchForm}
              type="button"
              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </AuthBodyContainer>
  );
};
