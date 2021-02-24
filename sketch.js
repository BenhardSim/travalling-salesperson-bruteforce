let cities = [];
let totalCities = 6;
let recordDistance = 0;
let bestOrder = [];
let order = [];

function calcDistance(points,order) {
  let sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    cityAindex = order[i]
    cityBindex = order[i+1]
    cityA = points[cityAindex];
    cityB = points[cityBindex];
    let d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

function setup() {
  createCanvas(600, 900);

  for (let i = 0; i < totalCities; i++) {
    let v = createVector(random(width), random(height / 2))
    order[i] = i
    cities[i] = v;

  }
  let d = calcDistance(cities,order);

  recordDistance = d;
  bestOrder = order;
}

function draw() {
  background(0);


  // drawing the cities node
  for (let i = 0; i < order.length; i++) {
    // order akan menjadi index urutan menggambar vertex
    fill(200,0,0)
    circle(cities[i].x, cities[i].y, 15)
  };

  stroke(255);
  strokeWeight(4);
  noFill()
  beginShape()
  for (let i = 0; i < order.length; i++) {
    n = order[i];
    vertex(cities[n].x, cities[n].y);
  };
  endShape();

  let d = calcDistance(cities,order);
  if (d < recordDistance) {
    recordDistance = d
    bestOrder = order.slice(0)
    console.log(recordDistance);
  }


  beginShape()

  translate(0, 450);
  for (let i = 0; i < order.length; i++) {
    // order akan menjadi index urutan menggambar vertex
    circle(cities[i].x, cities[i].y, 15)
  };
  for (let i = 0; i < bestOrder.length; i++) {
    stroke(0, 220, 0);
    let city = bestOrder[i]
    vertex(cities[city].x, cities[city].y);
  };

  endShape();

  textSize(32);
  var s = '';
  for (var i = 0; i < order.length; i++) {
    s += order[i];
  }
  noStroke()
  fill(255);
  text(s, 20, height / 2 -20);
  nextOrder();

}

function swap(arr, start, end) {
  let temp = arr[start];
  arr[start] = arr[end];
  arr[end] = temp;
}

function nextOrder() {

  // console.log(order);

  // STEP 1 of the algorithm
  // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
  var largestI = -1;
  for (var i = 0; i < order.length - 1; i++) {
    if (order[i] < order[i + 1]) {
      largestI = i;
    }
  }
  if (largestI == -1) {
    noLoop();
    console.log('finished');
    console.log("The closest path distance is : " + recordDistance + " pixel.")
  }

  // STEP 2
  var largestJ = -1;
  for (var j = 0; j < order.length; j++) {
    if (order[largestI] < order[j]) {
      largestJ = j;
    }
  }

  // STEP 3
  swap(order, largestI, largestJ);

  // STEP 4: reverse from largestI + 1 to the end
  var endArray = order.splice(largestI + 1);
  endArray.reverse();
  order = order.concat(endArray);

}