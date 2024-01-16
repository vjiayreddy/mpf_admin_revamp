import FormControl, { FormControlProps } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import React from "react";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

interface FormTextFieldProps {
  id?: string;
  formControlProps?: FormControlProps;
  placeholder?: string;
  label?: string;
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
  control: Control<FieldValues, object> | any;
  errors: FieldErrors<any>;
  type?: string | undefined;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  variant?: "standard" | "outlined" | "filled" | undefined;
  autoFocus?: boolean;
}

const FormTextField = ({
  formControlProps,
  name,
  rules,
  control,
  errors,
  placeholder,
  label,
  id,
  type = "Text",
  endAdornment,
  startAdornment,
  variant,
  autoFocus
}: FormTextFieldProps) => {
  return (
    <FormControl fullWidth sx={{ mb: 4 }} {...formControlProps}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            variant={variant}
            id={id}
            autoFocus={autoFocus}
            label={label}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            error={Boolean(errors[name])}
            type={type}
            InputProps={{
              endAdornment: endAdornment,
              startAdornment: startAdornment,
            }}
          />
        )}
      />
      {errors[name] && (
        <FormHelperText sx={{ color: "error.main" }}>
          {errors[name]?.message as string}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormTextField;
