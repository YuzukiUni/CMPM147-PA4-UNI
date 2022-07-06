let flock;
let PinkBackground=255;
function setup() {
  createCanvas(720,480);
  createP("Drag the mouse to generate new boids.");

  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 3; i++) {
    let b = new Boid(width / 2,height / 2);
    flock.addBoid(b);
  }
}
// Reference on https://editor.p5js.org/mena-landry/sketches/D7ql4Nd3V
function draw() {
  background(mouseX,230,255);
  PinkBackground--;
//Create star for Background
  //Reference on https://p5js.org/zh-Hans/examples/form-star.html
 push();
stroke('#000000');
fill(153, 230, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(0,0);
rotate(frameCount / 180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#000000');
fill(153, 230, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(120,80);
rotate(frameCount / 180.0);
 star(30, 10, 30,70, 5);
pop();
push();
stroke('#000000');
fill(153, 230, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(240,160);
rotate(frameCount / 180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#000000');
fill(153, 230, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(360,240);
rotate(frameCount / 180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#000000');
fill(153, 230, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(480,320);
rotate(frameCount / 180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#000000');
fill(153, 230, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(600,400);
rotate(frameCount / 180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#000000');
fill(153, 230, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(720,480);
rotate(frameCount / 180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#ffffff');
fill(255, 230, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(720,0);
rotate(frameCount / -180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#ffffff');
fill(230, 204, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(600,80);
rotate(frameCount / -180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#ffffff');
fill(230, 204, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(600,80);
rotate(frameCount / -180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#ffffff');
fill(230, 204, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(480,160);
rotate(frameCount / -180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#ffffff');
fill(230, 204, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(360,240);
rotate(frameCount / -180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#ffffff');
fill(230, 204, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(240,320);
rotate(frameCount / -180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#ffffff');
fill(230, 204, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(120,400);
rotate(frameCount / -180.0);
star(30, 10, 30,70, 5);
pop();
push();
stroke('#ffffff');
fill(230, 204, 255);
strokeWeight(1);
strokeCap(ROUND);
translate(0,480);
rotate(frameCount / -180.0);
star(30, 10, 30,70, 5);
pop();
//static others
push();
beginShape();
fill(random(0,255),random(0,255),random(0,255));
noStroke();
ellipse(360,240,50,50)
endShape();
pop();

Male();
Female();
flock.run();
}
function Male(){
push();
beginShape();
fill(153, 204, 255);
  stroke(random(0,128),0,0);
  strokeWeight(3);
  strokeCap(ROUND);
  translate(frameCount/20,0);
  ellipse(120,240,50,50);
  line(120,215,120,165);
  line(120,165,100,185);
  line(120,165,140,185);
  endShape(CLOSE);
  pop();
}
function Female(){
 push();
 beginShape();
fill(255, 204, 255);
stroke(random(128,255),255,255);
strokeWeight(3);
strokeCap(ROUND);
translate(frameCount/-20,0);
ellipse(600,240,50,50);
line(600,265,600,315);
line(575,290,625,290);
endShape();
pop();
}
//Reference on https://p5js.org/zh-Hans/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  //set up the size of star
   radius1 = 10;
  radius2 = 20;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 2;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  // this.borders();
  this.render1();
  this.render2();
  this.render3();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // Separation
  let ali = this.align(boids);      // Alignment
  let coh = this.cohesion(boids);   // Cohesion
  let avo = this.avoid(boids);      // Avoid walls
  // Arbitrarily weight these forces
  sep.mult(10.0);
  ali.mult(2.0);
  coh.mult(1.0);
  avo.mult(3.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
  this.applyForce(avo);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render1 = function() {
  let theta1 = this.velocity.heading() + radians(90);
  fill(153, 204, 255);
  stroke(random(0,128),0,0);
  strokeWeight(3);
  strokeCap(ROUND);
  push();
  translate(this.position.x+144, this.position.y+96);
  rotate(theta1);
  beginShape();
  ellipse(this.r,this.r,20,20);
  line(10,10,20,20);
  line(20,20,10,20);
  line(20,20,20,10);
  endShape(CLOSE);
  pop();
}
Boid.prototype.render2 = function() {
  let theta2 = this.velocity.heading() + radians(90);
  fill(255, 204, 255);
  stroke(random(128,255),255,255);
  strokeWeight(3);
  strokeCap(ROUND);
  push();
  translate(this.position.x+288, this.position.y+192);
  rotate(theta2);
  beginShape();
  ellipse(this.r,this.r,20,20);
  line(10,10,20,20);
  line(10,20,20,10);

  pop();
}
Boid.prototype.render3 = function() {
  let theta3 = this.velocity.heading() + radians(90);
  fill(random(0,255),random(0,255),random(0,255));
  noStroke();
  push();
  translate(this.position.x, this.position.y);
  rotate(theta3);
  beginShape();
  ellipse(this.r,this.r,20,20);
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width + this.r;
  if (this.position.y < -this.r)  this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0,0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}

Boid.prototype.avoid = function(boids) {
  let steer = createVector(0, 0);
  if (this.position.x <= 0) {
    steer.add(createVector(1, 0));
  }
  if (this.position.x > 540) { // width of canvas
    steer.add(createVector(-1, 0));
  }
  if (this.position.y <= 0) {
    steer.add(createVector(0, 1));
  }
  if (this.position.y > 360) { // height of canvas
    steer.add(createVector(0, -1));
  }
  return steer;
}