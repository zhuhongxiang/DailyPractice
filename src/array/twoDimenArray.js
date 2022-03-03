const grades = [
  [89, 77, 78],
  [76, 62, 81],
  [91, 94, 89]
];
let total = 0;
let arverge = 0.0;
for (let row = 0; row < grades.length; ++row) {
  for (let col = 0; col < grades[row].length; ++col) {
    //学生平均成绩
    // total += grades[row][col];
    //各科平均成绩
    total += grades[col][row];
  }
  arverge = total / grades[row].length;
  console.log(
    'Student ' + (parseInt(row) + 1) + 'average grade:' + arverge.toFixed(2)
  );
  total = 0;
  arverge = 0.0;
}

function weekTemps() {
  this.dataStore = [];
  this.add = add;
  this.average = average;
}

function add(temp) {
  this.dataStore.push(temp);
}

function average() {
  let total = 0;
  for (let i = 0; i < this.dataStore.length; ++i) {
    total += this.dataStore[i];
  }
  return total / this.dataStore.length;
}

const thisWeek = new weekTemps();
thisWeek.add(52);
thisWeek.add(55);
thisWeek.add(61);
thisWeek.add(65);
thisWeek.add(55);
thisWeek.add(50);
thisWeek.add(52);
thisWeek.add(49);
console.log(thisWeek.average()); //54.875
