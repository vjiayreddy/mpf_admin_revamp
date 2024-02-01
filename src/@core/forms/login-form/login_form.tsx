import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import themeConfig from "src/configs/themeConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Icon from "src/@core/components/icon";
import { loginFormValidationschema } from "src/@core/utils/validations";
import { LoginFormData } from "src/apollo/shared/interfaces";
import BrandLogo from "./brand_logo";
import { signIn } from "next-auth/react";
import FormTextField from "src/@core/components/form-fields/text-field";
import { API_ERRORS } from "src/configs/constants";
import toast from "react-hot-toast";
import FormLoadingButton from "src/@core/components/form-fields/loading-button";

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.18px",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
}));

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<Boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      source: "",
    },
    mode: "onChange",
    resolver: yupResolver(loginFormValidationschema),
  });

  // Handle Submit
  const onSubmit = async (data: LoginFormData) => {
    debugger;
    setIsSubmit(true);
    const { source, password } = data;
    const response = await signIn("credentials", {
      source: source,
      password: password,
      redirect: false,
    });
    setIsSubmit(false);
    // Trigger when login faild
    if (response?.error) {
      if (response?.error === API_ERRORS.RESPONSE_NOT_SUCCESSFUL) {
        toast.error("ServerError");
      } else {
        toast.error(API_ERRORS.INVALID_LOGIN_DETAILS);
      }
    }
  };

  console.log(errors);

  return (
    <BoxWrapper>
      <Box sx={{ mb: 6 }}>
        <BrandLogo />
        <TypographyStyled variant="h5">{`Welcome to ${themeConfig.templateName}! 👋🏻`}</TypographyStyled>
        <Typography variant="body2">Please sign-in to your account</Typography>
      </Box>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <FormTextField
          name="source"
          autoFocus={true}
          control={control}
          errors={errors}
          rules={{ required: true }}
          placeholder="admin@materialize.com"
        />
        <FormTextField
          name="password"
          control={control}
          errors={errors}
          rules={{ required: true }}
          placeholder="password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon
                  icon={
                    showPassword ? "mdi:eye-outline" : "mdi:eye-off-outline"
                  }
                  fontSize={20}
                />
              </IconButton>
            </InputAdornment>
          }
        />
        <Box mt={5}>
          <FormLoadingButton
            showLoading={isSubmit as boolean}
            btnProps={{
              fullWidth: true,
              variant: "contained",
              size: "large",
              disabled: isSubmit as boolean,
              type: "submit",
              sx: {
                mb: 7,
              },
            }}
          >
            Login
          </FormLoadingButton>
        </Box>
      </form>
    </BoxWrapper>
  );
};

export default LoginForm;
