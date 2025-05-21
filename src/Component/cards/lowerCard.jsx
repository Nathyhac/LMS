import Chart from "react-apexcharts";

const LowerCard = ({
  header,
  chartType,
  chartOptions,
  chartSeries,
  selector,
  width,
}) => {
  return (
    // <div className="h-auto w-sm md:w-md lg:w-lg xl:w-xl flex flex-col bg-gray-50  rounded-xl">
    <div className="bg-gray-50 rounded-xl flex flex-col w-full lg:max-w-xl xl:max-w-2xl p-2">
      <div className="mx-4 mt-4 mb-2 flex items-center justify-between pr-5">
        {header}
        <div className=" ">{selector}</div>
      </div>

      <div className="flex items-center justify-center">
        <div className="">
          <Chart
            className="w-[560px] md:w-[620px] lg:w-[380] xl:w-[560px]"
            options={chartOptions}
            series={chartSeries}
            type={chartType}
            width={width}
          />
        </div>
      </div>
    </div>
  );
};

export default LowerCard;
