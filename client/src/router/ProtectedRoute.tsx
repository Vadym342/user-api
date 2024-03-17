import { FC } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../shared/components/buttons/buttons";
import { useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth();

  const navigate = useNavigate();

  const handleRedirectToLogin = () => {
    navigate("/auth");
  };

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <div className="my-10">
          <h3>You should login to see this page</h3>
          <Button
            handler={handleRedirectToLogin}
            type="submit"
            children="Log In"
            btnStyle="secondary"
          />
        </div>
      )}
    </>
  );
};
