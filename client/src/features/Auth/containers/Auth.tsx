import { FC } from "react";
import { SignUp } from "../components/AuthForms/SignUp";
import { Login } from "../components/AuthForms/Login";
import { useAppSelector } from "../../../store/hooks";

export const Auth: FC = () => {
  const { checkerForm } = useAppSelector((state) => state.auth);

  return <>{checkerForm ? <Login /> : <SignUp />}</>;
};
