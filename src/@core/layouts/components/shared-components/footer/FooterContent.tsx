// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import { Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FooterContent = () => {
  // ** Var

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()} All rights reserved`}
      </Typography>
    </Box>
  );
};

export default FooterContent;
