import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { convertToUnixTimestamp } from "./ConvertToChartData";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "@/Redux/Coin/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    lable: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    lable: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    lable: "1 Month",
    value: 30,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_3",
    key: "3 Month Time Series",
    lable: "3 Month",
    value: 90,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_6",
    key: "6 Month Time Series",
    lable: "6 Month",
    value: 180,
  },
  {
    keyword: "DIGITAL_CURRENCY_YEARLY",
    key: "Yearly Time Series",
    lable: "1 year",
    value: 365,
  },
];
const StockChart = ({ coinId }) => {
  const [stockData, setStockData] = useState(null);
  const [activeType, setActiveType] = useState(timeSeries[0]);
  const [loading, setLoading] = useState(false);
  const { coin,auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const series = [
    {
      data: coin.marketChart.data,
    },
  ];

  const [options] = useState({
    chart: {
      id: "area-datetime",
      type: "area",
      height: 350,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    annotations: {
      // your annotations
    },
    dataLabels: {
      enabled: false,
    },

    xaxis: {
      type: "datetime",
      //   min: new Date('01 Dec 2023').getTime(),
      tickAmount: 6,
    },
    colors: ["#758AA2"], // Line color
    markers: {
      colors: ["#fff"], // Dot color
      strokeColors: "#fff", // Dot border color
      strokeWidth: 1, // Dot border width
      size: 0,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#47535E", // Color of the grid lines
      strokeDashArray: 4, // Width of the grid lines
      show: true,
    },
  });

  useEffect(() => {
    // const fetchStockData = async () => {
    //   setLoading(true);
    //   setStockData(null)
    //   const data = await fetchData(activeType.keyword, coinId );
    //   console.log("stock data ", data);
    //   const chartData = convertToUnixTimestamp(data[activeType.key]);
    //   console.log("chartData ", chartData);
    //   setStockData(chartData);
    //   setLoading(false);
    // };
    // fetchStockData();
    if (coinId) {
      dispatch(fetchMarketChart({ coinId, days: activeType.value,jwt:localStorage.getItem("jwt") || auth.jwt }));
    }
  }, [coinId,activeType.value]);

  if (coin.marketChart.loading) {
    return (
      <div className="h-full w-full inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-t-4 border-t-gray-200 border-gray-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log("coin reducer", coin);

  return (
    <div>
      <div id="charts">
        <div className="toolbars space-x-2">
          {timeSeries.map((item) => (
            <Button
              onClick={() => setActiveType(item)}
              key={item.lable}
              variant={activeType.lable !== item.lable ? "outline" : ""}
            >
              {item.lable}
            </Button>
          ))}
        </div>
        <div id="chart-timelines">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={450}
          />
        </div>
      </div>
      {/* <div id="html-dist"></div> */}
    </div>
  );
};

export default StockChart;
