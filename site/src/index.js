import Chart from "chart.js";
import Csv from "./CsvR.js";
import concentrationData from "./concentration-data.json";

function readTextFile(file) {
  return new Promise((resolve, reject) => {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status == 0) {
          resolve(rawFile.responseText);
        }
      }
    };
    rawFile.send(null);
  });
}

const concentrationCtx = document
  .getElementById("concentration")
  .getContext("2d");
concentrationCtx.canvas.parentNode.style.width = "300px";
// concentrationCtx.canvas.parentNode.style.height = "500px";
const concentrationGraph = new Chart(concentrationCtx, {
  type: "polarArea",
  data: concentrationData,
  options: {
    title: {
      display: true,
      text: "Рис 1. Распределение концентрации CC",
      position: "bottom"
    }
  }
});

var ctx = document.getElementById("myChart").getContext("2d");
ctx.canvas.parentNode.style.width = "300px";
const chart = new Chart(ctx, {
  type: "bubble",
  responsive: false,
  data: {
    datasets: [
      {
        label: "Bubble Dataset",
        data: []
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          type: "linear",
          position: "bottom"
        }
      ],
      xAxes: [
        {
          type: "linear",
          position: "bottom"
        }
      ]
    }
  }
});

function updateData(data) {
  console.log(data);
  chart.data.datasets[0].data = data;
  chart.update();
}

readTextFile("summary.csv").then(text => {
  updateData(new Csv().process(text));
});

// document
//   .getElementById("csvFileInput")
//   .addEventListener("change", function($event) {
//     const promise = new Csv().handleFiles(this.files);
//     promise.then(data => {
//       updateData(data);
//     });
//   });
