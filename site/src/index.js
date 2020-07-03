import Chart from "chart.js";
import Csv from "./CsvR.js";
import concentrationData from "./concentration-data.json";
import cc1DissipatioData from "./cc1dissipation-data.json";
import cc1ConcentrationNamesData from "./cc-1-concentraion-names-data.json";

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

const cc1DissipationCtx = document
  .getElementById("cc-1-dissipation")
  .getContext("2d");
cc1DissipationCtx.canvas.parentNode.style.width = "500px";
cc1DissipationCtx.canvas.parentNode.style.height = "500px";
const cc1DissipationGraph = new Chart(cc1DissipationCtx, {
  type: "bar",
  data: cc1DissipatioData,
  options: {
    title: {
      display: true,
      text: "Рис 2. Разброс значений compound names при CC = 1",
      position: "bottom"
    },
    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            offsetGridLines: true
          }
        }
      ]
    }
  }
});

const cc1ConcentrationNamesCtx = document
  .getElementById("cc-1-concentration-names")
  .getContext("2d");
cc1ConcentrationNamesCtx.canvas.parentNode.style.width = "400px";
const cc1ConcentrationNamesGraph = new Chart(cc1ConcentrationNamesCtx, {
  type: "polarArea",
  data: cc1ConcentrationNamesData,
  options: {
    title: {
      display: true,
      text: "Рис 3. Распределение концентрации compound names при CC=1",
      position: "bottom"
    }
  }
});
