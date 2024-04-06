import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ZoomSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://i.imgur.com/Yszno5e.jpg",
    "https://i.imgur.com/ZBzbir7.jpg",
    "https://i.imgur.com/xpeJkkR.jpg",
    "https://i.imgur.com/0NAc45h.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

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
            transition: { duration: 0.5 }
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
      <div className="absolute inset-x-0 bottom-40 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-6xl font-bold text-white mb-6">Semillero de Investigación en Recursos Energéticos Distribuidos</h1>
          <h2 className="text-xl font-semibold text-white">Entender y estudiar los elementos y componentes para la integración de la generación distribuida en los Sistemas de Distribución de la Energía Eléctrica, considerando los procesos de consumo de los usuarios finales en las redes de explotación.</h2>
          
          <Link to="/datos">
          <button className="mt-8 px-6 py-2 text-md bg-white bg-opacity-70 text-black rounded-lg font-mono transition ease-in-out hover:bg-white delay-150 hover:scale-105">Ir a datos del Sistema Griv</button></Link>
        </div>
      </div>
    </div>
  );
};

export default ZoomSlider;
