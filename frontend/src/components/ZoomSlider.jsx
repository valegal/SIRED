import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ZoomSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/primera.webp",
    "/segunda.webp",
    "/cuatro.webp",
    "/seis.webp",
    "/tres.webp",
    "/cinco.webp",
    "/siete.webp",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const rol = localStorage.getItem('role');

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((img, index) => (
        <motion.img
          key={index}
          className="absolute inset-0 object-cover w-full h-full"
          src={img}
          alt={`Slide ${index + 1}`}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: currentIndex === index ? 1 : 0,
            scale: currentIndex === index ? 1 : 1.1,
            transition: { duration: 0.4 }
          }}
        />
      ))}

      <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-3 rounded-full bg-white ${
              index === currentIndex ? "opacity-100" : "opacity-50"
            } my-4 px-4`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
      
      <div className="absolute inset-x-0 bottom-24 md:bottom-40 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-6xl py-5 px-2 font-bold bg-opacity-70 italic rounded-lg bg-lime-950 text-white mb-6" style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" }}>
            Semillero de Investigación en Recursos Energéticos Distribuidos
          </h1>
          <img src="/uislogo.svg.png" alt="logo de la Universidad Industrial de Santander" className="mt-4 mx-auto my-4 w-auto h-24" />
          
          {rol ? (
            <>
              {rol === 'pregrado' && (
                <Link to="/datos/pregrado">
                  <button className="mt-8 px-6 py-2 text-md bg-white bg-opacity-70 text-gray-900 rounded-lg font-semibold transition ease-in-out hover:bg-white delay-150 hover:scale-105">Ir a datos del Sistema Griv (Pregrado)</button>
                </Link>
              )}
              {rol === 'posgrado' && (
                <Link to="/datos/posgrado">
                  <button className="mt-8 px-6 py-2 text-md bg-white bg-opacity-70 text-gray-900 rounded-lg font-semibold transition ease-in-out hover:bg-white delay-150 hover:scale-105">Ir a datos del Sistema Griv (Posgrado)</button>
                </Link>
              )}
              {rol === 'administrador' && (
                <Link to="/datos/administrador">
                  <button className="mt-8 px-6 py-2 text-md bg-white bg-opacity-70 text-gray-900 rounded-lg font-semibold transition ease-in-out hover:bg-white delay-150 hover:scale-105">Ir a datos del Sistema Griv (Administrador)</button>
                </Link>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="mt-8 px-6 py-2 text-md bg-white bg-opacity-80 text-gray-900 rounded-lg font-semibold transition ease-in-out hover:bg-white delay-150 hover:scale-105">Ir a datos del Sistema Griv</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZoomSlider;
