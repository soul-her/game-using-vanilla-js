const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const MAX_HEALTH = 5000;
const MAX_MANA = 5000;


canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

//for bg music
// document.body.addEventListener('click', function() {
//     const bgMusic = document.getElementById('bgMusic');
//     bgMusic.play();
// });
//for the bg image
const background = new Image();
background.src = "map.png";
background.onload = function() {
    animate(); 
};
const bg = new Image();
bg.src = "shawl bg/mapshawl.png";
bg.onload = function() {
    animate(); 
};
//for the restart button
document.addEventListener("DOMContentLoaded", function() {
    const restartDiv = document.getElementById("restart");

    restartDiv.addEventListener('click', function() {
        window.location.reload(); 
    });
});


const keys = {
    w: { pressed: false },
    a: { pressed: false },
    d: { pressed: false },
    q: { pressed: false },
    s: { pressed: false },
    r: { pressed: false },
    f: { pressed: false },
};

window.addEventListener('keydown', (event) => {
    if(!player.dead||!player.manaLost)
    switch (event.key) {
        case 'w':
            keys.w.pressed = true;
            player.isJumping = true; 
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
        case 'q':
            keys.q.pressed = true;
            player.attack();
            break;
        case 's':
            keys.s.pressed = true;
            player.attack();
        if(keys.f.pressed){
            player.chanel(enemy)
        }
            break;
        case 'r':
            setTimeout(() => {
                document.querySelector('#stun').innerHTML = 'stun';
            document.querySelector('#stun').style.display = 'flex';  
            stunEnemy(enemy, 2000);
            stunEnemy(ene, 2000);
            }, 1000);
          
               
                break;
         case 'f':
            keys.f.pressed = true;
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
       case 'r':
         keys.s.pressed = false;
          break;
          case 'f':
            keys.s.pressed = false;
             break;
     
    }
});




// Function to stun the enemy
function stunEnemy(enemy, duration) {
// Save the original velocity
const originalVelocity = { ...enemy.velocity };

// Set the velocity to zero to stop the enemy
enemy.velocity = { x: 0, y: 0 };

// Set a timeout to restore the original velocity after the duration
setTimeout(() => {
enemy.velocity = originalVelocity;
document.querySelector('#stun').style.display = 'none'; 
}, duration);
}


const enemySprites = {
idle: { image: new Image(), framesMax: 4, offset: { x: 0, y: 0 } },
attack: { image: new Image(), framesMax: 2, offset: { x: 0, y: 0 } },
dead: { image: new Image(), framesMax: 4, offset: { x: 0, y: 0 } },
};

enemySprites.idle.image.src = "thing.png";
enemySprites.attack.image.src = "stab.png";
enemySprites.dead.image.src = "dead.png";

const enemy = new Enemy({
position: { x: 800, y: 380 },
sprites: enemySprites,
velocity: { x: 0.5, y: 0 },
speed: 0.3,
health: MAX_HEALTH,
mana: MAX_MANA,
scale: 2
});

const eneSprites = {
idle: { image: new Image(), framesMax: 8, offset: { x: 0, y: 0 } },
dead: { image: new Image(), framesMax: 6, offset: { x: 0, y: 350 } },
};

eneSprites.idle.image.src = "wood.png";
eneSprites.dead.image.src = "thing death.png";

const ene = new Enemy({
position: { x: 800, y: 350 },
sprites: eneSprites,
velocity: { x: 0.5, y: 0 },
speed: 0.3,
health: MAX_HEALTH,
mana: MAX_MANA,
scale: 2,
});

const effect = new Sprite ({
    position: { x: 60, y: 600 },
velocity: { x: 0, y: 0 },
scale: 1.8,
sprites: {
idle: { image: new Image(), framesMax: 8, offset: { x: 0, y: 0 } },
}
});
effect.animations.idle.image.src = "effect.png";


const player = new Sprite({
position: { x: 40, y: 600 },
velocity: { x: 0, y: 0 },
health: MAX_HEALTH,
mana: MAX_MANA,
scale: 1.8,
sprites: {
idle: { image: new Image(), framesMax: 6, offset: { x: 10, y: 0 } },
jump: { image: new Image(), framesMax: 2, offset: { x: 0, y: 0 } },
fall: { image: new Image(), framesMax: 2, offset: { x: 0, y: 0 } },
run: { image: new Image(), framesMax: 8, offset: { x: 0, y: 0 } },
flip: { image: new Image(), framesMax: 8, offset: { x: 0, y: 0 } },
attack1: { image: new Image(), framesMax: 8, offset: { x: 0, y: 0 } },
attack2: { image: new Image(), framesMax: 8, offset: { x: 0, y: 0 } },
hit: { image: new Image(), framesMax: 4, offset: { x: 0, y: 0 } },
dead: { image: new Image(), framesMax: 7, offset: { x: 0, y: 0 } },
}
});

        player.animations.idle.image.src = "Wizard Pack/Wizard Pack/Idle.png";
        player.animations.jump.image.src = "Wizard Pack/Wizard Pack/Jump.png";
        player.animations.fall.image.src = "Wizard Pack/Wizard Pack/Fall.png";
        player.animations.run.image.src = "Wizard Pack/Wizard Pack/Run.png";
        player.animations.flip.image.src = "Wizard Pack/Wizard Pack/flip.png";
        player.animations.attack1.image.src = "Wizard Pack/Wizard Pack/Attack1.png";
        player.animations.attack2.image.src = "Wizard Pack/Wizard Pack/Attack2.png";
        player.animations.hit.image.src = "Wizard Pack/Wizard Pack/Hit.png";
        player.animations.dead.image.src = "Wizard Pack/Wizard Pack/Death.png";


        const pet = new Pet({
        
            position: { x: 0, y: 380},
            velocity: {x: 2, y:0},
            scale: 2.5,
            sprites: {
                idle: { image: new Image(), framesMax: 12, offset: { x: 0, y: 0 } },
                ball: { image: new Image(), framesMax: 6, offset: { x: 0, y: 340 }},
            
            }
        });

        pet.animations.idle.image.src = "pet.png";
        pet.animations.ball.image.src = "fireballoga/blue/ball1.png";

        const pony = new Pet({
        
            position: { x: 0, y: 380},
            velocity: {x: 1, y:-1},
            scale: 2.5,
            sprites: {
                idle: { image: new Image(), framesMax: 7, offset: { x: 0, y: 0 } },    
            }
        });

        pony.animations.idle.image.src = "pegasus pony.png";


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

        
        //pony icon
        let fony = document.getElementById('pony');

        fony.addEventListener('click', function() {
           pony.fly(player);
           pony.position.x += pony.velocity.x
            fony.style.display = 'none';
            
        });
   //ball
        let boll = document.getElementById('ball');

        boll.addEventListener('click', function() {
          
                pet.ball(enemy,ene);
                boll.style.display = 'none';
          
        });
   