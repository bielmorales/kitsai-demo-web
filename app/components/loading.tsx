import { ReactNode } from "react";

interface LoadingComponentProps {
  isLoading: boolean;
  children: ReactNode;
}

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  isLoading,
  children,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full pt-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingComponent;
