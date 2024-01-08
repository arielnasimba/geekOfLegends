import * as INSTANCES from "./instances.js"

import * as CLASSES from "./classes.js"


/* Déroulement du jeu
 

Début de jeu
 

Avant le début du combat, le joueur devra créer les 3 héros

Il pourra choisir le nom de chaque héros ainsi que la posture de combat initiale.

Le joueur devra aussi répartir un totale de points de vie et de points d'attaque entre les 3 héros.

exemple :

150 points de vie à répartir pour les 3 héros
120 points d'attaque à répartir pour les 3 héros
 

notez qu'il faut pouvoir répartir de tel sorte à ce que chaque héros est au moins 1 points de vie.

Après avoir créer les 3 héros, l'ordinateur choisira (aléatoirement) parmi les 3 boss crées lequel sera dans le combat.
 */

/**     Get random boss 
 * 
 * @param {*} list_boss : array of boss
 * @returns             : a boss
 */
export function random_boss(list_boss) {
    let boss_index =  Math.floor(Math.random() * list_boss.length);
    // console.log(`Your boss will be ${list_boss[boss_index].name}`);
    return list_boss[boss_index];
}




export function create_character() {
    alert("Now, your are going to create all your team ! :) ");
    console.log("Don't forget that you can put " + INSTANCES.max_hp + "health for all your team !");
    console.log(`Don't forget that you can put  ${INSTANCES.max_attack} + attack for all your team !`);

    let name_team_mate = "";
    let posture_team_mate = "";
    let health_team_mate = "";
    let attack_team_mate = "";
    let max_of_attack = INSTANCES.max_attack;
    let max_of_health = INSTANCES.max_hp;
    INSTANCES.team.forEach(element => {
        // choice of name of team mate
        name_team_mate = prompt(`Enter name of your ${element.id_name}`);
        element.name = name_team_mate;
        console.log(`The name of your ${element.id_name} is ${element.name}`);
        element.name = "";

        // choice posture of team mate
        posture_team_mate = prompt(`Choose your posture between ${INSTANCES.Postures[0]} and ${INSTANCES.Postures[1]}`);
        element.attack_position.push(posture_team_mate);
        console.log(`You ${element.id_name} is on ${element.attack_position} mode`);

        // choice health of team mate
        health_team_mate = prompt(`You have ${max_of_health} point of health max to give to your ${element.id_name}, \nhow many hp do you to give to him ?`);
        element.healt_point = health_team_mate;
        console.log(`You ${element.id_name} has ${element.healt_point} hp`);
        max_of_health -= health_team_mate;

        // choice attack point of team mate
        attack_team_mate = prompt(`You have ${max_of_attack} point of attack max to give to your ${element.id_name}, \nhow many attack power do you to give to him ?`);
        element.attack_power = attack_team_mate;
        max_of_attack -= attack_team_mate;
        console.log(`You ${element.id_name} has ${element.attack_power} attack`);


    });
    // console.table(INSTANCES.team);

}

/* Un héro ne peut pas faire d'action si il est mort (point de vie à 0)

Ceci se répète jusque à ce que :

tout les héros meurent (perdu)
ou que le boss meurt (gagner)
ou que les points de vie du boss soient en dessous de 20% (énigme pour les boss)
 */
export function check_team_is_alive(list_team) {
    console.log("--------------------------- Display if team are alive ---------------------------");
    // console.table(list_team);
    let team_is_alive = true;
    let mate_death = 0;

    list_team.forEach(element => {
        if (element.health_point <= 0) {
            console.log(`${element.name} is dead because of his ${element.health_point} hp`);
            mate_death++;
        } else{
            console.log(`${element.name} has now ${element.health_point} hp `);
        }
    });

    if (mate_death == 3) {
        return !team_is_alive;
    }

    return team_is_alive;
}
/**     check if current boss is alive
 * @param {*} current_boss  : boss to check his/her health point is below 0
 * @returns                 : boolean true is still alive; false if boss health point below 0
 */
export function check_boss_is_alive(current_boss) {
    return current_boss.health_point > 0;
}

/**     check if current boss is under 20% of his/her health point
 * @param {*} current_boss  : boss to check his/her health point is below 20 %
 * @returns                 : boolean true is still alive; false if boss health point below 20%
 */
export function check_boss_under_20(current_boss) {
    return current_boss.current_hp < (current_boss.health_point * 0.2);

}

/* Énigmes pour les Boss

Quand un boss a 20% de points de vie, l'ordinateur posera une énigme parmi 3 possible (aléatoire).
Le joueur aura jusque à trois tentative pour répondre correctement.
Si il y parvient, le boss est vaincu et le joueur gagner la partie.
Dans le cas contraire, l'équipe des héros est décimée, le joueur a perdu. */

export function get_enigme(current_boss, list_enigmes) {
    let index_enigme =  Math.floor(Math.random() * list_enigmes.length);
    // console.log(`Your boss will be ${list_boss[index_enigme].name}`);
    return list_enigmes[index_enigme];
}
/**  get enigme and check answer
 * 
 * @param {*} current_boss : boss to defeat if right answer
 * @param {*} current_enigme : enigme
 */
export function enigme_for_boss_under20(current_boss,current_enigme){
    console.log(`So if you answer correctly this enigme, ${current_boss.name} will be defeated !`);
    console.log(`${current_enigme.enigme}`);
    let rep = prompt(`What is your answer ?`);

    // let cpt = 0;
    // while (cpt <=3 || rep != current_enigme.answer) {
    //     console.log();
    // }

    if (rep == current_enigme.answer) {
        console.log(`${current_boss.name} will be defeated`);
        current_boss.current_hp -= current_boss.current_hp;
    } else{
        console.log(`${current_boss.name} will be not defeated because of wrong answer :/ sorry!`);

    }
}