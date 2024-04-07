
import { Icon } from '@iconify/react';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md text-center">
      <div className="flex flex-col items-center mb-6">
          <Icon className="rounded-full bg-gray-200 hover:bg-gray-300 w-40 h-40 p-2 mb-6" icon="ph:ladder-duotone" width="48" height="48" />
          <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
        </div>
        <p className="mb-4">La página que estás buscando no existe o ha sido eliminada.</p>
        <button
          className="absolute top-0 left-0 m-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          onClick={() => window.history.back()}
        >
          <Icon icon="ph:solar-panel-fill" width="48" height="48"  />
        </button>
      </div>
    </div>
  );
}

export default NotFound;
