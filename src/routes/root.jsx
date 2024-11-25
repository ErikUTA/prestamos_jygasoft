import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

function Root() {
  const clearLocalStorage = () => {
    localStorage.clear();
    window.location.href = "/Register";
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "black",
              textDecoration: "none",
              backgroundColor: "transparent",
            }}
          >
            <img
              width="80px"
              height="80px"
              src="/assets/money_1.svg"
              alt="none"
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Button
              onClick={clearLocalStorage}
              key="Solicitud"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Solicitud
            </Button>
            <Button
              href={"/Loans"}
              key="Prestamos"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Prestamos
            </Button>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              width="80px"
              height="80px"
              src="/assets/money_1.svg"
              alt="none"
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={clearLocalStorage}
              key="Solicitud"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Solicitud
            </Button>
            <Button
              href={"/Loans"}
              key="Prestamos"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Prestamos
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Root;
