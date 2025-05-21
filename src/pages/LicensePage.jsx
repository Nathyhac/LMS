import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchLicence,
    // fetchCompany,
    // fetchProduct,
    // createLicence,
    updateLicenceStatus,
} from '../Slices/license/Thunk.js';
import { toast } from 'react-toastify';
import NewLicense from '../Component/license/NewLicense.jsx';


function LicencePage() {
    const dispatch = useDispatch();
    const { data, isLoading } = useSelector((state) => state.license);
    // const companyList = useSelector((state) => state.company.data);
    // const productList = useSelector((state) => state.product.data);

    const [showForm, setShowForm] = useState(false);
    // const [formData, setFormData] = useState({
    //     productId: '',
    //     companyId: '',
    //     seats: '',
    //     subscriptionType: 'monthly',
    // });
    // const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        dispatch(fetchLicence());
        // dispatch(fetchCompany());
        // dispatch(fetchProduct());
    }, [dispatch]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({ ...prev, [name]: value }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const { productId, companyId, seats, subscriptionType } = formData;
    //     if (!productId || !companyId || !seats || !subscriptionType) {
    //         setErrorMessage('All fields are required.');
    //         return;
    //     }

    //     dispatch(createLicence({ ...formData, seats: Number(seats) })).then((result) => {
    //         if (result.meta.requestStatus === 'fulfilled') {
    //             toast.success('License created successfully.');
    //             setFormData({ productId: '', companyId: '', seats: '', subscriptionType: 'monthly' });
    //             setShowForm(false);
    //             dispatch(fetchLicence());
    //         } else {
    //             toast.error('An error occurred. Please try again.');
    //         }
    //     });
    // };

    const handleActivate = (id) => {
        console.log(id)
        dispatch(updateLicenceStatus({ id })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                toast.success('License activated successfully');
                dispatch(fetchLicence());
            } else {
                toast.error('Failed to activate license');
            }
        });
    };

    return (
        <div className="w-full p-4 relative">
            <h2 className="text-xl font-bold mb-4">Licenses</h2>
            {/* <NewLicense /> */}
            {/* {showForm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-4">New License</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Product</label>
                                <select
                                    name="productId"
                                    value={formData.productId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 p-2 rounded"
                                    required
                                >
                                    <option value="">Select Product</option>
                                    {productList?.map((product) => (
                                        <option key={product._id} value={product._id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Company</label>
                                <select
                                    name="companyId"
                                    value={formData.companyId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 p-2 rounded"
                                    required
                                >
                                    <option value="">Select Company</option>
                                    {companyList?.map((company) => (
                                        <option key={company._id} value={company._id}>
                                            {company.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Seats</label>
                                <input
                                    type="number"
                                    name="seats"
                                    value={formData.seats}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Subscription Type</label>
                                <select
                                    name="subscriptionType"
                                    value={formData.subscriptionType}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 p-2 rounded"
                                    required
                                >
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>

                            {errorMessage && (
                                <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
                            )}

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    disabled={isLoading}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )} */}
            {
                showForm && <NewLicense setShowForm={setShowForm} />
            }

            {/* Table Display */}
            {isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
            ) : data?.length > 0 ? (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">License Key</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seats</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((license) => (
                                <tr key={license._id}>
                                    <td className="px-6 py-4 text-sm text-gray-900">{license.licenseKey}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{license.product?.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{license.company?.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{license.seats}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{license.subscriptionType}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{license.status}</td>
                                    <td className="px-6 py-4 text-sm text-right">
                                        {license.status === 'pending' && (
                                            <button
                                                onClick={() => handleActivate(license.licenseKey)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            >
                                                Activate
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">No licenses available</p>
                </div>
            )}

            {/* Create New Button */}
            <div className="flex justify-end mt-5">
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create New License
                </button>
            </div>
        </div>
    );
}

export default LicencePage;
