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
    <div className="bg-gray-50 shadow-sm rounded-lg ">
      <div className="mb-4 flex items-center justify-center mt-4">
        <span className=" bg-white-100 text-yellow-500 md:mx-2">{icon}</span>
        <h3 className="font-bold border-white-500 pl-2 text-emerald-800">
          {title}
        </h3>
      </div>

      <div className="flex ">
        <h3 className="text-2xl font-bold mt-16 md:mx-2">{totalCount}</h3>
        <div className="ml-12 md:ml-4 lg:w-4">
          <Chart
            className="w-[460px] md:w-[220px] lg:w-[680] xl:w-[380px] md:mr-12"
            options={chartOptions}
            series={chartSeries}
            type={chartType}
            width={"85%"}
            height={"80%"}
          />
        </div>
      </div>

      <div className="mt-4 mx-4 mb-2">
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
