import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompany } from '../Slices/company/Thunk.js';

function CompanyPage() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.company);

    useEffect(() => {
        dispatch(fetchCompany());
    }, [dispatch])

    if(!data.data) return <h1>
        Loading...
    </h1>

    return (
        <div className="w-full h-full">
            
            {data.isLoading && (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
            )}

            {data.error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-5">
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-red-700">Error loading data. Please try again.</p>
                        </div>
                    </div>
                </div>
            )}

            {data.data && data.data.length > 0 && (
                <>
                <div className=" w-full overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    address
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.data.map((company) => (
                                <tr key={company.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <span className="text-indigo-600 font-medium">{company.name.charAt(0)}</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{company.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{company.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{company.address.street}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </>
            )}

            {data.data && data.data.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500">No data available</p>
                </div>
            )}

        </div>
    )
}

export default CompanyPage;
