import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Swal from "sweetalert2";
import { convertDateTime, validateForm } from "../LoanHelper";
import axios from "axios";

export default function Register() {
  const [flag, setFlag] = useState(true);
  const [form, setForm] = useState({
    CI: "",
    Nombre: "",
    Apellido_p: "",
    Apellido_m: "",
    Cantidad: "",
    Telefono: "",
    Email: "",
    Fecha: "",
    Dia_cobro: "",
    Meses_p: "",
    Interes: "",
  });

  useEffect(() => {
    const item = localStorage.getItem("loan");
    if (item) {
      const loan = JSON.parse(item);
      localStorage.setItem("id", loan[0].id);
      setForm({
        ...form,
        CI: loan[0].CI,
        Nombre: loan[0].Nombre,
        Apellido_p: loan[0].Apellido_p,
        Apellido_m: loan[0].Apellido_m,
        Cantidad: loan[0].Cantidad,
        Telefono: loan[0].Telefono,
        Email: loan[0].Email,
        Fecha: convertDateTime(loan[0].Fecha),
        Dia_cobro: loan[0].Dia_cobro,
        Meses_p: loan[0].Meses_p,
        Interes: loan[0].Interes,
      });
      console.log(loan[0]);
    }
  }, []);

  const edit = () => {
    const id = localStorage.getItem("id");
    const formValidated = validateForm(form);
    if (formValidated === "") {
      axios
        .put(process.env.REACT_APP_API_URL + "/updateLoan/" + id, form)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "¡Se ha editado su solicitud correctamente!",
            width: 600,
            padding: "3em",
            fontSize: "small",
            color: "#716add",
            background: "#fff",
            backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
              `,
          });
          setFlag(true);
          clear();
        })
        .catch((error) => {
          Swal.fire({
            title: error,
            icon: "error",
            width: 600,
            padding: "3em",
            fontSize: "small",
            color: "#716add",
            background: "#fff",
            backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
              `,
          });
          setFlag(false);
        });
      setFlag(true);
    } else {
      Swal.fire({
        title: formValidated,
        width: 600,
        icon: "error",
        padding: "3em",
        fontSize: "small",
        color: "#716add",
        background: "#fff",
        backdrop: `
            rgba(0,0,123,0.4)
            left top
            no-repeat
          `,
      });
      setFlag(false);
    }
  };

  const submit = () => {
    const formValidated = validateForm(form);
    if (formValidated === "") {
      axios
        .post(process.env.REACT_APP_API_URL + "/insertLoan", form)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "¡Se ha enviado su solicitud correctamente!",
            width: 600,
            padding: "3em",
            fontSize: "small",
            color: "#716add",
            background: "#fff",
            backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
              `,
          });
          setFlag(true);
          clear();
        })
        .catch((error) => {
          Swal.fire({
            title: error,
            icon: "error",
            width: 600,
            padding: "3em",
            fontSize: "small",
            color: "#716add",
            background: "#fff",
            backdrop: `
                rgba(0,0,123,0.4)
                left top
                no-repeat
              `,
          });
          setFlag(false);
        });
      setFlag(true);
    } else {
      Swal.fire({
        title: formValidated,
        width: 600,
        icon: "error",
        padding: "3em",
        fontSize: "small",
        color: "#716add",
        background: "#fff",
        backdrop: `
            rgba(0,0,123,0.4)
            left top
            no-repeat
          `,
      });
      setFlag(false);
    }
  };

  const clear = () => {
    setForm({
      ...form,
      CI: "",
      Nombre: "",
      Apellido_p: "",
      Apellido_m: "",
      Cantidad: "",
      Telefono: "",
      Email: "",
      Fecha: "",
      Dia_cobro: "",
      Meses_p: "",
      Interes: "",
    });
  };

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "100ch" } }}
      noValidate
      autoComplete="off"
    >
      <div className="card">
        <div className="title">
          <h1>
            {localStorage.getItem("loan")
              ? "Editar registro"
              : "Solicitar un prestamo"}
          </h1>
        </div>
        <div>
          <Grid container spacing={2}>
            <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                required
                value={form.CI}
                onChange={(e) => setForm({ ...form, CI: e.target.value })}
                sx={{ width: "90ch" }}
                id="CI"
                label="CI"
                multiline
                maxRows={11}
              />
            </Grid>
            <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={form.Nombre}
                onChange={(e) => setForm({ ...form, Nombre: e.target.value })}
                id="Nombre"
                label="Nombre"
                multiline
                maxRows={150}
              />
            </Grid>
            <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={form.Apellido_p}
                onChange={(e) =>
                  setForm({ ...form, Apellido_p: e.target.value })
                }
                id="Apellido Paterno"
                label="Apellido Paterno"
                multiline
                maxRows={50}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={form.Apellido_m}
                onChange={(e) =>
                  setForm({ ...form, Apellido_m: e.target.value })
                }
                id="Apellido Materno"
                label="Apellido Materno"
                multiline
                maxRows={50}
              />
            </Grid>
            <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={form.Cantidad}
                onChange={(e) => setForm({ ...form, Cantidad: e.target.value })}
                id="Cantidad Prestada"
                label="Cantidad Prestada"
                type="number"
                multiline
                maxRows={50}
              />
            </Grid>
            <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={form.Telefono}
                onChange={(e) => setForm({ ...form, Telefono: e.target.value })}
                id="Teléfono"
                label="Teléfono"
                type="number"
                multiline
                maxRows={32}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={form.Dia_cobro}
                onChange={(e) =>
                  setForm({ ...form, Dia_cobro: e.target.value })
                }
                id="Día de cobro"
                label="Día de cobro"
                type="number"
                multiline
              />
            </Grid>
            <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={form.Meses_p}
                onChange={(e) => setForm({ ...form, Meses_p: e.target.value })}
                id="Meses del Prestamo"
                label="Meses del Prestamo"
                type="number"
                multiline
              />
            </Grid>
            <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={form.Interes}
                onChange={(e) => setForm({ ...form, Interes: e.target.value })}
                id="Intereses"
                label="Intereses"
                type="number"
                multiline
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                value={form.Email}
                onChange={(e) => setForm({ ...form, Email: e.target.value })}
                id="Email"
                label="Email"
                type="email"
                multiline
                maxRows={200}
              />
            </Grid>
            {localStorage.getItem("loan") ? (
              <></>
            ) : (
              <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="datePicker"
                      label="Fecha de Préstamo"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          Fecha: convertDateTime(e),
                        })
                      }
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            )}
          </Grid>
        </div>
        <div className="button-container">
          {localStorage.getItem("loan") ? (
            <Button
              onClick={edit}
              variant="outlined"
              color={flag ? "success" : "error"}
            >
              Editar
            </Button>
          ) : (
            <Button
              onClick={submit}
              variant="outlined"
              color={flag ? "success" : "error"}
            >
              Enviar
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
}
