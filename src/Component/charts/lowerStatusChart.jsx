import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import LowerCard from "../cards/lowerCard";
import { Select, MenuItem } from "@mui/material";
import { fetchPoplularity } from "../../Slices/popularity/Thunk";

const LowerStatusChart = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.popularity);
  useEffect(() => {
    dispatch(fetchPoplularity());
  }, [dispatch]);
  console.log("data is:", data);
  const popularCountData = data.popularCount;
  const popularNamesData = data.popularProductsName;
  // console.log(popularCountData);
  // console.log(popularNamesData);

  const statusData = {
    series: popularCountData,
    options: {
      labels: popularNamesData,
      colors: ["#32CD32", "#E4D00A"],
      dataLabels: {
        style: {
          fontSize: "16px",
          fontFamily: "Inter, sans-serif",
          fontWeight: "bold",
          colors: ["#32CD32", "#8B4000"],
        },
      },
    },
  };

  return (
    <div className="flex lg:flex-row flex-col gap-12 mt-12 p-2">
      <>
        <LowerCard
          header={
            <h2 className="font-bold text-xl text-emerald-800 whitespace-nowrap">
              {" "}
              Popularity( nisr vs siem):
            </h2>
          }
          selector={
            <Select
              className="sticky ml-4 md:ml-16 lg:ml-32 xl:ml-48"
              // value={selectedProduct}
              // onChange={handleProductChange}
              size="small"
              defaultValue=" "
              sx={{ minWidth: 100 }}
            >
              <MenuItem value=" ">All</MenuItem>
              <MenuItem value="perDay">Per Day</MenuItem>
              <MenuItem value="perWeek">Per Week</MenuItem>
              <MenuItem value="perMonth">Per Month</MenuItem>
              <MenuItem value="perYear">Per Year</MenuItem>
            </Select>
          }
          chartType="pie"
          chartOptions={statusData.options}
          chartSeries={statusData.series}
          // width={400}
        />
      </>
    </div>
  );
};

export default LowerStatusChart;
