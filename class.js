
class Sprite {
    constructor({
        position,
        sprites,
        health,
        mana,
        scale = 1,
        gravity,
        velocity = { x: 0, y: 0 },
        healthDecrease = 500,
        manaDecrease = 500,
    }) {
        this.position = position;
        this.animations = sprites;
        this.currentAnimation = 'idle';
        this.currentFrame = 0;
        this.frameRate = 10; 
        this.frameBuffer = 0;
        this.lastKey = null;
        this.health = health;
        this.firstHit = true;
        this.channel = false;
        this.mana = mana;
        this.scale = scale;
        this.gravity = gravity;
        this.velocity = velocity; 
        this.regenInterval = null;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 50,
            height: 50
        };
        this.height = 150;
        this.isAttacking;
        this.healthDecreaseAmount = healthDecrease;
        this.isDead = false;
        this.manaDecreaseAmount = manaDecrease;
     
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
        const animation = this.animations[this.currentAnimation];
        const frameWidth = animation.image.width / animation.framesMax;
        ctx.drawImage(
            animation.image,
            this.currentFrame * frameWidth,
            0,
            frameWidth,
            animation.image.height,
            this.position.x - animation.offset.x,
            this.position.y - animation.offset.y,
            frameWidth,
            animation.image.height
        );
        const healthBarWidth = 230; 
        const healthBarHeight = 10; 
        const healthBarX = 140;
        const healthBarY = 110;
        this.drawHealthBar(ctx, healthBarX, healthBarY, healthBarWidth, healthBarHeight);

