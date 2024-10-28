const canvas = document.getElementById('myCanvas');
        const ctx = canvas.getContext('2d');

        class Sprite {
            constructor({ imageSrc, position, scale = 1.5, framesMax, frameDuration = 100, offset = {x:0, y:0}, sprites, health}) {
                this.image = new Image();
                this.image.src = imageSrc;
                this.position = position;
                this.scale = scale;
                this.framesMax = framesMax;
                this.framesCurrent = 0;
                this.frameDuration = frameDuration;
                this.lastFrameTime = performance.now();
                this.offset = offset;
                this.sprites = sprites;
                this.health = health;

                if (this.sprites) {
                    for (const sprite in this.sprites) {
                        this.sprites[sprite].image = new Image();
                        this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
                    }
                   console.log(this.sprites)
                }
            
        }
        animateFrames() {
            this.framesElapsed++;
    
            if (this.framesElapsed % this.framesHold === 0) {
                if (this.framesCurrent < this.framesMax - 1) {
                    this.framesCurrent++;
                } else {
                    this.framesCurrent = 0;
                }
            }
        }
      
            draw() {
                ctx.drawImage(
                    this.image,
                    this.framesCurrent * (this.image.width / this.framesMax),
                    0,
                    this.image.width / this.framesMax,
                    this.image.height,
                    this.position.x,
                    this.position.y,
                    (this.image.width / this.framesMax) * this.scale,
                    this.image.height * this.scale
                );
                const healthBarWidth = 50; // Adjust width as needed
                const healthBarHeight = 5; // Adjust height as needed
                const healthBarX = this.position.x - (healthBarWidth / 2) + ((this.image.width / this.framesMax) * this.scale / 2);
                const healthBarY = this.position.y - 10; // Adjust position as needed
                this.drawHealthBar(ctx, healthBarX, healthBarY, healthBarWidth, healthBarHeight);
            }

            update() {
                const currentTime = performance.now();
                if (currentTime - this.lastFrameTime >= this.frameDuration) {
                    this.framesCurrent = (this.framesCurrent + 1) % this.framesMax;
                    this.lastFrameTime = currentTime;
                }
                // this.draw();
            
    }
    drawHealthBar(ctx, x, y, width, height) {
        // Draw the outline of the health bar
        ctx.fillStyle = 'black';
        ctx.fillRect(x, y, width, height);

        // Calculate the width of the filled portion based on current health
        const filledWidth = (this.health / MAX_HEALTH) * width;

        // Draw the filled portion in green
        ctx.fillStyle = 'green';
        ctx.fillRect(x, y, filledWidth, height);
    }
   
        }

        class Enemy extends Sprite {  constructor({ position, velocity, imageSrc, scale = 1.5, framesMax, frameDuration = 1000, frameWidth, frameHeight, offset = {x:0, y:0}, sprites, health, speed }) {
                super({ imageSrc, position, scale, framesMax, frameDuration, offset });
                this.velocity = velocity;
                this.frameWidth = frameWidth; // Width of each frame in the sprite sheet
                this.frameHeight = frameHeight;
                this.sprites = sprites;
                this.currentAnimation = 'idle'; 
                this.frames = { val:0, elapsed:0 };
                this.health = health;
                this.speed = speed;


                if (this.sprites) {
                    for (const sprite in this.sprites) {
                        this.sprites[sprite].image = new Image();
                        this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
                    }
                   console.log(this.sprites)
                }
            }
          

            draw() {
                super.draw();
   
}
drawHealthBar(ctx, x, y, width, height) {
    // Draw the outline of the health bar
    ctx.fillStyle = 'black';
    ctx.fillRect(x, y, width, height);

    // Calculate the width of the filled portion based on current health
    const filledWidth = (this.health / MAX_HEALTH) * width;

    // Draw the filled portion in green
    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, filledWidth, height);
}

