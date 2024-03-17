import { FC } from "react";

interface AuthBodyContainerProps {
  children: React.ReactNode;
}

export const AuthBodyContainer: FC<AuthBodyContainerProps> = ({ children }) => {
  return (
    <section className="h-full m-5 ">
      <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="w-96 md:mx-6 md:p-2">{children}</div>
        </div>
      </div>
    </section>
  );
};
