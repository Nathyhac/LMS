import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../Slices/product/Thunk";

const ProductTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="w-full mt-12 rounded-xl p-2">
      <table className="min-w-full divide-y divide-gray-50">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-lg font-bold text-emerald-900"
            >
              Product Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-lg font-bold text-emerald-900"
            >
              Product Version
            </th>
          </tr>
        </thead>
        <tbody>
          {data.data?.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-50 text-emerald-950 px-4 py-2">
                {item.name}
              </td>
              <td className="border border-gray-50 text-emerald-950 px-4 py-2">
                {item.version}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
