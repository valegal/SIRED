import { Link } from "react-router-dom";
import Card from "./Card";

function CardsTablas() {

  const rol = localStorage.getItem('role');
    return (
        <div className="flex justify-center items-center mt-6 h-50%">
          
          {rol ? (
            <>
              {rol === 'pregrado' && (
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2">

                <Link to="/datos/pregrado/mediciones"><Card title="Mediciones" icon="gis:measure"/></Link>
                <Link to="/datos/pregrado/indicadores"><Card title="Indicadores" icon="oui:app-index-rollup"/></Link>
                <Link to="/datos/pregrado/equipos"><Card title="Equipos" icon="ph:solar-panel-fill"/></Link>
                <Link to="/datos/pregrado/grupos"><Card title="Grupos" icon="fluent:group-24-regular"/></Link>
    
              </div>
              )}
              {rol === 'posgrado' && (
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2">

                <Link to="/datos/posgrado/mediciones"><Card title="Mediciones" icon="gis:measure"/></Link>
                <Link to="/datos/posgrado/indicadores"><Card title="Indicadores" icon="oui:app-index-rollup"/></Link>
                <Link to="/datos/posgrado/equipos"><Card title="Equipos" icon="ph:solar-panel-fill"/></Link>
                <Link to="/datos/posgrado/grupos"><Card title="Grupos" icon="fluent:group-24-regular"/></Link>
    
              </div>
              )}
              {rol === 'administrador' && (
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2">

                <Link to="/datos/administrador/mediciones"><Card title="Mediciones" icon="gis:measure"/></Link>
                <Link to="/datos/administrador/indicadores"><Card title="Indicadores" icon="oui:app-index-rollup"/></Link>
                <Link to="/datos/administrador/equipos"><Card title="Equipos" icon="ph:solar-panel-fill"/></Link>
                <Link to="/datos/administrador/grupos"><Card title="Grupos" icon="fluent:group-24-regular"/></Link>
    
              </div>
              )}
            </>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">

            <Link to="/datos/pregrado/mediciones"><Card title="Mediciones" icon="gis:measure"/></Link>
            <Link to="/datos/pregrado/indicadores"><Card title="Indicadores" icon="oui:app-index-rollup"/></Link>
            <Link to="/datos/pregrado/equipos"><Card title="Equipos" icon="ph:solar-panel-fill"/></Link>
            <Link to="/datos/pregrado/grupos"><Card title="Grupos" icon="fluent:group-24-regular"/></Link>

          </div>
          )}
          
        


        </div>
      );
    }

export default CardsTablas