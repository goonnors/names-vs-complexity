const fs = require("fs");
const readline = require("readline");

const result = Array(5).fill(0);
const distributionNums = [1, 5, 10, 20, Infinity];
let size = 0;
const data = {
  labels: ["CC=1", "CC < 5", "CC < 10", "CC < 20", "Other"],
  datasets: [
    {
      label: "CC concentration",
      data: [],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
        "rgb(54, 162, 235)",
        "rgb(201, 203, 207)"
      ]
    }
  ]
};

const rl = readline.createInterface({
  input: fs.createReadStream("../../../summary.csv"),
  crlfDelay: Infinity
});

rl.on("line", line => {
  size++;
  const cc = Number(line.replace(/,.*/, ""));
  distributionNums.forEach(function(num, idx) {
    if (cc <= num) {
      result[idx] = result[idx] + 1;
    }
  });
});

rl.on("close", () => {
  data.datasets[0].data = format(result);
  fs.writeFile("../concentration-data.json", JSON.stringify(data), err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});

function format(result) {
  const data = [];
  result[-1] = 0;
  for (let i = 0; i < result.length; i++) {
    data[i] = Math.round(((result[i] - result[i - 1]) * 100) / size);
  }
  return data;
}
