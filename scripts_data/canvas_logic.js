// Retrieve the reference of the canvas in the page
const canvas = document.getElementById('particle_canvas');
// Store the rendering context of the canvas to interact and draw later on
const canvas_context = canvas.getContext('2d');

// Define the number of desired particles
const particles_number = 100;
// Define an array to store all the created particles
let particles_array = [];


/* Function to create and initialize a large number of particles at once */
function init_particles() {
    // Create as many particles as desired
    for(let i=0; i<particles_number; i++) {
        // Initialize the particles starting position randomly
        let random_x = Math.random() * canvas.width;
        let random_y = Math.random() * canvas.height;
        // Store every create particle in a globally referenced array
        particles_array.push(new Particle(random_x, random_y, canvas.width, canvas.height));
    }
}
init_particles();


/* Function to start and loop over the rendering objects process on screen */
function animate() {
    // Display a semi-transparent rectangle over the canvas continuously to "erase"
    canvas_context.fillStyle = 'rgba(255, 255, 255, 0.01)';
    canvas_context.fillRect(0, 0, canvas.width, canvas.height);
    // Update and draw the falling particles at every iteration step
    for(let i=0; i<particles_number; i++) {
        particles_array[i].update();
        particles_array[i].draw(canvas_context);
    }
    // Run the rendering loop to display the falling particles
    requestAnimationFrame(animate);
}
animate();
