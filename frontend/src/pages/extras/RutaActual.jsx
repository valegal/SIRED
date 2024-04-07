import React from 'react';
import { useLocation } from 'react-router-dom';

const RutaActual = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div className="flex items-center py-2 overflow-x-auto whitespace-nowrap ml-6">
        
            <span className="mx-5 text-lime-800 rtl:-scale-x-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
            </span>
        

            {pathnames.map((name, index) => {
                // const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

                return (
                    <React.Fragment key={index}>
                        <span className="mx-5 text-green-600"><span className="mx-5 text-lime-700 rtl:-scale-x-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </span></span>
                        {/* <Link to={routeTo} className="text-green-700 hover:underline">{name}</Link> */}
                        <span className="text-green-700">{name}</span>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default RutaActual;
