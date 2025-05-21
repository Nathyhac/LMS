import UpperAnalytics from "../Component/charts/upperAnalytics";
import LowerAnalytics from "../Component/charts/lowerAnalytics";
import PopularityChart from "./charts/popularityChart";
import ProductTable from "../Component/productTable";
export default function Dashboard() {
  return (
    <div className="w-full">
      <div className="mx-4">
        <UpperAnalytics />
        <LowerAnalytics />
        <div className="flex md:flex lg:flex-row flex-col gap-16 mt-12 p-2">
          <PopularityChart />
          <ProductTable />
        </div>
      </div>
    </div>
  );
}
