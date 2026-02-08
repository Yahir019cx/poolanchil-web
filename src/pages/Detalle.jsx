import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cabinFeatures } from "../components/register/constants/amenities";

/* 🔥 pool amenities si luego las quieres */
import { poolFeatures } from "../components/register/constants/amenities";

const images = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
];

export default function Detalle() {
  const navigate = useNavigate();

  const [fav, setFav] = useState(false);
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  /* 🔥 SIMULACIÓN BACKEND */
  const space = {
    name: "Cabaña Pool&Chill Deluxe",
    location: "Aguascalientes",
    price: 5500,
    rating: 4.9,
    guests: 10,
    bedrooms: 3,
    bathrooms: 2,

    /* amenidades reales que tiene esta cabaña */
    amenities: [
      "wifi",
      "tv",
      "cocina",
      "lavadora",
      "refrigerador",
      "ac",
      "estacionamiento",
      "sillones",
      "microondas",
      "comedor",
      "utensilios",
      "chimenea",
      "bocina",
      "toallas"
    ]
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] pb-32">

      {/* ===== CARD PRINCIPAL ===== */}
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* ===== CARRUSEL ===== */}
          <div className="relative w-full h-[260px] md:h-[420px]">
            <img src={images[index]} className="w-full h-full object-cover" />

            {/* back */}
            <button
              onClick={() => navigate("/")}
              className="absolute top-5 left-5 bg-white p-3 rounded-full shadow-lg"
            >
              ←
            </button>

            {/* fav */}
            <button
              onClick={() => setFav(!fav)}
              className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-lg"
            >
              <span className={`text-2xl ${fav ? "text-red-500" : "text-gray-400"}`}>
                ♥
              </span>
            </button>

            {/* arrows */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 bg-white/90 px-3 py-1 rounded-full"
            >‹</button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 bg-white/90 px-3 py-1 rounded-full"
            >›</button>
          </div>

          {/* ===== CONTENIDO ===== */}
          <div className="p-6 md:p-10 space-y-8">

            {/* TITULO */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {space.name}
              </h1>

              <div className="text-gray-500 mt-2">
                ⭐ {space.rating} · {space.guests} huéspedes · {space.bedrooms} recámaras · {space.bathrooms} baños
              </div>
            </div>

            {/* DESCRIP */}
            <p className="text-gray-600 leading-relaxed">
              Disfruta una experiencia Pool&Chill increíble con alberca privada,
              zona de asador, música y espacio perfecto para relajarte con amigos.
            </p>

            {/* ===== AMENIDADES CABAÑA ===== */}
            <div>
              <h3 className="text-xl font-bold mb-6">Lo que ofrece la cabaña</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cabinFeatures.map((item) => {
                  const Icon = item.icon;

                  /* si la cabaña tiene esa amenidad */
                  const isActive = space.amenities.includes(item.value);

                  return (
                    <div
                      key={item.value}
                      className={`
                        flex items-center gap-3
                        border rounded-xl px-4 py-4
                        transition-all duration-200

                        ${
                          isActive
                            ? "border-sky-400 shadow-sm"
                            : "border-gray-200 opacity-40"
                        }
                      `}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-sky-500" : "text-gray-400"
                        }`}
                      />

                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===== MAPA ===== */}
            <div>
              <h3 className="text-xl font-bold mb-3">📍 ¿Dónde vas a estar?</h3>

              <div className="rounded-2xl overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps?q=Aguascalientes,Mexico&output=embed"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                La ubicación exacta se comparte después de reservar.
              </p>
            </div>

            {/* PRECIO */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-t pt-6">
              <div>
                <p className="text-3xl font-bold text-teal-600">
                  ${space.price} MXN
                </p>
                <p className="text-gray-500">por día</p>
              </div>

              <button className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg text-lg">
                Reservar ahora
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ===== BOTON FIJO MOBILE ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between items-center">
        <div>
          <p className="font-bold text-lg">${space.price} MXN</p>
          <p className="text-xs text-gray-500">por día</p>
        </div>

        <button className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold">
          Reservar
        </button>
      </div>
    </div>
  );
}
