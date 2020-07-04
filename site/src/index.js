import Chart from "chart.js";
import Csv from "./CsvR.js";
import concentrationData from "./concentration-data.json";
import cc1DissipatioData from "./cc1dissipation-data.json";
import cc1ConcentrationNamesData from "./cc-1-concentraion-names-data.json";
import cc5BubbleData from "./cc-5-bubble-data.json";
import cc5PolarData from "./cc-5-polar-data.json";
import cc10BubbleData from "./cc-10-bubble-data.json";
import cc10PolarData from "./cc-10-polar-data.json";
import cc20BubbleData from "./cc-20-bubble-data.json";
import cc20PolarData from "./cc-20-polar-data.json";
import ccInfBubbleData from "./cc-inf-bubble-data.json";

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

/**
 * Figure 1
 */
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

/**
 * Figure 2
 */
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

/**
 * Figure 3
 */
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

/**
 * Figure 4
 */
const cc5BubbleCtx = document.getElementById("cc-5-bubble").getContext("2d");
cc5BubbleCtx.canvas.parentNode.style.width = "500px";
const cc5BubbleGraph = new Chart(cc5BubbleCtx, {
  type: "bubble",
  data: cc5BubbleData,
  options: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text:
        "Рис 4. Зависимость compound names от CC при значениях 1 < CC <= 5 вместе с частотой",
      position: "bottom"
    },
    scales: {
      yAxes: [
        {
          type: "logarithmic",
          ticks: {
            callback: function(value, index, values) {
              return Number(value.toString()); //pass tick values as a string into Number function
            }
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            stepSize: 1
          }
        }
      ]
    }
  }
});

/**
 * Figure 5
 */
const cc5PolarCtx = document.getElementById("cc-5-polar").getContext("2d");
cc5PolarCtx.canvas.parentNode.style.width = "400px";
const cc5PolarGraph = new Chart(cc5PolarCtx, {
  type: "polarArea",
  data: cc5PolarData,
  options: {
    title: {
      display: true,
      text: "Рис 5. Распределение концентрации compound names при 1 < CC <= 5",
      position: "bottom"
    }
  }
});

/**
 * Figure 6
 */
const cc10BubbleCtx = document.getElementById("cc-10-bubble").getContext("2d");
cc10BubbleCtx.canvas.parentNode.style.width = "500px";
const cc10BubbleGraph = new Chart(cc10BubbleCtx, {
  type: "bubble",
  data: cc10BubbleData,
  options: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text:
        "Рис 6. Зависимость compound names от CC при значениях 5 < CC <= 10 вместе с частотой",
      position: "bottom"
    },
    scales: {
      yAxes: [
        {
          type: "logarithmic",
          ticks: {
            callback: function(value, index, values) {
              return Number(value.toString());
            }
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            stepSize: 1
          }
        }
      ]
    }
  }
});

/**
 * Figure 7
 */
const cc10PolarCtx = document.getElementById("cc-10-polar").getContext("2d");
cc10PolarCtx.canvas.parentNode.style.width = "400px";
const cc10PolarGraph = new Chart(cc10PolarCtx, {
  type: "polarArea",
  data: cc10PolarData,
  options: {
    title: {
      display: true,
      text: "Рис 7. Распределение концентрации compound names при 5 < CC <= 10",
      position: "bottom"
    }
  }
});

/**
 * Figure 8
 */
const cc20BubbleCtx = document.getElementById("cc-20-bubble").getContext("2d");
cc20BubbleCtx.canvas.parentNode.style.width = "500px";
const cc20BubbleGraph = new Chart(cc20BubbleCtx, {
  type: "bubble",
  data: cc20BubbleData,
  options: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text:
        "Рис 8. Зависимость compound names от CC при значениях 10 < CC <= 20 вместе с частотой",
      position: "bottom"
    },
    scales: {
      yAxes: [
        {
          type: "logarithmic",
          ticks: {
            callback: function(value, index, values) {
              return Number(value.toString()); //pass tick values as a string into Number function
            }
          }
        }
      ],
      xAxes: [
        {
          ticks: {
            stepSize: 1
          }
        }
      ]
    }
  }
});

/**
 * Figure 9
 */
const cc20PolarCtx = document.getElementById("cc-20-polar").getContext("2d");
cc20PolarCtx.canvas.parentNode.style.width = "400px";
const cc20PolarGraph = new Chart(cc20PolarCtx, {
  type: "polarArea",
  data: cc20PolarData,
  options: {
    title: {
      display: true,
      text: "Рис 9. Распределение концентрации compound names при 10 < CC <= 20",
      position: "bottom"
    }
  }
});

/**
 * Figure 10
 */
const ccInfBubbleCtx = document
  .getElementById("cc-inf-bubble")
  .getContext("2d");
ccInfBubbleCtx.canvas.parentNode.style.width = "500px";
const ccInfBubbleGraph = new Chart(ccInfBubbleCtx, {
  type: "bubble",
  data: ccInfBubbleData,
  options: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text:
        "Рис 10. Зависимость compound names от CC при значениях CC > 20 вместе с частотой",
      position: "bottom"
    },
    scales: {
      yAxes: [
        {
          type: "logarithmic",
          ticks: {
            callback: function(value, index, values) {
              return Number(value.toString());
            }
          }
        }
      ],
      xAxes: [
        {
          type: "logarithmic",
          ticks: {
            callback: function(value, index, values) {
              return Number(value.toString());
            }
          }
        }
      ]
    }
  }
});
