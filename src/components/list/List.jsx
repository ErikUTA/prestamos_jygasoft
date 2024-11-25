import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function List() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/listLoans")
      .then((response) => {
        if (response.data.length > 0) {
          for (const loan of response.data) {
            console.log(loan);
            setRows((oldRows) => [
              ...oldRows,
              {
                Nombre: loan.Nombre,
                Email: loan.Email,
                Interes: loan.Interes,
                Monto_d: 1,
                Monto_p: 1,
                Monto_f: 4,
                history: [
                  {
                    Monto: 2,
                    Periodo: 1,
                    Fecha: loan.Fecha.slice(0,10),
                    Tiempo: "OK",
                  },
                ],
              },
            ]);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Pagos</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Interés</TableCell>
            <TableCell>Monto Debe</TableCell>
            <TableCell>Monto Pagado</TableCell>
            <TableCell>Monto Final</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={Math.random()} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <img width="25px" height="25px" src="/assets/eye-closed.svg" /> : <img width="25px" height="25px" src="/assets/eye-open.svg" />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.Nombre}
        </TableCell>
        <TableCell align="right">{row.Email}</TableCell>
        <TableCell align="right">{row.Interes}</TableCell>
        <TableCell align="right">{row.Monto_d}</TableCell>
        <TableCell align="right">{row.Monto_p}</TableCell>
        <TableCell align="right">{row.Monto_f}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Historial de pagos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Monto</TableCell>
                    <TableCell>Periodo de Pago</TableCell>
                    <TableCell>Fecha de Pago</TableCell>
                    <TableCell>En Tiempo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={Math.random()}>
                      <TableCell>{historyRow.Monto}</TableCell>
                      <TableCell>{historyRow.Periodo}</TableCell>
                      <TableCell>{historyRow.Fecha}</TableCell>
                      <TableCell>{historyRow.Tiempo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    Nombre: PropTypes.string.isRequired,
    Email: PropTypes.string,
    Interes: PropTypes.number,
    Monto_d: PropTypes.number,
    Monto_p: PropTypes.number,
    Monto_f: PropTypes.number,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        Monto: PropTypes.number,
        Periodo: PropTypes.number,
        Fecha: PropTypes.string,
        Tiempo: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};
