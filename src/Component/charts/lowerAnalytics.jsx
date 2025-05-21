import { useEffect } from "react";
import LowerCard from "../cards/lowerCard";
import { useSelector, useDispatch } from "react-redux";
import { Select, MenuItem } from "@mui/material";
import {
  fetchLicensesAnalytics,
  fetchProductsAnalytics,
  fetchCompaniesAnalytics,
} from "../../Slices/analyticsBar/Thunk";
import { fetchLicenseByStatus } from "../../Slices/statusChart/Thunk";

const LowerAnalytics = () => {
  const dispatch = useDispatch();
  const { licenseCount, productCount, companyCount, months } = useSelector(
    (state) => state.analyticsBar
  );

  const {
    statusData,
    activeStateCount,
    inactiveStateCount,
    pendingStateCount,
  } = useSelector((state) => state.statusChart);

  const barData = useSelector((state) => state.analyticsBar);

  useEffect(() => {
    dispatch(fetchLicensesAnalytics());
    dispatch(fetchProductsAnalytics());
    dispatch(fetchCompaniesAnalytics());
    dispatch(fetchLicenseByStatus());
  }, [dispatch]);

  const analyticsBarOptionsData = {
    chart: {
      type: "bar",
      height: 500,
      width: 520,
      stacked: true,
    },
    colors: ["#007FFF", "#00CCCC", "#FFD700"],
    xaxis: {
      categories: months,
    },
    yaxis: {
      title: {
        text: "12 months status",
      },
      labels: { formatter: (val) => val },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        endingShape: "rounded",
        dataLabels: {
          enabled: false,
        },
      },
    },
    stroke: {
      colors: ["transparent"],
      width: 2,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      floating: true,
      // offsetY: 35,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `${val}`,
      },
    },
  };

  const analyticsBarSeriesDta = [
    { name: "License", data: licenseCount },
    { name: "Company", data: companyCount },
    { name: "Product", data: productCount },
  ];

  const statusChartData = {
    series: [activeStateCount, pendingStateCount, inactiveStateCount],
    options: {
      labels: statusData,
      colors: ["#32CD32", "#E4D00A", "#FF5733"],
      dataLabels: {
        style: {
          fontSize: "16px",
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold",
          colors: ["#32CD32", "#8B4000", "#FF5733"],
        },
      },
    },
  };

  return (
    <div className="flex md:flex lg:flex-row flex-col gap-12 mt-12 p-2">
      {barData.isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      )}
      {barData.data && barData.data.length > 0 && (
        <>
          <LowerCard
            header={
              <h2 className="font-bold text-xl text-emerald-800 whitespace-nowrap">
                {" "}
                Yearly License Analytics:
              </h2>
            }
            chartType="bar"
            chartOptions={analyticsBarOptionsData}
            chartSeries={analyticsBarSeriesDta}
          />
          <LowerCard
            header={
              <h2 className="font-bold text-xl text-emerald-800 whitespace-nowrap">
                {" "}
                License by status Analytics:
              </h2>
            }
            selector={
              <Select
                className=" "
                // value={selectedProduct}
                // onChange={handleProductChange}
                size="small"
                defaultValue=" "
                sx={{ minWidth: 80 }}
              >
                <MenuItem value=" ">All</MenuItem>
                <MenuItem value="perDay">Per Day</MenuItem>
                <MenuItem value="perWeek">Per Week</MenuItem>
                <MenuItem value="perMonth">Per Month</MenuItem>
                <MenuItem value="perYear">Per Year</MenuItem>
              </Select>
            }
            chartType="donut"
            chartOptions={statusChartData.options}
            chartSeries={statusChartData.series}
            // width={400}
          />
        </>
      )}
      {barData.data && barData.data.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No data available</p>
        </div>
      )}
    </div>
  );
};
export default LowerAnalytics;
