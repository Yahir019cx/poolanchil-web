import { useNavigate } from "react-router-dom";

// Imágenes desde public
const fondo = "/images/wall.webp";
const chica = "/images/girl.webp";
const brand = "/images/poolChillLogo.png";
const logoBg = "/poolChillicon.png";

const Invitation = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden font-['Montserrat',sans-serif]">
      {/* Fondo */}
      <img
        src={fondo}
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover object-center z-[1]"
      />

      {/* Logo verde detrás */}
      <img
        src={logoBg}
        alt="Logo fondo"
        className="absolute top-[6%] left-1/2 -translate-x-1/2 w-80 z-[2]"
      />

      {/* Pool & Chill + slogan */}
      <img
        src={brand}
        alt="Pool & Chill"
        className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[420px] z-[3]"
      />

      {/* Chica */}
      <img
        src={chica}
        alt="Chica con celular"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[380px] z-[4]"
      />

      {/* Botones */}
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex justify-center z-[5]">
        <button
          onClick={() => navigate("/detalle")}
          className="px-12 py-4 rounded-[40px] border-none text-lg font-bold tracking-wider cursor-pointer shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition-all duration-[250ms] bg-[#d2b26b] text-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] hover:scale-105"
        >
          RESERVAR
        </button>
      </div>
    </div>
  );
};

export default Invitation;
