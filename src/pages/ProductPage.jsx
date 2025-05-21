import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct, createProduct, deleteProduct, updateProduct } from '../Slices/product/Thunk.js';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from '../Component/ConfirmDeleteModel.jsx';


function ProductPage() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.product);

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', version: '' });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);


    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for duplicates (excluding self when editing)
        const duplicate = data.data?.some(
            (item) =>
                item.name === formData.name &&
                item.version === formData.version &&
                item._id !== editId
        );

        if (duplicate) {
            toast.error("This product already exists.");
            return;
        }

        if (editMode) {
            const originalProduct = data.data.find((item) => item._id === editId);

            const isUnchanged =
                originalProduct.name === formData.name &&
                originalProduct.version === formData.version;

            if (isUnchanged) {
                toast.info("No changes detected. Update canceled.");
                return;
            }
            dispatch(updateProduct({ id: editId, product: formData }))
                .unwrap()
                .then(() => {
                    resetForm();
                    dispatch(fetchProduct());
                    toast.success("Product updated successfully.");
                })
                .catch((error) => {
                    toast.error(`Failed to update product: ${error}`);
                });

        } else {
            dispatch(createProduct(formData))
                .unwrap()
                .then(() => {
                    resetForm();
                    dispatch(fetchProduct());
                    toast.success("Product created successfully!");
                })
                .catch((error) => {
                    toast.error(`Failed to create product: ${error}`);
                });

        }
    };

    const resetForm = () => {
        setShowForm(false);
        setEditMode(false);
        setEditId(null);
        setFormData({ name: '', version: '' });
        setErrorMessage('');
    };

    const handleEdit = (product) => {
        setFormData({ name: product.name, version: product.version });
        setEditId(product._id);
        setEditMode(true);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setConfirmDeleteId(id);
        setShowConfirmModal(true);
    };

    return (
        <div className="w-full p-4 relative">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <ConfirmDeleteModal
                show={showConfirmModal}
                onCancel={() => {
                    setShowConfirmModal(false);
                    setConfirmDeleteId(null);
                }}
                onConfirm={() => {
                    dispatch(deleteProduct(confirmDeleteId)).then((result) => {
                        if (result.meta.requestStatus === 'fulfilled') {
                            toast.success('Product deleted.');
                            dispatch(fetchProduct());
                        } else {
                            toast.error('Failed to delete product.');
                        }
                        setShowConfirmModal(false);
                        setConfirmDeleteId(null);
                    });
                }}
                itemType="Product"
            />


            {/* Modal Form */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50  flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <h3 className="text-lg font-bold mb-4">{editMode ? 'Edit Product' : 'New Product'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
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
                                <label className="block text-sm font-medium text-gray-700">Version</label>
                                <input
                                    type="text"
                                    name="version"
                                    value={formData.version}
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
                                    onClick={() => {
                                        setShowForm(false);
                                        setErrorMessage('');
                                    }}
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Version</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Edit</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.data.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.version}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-blue-500 hover:text-blue-700 mr-4"
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <button
                                            onClick={() => handleDelete(product._id)}
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
                    <p className="text-gray-500">No products available</p>
                </div>
            )}

            {/* Create Button */}
            <div className="flex justify-end mt-5">
                <button
                    onClick={() => {
                        setFormData({ name: '', version: '' });
                        setEditMode(false);
                        setShowForm(true);
                        setErrorMessage('');
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create New Product
                </button>
            </div>
        </div>
    );
}

export default ProductPage;
