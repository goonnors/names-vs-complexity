const fs = require("fs");
const readline = require("readline");

const result = Array(6).fill(0);
const distributionNums = [0, 1, 5, 10, 20, Infinity];
let size = 0;
const data = {
  labels: [
    "Names=0",
    "Names=1",
    "1 < Names <= 5",
    "5 < Names <= 10",
    "10 < Names <= 20",
    "Other"
  ],
  datasets: [
    {
      label: "CC concentration",
      data: [],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(75, 192, 192)",
        "rgb(255, 205, 86)",
        "rgb(54, 162, 235)",
        "rgb(201, 203, 207)",
        "black"
      ]
    }
  ]
};

const rl = readline.createInterface({
  input: fs.createReadStream("../../../summary.csv"),
  crlfDelay: Infinity
});

rl.on("line", line => {
  const [cc, names] = line.split(",");

  if (Number(cc) > 1 && Number(cc) <= 5) {
    size++;
    distributionNums.forEach(function(num, idx) {
      if (Number(names) <= num) {
        result[idx] = result[idx] + 1;
      }
    });
  }
});

rl.on("close", () => {
  data.datasets[0].data = format(result);
  fs.writeFile(
    "../cc-5-polar-data.json",
    JSON.stringify(data),
    err => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );
});

function format(result) {
  const data = [];
  result[-1] = 0;
  for (let i = 0; i < result.length; i++) {
    data[i] = Math.round(((result[i] - result[i - 1]) * 100) / size);
  }
  return data;
}
