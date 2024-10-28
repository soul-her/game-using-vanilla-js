
class Sprite {
    constructor({
        position,
        sprites,
        health,
        scale = 1,
        gravity,
        velocity = { x: 0, y: 0 },
        healthDecrease = 50,
    }) {
        this.position = position;
        this.animations = sprites;
        this.currentAnimation = 'idle';
        this.currentFrame = 0;
        this.frameRate = 20; 
        this.frameBuffer = 0;
        this.lastKey = null;
        this.health = health;
        this.scale = scale;
        this.gravity = gravity;
        this.velocity = velocity; 
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 70,
            height: 80
        };
        this.height = 150;
        this.isAttacking;
        this.healthDecreaseAmount = healthDecrease;
        this.isDead = false;
    }
    
    switchSprite(key) {
        if (this.currentAnimation === key || !this.animations[key]) return;
        this.currentAnimation = key;
        this.currentFrame = 0;
        this.lastKey = key;
    }
   
    attack() {
        this.isAttacking = true;
        setTimeout(() => { 
            this.isAttacking = false;
        }, 100);
    }


    draw() {
        ctx.drawImage(
            animation.image,
            this.currentFrame * frameWidth, // Source X position
            0, // Source Y position
            frameWidth, // Source width
            animation.image.height, // Source height
            this.position.x - animation.offset.x, // Destination X position
            this.position.y - animation.offset.y, // Destination Y position
            frameWidth * scaleX, // Destination width, scaled
            animation.image.height * scaleY // Destination height, scaled
        );
        const healthBarWidth = 230; 
        const healthBarHeight = 10; 
        const healthBarX = 169
        const healthBarY = 110
        this.drawHealthBar(ctx, healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    }

    animateFrames() {
        this.frameBuffer++;
        if (this.frameBuffer >= this.frameRate) {
            this.frameBuffer = 0;
            if (this.health <= 0) {
               
                if (this.currentFrame < this.animations[this.currentAnimation].framesMax - 1) {
                    this.currentFrame++;
                }
            } else {
               
                this.currentFrame = (this.currentFrame + 1) % this.animations[this.currentAnimation].framesMax;
            }
        }
    }
    handleDeath() {
        player.switchSprite('dead');
}


heal() {
    this.health = MAX_HEALTH;
}

    update() {
        this.animateFrames();
        this.draw();
           //collide chuchu
           if (player.attackBox.position.x <= enemy.position.x) {
            this.position.x = this.position.x;
         } //lol wala ni gagana 
        if (this.health > 0) {
           
            this.attackBox.position.x = this.position.x + 120;
            this.attackBox.position.y = this.position.y + 40;

           //right side canvas
            if (this.position.x >= 850) {
                this.position.x = 0;
            }
            
          //left side canvas
            if (player.position.x < 0) {
                player.position.x = 0;
            }
         
        }

    }

    drawHealthBar(ctx, x, y, width, height) {

        const filledWidth = (this.health / MAX_HEALTH) * width;

        ctx.fillStyle = 'blue';
        ctx.fillRect(x, y, filledWidth, height);
    }

    healthDecrease() {
       
        this.health -= this.healthDecreaseAmount;

      
        if (this.health <= 0) {
            this.health = 0;
            document.querySelector('#lose').innerHTML = 'Better luck next time'
            document.querySelector('#lose').style.display = 'flex'
        }

        this.updateHealthBar();
    }

}

        class Enemy {
    constructor({
        position,
        sprites,
        velocity = { x: 0, y: 0 },
        speed = 1,
        health,
        scale = 1.5,
        healthDecrease = 500,
    }) {
        this.position = position;
        this.animations = sprites;
        this.currentAnimation = 'idle';
        this.currentFrame = 0;
        this.frameRate = 10; // Adjust as needed
        this.frameBuffer = 0;
        this.lastKey = null;
        this.velocity = velocity;
        this.speed = speed;
        this.health = health;
        this.scale = scale;
        this.width = 50;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 70,
            height: 80

        }
        this.healthDecreaseAmount = healthDecrease;
        this.dead = false;
     
    }
    animateFrames() {
        this.frameBuffer++;
        if (this.frameBuffer >= this.frameRate) {
            this.frameBuffer = 0;
            if (this.health <= 0) {
               
                if (this.currentFrame < this.animations[this.currentAnimation].framesMax - 1) {
                    this.currentFrame++;
                }
            } else {
               
                this.currentFrame = (this.currentFrame + 1) % this.animations[this.currentAnimation].framesMax;
            }
        }
    }
    switchSprite(key) {
        if (this.currentAnimation === key || !this.animations[key]) return;
        this.currentAnimation = key;
        this.currentFrame = 0;
        this.lastKey = key;
    }

    draw() {
        ctx.drawImage(
            animation.image,
            this.currentFrame * frameWidth, // Source X position
            0, // Source Y position
            frameWidth, // Source width
            animation.image.height, // Source height
            this.position.x - animation.offset.x, // Destination X position
            this.position.y - animation.offset.y, // Destination Y position
            frameWidth * scaleX, // Destination width, scaled
            animation.image.height * scaleY // Destination height, scaled
        );
    

        const healthBarWidth = 225; 
        const healthBarHeight = 10; 
        const healthBarX = 650;
        const healthBarY = 110;
        this.drawHealthBar(ctx, healthBarX, healthBarY, healthBarWidth, healthBarHeight);
    }

    reverse() {
        setTimeout(() => {
            this.velocity.x *= -1;
        }, 1000);
        this.velocity.x *= -1
    }

    // heal() {
    //     this.health = MAX_HEALTH 
    //     this.health += 10
    // }

    // die() {
    //     spawnEnemy();
    // }

    isDead() {
        return this.health <= 0;
    }
 
    update() {
    if (!this.isDead()) {
        this.position.x -= this.velocity.x;
    }
        this.animateFrames();
        this.draw();
        if (player.health <= 0) {
            setTimeout(() => {
                this.velocity.x = 0;
            }, 1000);
        }

            //collision chuchu
        if(this.position.x ===  player.attackBox.position.x) {
           this.reverse()
        }

        // Check if the enemy has reached the canvas width
        if (this.position.x >= canvas.width) {
            this.velocity.x *= -1;
        }

                this.attackBox.position.x = this.position.x 
               this.attackBox.position.y = this.position.y

               //sa left side canvas
               if (enemy.position.x < 0) {
                enemy.position.x = 0;
            }
        
        }
        drawHealthBar(ctx, x, y, width, height) {

            const filledWidth = (this.health / MAX_HEALTH) * width;
          
            ctx.fillStyle = 'red';
            ctx.fillRect(x + (width - filledWidth), y, filledWidth, height);
            
    }
    healthDecrease() {
        
        this.health -= this.healthDecreaseAmount;

        if (this.health <= 0) {
          this.health = 0;
          enemy.switchSprite('dead');
            document.querySelector('#won').innerHTML = 'You won!'
            document.querySelector('#won').style.display = 'flex'
        }
        this.updateHealthBar
    }
    
    }

    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const MAX_HEALTH = 10000;
   const gravity = 0.7;
  

    canvas.width = 1024;
    canvas.height = 576;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

