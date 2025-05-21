import Chart from "react-apexcharts";
const UpperCard = ({
  icon,
  title,
  chartType,
  totalCount,
  chartOptions,
  chartSeries,
  viewMore,
}) => {
  return (
    <div className="bg-gray-50 items-center justify-center rounded-lg overflow-hidden">
      <div className="flex py-2 px-2">
        <span className=" bg-white-100 text-yellow-500 md:mx-2">{icon}</span>
        <h3 className="font-bold border-white-500 text-emerald-800">{title}</h3>
      </div>
      <div className="ml-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold mt-16 md:mx-2">{totalCount}</h1>
        <div className="mx-4 flex flex-wrap items-center justify-center w-full">
          <Chart
            className="w-[680px] md:w-[680px] lg:w-[480px] xl:w-[480px]"
            options={chartOptions}
            series={chartSeries}
            type={chartType}
            width={"75%"}
            height={"70%"}
          />
        </div>
      </div>

      <div className="my-4 mx-4 ">
        <span
          onClick={viewMore}
          className="text-cyan-600 cursor-pointer font-semibold hover:underline hover:text-blue-800 transition duration-300 ease-in-out"
        >
          View More
        </span>
      </div>
    </div>
  );
};

export default UpperCard;
