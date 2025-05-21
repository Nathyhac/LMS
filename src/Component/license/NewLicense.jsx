import { useSelector, useDispatch } from 'react-redux';
import { fetchCompany } from '../../Slices/company/Thunk.js';
import { fetchProduct } from "../../Slices/product/Thunk.js"
import { createLicence } from "../../Slices/license/Thunk.js"
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react';

const NewLicense = ({ setShowForm }) => {
    const dispatch = useDispatch();
    const modalRef = useRef();

    const companyList = useSelector((state) => state.company.data);
    const productList = useSelector((state) => state.product.data);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowForm(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setShowForm]);

    useEffect(() => {
        dispatch(fetchCompany());
        dispatch(fetchProduct());
    }, [dispatch]);


    useEffect(() => {
        dispatch(fetchCompany)
        dispatch(fetchProduct)
    }, [dispatch])

    const [formData, setFormData] = useState({
        productId: '',
        companyId: '',
        seats: '',
        subscriptionType: 'monthly',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { productId, companyId, seats, subscriptionType } = formData;
        if (!productId || !companyId || !seats || !subscriptionType) {
            setErrorMessage('All fields are required.');
            return;
        }

        dispatch(createLicence({ ...formData, seats: Number(seats) })).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                toast.success('License created successfully.');
                setFormData({ productId: '', companyId: '', seats: '', subscriptionType: 'monthly' });
                setShowForm(false);
            } else {
                toast.error('An error occurred. Please try again.');
            }
        });
    };


    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50" >
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                ref={modalRef}
            >
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
                            <option value="six-month">Six-month</option>
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
                        // disabled={isLoading}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewLicense