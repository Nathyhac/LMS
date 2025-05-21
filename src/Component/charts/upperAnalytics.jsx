import UpperCard from "../cards/upperCard";
import { useSelector } from "react-redux";
import theme from "../../utils/theme";
import { FcAreaChart, FcLineChart } from "react-icons/fc";
import { FaChartSimple } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const UpperAnalytics = () => {
  const { companyCount, productCount, licenseCount, months } = useSelector(
    (state) => state.analyticsBar
  );
  const data = useSelector((state) => state.analyticsBar);
  const totalProduct = productCount.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const totalCompany = companyCount.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const totalLicense = licenseCount.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const productOptionsData = {
    chart: {
      type: "area",
      height: 100,
      sparkline: { enabled: true },
      animations: { enabled: true },
    },
    stroke: { width: 2 },
    xaxis: {
      categories: months,
    },
    tooltip: { enabled: false },
    colors: [theme.palette.primary.main],
  };
  const productSeriesData = [{ name: "products", data: productCount }];
  const navigate = useNavigate();
  const handleproductViewMore = () => {
    navigate("/product-list");
  };
  const licenseOptionsData = {
    chart: {
      type: "line",
      width: 50,
      animations: { enabled: true },
      sparkline: { enabled: true },
    },
    stroke: { width: 2 },
    xaxis: {
      categories: months,
    },
    tooltip: { enabled: false },
    colors: [theme.palette.primary.main],
  };

  const licenseSeriesData = [{ name: "licenses", data: licenseCount }];
  const handleLicenseViewMore = () => {
    navigate("/license-list");
  };
  const companyOptionsData = {
    chart: {
      type: "line",
      width: 50,
      animations: { enabled: true },
      sparkline: { enabled: true },
    },
    stroke: { width: 2 },
    xaxis: {
      categories: months,
    },
    tooltip: { enabled: false },
    colors: [theme.palette.warning.main],
  };

  const companySeriesData = [{ name: "companies", data: companyCount }];

  const handleCompanyViewMore = () => {
    navigate("/nisir/company-list");
  };

  return (
    //
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-12">
      {data.isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      )}
      {data.error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-5">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading data. Please try again.
              </p>
            </div>
          </div>
        </div>
      )}
      {data.data && data.data.length > 0 && (
        <>
          <UpperCard
            icon={<FcAreaChart />}
            title="Total Number of Nisir Products"
            chartType="area"
            totalCount={totalProduct}
            chartOptions={productOptionsData}
            chartSeries={productSeriesData}
            viewMore={handleproductViewMore}
          />
          <UpperCard
            icon={<FcLineChart />}
            title="Total Available License Keys"
            chartType="line"
            totalCount={totalLicense}
            chartOptions={licenseOptionsData}
            chartSeries={licenseSeriesData}
            viewMore={handleLicenseViewMore}
          />

          <UpperCard
            icon={<FaChartSimple />}
            title="Total Number of organizations"
            chartType="bar"
            totalCount={totalCompany}
            chartOptions={companyOptionsData}
            chartSeries={companySeriesData}
            viewMore={handleCompanyViewMore}
          />
        </>
      )}
    </div>
  );
};

export default UpperAnalytics;
