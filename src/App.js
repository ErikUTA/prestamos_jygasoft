import "./App.css";
import Button from "@mui/material/Button";

function App() {
  return (
    <div className="card d-flex align-items-center">
      <img src="/assets/Prestamos.png" width="400px" height="400px" alt="none" />
      <p className="intro text-center">
        Bienvenidos a mi página web, un sitio en el cual podrán solicitar un
        préstamo y administrar sus pagos, con una interfaz agradable y familiar.
        Si quieres averiguar si eres candidato para un préstamo de Doña Lola,
        haz clic en el siguiente botón.
      </p>
      <Button
        className="btn-intro"
        onClick={() =>
          (window.location.href = "/register")
        }
        variant="outlined"
        color="primary"
      >
        Solicitar
      </Button>
    </div>
  );
}

export default App;
