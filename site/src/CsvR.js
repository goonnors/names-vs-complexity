export default class Csv {
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
    const lines = csv.split("\n");
    const result = new Map();
    for (let i = 1; i < lines.length - 1; i++) {
      if (result.has(lines[i])) {
        const value = result.get(lines[i]) + 1;
        result.set(lines[i], value);
      }
      else {
        result.set(lines[i], 1);
      }
      // if (Number(x) > 1000 || Number(x) < 20 || Number(y) < 20) {
      //   continue;
      // }
    }
    return this.format(result, lines.length);
    // return [this.redDataset, this.blueDataset, this.greenDataset, this.other];
  }

  format(data, len) {
    const result = [];
    for (let [key, r] of data) { // то же самое, что и recipeMap.entries()
      const [x, y] = key.split(',');
      if (x==1 || x > 80 || y > 40) continue;
      result.push({ x: Number(x), y: Number(y), r: r*1000/len  });
    }
    console.log(data.size, len)
    result.sort((a, b) => b.r - a.r );
    return result;
  }

  errorHandler(evt) {
     if (evt.target.error.name == "NotReadableError") {
         alert("Canno't read file !");
     }
  }

  firstDataset() {}
}
