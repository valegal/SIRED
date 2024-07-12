import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const VariableTable = ({ variablesData }) => {
    return (
        <table className="min-w-full divide-y border border-collapse table-fixed font-mono text-sm border-lime-500 divide-gray-200">
            <thead className="bg-gray-50 border border-lime-500">
                <tr className="bg-gray-50 border border-lime-500">
                    <th scope="col" className="px-6 py-3 text-left text-xs text-lime-700 tracking-wider">
                        Nombre Variable
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs text-lime-700 tracking-wider">
                        Valor
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs text-lime-700 tracking-wider">
                        # Registro
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs text-lime-700 tracking-wider">
                        Conversión
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs text-lime-700 tracking-wider">
                        Tipo
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 border border-lime-500">
                {variablesData.map((variable, index) => (
                    <tr key={index}>
                        <td className="px-6 ">{variable['Nombre Variable']}</td>
                        <td className="px-6  whitespace-nowrap">{variable['Valor']}</td>
                        <td className="px-6  whitespace-nowrap">{variable['# Registro']}</td>
                        <td className="px-6  whitespace-nowrap">{variable['Conversión']}</td>
                        <td className="px-6  whitespace-nowrap">{variable['Tipo']}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

VariableTable.propTypes = {
    variablesData: PropTypes.array.isRequired,
};

const TablaVariables = ({ idMedicion, variablesMedicion }) => {
    const [variablesData, setVariablesData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (variablesMedicion && variablesMedicion !== '') {
                try {
                    // Primera petición para obtener datos de variables
                    const variablesResponse = await fetch(`/values/${variablesMedicion}.json`);
                    if (!variablesResponse.ok) {
                        throw new Error('Failed to fetch variables');
                    }
                    const variablesData = await variablesResponse.json();

                    // Segunda petición para obtener datos específicos para 'Valor'
                    const valuesResponse = await fetch(`${import.meta.env.VITE_API_URL}/variables/${idMedicion}`);
                    if (!valuesResponse.ok) {
                        const errorText = await valuesResponse.text();
                        throw new Error(`Failed to fetch variable values: ${errorText}`);
                    }
                    const valuesData = await valuesResponse.json();

                    // Asegurarnos de que valuesData sea un array y contenga al menos un elemento
                    const variables = valuesData && valuesData.length > 0 ? valuesData[0].variables : [];

                    // Combinar los datos de variables y valores en un solo array de objetos
                    const combinedData = variablesData.map((variable, index) => ({
                        'Nombre Variable': variable['Nombre variable'],
                        'Valor': variables[index] !== undefined ? variables[index] : 'N/A',
                        '# Registro': variable['# registro'],
                        'Conversión': variable['conversion'],
                        'Tipo': variable['tipo'],
                    }));

                    setVariablesData(combinedData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setVariablesData([]);
                    setError(error.message);
                }
            }
        };

        fetchData();
    }, [idMedicion, variablesMedicion]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex mt-6">
            <VariableTable variablesData={variablesData} />
        </div>
    );
};

TablaVariables.propTypes = {
    idMedicion: PropTypes.string.isRequired,
    variablesMedicion: PropTypes.string.isRequired,
};

export default TablaVariables;
