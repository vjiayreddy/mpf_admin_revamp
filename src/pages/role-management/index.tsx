import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageHeader from "src/@core/components/page-header";
import { useGetAllTeamMembers } from "src/apollo/hooks/useGetAllTeamMembers";
import RoleCards from "src/views/pages/roles/RoleCards";
import TeamMembersList from "src/views/pages/roles/Table";

const RolesComponent = () => {
  const { teamMembersData, loading } = useGetAllTeamMembers();

  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant="h5">Roles List</Typography>}
        subtitle={
          <Typography variant="body2">
            A role provided access to predefined menus and features so that
            depending on assigned role an administrator can have access to what
            he need
          </Typography>
        }
      />
      <Grid item xs={12} sx={{ mb: 5 }}>
        <RoleCards />
      </Grid>
      <PageHeader
        title={
          <Typography variant="h5">
            Total Team Members with their roles
          </Typography>
        }
        subtitle={
          <Typography variant="body2">
            Find all of your company’s administrator accounts and their
            associate roles.
          </Typography>
        }
      />
      <Grid item xs={12}>
        <TeamMembersList rows={teamMembersData} loading={loading} />
      </Grid>
    </Grid>
  );
};

export default RolesComponent;
