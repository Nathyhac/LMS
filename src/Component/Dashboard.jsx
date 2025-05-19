import UpperAnalytics from "../Component/charts/upperAnalytics";
import LowerAnalytics from "../Component/charts/lowerAnalytics";
import LowerStatusChart from "./charts/lowerStatusChart";
export default function Dashboard() {
  return (
    <div className="w-full">
      <div className="mx-4">
        <UpperAnalytics />
        <LowerAnalytics />
        <LowerStatusChart />
      </div>
    </div>
  );
}
