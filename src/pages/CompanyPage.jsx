import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompany, createCompany, updateCompany, deleteCompany } from '../Slices/company/Thunk.js';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from '../Component/ConfirmDeleteModel.jsx';
function CompanyPage() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.company);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', address: { street: '' } });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    useEffect(() => {
        dispatch(fetchCompany());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'address') {
            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, street: value }
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.address.street) {
            setErrorMessage('All fields are required.');
            return;
        }

        const isSelfUpdate = editMode &&
            data.data.find(item =>
                item._id === editId &&
                item.name === formData.name &&
                item.email === formData.email &&
                item.address?.street === formData.address.street
            );

        if (isSelfUpdate) {
            toast.info("No changes detected.");
            return;
        }

        const duplicate = data.data?.some(
            (item) =>
                item._id !== editId &&
                item.name === formData.name &&
                item.email === formData.email &&
                item.address?.street === formData.address.street
        );

        if (duplicate) {
            toast.error("This company already exists.");
            return;
        }

        const action = editMode
            ? updateCompany({ id: editId, company: formData })
            : createCompany(formData);

        dispatch(action).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                toast.success(editMode ? 'Company updated successfully.' : 'Company created successfully.');
                resetForm();
                dispatch(fetchCompany());
            } else {
                toast.error('An error occurred. Please try again.');
            }
        });
    };

    const handleEdit = (company) => {
        setFormData({
            name: company.name || '',
            email: company.email || '',
            address: { street: company.address?.street || '' }
        });
        setEditId(company._id);
        setEditMode(true);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setConfirmDeleteId(id);
        setShowConfirmModal(true);
    };


    const resetForm = () => {
        setFormData({ name: '', email: '', address: { street: '' } });
        setEditMode(false);
        setEditId(null);
        setShowForm(false);
        setErrorMessage('');
    };

    return (
        <div className="w-full p-4 relative">
            <h2 className="text-xl font-bold mb-4">Companies</h2>

            {/* Delete Confirmation Modal */}
            <ConfirmDeleteModal
                show={showConfirmModal}
                onCancel={() => {
                    setShowConfirmModal(false);
                    setConfirmDeleteId(null);
                }}
                onConfirm={() => {
                    dispatch(deleteCompany(confirmDeleteId)).then((result) => {
                        if (result.meta.requestStatus === 'fulfilled') {
                            toast.success('Company deleted.');
                            dispatch(fetchCompany());
                        } else {
                            toast.error('Failed to delete company.');
                        }
                        setShowConfirmModal(false);
                        setConfirmDeleteId(null);
                    });
                }}
                itemType="Company"
            />

            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <h3 className="text-lg font-bold mb-4">{editMode ? 'Edit Company' : 'New Company'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 p-2 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 p-2 rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address.street}
                                    onChange={handleInputChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 p-2 rounded"
                                />
                            </div>

                            {errorMessage && (
                                <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
                            )}

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    {editMode ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Table */}
            {data.isLoading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                </div>
            ) : data.data?.length > 0 ? (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Edit</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.data.map((company) => (
                                <tr key={company._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.address?.street}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <button
                                            onClick={() => handleEdit(company)}
                                            className="text-blue-500 hover:text-blue-700 mr-4"
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <button
                                            onClick={() => handleDelete(company._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">No companies available</p>
                </div>
            )}

            {/* Create Button */}
            <div className="flex justify-end mt-5">
                <button
                    onClick={() => {
                        setFormData({ name: '', email: '', address: { street: '' } });
                        setEditMode(false);
                        setShowForm(true);
                        setErrorMessage('');
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create New Company
                </button>
            </div>
        </div>
    );
}

export default CompanyPage;
