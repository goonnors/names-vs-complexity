const fs = require("fs");
const readline = require("readline");

let size = 0;
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
  size++;
  const cc = Number(line.replace(/,.*/, ""));
  if (Number(cc) > 10 && Number(cc) <= 20) {
    if (result.has(line)) {
      result.set(line, result.get(line) + 1);
    } else {
      result.set(line, 1);
    }
  }
});

rl.on("close", () => {
  const values = format(result);
  data.datasets[0].data = values;
  console.log(result.size);
  fs.writeFile("../cc-20-bubble-data.json", JSON.stringify(data), err => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});

function format(result) {
  const data = [];
  for (let [line, r] of result) {
    const [cc, name] = line.split(",");
    data.push({
      x: Number(cc),
      y: Number(name),
      r: r === 1 ? 1 : r / 25
    });
  }
  return data;
}
