let deathpatay = false;
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    // ctx.drawImage(phb, 40, 19, 400, 198);
    // ctx.drawImage(ehb, 600, 19, 400, 198);

    player.update();
    player.draw();
if(!enemy.isDead()){
    enemy.update(player);
    enemy.draw();
}
pet.draw();
 pet.update();

 if(pet.position.x > canvas.width) {
    console.log('yes');
    pony.draw();
    pony.update();
 }
//this for spawning new enemy
   if(enemy.isDead()){
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    pet.draw();
    pet.update();
    if(pet.position.x > canvas.width) {
        console.log('yes');
        pony.draw();
        pony.update();
     }
    player.update();
    player.draw();
    ene.ud(player);
    ene.draw();
   }
     if (keys.a.pressed && !keys.d.pressed) {
        if(deathpatay == false){
    player.switchSprite('flip');
    player.position.x -= 1;
            }
} else if (keys.d.pressed && !keys.a.pressed) {
    if(deathpatay == false){
player.switchSprite('run');
player.position.x += 1;
    }
} else if (keys.q.pressed) {
    if(deathpatay == false){
player.switchSprite('attack1');
    }
} else if (keys.s.pressed) {
    if(deathpatay == false){

player.switchSprite('attack2');
    }
} else if(keys.w.pressed){
    if(deathpatay == false){
    player.switchSprite('jump');
    }
} else if (player.health <= 0){
   player.handleDeath();
   if(deathpatay == false){
   deathpatay = true;
   }
}  else {
player.switchSprite('idle');
}

 //jumping unta pero wala ni gagana, maguba sad shag e delete murag boang 
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
if (player.isAttacking) {
    // Collision with enemy
    if (playerCollision({ r1: player, r2: enemy })) {
        player.isAttacking = false;
        enemy.healthDecrease();
        enemy.reverse();
        player.manaDecrease();
    }
    // Collision with second enemy (ene)
    if (playerCollision({ r1: player, r2: ene })) {
        player.isAttacking = false;
        ene.eneHealthDecrease();
        ene.reverse();
        player.manaDecrease();
    }
}

// Player's collision with enemy
if (enemyCollision({ r1: player, r2: enemy })) {
    player.switchSprite('hit');
    player.healthDecrease();
    enemy.manaDecrease();
}

// Player's collision with second enemy (ene)
if (enemyCollision({ r1: player, r2: ene })) {
    player.switchSprite('hit');
    player.healthDecrease();
    ene.manaDecrease();
}

}