        const manaWidth = 230; 
        const manaHeight = 10; 
        const manaBarX = 140;
        const manaBarY = 130;
        this.drawMana(ctx, manaBarX, manaBarY, manaWidth, manaHeight);

    }
    drawHealthBar(ctx, x, y, width, height) {

        const filledWidth = (this.health / MAX_HEALTH) * width;

        ctx.fillStyle = 'violet';
        ctx.fillRect(x, y, filledWidth, height);
    }

   drawMana(ctx, x, y, width, height) {

        const filledWidth = (this.mana / MAX_MANA) * width;

        ctx.fillStyle = 'blue';
        ctx.fillRect(x, y, filledWidth, height);
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

chanel(enemy) {
enemy.health -= 4930;

}

heal() {
    this.health = MAX_HEALTH;
}
manaIncrease(){
    this.mana = MAX_HEALTH;
}

    update() {
        this.animateFrames();
        this.draw();
     if (this.attackBox.position.x >= enemy.attackBox.position.x){
        console.log('yes')
        this.position.x = this.position.x - 50;
     }

     if (this.attackBox.position.x >= ene.attackBox.position.x){
        console.log('yes')
        this.position.x = this.position.x - 50;
     }
          //lol wala ni gagana 
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

    healthDecrease() {
        if (this.firstHit) {
            this.health -= 2000;
            this.firstHit = false; 
        } else {
            this.health -= this.healthDecreaseAmount;
        }
      
        if (this.health <= 0) {
            this.health = 0;
            document.querySelector('#lose').innerHTML = 'Better luck next time'
            document.querySelector('#lose').style.display = 'flex'
        }
    }

  
    manaDecrease() {
        this.mana -= this.manaDecreaseAmount;
        if (this.mana <= 0) {
            this.mana = 0;
          this.startManaRegeneration();
         
        }
      }
   dead(){
    this.health = 0;
   }
      startManaRegeneration() {
        if (this.intervalId) {
            clearInterval(this.intervalId); 
        }
        this.intervalId = setInterval(() => {
            this.mana += 100;
            if (this.mana >= 4900) { 
                clearInterval(this.intervalId);
            }
        }, 100);
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
        mana,
        manaDecrease=500,
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
        this.firstHit = true;
        this.health = health;
        this.mana = mana;
        this.scale = scale;
        this.width = 50;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: 50,
            height: 50

        }
        this.healthDecreaseAmount = healthDecrease;
        this.manaDecreaseAmount = manaDecrease;
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
        const animation = this.animations[this.currentAnimation];
        const frameWidth = animation.image.width / animation.framesMax;
        const scaledFrameWidth = frameWidth * this.scale;
        const scaledHeight = animation.image.height * this.scale;
        
        ctx.drawImage(
            animation.image,
            this.currentFrame * frameWidth,
            0,
            frameWidth,
            animation.image.height,
            this.position.x - animation.offset.x * this.scale,
            this.position.y - animation.offset.y * this.scale,
            scaledFrameWidth,
            scaledHeight
        );
    

        const healthBarWidth = 225; 
        const healthBarHeight = 10; 
        const healthBarX = 650;
        const healthBarY = 110;
        this.drawHealthBar(ctx, healthBarX, healthBarY, healthBarWidth, healthBarHeight);
        const manaWidth = 225; 
        const manaHeight = 10; 
        const manaX = 650;
        const manaY = 130;
        this.drawMana(ctx, manaX,manaY, manaWidth, manaHeight);
    }

    drawHealthBar(ctx, x, y, width, height) {

        const filledWidth = (this.health / MAX_HEALTH) * width;
      
        ctx.fillStyle = 'green';
        ctx.fillRect(x + (width - filledWidth), y, filledWidth, height);
        
}
drawMana(ctx, x, y, width, height) {

    const filledWidth = (this.mana / MAX_HEALTH) * width;
  
    ctx.fillStyle = 'red';
    ctx.fillRect(x + (width - filledWidth), y, filledWidth, height);
    
}
manaDecrease() {
    this.mana -= this.manaDecreaseAmount;
    if (this.mana <= 0) {     
        this.mana = 0;
        this.position.x = 300;
        this.startManaRegeneration();  
    }
}

startManaRegeneration() {
    if (this.intervalId) {
        clearInterval(this.intervalId); 
    }
    this.intervalId = setInterval(() => {
        this.mana += 100;
        if (this.mana >= 4900) { 
            clearInterval(this.intervalId);
        }
    }, 100);
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


    isDead() {
        return this.health <= 0;
    }

    ud() {
       if(ene.health > 0){
      this.position.x -= this.velocity.x;
       }
       if (player.health <= 0){
        this.velocity.x = 0;
        this.position.x = 800;
       }

        this.animateFrames();
        this.draw();
        if(this.position.x ===  player.attackBox.position.x) {
            this.reverse();
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

    update() {
        if(ene.health >= 0){
        this.draw();
        this.animateFrames();
        }
        if (enemy.mana > 0) {
            this.position.x -= this.velocity.x;
        }
        if (player.health <= 0){
            this.velocity.x = 0;
            this.position.x = 800;
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
      eneHealthDecrease() {
        if (this.firstHit) {
            this.health -= 2000;
            this.firstHit = false; 
        } else {
            this.health -= this.healthDecreaseAmount;
        }
 
        if (ene.health <= 0) {
            this.health = 0;
            setTimeout(() => {
                document.querySelector('#won').innerHTML = 'You won!';
                document.querySelector('#won').style.display = 'flex';   
                }, 100);
            }
      }
    healthDecrease() {   
        if (this.firstHit) {
            this.health -= 2000;
            this.firstHit = false; 
        } else {
            this.health -= this.healthDecreaseAmount;
        }
        if (this.health <= 0) {
            this.health = 0;
            enemy.switchSprite('dead');
        }
    }

    ballHealthDecrease() {
        this.health -= 1000
    }
    
    }

    
    class Pet {
        constructor({
            position,
            sprites,
            velocity = { x: 0, y: 0 },
            speed = 1,
            scale = scale,
        }) {
            this.position = position;
            this.animations = sprites;
            this.currentAnimation = 'idle';
            this.currentFrame = 0;
            this.frameRate = 20; // Adjust as needed
            this.frameBuffer = 0;
            this.lastKey = null;
            this.velocity = velocity;
            this.speed = speed;
            this.scale = scale;
            this.width = 50;
            this.ballActivated = false;
            this.flyActivated = false;
        }
        switchSprite(key) {
            if (this.currentAnimation === key || !this.animations[key]) return;
            this.currentAnimation = key;
            this.currentFrame = 0;
            this.lastKey = key;
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

        draw() {
            const animation = this.animations[this.currentAnimation];
            const frameWidth = animation.image.width / animation.framesMax;

            ctx.drawImage(
                animation.image,
                this.currentFrame * frameWidth,
                0, 
                frameWidth, 
                animation.image.height, 
                this.position.x - animation.offset.x, 
                this.position.y - animation.offset.y, 
                frameWidth * this.scale, 
                animation.image.height * this.scale 
            );
        }
        ball(enemy,ene) {
            this.ballActivated = true;
            pet.switchSprite('ball');

           if(this.position.x <= enemy.attackBox.position.x){
            enemy.ballHealthDecrease();
           
           }
           if(this.position.x <= ene.attackBox.position.x){
            ene.ballHealthDecrease();
           }
        
        }
        fly(player){
            this.flyActivated = true;
        
            
           player.manaIncrease();
        }

        update() {
           if(this.ballActivated){
            this.position.x += this.velocity.x;
           }
           if(this.flyActivated){
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
           }
            this.animateFrames();
            this.draw();
        }
    }