import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";

export default function Register() {
  const [flag, setFlag] = useState(false);
  const [form, setForm] = useState({
    CI: "",
    Nombre: "",
    Apellido_paterno: "",
    Apellido_materno: "",
    Cantidad_prestada: "",
    Telefono: "",
    Email: "",
    Fecha_prestamo: "",
    Dia_cobro: "",
    Meses_prestamo: "",
    Intereses: "",
  });

  const submit = () => {
    console.log(form);
    setFlag(!flag);
  }

  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "100ch" } }}
      noValidate
      autoComplete="off"
    >
      <div className="title">
        <h1>Solicitar un prestamo</h1>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
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
              onChange={(e) => setForm({ ...form, Nombre: e.target.value })}
              id="Nombre"
              label="Nombre"
              multiline
              maxRows={150}
            />
          </Grid>
          <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              onChange={(e) =>
                setForm({ ...form, Apellido_paterno: e.target.value })
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
              onChange={(e) =>
                setForm({ ...form, Apellido_materno: e.target.value })
              }
              id="Apellido Materno"
              label="Apellido Materno"
              multiline
              maxRows={50}
            />
          </Grid>
          <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              onChange={(e) =>
                setForm({ ...form, Cantidad_prestada: e.target.value })
              }
              id="Cantidad Prestada"
              label="Cantidad Prestada"
              type="number"
              multiline
              maxRows={50}
            />
          </Grid>
          <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
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
              onChange={(e) => setForm({ ...form, Email: e.target.value })}
              id="Email"
              label="Email"
              type="email"
              multiline
              maxRows={200}
            />
          </Grid>
          <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  className="datePicker"
                  label="Fecha de Préstamo"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      Fecha_prestamo: new Date(e).toLocaleDateString(),
                    })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              onChange={(e) => setForm({ ...form, Dia_cobro: e.target.value })}
              id="Día de cobro"
              label="Día de cobro"
              type="number"
              multiline
            />
          </Grid>
          <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              onChange={(e) =>
                setForm({ ...form, Meses_prestamo: e.target.value })
              }
              id="Meses del Prestamo"
              label="Meses del Prestamo"
              type="number"
              multiline
            />
          </Grid>
          <Grid className="container" size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              onChange={(e) => setForm({ ...form, Intereses: e.target.value })}
              id="Intereses"
              label="Intereses"
              type="number"
              multiline
            />
          </Grid>
        </Grid>
      </div>
      <div className="button-container">
        <Button onClick={submit} variant="contained" color={flag ? "success":"error"}>
          Enviar
        </Button>
      </div>
    </Box>
  );
}
