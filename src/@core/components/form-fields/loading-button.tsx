import React, { ReactNode } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { BeatLoader } from "react-spinners";
import { useTheme } from "@mui/material/styles";

interface FormLoadingButtonProps {
  btnProps?: ButtonProps;
  onClick?: () => void;
  children: string | ReactNode;
  showLoading?: boolean;
  beatLoaderProps?: {
    size?: number;
    margin?: number;
    color?: string;
    loading?: boolean;
    speedMultiplier?: number;
  };
}

const FormLoadingButton = ({
  children,
  btnProps,
  showLoading,
  beatLoaderProps,
  onClick,
}: FormLoadingButtonProps) => {
  const theme = useTheme();
  return (
    <Button onClick={onClick} {...btnProps}>
      {showLoading ? (
        <BeatLoader
          size={12}
          color={theme?.palette?.common?.white}
          {...beatLoaderProps}
        />
      ) : (
        <>{children}</>
      )}
    </Button>
  );
};

export default FormLoadingButton;
