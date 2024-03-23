import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCrypto } from "../../context/CryptoContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const sectionStyles = {
  width: "40%",
  display: "flex",
  marginBottom: "1rem",
  justifyContent: "center",
  padding: "10px",
};

function PortfolioChart() {
  const { assets } = useCrypto();

  const data = {
    labels: assets.map((asset) => asset.name),
    datasets: [
      {
        label: "Total $",
        data: assets.map((asset) => asset.totalAmount.toFixed(2)),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderWidth: 0,
      },
    ],
  };
  return (
    <section style={sectionStyles}>
      <Pie data={data} />
    </section>
  );
}

export default PortfolioChart;
