export default class Csv {
  constructor() {
    this.redDataset = {
      label: 'CC < 10',
      data: [],
      // pointBackgroundColor: 'red'
    };
    this.blueDataset = {
      label: 'CC < 50',
      data: [],
      // pointBackgroundColor: 'blue'
    };
    this.greenDataset = {
      label: 'CC < 100',
      data: [],
      // pointBackgroundColor: 'green'
    };
    this.other = {
      label: 'other',
      data: [],
      // pointBackgroundColor: 'black'
    }
  }

  handleFiles(files) {
    if (window.FileReader) {
      const promise = Promise.resolve();
      return promise.then(() => this.getText(files[0]));
    } else {
      alert('FileReader are not supported in this browser.');
    }
    throw Error('piu-piu');
  }

  getText(fileToRead) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsText(fileToRead);
      reader.onload = (event) => {
        resolve(this.loadHandler(event));
      }
      reader.onerror = this.errorHandler;
    });
  }

  loadHandler(event) {
    var csv = event.target.result;
    return this.process(csv);
  }

  process(csv) {
    var lines = csv.split("\n");
    var result = [];
    for (let i = 1; i < lines.length - 1; i++) {
      const [x, y] = lines[i].split(",");
      // const [y, x] = lines[i].split(",");
      if (Number(x) > 1000 || Number(x) < 20 || Number(y) < 20) {
        continue;
      }
      // if (Number(x) < 10) {
      //   this.redDataset.data.push({ x, y });
      // } else if (Number(x) < 50) {
      //   this.blueDataset.data.push({ x, y });
      // } else if (Number(x) < 100) {
      //   this.greenDataset.data.push({ x, y });
      // } else {
      //   this.other.data.push({ x, y });
      // }
      result.push({ x, y });
    }
    return result;
    // return [this.redDataset, this.blueDataset, this.greenDataset, this.other];
  }

  errorHandler(evt) {
     if (evt.target.error.name == "NotReadableError") {
         alert("Canno't read file !");
     }
  }

  firstDataset() {}
}
