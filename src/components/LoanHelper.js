export const convertDateTime = (input) => {
  if (!isNaN(input)) {
    const newDateTime = `${new Date(input)
      .toISOString()
      .slice(
        0,
        10
      )} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date()
      .getMilliseconds()
      .toString()
      .slice(0, 2)}`;
    return newDateTime;
  }
};

export const validateForm = (form) => {
  const messages = [];

  form.CI === "" || form.CI.length > 11
    ? messages.push({
        message: "El campo CI no puede estar vacio o ser mayor a 11 caracteres",
        status: "error",
      })
    : messages.push({ status: "success" });

  form.Nombre === "" || form.Nombre.length > 150
    ? messages.push({
        message:
          "El campo Nombre no puede estar vacio o ser mayor a 150 caracteres",
        status: "error",
      })
    : messages.push({ status: "success" });

  form.Apellido_p === "" || form.Apellido_p.length > 50
    ? messages.push({
        message:
          "El campo Apellido Paterno no puede estar vacio o ser mayor a 50 caracteres",
        status: "error",
      })
    : messages.push({ status: "success" });

  form.Apellido_m === "" || form.Apellido_m.length > 50
    ? messages.push({
        message:
          "El campo Apellido Materno no puede estar vacio o ser mayor a 50 caracteres",
        status: "error",
      })
    : messages.push({ status: "success" });

  form.Cantidad === "" || form.Cantidad.length > 8
    ? messages.push({
        message:
          "El campo Cantidad no puede estar vacio o ser mayor a 8 caracteres",
        status: "error",
      })
    : messages.push({ status: "success" });

  form.Telefono.length > 32
    ? messages.push({
        message: "El campo Telefono no puede ser mayor a 32 caracteres",
        status: "error",
      })
    : messages.push({ status: "success" });

  form.Email === "" || form.Email.length > 200
    ? messages.push({
        message: "El campo Email no puede ser mayor a 200 caracteres",
        status: "error",
      })
    : messages.push({ status: "success" });

  form.Fecha === ""
    ? messages.push({
        message: "El campo Fecha no puede estar vacio",
        status: "error",
      })
    : messages.push({ status: "success" });

  form.Dia_cobro === ""
    ? messages.push({
        message: "El campo Día de cobro no puede estar vacio",
        status: "error",
      })
    : messages.push({ status: "success" });

  form.Meses_p === ""
    ? messages.push({
        message: "El campo Meses del prestamo no puede estar vacio",
        status: "error",
      })
    : messages.push({ status: "success" });

  form.Interes === ""
    ? messages.push({
        message: "El campo Intereses no puede estar vacio",
        status: "error",
      })
    : messages.push({ status: "success" });
  
  const newMessage = orderMessages(messages);
  return newMessage;
};

const orderMessages = (messages) => {
  let li = '';
  for(const m of messages) {
    if(m.status === 'error') {
      li += `° ${m.message} \n`; 
    }
  }
  return li;
}
