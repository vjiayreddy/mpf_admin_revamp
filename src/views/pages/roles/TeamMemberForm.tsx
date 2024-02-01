import { Icon } from "@iconify/react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import FormTextField from "src/@core/components/form-fields/text-field";
import { useForm } from "react-hook-form";
import FormMobileInput from "src/@core/components/form-fields/phone-field";
import AutoCompleteFormField from "src/@core/components/form-fields/autocomplete-field";
import { STUDIO_LOCATIONS } from "src/configs/constants";
import { useGetAllRoles } from "src/apollo/hooks/useGetAllRoles";

interface TeamMemberFormProps {
  open: boolean;
  onClose: () => void;
}

const TeamMemberForm = ({ open, onClose }: TeamMemberFormProps) => {
  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { loadingGetAllRoles, allRoles, allRolesErrorStatus } =
    useGetAllRoles();

  const handleCancel = () => {
    reset({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}}
      aria-labelledby="user-view-edit"
      aria-describedby="user-view-edit-description"
      sx={{ "& .MuiPaper-root": { width: "100%", maxWidth: 650 } }}
    >
      <DialogTitle
        id="user-view-edit"
        sx={{
          textAlign: "center",
          fontSize: "1.5rem !important",
          px: (theme) => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`,
          ],
          pt: (theme) => [
            `${theme.spacing(8)} !important`,
            `${theme.spacing(12.5)} !important`,
          ],
        }}
      >
        Create a new Team Member
        {allRolesErrorStatus && <p>{JSON.stringify(allRolesErrorStatus)}</p>}
      </DialogTitle>
      <DialogContent
        sx={{
          pb: (theme) => `${theme.spacing(8)} !important`,
          px: (theme) => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`,
          ],
        }}
      >
        <DialogContentText
          variant="body2"
          id="user-view-edit-description"
          sx={{ textAlign: "center", mb: 7 }}
        >
          Updating user details will receive a privacy audit.
        </DialogContentText>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                control={control}
                name="name"
                fullWidth={true}
                errors={errors}
                type="text"
                label="Full Name"
                placeholder="Enter full name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                control={control}
                name="email"
                fullWidth={true}
                errors={errors}
                type="text"
                label="Email"
                placeholder="Enter email address"
              />
            </Grid>
            <Grid item xs={6}>
              <FormMobileInput
                control={control}
                name="phone"
                defaultValue=""
                label="Mobile"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                control={control}
                name="password"
                fullWidth={true}
                errors={errors}
                type="text"
                label="Password"
                placeholder="Enter password"
              />
            </Grid>
            <Grid item xs={6}>
              <AutoCompleteFormField
                control={control}
                name="location"
                label="Location"
                options={STUDIO_LOCATIONS}
                isEqualValue="value"
                targetValue="name"
                placeholder="Select Location"
              />
            </Grid>
            <Grid item xs={6}>
              <AutoCompleteFormField
                control={control}
                name="roleIdentifier"
                label="Role"
                options={STUDIO_LOCATIONS}
                isEqualValue="value"
                targetValue="name"
                placeholder="Select Location"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          px: (theme) => [
            `${theme.spacing(5)} !important`,
            `${theme.spacing(15)} !important`,
          ],
          pb: (theme) => [
            `${theme.spacing(8)} !important`,
            `${theme.spacing(12.5)} !important`,
          ],
        }}
      >
        <Button variant="contained" sx={{ mr: 2 }} onClick={onClose}>
          Submit
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamMemberForm;
