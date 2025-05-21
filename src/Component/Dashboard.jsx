import UpperAnalytics from "../Component/charts/upperAnalytics";
import LowerAnalytics from "../Component/charts/lowerAnalytics";
import PopularityChart from "./charts/popularityChart";
export default function Dashboard() {
  return (
    <div className="w-full">
      <div className="mx-4">
        <UpperAnalytics />
        <LowerAnalytics />
        <PopularityChart />
      </div>
    </div>
  );
}
