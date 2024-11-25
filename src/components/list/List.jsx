import React, { useEffect, useState } from "react";
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
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";
import { addMonth } from "../LoanHelper";

export default function List() {
  const [random, setRandom] = useState(0);
  const [loans, setLoans] = useState([]);
  const [newRows, setNewRows] = useState([]);
  const [oldRows, setOldRows] = useState([]);
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState("");
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const editModal = (id) => {
    const loan = loans.filter((row) => row.id === id);
    localStorage.setItem("loan", JSON.stringify(loan));
    window.location.href = "/Register";
  };

  const deleteRow = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "¿Estas seguro que quieres borrar el registro?",
        text: "No se podrá recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(REACT_APP_API_URL_PROD + "/deleteLoan/" + id)
            .then((res) => {
              swalWithBootstrapButtons.fire({
                title: "¡Se ha eliminado el prestamo correctamente!",
                text: "",
                icon: "success",
              });
              window.location.reload();
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openRow = (id) => {
    const index = newRows.findIndex((r) => r.id === id);
    newRows[index].open = !newRows[index].open;
    setRandom(Math.random());
  };

  const changeStatus = (id, period) => {
    const index = newRows.findIndex((r) => r.id === id);
    const historyIndex = newRows[index].history.findIndex((c) => c.Periodo === period);
    newRows[index].history[historyIndex].Tiempo = !newRows[index].history[historyIndex].Tiempo;
    setRandom(Math.random());
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL_PROD + "/listLoans")
      .then((response) => {
        if (response.data.length > 0) {
          setLoans(response.data);
          for (const loan of response.data) {
            const calculateHistory = [];
            const monto = loan.Cantidad / loan.Meses_p;
            for (let n = 0; loan.Meses_p > n; n++) {
              calculateHistory.push({
                Monto: monto,
                Periodo: n + 1,
                Fecha: addMonth(n + 1, loan.Fecha),
                Tiempo: false,
              });
            }
            setNewRows((newRow) => [
              ...newRow,
              {
                open: false,
                id: loan.id,
                Nombre: loan.Nombre,
                Email: loan.Email,
                Interes: loan.Interes,
                Monto_d: loan.Cantidad * (loan.Interes / 100),
                Monto_p: (loan.Cantidad / 2) * (loan.Interes / 100),
                Monto_f: loan.Cantidad,
                history: calculateHistory,
              },
            ]);
            setOldRows((oldRow) => [
              ...oldRow,
              {
                open: false,
                id: loan.id,
                Nombre: loan.Nombre,
                Email: loan.Email,
                Interes: loan.Interes,
                Monto_d: loan.Cantidad * (loan.Interes / 100),
                Monto_p: (loan.Cantidad / 2) * (loan.Interes / 100),
                Monto_f: loan.Cantidad,
                history: calculateHistory,
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
    const rowsFiltered = oldRows.filter(
      (row) => row.Nombre.toString().toLowerCase() === input.toLowerCase()
    );
    if (rowsFiltered.length > 0) {
      setNewRows(rowsFiltered);
    }
    if (rowsFiltered.length === 0 && input.length > 0) {
      setNewRows([]);
    }
    if (rowsFiltered.length === 0 && input.length === 0) {
      setNewRows(oldRows);
    }
  }, [input]);

  return (
    <>
      <div className="w-100 text-center mt-2 mb-0 p-3 bg-white">
        <h4>Buscar por nombre...</h4>
        <TextField
          className="w-50"
          onChange={(e) => setInput(e.target.value)}
          id="Buscar"
          label="Buscar..."
          multiline
          maxRows={50}
        />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Pagos</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Interés</TableCell>
              <TableCell align="center">Monto Debe</TableCell>
              <TableCell align="center">Monto Pagado</TableCell>
              <TableCell align="center">Monto Final</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newRows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                  <TableCell>
                    <IconButton
                      key={random}
                      aria-label="expand row"
                      size="small"
                      onClick={() => openRow(row.id)}
                    >
                      {row.open ? (
                        <img
                          width="25px"
                          height="25px"
                          src="/assets/eye-closed.svg"
                          alt="none"
                        />
                      ) : (
                        <img
                          width="25px"
                          height="25px"
                          src="/assets/eye-open.svg"
                          alt="none"
                        />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => editModal(row.id)}
                    >
                      <img
                        width="25px"
                        height="25px"
                        src="/assets/edit.svg"
                        alt="none"
                      />
                    </IconButton>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => deleteRow(row.id)}
                    >
                      <img
                        width="25px"
                        height="25px"
                        src="/assets/delete.svg"
                        alt="none"
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {row.Nombre}
                  </TableCell>
                  <TableCell align="center">{row.Email}</TableCell>
                  <TableCell align="center">{row.Interes}</TableCell>
                  <TableCell align="center">{row.Monto_d}</TableCell>
                  <TableCell align="center">{row.Monto_p}</TableCell>
                  <TableCell align="center">{row.Monto_f}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse
                      in={row.open}
                      key={row.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          Historial de pagos
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Monto</TableCell>
                              <TableCell align="center">
                                Periodo de Pago
                              </TableCell>
                              <TableCell align="center">
                                Fecha de Pago
                              </TableCell>
                              <TableCell align="center">En Tiempo</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.history.map((historyRow) => (
                              <TableRow key={Math.random()}>
                                <TableCell align="center">
                                  {historyRow.Monto.toFixed(2)}
                                </TableCell>
                                <TableCell align="center">
                                  {historyRow.Periodo}
                                </TableCell>
                                <TableCell align="center">
                                  {historyRow.Fecha}
                                </TableCell>
                                <TableCell align="center">
                                  {historyRow.Tiempo ? (
                                    <IconButton
                                      aria-label="expand row"
                                      size="small"
                                      onClick={() => changeStatus(row.id, historyRow.Periodo)}
                                    >
                                      <img
                                        width="25px"
                                        height="25px"
                                        src="/assets/green.svg"
                                        alt="none"
                                      />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      aria-label="expand row"
                                      size="small"
                                      onClick={() => changeStatus(row.id, historyRow.Periodo)}
                                    >
                                      <img
                                        width="25px"
                                        height="25px"
                                        src="/assets/red.svg"
                                        alt="none"
                                      />
                                    </IconButton>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Edit Modal */}
      <div>
        <Modal
          open={edit}
          onClose={() => setEdit(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}
