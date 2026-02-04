import "../Home.css";

// Imágenes
import fondo from "../assets/POST POOL_Mesa de trabajo 1-01.png";
import chica from "../assets/POST POOL_Mesa de trabajo 1-03.png";
import logoBg from "../assets/variantes_Mesa de trabajo 1.png";
import brand from "../assets/variantes-03.png";

const HomeView = () => {
  return (
    <div className="container">
      {/* Fondo */}
      <img src={fondo} alt="Fondo" className="background" />

      {/* Logo verde detrás */}
      <img src={logoBg} alt="Logo fondo" className="logo-bg" />

      {/* Pool & Chill + slogan */}
      <img src={brand} alt="Pool & Chill" className="brand" />

      {/* Chica */}
      <img src={chica} alt="Chica con celular" className="girl" />

      {/* Botones */}
      <div className="buttons">
        <button className="btn buscar">BUSCAR</button>
        <button className="btn reservar">RESERVAR</button>
      </div>
    </div>
  );
};

export default HomeView;