//for bg music
    document.body.addEventListener('click', function() {
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.play();
    });
//for the bg image
    const background = new Image();
    background.src = "C:/Users/HP/Documents/new aaa/cat/map.png";
    background.onload = function() {
        animate(); 
    };
//for the restart button
    document.addEventListener("DOMContentLoaded", function() {
        const restartDiv = document.getElementById("restart");
  
        restartDiv.addEventListener('click', function() {
            window.location.reload(); 
        });
    });
    
//phb and ehb are the healthbars
//     const phb = new Image();
//     phb.src = "C:/Users/HP/Documents/new aaa/cat/shawl bg/bg.png";
    
//     phb.onload = function() {
       
//        animate();
//     };

//     const ehb = new Image();
//     ehb.src = "C:/Users/HP/Documents/new aaa/cat/enemy_hb.png";
    
//    ehb.onload = function() {

//        animate();
//     };

    const keys = {
        w: { pressed: false },
        a: { pressed: false },
        d: { pressed: false },
        q: { pressed: false },
        s: { pressed: false }
    };

    window.addEventListener('keydown', (event) => {
        if(!player.dead)
        switch (event.key) {
            case 'w':
                keys.w.pressed = true;
                player.velocity.y -= 10; 
                player.isJumping = true; 
                break;
            case 'a':
                keys.a.pressed = true;
                player.position.x -= 10;
                break;
            case 'd':
                keys.d.pressed = true;
                // player.position.x += 15;
                break;
            case 'q':
                keys.q.pressed = true;
                player.attack();
                break;
            case 's':
                keys.s.pressed = true;
                player.attack();
            
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
            case 'q':
                keys.q.pressed = false;
                break;
            case 's':
                keys.s.pressed = false;
                break;
        }
    });

    const enemySprites = {
        idle: { image: new Image(), framesMax: 2, offset: { x: 0, y: 0 } },
        attack: { image: new Image(), framesMax: 2, offset: { x: 0, y: 0 } },
        dead: { image: new Image(), framesMax: 4, offset: { x: 0, y: 0 } },
    };

    enemySprites.idle.image.src = "C:/Users/HP/Documents/new aaa/cat/slash.png";
    enemySprites.attack.image.src = "C:/Users/HP/Documents/new aaa/cat/stab.png";
    enemySprites.dead.image.src = "C:/Users/HP/Documents/new aaa/cat/dead.png";


  
    const enemy = new Enemy({
        
        position: { x: 800, y: 380 },
        sprites: enemySprites,
        velocity: { x: 1, y: 0 },
        speed: 1,
        health: MAX_HEALTH,
        scale: 1.8
    });
  
    // const ene = new Enemy({
        
    //     position: { x: 800, y: 380 },
    //     sprites: enemySprites, attack,
    //     velocity: { x: 1, y: 0 },
    //     speed: 1,
    //     health: MAX_HEALTH,
    //     scale: 1.8,
    // });

            const player = new Sprite({
            
                position: { x: 40, y: 600},
                velocity: {x: 0, y:0},
                health: MAX_HEALTH,
                scale: 1.8,
                sprites: {
                    idle: { image: new Image(), framesMax: 6, offset: { x: 0, y: 0 } },
                    jump: { image: new Image(), framesMax: 2, offset: { x: 0, y: 0 } },
                    fall: { image: new Image(), framesMax: 2, offset: { x: 0, y: 0 } },
                    run: { image: new Image(), framesMax: 8, offset: { x: 0, y: 0 } },
                    attack1: { image: new Image(), framesMax: 8, offset: { x: 0, y: 0 } },
                    attack2: { image: new Image(), framesMax: 8, offset: { x: 0, y: 0 } },
                    hit: { image: new Image(), framesMax: 4, offset: { x: 0, y: 0 } },
                    dead: { image: new Image(), framesMax: 7, offset: { x: 0, y: 0 } },
                }
            });

            player.animations.idle.image.src = "C:/Users/HP/Documents/new aaa/cat/Wizard Pack/Wizard Pack/Idle.png";
            player.animations.jump.image.src = "C:/Users/HP/Documents/new aaa/cat/Wizard Pack/Wizard Pack/Jump.png";
            player.animations.fall.image.src = "C:/Users/HP/Documents/new aaa/cat/Wizard Pack/Wizard Pack/Fall.png";
            player.animations.run.image.src = "C:/Users/HP/Documents/new aaa/cat/Wizard Pack/Wizard Pack/Run.png";
            player.animations.attack1.image.src = "C:/Users/HP/Documents/new aaa/cat/Wizard Pack/Wizard Pack/Attack1.png";
            player.animations.attack2.image.src = "C:/Users/HP/Documents/new aaa/cat/Wizard Pack/Wizard Pack/Attack2.png";
            player.animations.hit.image.src = "C:/Users/HP/Documents/new aaa/cat/Wizard Pack/Wizard Pack/Hit.png";
            player.animations.dead.image.src = "C:/Users/HP/Documents/new aaa/cat/Wizard Pack/Wizard Pack/Death.png";
         

            function playerCollision({ r1, r2 }) {
                return (
                    r1.attackBox.position.x + r1.attackBox.width >= r2.position.x &&
                    r1.attackBox.position.x <= r2.position.x + r2.width && r1.isAttacking
                   
                );
            }

            function enemyCollision({ r1, r2 }) {
                return (
                    r2.attackBox.position.x + r2.attackBox.width >= r1.position.x  && 
                    r2.attackBox.position.x <= r1.attackBox.position.x
                );
            }

            //for the heal icon
            let icon = document.getElementById('icon');

            icon.addEventListener('click', function() {
                player.heal();
                icon.style.display = 'none';
            });
       
           
            

            function animate() {
                requestAnimationFrame(animate);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(phb, 40, 19, 400, 198);
                ctx.drawImage(ehb, 600, 19, 400, 198);
               
                player.update();
                player.draw();
            
                enemy.update(player);
                enemy.draw();
            //this for spawning new enemy
                // if (enemy.health <= 0){
                // ene.update();
                // ene.draw();
                // }
            
                 if (keys.a.pressed && !keys.d.pressed) {
            player.switchSprite('run');
            player.position.x -= 1;
            } else if (keys.d.pressed && !keys.a.pressed) {
            player.switchSprite('run');
            player.position.x += 1;
            } else if (keys.q.pressed) {
            player.switchSprite('attack1');
            } else if (keys.s.pressed) {
            player.switchSprite('attack2');
            } else if (player.health <= 0){
               player.handleDeath();
             
            } else {
            player.switchSprite('idle');
            }
            
            
            
             //jumping
                    
                    
             if (player.position.y + player.height + player.velocity.y >= canvas.height - 96) {
                player.velocity.y = 0;
                player.position.y = 330;
            } else {
                player.velocity.y += gravity;
            }
            
            
            player.position.y += player.velocity.y;
            
            if (player.velocity.y < 0) {
                player.switchSprite('jump');
            } else if (player.velocity.y > 0) {
                player.switchSprite('fall');
            }
            
            
            //player's collision box 
            if (
                playerCollision({
                    r1: player,
                    r2: enemy
                }) &&
                player.isAttacking
            ) {
                player.isAttacking = false
                enemy.healthDecrease();
                enemy.reverse();
                
            }
            //enemy collision
            if (
                enemyCollision({
                    r1: player,
                    r2: enemy
                }) 
            ) {
                player.switchSprite('hit');
                player.healthDecrease();
            }
            
            }
            
            animate();