import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import LowerCard from "../cards/lowerCard";
import { Select, MenuItem } from "@mui/material";
import { fetchPoplularity } from "../../Slices/popularity/Thunk";

const PopularityChart = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.popularity);
  useEffect(() => {
    dispatch(fetchPoplularity());
  }, [dispatch]);

  const popularCountData = data.popularCount;
  const popularNamesData = data.popularProductsName;
  // const popularCountData = [4, 1];
  // const popularNamesData = ["nisr", "siem"];

  const statusData = {
    series: popularCountData,
    options: {
      labels: popularNamesData,
      colors: ["#32CD32", "#E4D00A"],
      dataLabels: {
        style: {
          fontSize: "16px",
          fontFamily: "Inter, sans-serif",
          text: "white",
          fontWeight: "bold",
          colors: ["#000FFF", "#000FFF"],
        },
      },
    },
  };

  return (
    <div className="">
      <>
        <LowerCard
          header={
            <h2 className="font-bold text-xl text-emerald-800 whitespace-nowrap">
              {" "}
              Popularity( NISIR vs SIEM):
            </h2>
          }
          selector={
            <Select
              className=""
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
          chartType="pie"
          chartOptions={statusData.options}
          chartSeries={statusData.series}
          // width={400}
        />
      </>
    </div>
  );
};

export default PopularityChart;
