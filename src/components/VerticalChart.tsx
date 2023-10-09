import { getStatusCountData } from "@/lib/handlerData";
import { useData } from "@/state";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,

  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const VerticalChart = () => {
  const labels = getStatusCountData(useData().data).labels;

  const data = {
    labels,
    datasets: [
      {
        label: "",

        data: getStatusCountData(useData().data).data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default VerticalChart;
