import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TablaVariables = ({ variablesMedicion }) => {
    const [variables, setVariables] = useState([]);
    const [variablesValues, setVariablesValues] = useState([]);

    useEffect(() => {
        const fetchVariablesAndValues = async () => {
            if (variablesMedicion && variablesMedicion !== '') {
                try {
                    const response1 = await fetch(`/values/${variablesMedicion}.json`);
                    const data1 = await response1.json();
                    setVariables(data1);

                    const response2 = await fetch(`http://localhost:8081/variables/${variablesMedicion}`);
                    const data2 = await response2.json();
                    if (data2 && data2.variables) {
                        setVariablesValues(data2.variables);
                    } else {
                        setVariablesValues(new Array(data1.length).fill(0));
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setVariables([]);
                    setVariablesValues([]);
                }
            }
        };

        fetchVariablesAndValues();
    }, [variablesMedicion]);

    return (
        <div className="flex mt-6">
            <table className="min-w-full divide-y border border-collapse border-lime-500 divide-gray-200">
                <thead className="bg-gray-50 border border-lime-500 rounded-lg">
                    <tr>
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
                <tbody className="bg-white divide-y divide-gray-200">
                    {variables.map((variable, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{variable['Nombre variable']}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {variablesValues[index] !== undefined ? variablesValues[index] : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{variable['# registro']}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{variable['conversion']}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{variable['tipo']}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

TablaVariables.propTypes = {
    variablesMedicion: PropTypes.string.isRequired,
};

export default TablaVariables;
