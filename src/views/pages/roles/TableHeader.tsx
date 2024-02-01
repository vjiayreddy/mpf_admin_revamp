// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

// ** Icon Imports
import Icon from "src/@core/components/icon";

interface TableHeaderProps {
  plan: string;
  value: string;
  handleFilter: (val: string) => void;
  handlePlanChange: (e: SelectChangeEvent) => void;
  handleAddNew?: () => void;
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { plan, handlePlanChange, handleFilter, value, handleAddNew } = props;

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button
        sx={{ mr: 4, mb: 2 }}
        color="secondary"
        variant="outlined"
        startIcon={<Icon icon="mdi:export-variant" />}
      >
        Export
      </Button>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          size="small"
          value={value}
          placeholder="Search for User..."
          sx={{ mr: 6, mb: 2 }}
          onChange={(e) => handleFilter(e.target.value)}
        />
        <FormControl size="small" sx={{ mb: 2 }}>
          <InputLabel id="role-select">Select Role</InputLabel>
          <Select
            size="small"
            value={plan}
            id="select-role"
            label="Select Role"
            labelId="role-select"
            onChange={handlePlanChange}
            inputProps={{ placeholder: "Select Role" }}
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="basic">Manager</MenuItem>
            <MenuItem value="basic">Personal Stylist</MenuItem>
            <MenuItem value="company">Sales Person</MenuItem>
            <MenuItem value="company">Operator</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ ml: 4, mb: 2 }}
          color="primary"
          onClick={handleAddNew}
          variant="contained"
          startIcon={<Icon icon="ic:baseline-add" />}
        >
          New Member
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
