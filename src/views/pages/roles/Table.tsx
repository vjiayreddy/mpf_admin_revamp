// ** React Imports
import { useEffect, useCallback, useState } from "react";

// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SelectChangeEvent } from "@mui/material/Select";
import Icon from "src/@core/components/icon";
import { useDispatch, useSelector } from "react-redux";
import CustomChip from "src/@core/components/mui/chip";
import CustomAvatar from "src/@core/components/mui/avatar";
import { getInitials } from "src/@core/utils/get-initials";
import { ThemeColor } from "src/@core/layouts/types";

// ** Custom Components Imports
import { teamMemberType } from "src/configs/types";
import TableHeader from "./TableHeader";
import { useGetAllTeamMembers } from "src/apollo/hooks/useGetAllTeamMembers";
import TeamMemberForm from "./TeamMemberForm";

interface TeamMembersListProps {
  rows: any[];
  loading: boolean;
}

interface UserRoleType {
  [key: string]: { icon: string; color: string };
}

interface UserStatusType {
  [key: string]: ThemeColor;
}

interface CellType {
  row: teamMemberType;
}

// ** Vars
const userRoleObj: UserRoleType = {
  head_stylist: { icon: "eos-icons:admin", color: "success.main" },
  personal_stylist: {
    icon: "material-symbols:style-outline",
    color: "success.main",
  },
  sales_person: { icon: "carbon:sales-ops", color: "warning.main" },
  tailor: { icon: "icon-park-outline:tape-measure", color: "info.main" },
};

const userStatusObj: UserStatusType = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
};

// ** renders client column
const renderClient = (row: teamMemberType) => {
  if (row.image.length) {
    return (
      <CustomAvatar src={row.image} sx={{ mr: 3, width: 34, height: 34 }} />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        sx={{ mr: 3, width: 34, height: 34, fontSize: "1rem" }}
      >
        {getInitials(row.name)}
      </CustomAvatar>
    );
  }
};

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: "name",
    headerName: "Name",
    renderCell: ({ row }: CellType) => {
      const { name, email } = row;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(row)}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography
              noWrap
              component={Link}
              variant="subtitle2"
              href="/apps/user/view/overview/"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              {name}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: "email",
    headerName: "Email",
    renderCell: ({ row }: CellType) => {
      return (
        <Typography variant="body2" noWrap>
          {row.email}
        </Typography>
      );
    },
  },
  {
    flex: 0.15,
    field: "role",
    minWidth: 150,
    headerName: "Role",
    renderCell: ({ row }: CellType) => {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& svg": { mr: 3, color: userRoleObj[row.roleIdentifier].color },
          }}
        >
          <Icon icon={userRoleObj[row.roleIdentifier].icon} fontSize={20} />
          <Typography
            noWrap
            sx={{ color: "text.secondary", textTransform: "capitalize" }}
          >
            {row.roleIdentifier}
          </Typography>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: "status",
    headerName: "Status",
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin="light"
          size="small"
          label={"Active"}
          color={userStatusObj["active"]}
          sx={{ textTransform: "capitalize" }}
        />
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: "actions",
    headerName: "Actions",
    renderCell: () => (
      <IconButton component={Link} href="/apps/user/view/overview/">
        <Icon icon="mdi:eye-outline" />
      </IconButton>
    ),
  },
];

const TeamMembersList = ({ rows, loading }: TeamMembersListProps) => {
  const [plan, setPlan] = useState<string>("");
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // GQL API FOR GETTING ALL TEAM MEMBERS

  const handleFilter = useCallback((val: string) => {
    setValue(val);
  }, []);

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setPlan(e.target.value);
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            plan={plan}
            value={value}
            handleAddNew={() => setOpenForm(true)}
            handleFilter={handleFilter}
            handlePlanChange={handlePlanChange}
          />
          <DataGrid
            autoHeight
            loading={loading}
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ "& .MuiDataGrid-columnHeaders": { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
      {openForm && (
        <Grid item xs={12}>
          <TeamMemberForm
            open={openForm}
            onClose={() => {
              setOpenForm(false);
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default TeamMembersList;
