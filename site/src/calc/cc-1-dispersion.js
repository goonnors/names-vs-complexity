const fs = require("fs");
const readline = require("readline");

const result = new Set();
const data = {
  labels: null,
  datasets: [
    {
      label: "Number of compound name per file",
      data: null
    }
  ]
};
const rl = readline.createInterface({
  input: fs.createReadStream("../../../summary.csv"),
  crlfDelay: Infinity
});

rl.on("line", line => {
  const [cc, name] = line.split(",");
  if (Number(cc) === 1) {
    result.add(Number(name));
  }
});

rl.on("close", () => {
  const values = Array.from(result).sort((a, b) => a - b);
  data.datasets[0].data = values;
  data.labels = values;
  fs.writeFile("../cc1dissipation-data.json", JSON.stringify(data), err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});
