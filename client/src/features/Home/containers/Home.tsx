import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getInfoFromLocalStorage } from "../../../helpers/localstorage.helper";
import { toast } from "react-toastify";

import { Button } from "../../../shared/components/buttons/buttons";
import { useAuth } from "../../../hooks/useAuth";

export const Home: FC = () => {
  const isAuth = useAuth();
  const guestName = getInfoFromLocalStorage("guest") || "";

  const navigate = useNavigate();

  const handleRedirectionToAuth = async (e: any) => {
    navigate("/auth");
  };

  const handleRedirectionToUserList = async (e: any) => {
    navigate("/users");
  };

  useEffect(() => {
    toast.success(`Hello guest ${guestName} in our site`);
  }, []);

  return (
    <div className="flex justify-center flex-col items-center">
      <h3 className="my-10 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-400 to-orange-500">
        USER API
      </h3>
      {isAuth ? (
        <Button
          type="button"
          handler={handleRedirectionToUserList}
          children="User List"
          btnStyle="primary"
        />
      ) : (
        ""
      )}
      <div className="flex justify-center flex-col items-center">
        <h3 className="mt-10">
          If you want use USER API you should create account
        </h3>
        <div>
          <Button
            type="button"
            handler={handleRedirectionToAuth}
            children="SignIn/LogIn"
            btnStyle="primary"
          />
        </div>
      </div>
    </div>
  );
};
