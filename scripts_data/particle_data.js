/*--------------------------------------------------------------------------------
----- PARTICLE class : definition of a falling particle in a canvas
--------------------------------------------------------------------------------*/
class Particle {
    
    /* Static configuration parameters for Particle instances */
    static MIN_SIZE = 1; static MAX_SIZE = 3;
    static MIN_WEIGHT = 0.1; static MAX_WEIGHT = 0.5;
    static MIN_DIRECTION = -1; static MAX_DIRECTION = 1;
    static PARTICLE_COLORS = ['blue', 'green', 'red', 'yellow', 'orange', 'purple'];

    
    /* Particle constructor initialize the particle and set its properties */
    constructor(x, y, canvas_width, canvas_height) {
        // Initialize and store the particle starting position and size
        this.x_position = x, this.y_position = y;

        // Randomly initialize the particle size in a defined (minimal-maximal) range
        this.size = Math.random() * (Particle.MAX_SIZE - Particle.MIN_SIZE) + Particle.MIN_SIZE;
        // Randomly initialize the particle weight (gravity-related) in a defined (minimal-maximal) range
        this.weight = Math.random() * (Particle.MAX_WEIGHT - Particle.MIN_WEIGHT) + Particle.MIN_WEIGHT;
        // Define the particle x direction as its horizontal deviation while falling
        this.x_direction = Math.random() * (Particle.MAX_DIRECTION - Particle.MIN_DIRECTION) + Particle.MIN_DIRECTION;

        // Randomly choose the original particle color in a defined static list
        let color_index = Math.floor(Math.random() * Particle.PARTICLE_COLORS.length);
        this.color = Particle.PARTICLE_COLORS[color_index];

        // Store the related canvas width and height
        this.canvas_width = canvas_width, this.canvas_height = canvas_height;
        // Define whether the particle already hit the canvas bottom border or not
        this.touched_ground = false;
    }


    /* Particle update method computed its new properties at every iteration step */
    update() {
        // When the particle reaches the canvas bottom for the second time, reset it
        if(this.y_position > this.canvas_height && this.touched_ground) {
            // Reset the particle's horizontal position to a new randomly generated value
            this.x_position = Math.random() * this.canvas_width;
            // Reset the particle's vertical position to the top of the canvas
            this.y_position = 0 - this.size;
            // Reset the particle's weight to a new randomly generated value
            this.weight = Math.random() * (Particle.MAX_WEIGHT - Particle.MIN_WEIGHT) + Particle.MIN_WEIGHT;
            // Reset the particle's touching ground state
            this.touched_ground = false;
        }

        // Increase the particle weight as much as its fall lasts
        this.weight += 0.01;
        // Update the horizontal/vertical position of the particle depending on its configuration/weight
        this.x_position += this.x_direction;
        this.y_position += this.weight;

        // When the particle reaches the canvas bottom for the first time, make it bounce once
        if(this.y_position >= this.canvas_height && !this.touched_ground) {
            // Set its weight negative to bounce back
            this.weight = -0.5
            this.y_position = this.canvas_height;
            this.touched_ground = true;
        }
    }


    /* Particle draw method draws the particle on the given canvas context */
    draw(canvas_context) {
        // Set the color of the particle
        canvas_context.fillStyle = this.color;
        // Draw the particle as a full circle with dedicated position and size
        canvas_context.beginPath();
        canvas_context.arc(this.x_position, this.y_position, this.size, 0, 2*Math.PI);
        canvas_context.closePath();
        canvas_context.fill();
    }
}
