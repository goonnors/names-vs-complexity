const fs = require("fs");
const readline = require("readline");

const result = new Map();
const data = {
  datasets: [
    {
      label: "Compound names",
      data: []
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
    if (result.has(Number(name))) {
      result.set(Number(name), result.get(Number(name)) + 1);
    } else {
      result.set(Number(name), 1);
    }
  }
});

rl.on("close", () => {
  const values = format(result);
  data.datasets[0].data = values;
  console.log(result.size);
  fs.writeFile("../cc1concentration-data.json", JSON.stringify(data), err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});

function format(result) {
  const data = [];
  for (let[v, r] of result) {
    if (v > 20) {
      continue;
    }
    data.push({ x: v, y: v, r: r/100 });
  }
  data.sort((a, b) => b.r - a.r );
  return data;
}
