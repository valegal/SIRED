import NavUser from "../../components/NavUser";
import RutaActual from "../extras/RutaActual";

function EquiposAdmin() {
  return (
    <div className="bg-lime-200/20 min-h-screen pt-16">
      <div>
        <NavUser></NavUser>
      </div>
      <RutaActual></RutaActual>

      <div className="flex justify-center items-center mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* UNO */}
          <div className="w-full md:w-72 h-48 rounded-lg shadow-2xl ring ring-lime-100 ring-offset ring-offset-lime-200 bg-white flex flex-col justify-center items-center">
            <div className="text-center">
              <p className="text-xl text-green-700 italic font-bold">ACUVIM</p>
            </div>
            <div className="mt-6">
              <div className="flex flex-row">
                <p className="text-md mx-4 text-gray-700 font-semibold">5PAV6</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">6</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">PISO 5</p>
              </div>

              <div className="flex flex-row ml-3">
                <p className="text-md mx-4 text-gray-700 font-semibold">SAV1</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">1</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">Sótano 1</p>
              </div>

            </div>
          </div>

          {/* DOS */}
          <div className="w-full md:w-72 h-48 rounded-lg shadow-2xl ring ring-lime-100 ring-offset ring-offset-lime-200 bg-white  flex flex-col justify-center items-center">
            <div className="text-center">
              <p className="text-xl text-green-700 italic font-bold mt-5">ACUREV</p>
            </div>
            <div className="mt-4">
              <div className="flex flex-row">
                <p className="text-md mx-4 text-gray-700 font-semibold">5PAR4</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">4</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">PISO 5</p>
              </div>

              <div className="flex flex-row">
                <p className="text-md mx-4 text-gray-700 font-semibold">5PAR5</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">5</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">PISO 5</p>
              </div>

              <div className="flex flex-row ml-2">
                <p className="text-md mx-4 text-gray-700 font-semibold">SAR2</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">2</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">Sótano 2</p>
              </div>

              <div className="flex flex-row ml-2">
                <p className="text-md mx-4 text-gray-700 font-semibold">SAR3</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">3</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold mb-5">Sótano 3</p>
              </div>
            </div>
          </div>

          {/* TRES */}
          <div className="w-full md:w-72 h-48 rounded-lg shadow-2xl ring ring-lime-100 ring-offset ring-offset-lime-200 bg-white flex flex-col  items-center">
            <div className="text-center">
              <p className="text-xl text-green-700 italic mt-11 font-bold">Ev390</p>
            </div>
            <div className="mt-8">
              <div className="flex flex-row">
                <p className="text-md mx-4 text-gray-700 font-semibold">4PEV7</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">7</p>
                —
                <p className="text-md mx-4 text-gray-700 font-semibold">PISO 4</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EquiposAdmin;