update() {
    // Call the update method from the parent class if there is one
    if (super.update) {
        super.update();
    }

    // Update framesMax if the current animation has changed
    const currentAnimationFrames = this.sprites[this.currentAnimation].framesMax;
    if (this.framesMax !== currentAnimationFrames) {
        this.framesMax = currentAnimationFrames;
        this.framesCurrent = 0; // Reset frame index
    }

    // Advance frame only if there are multiple frames
    if (this.framesMax > 1) {
        this.frames.elapsed += this.frameDuration; // Add frame duration to elapsed time
        if (this.frames.elapsed >= this.frameDuration) {
            this.frames.elapsed = 0; // Reset elapsed time
            if (this.frames.val < this.framesMax - 1) {
                this.frames.val++; // Move to the next frame
            } else {
                this.frames.val = 0; // Reset to the first frame
            }
        }
    }

    // Update position based on velocity
    this.position.x += this.velocity.x * this.speed;
    this.position.y += this.velocity.y * this.speed;

    // Reverse direction if the sprite reaches the canvas boundaries
    if (this.position.x < 0 || this.position.x > canvas.width) {
        this.velocity.x *= -1;
    }
}

        
        }

        const MAX_HEALTH = 100;
   
        const player = new Sprite({
            position: { x: 10, y: 382 },
            velocity: { x: 0, y: 0 },
            imageSrc: "C:Users/HP/Documents/new aaa/cat/Wizard Pack/Wizard Pack/Idle.png",
            framesMax: 6,
            frameDuration: 200, // Adjust the frame duration here
            scale: 1,
            frameWidth: 63, 
            frameHeight: 100,
            offset: {
                x: 255,
                y: 157
            },
            health: MAX_HEALTH,
            sprites: {
                idle: {
                    imageSrc:"C:Users/HP/Documents/new aaa/cat/Wizard Pack/Wizard Pack/Idle.png",
                    framesMax: 6,
                },
                rilwalk: {
                    imageSrc:"C:/Users/HP/Documents/new aaa/bubble/cat_ani/rilwalk.png",
                    framesMax: 8,
                    frameWidth: 60,
                    scale: 6,
                },
                kick: {
                    imageSrc:"C:/Users/HP/Documents/new aaa/bubble/cat_ani/high kick.png",
                    framesMax: 6,
                    frameWidth: 67,
                },
                dead: {
                    imageSrc:"C:/Users/HP/Documents/new aaa/bubble/cat_ani/dead.png",
                    framesMax: 9,
                    frameWidth: 67,
                },
                
            }
            
        });
    

        const enemy = new Enemy({
            position: { x: 800, y: 415 },
            velocity: { x: 1, y: 0 },
            imageSrc: "C:/Users/HP/Documents/new aaa/cat/Ball and Chain Bot/Ball and Chain Bot/idle.png",
            framesMax: 5,
            frameDuration: 200, // Adjust the frame duration here
            scale: 4,
            frameWidth: 500, 
            frameHeight: 50,
            offset: {
                x: 255,
                y: 157
            },
            speed: 1,
            health:MAX_HEALTH,
            sprites: {
                idle: {
                    imageSrc:"C:/Users/HP/Documents/new aaa/bubble/cat/cat_ani/kdile.png",
                    framesMax: 4,
                },
                walk: {
                    imageSrc:"C:/Users/HP/Documents/new aaa/bubble/cat_ani/kwalk.png",
                    framesMax: 4,
                    frameWidth: 67,
                },
                attack: {
                    imageSrc:"C:/Users/HP/Documents/new aaa/bubble/cat_ani/kattack.png",
                    framesMax: 4,
                    frameWidth: 67,
                },
                dead: {
                    imageSrc:"C:/Users/HP/Documents/new aaa/bubble/cat_ani/kdead.png",
                    framesMax: 6,
                    frameWidth: 67,
                }
            }


        })
       


        const background = new Sprite({
            position: { x: 0, y: 0 },
            imageSrc: "C:/Users/HP/Documents/new aaa/bubble/bgsprite.png",
            framesMax: 19,
            frameDuration: 200
        });
      
        const keys = {
            w: { pressed: false },
            a: { pressed: false },
            d: { pressed: false }
        };
        
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'w':
                    keys.w.pressed = true;
                    break;
                case 'a':
                    keys.a.pressed = true;
                    break;
                case 'd':
                    keys.d.pressed = true;
                    break;
            }
        });
        
        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'w':
                    keys.w.pressed = false;
                    break;
                case 'a':
                    keys.a.pressed = false;
                    break;
                case 'd':
                    keys.d.pressed = false;
                    break;
            }
        });
        
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            // Draw the background first
            background.update();
            background.draw();
        
            // Draw the player after the background
            player.update();
            player.draw();

            enemy.update();
            enemy.draw();
           
        
            // Update player's image based on keys pressed
            if (keys.w.pressed) {
                player.image = player.sprites.kick.image;
            } else if (keys.a.pressed) {
                player.image = player.sprites.rilwalk.image;
            } else if (keys.d.pressed) {
                player.image = player.sprites.rilwalk.image;
            } else {
                player.image = player.sprites.idle.image;
            }
        
            // Update player's velocity based on keys pressed
            if (keys.a.pressed) {
                player.velocity.x = -5;
            } else if (keys.d.pressed) {
                player.velocity.x = 5;
            } else {
                player.velocity.x = 0; // Set velocity to 0 when no keys are pressed
            }
        }
        
        animate(); // Start the animation loop
        