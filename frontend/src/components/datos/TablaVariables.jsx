

// eslint-disable-next-line react/prop-types
const TablaVariables = ({ variablesMedicion }) => {
    return (
        <div className="flex mt-6">
            <table className="min-w-full divide-y border border-collapse border-lime-500  divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs text-lime-700 tracking-wider">
                            Nombre Variable
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs  text-lime-700 tracking-wider">
                            Valor
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {variablesMedicion && variablesMedicion.split(';').map((variable, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`Variable ${index + 1}`}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{variable}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaVariables;
