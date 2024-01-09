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

/**     ask user if want to attack or defense
 * 
 * @param {*} mate      : character to change mode attack
 * @param {*} mode_arra : list of posibilities of mode
 * @returns             : mode 
 */
function ask_attack_position(mate, mode_arra) {

    let p = prompt(`Do you want to put in wich mode between ${mode_arra[0]} and ${mode_arra[1]} for your ${mate.name} ${mate.id_name}`);
    mate.attack_position = p;

    return p;
}


/**     check if input available and between a range of number
 * 
 * @param {*} input  : input to check 
 * @param {*} nb_max : max value of range
 * @param {*} nb_min : min value of range
 * @returns          : input available
 */
export function check_input_available(input, nb_max, nb_min) {

    while (input != Number || input.length <= 0 || ( input <= nb_min && input > nb_max  ) ) {
         
        console.log(`Your input ${input} is unavailable `);
        input = prompt(`Please enter a available input, your input has to be between ${nb_min} and ${nb_max}`);
    }
    return input;
}

export function create_character() {
    alert("Now, your are going to create all your team ! :) ");
    console.log("Don't forget that you can put " + INSTANCES.max_hp + "health for all your team !\nBy default, each mate has minimum 1 hp");
    console.log(`Don't forget that you can put  ${INSTANCES.max_attack} + attack for all your team !`);

    let name_team_mate = "";
    let posture_team_mate = "";
    let health_team_mate = "";
    let attack_team_mate = "";
    let max_of_attack = INSTANCES.max_attack;
    let max_of_health = INSTANCES.max_hp;
    INSTANCES.team.forEach( (element, i) => {


        
        if (i == INSTANCES.team.length -1 ) {
            element.health_point += max_of_health;

            alert(`your ${element.id_name} will have ${element.health_point} hp`);

            element.attack_power += max_of_attack;
            alert(`your ${element.id_name} will have ${element.attack_power} attack power`);


        } else{

        // choice of name of team mate
        name_team_mate = prompt(`Enter name of your ${element.id_name}`);
        element.name = name_team_mate;
        console.log(`The name of your ${element.id_name} is ${element.name}`);
        // element.name = "";

        // choice posture of team mate
        posture_team_mate = prompt(`Choose your posture between ${INSTANCES.Postures[0]} and ${INSTANCES.Postures[1]}`);
        element.attack_position.push(posture_team_mate);
        console.log(`Your ${element.id_name} is on ${element.attack_position} mode`);

        // choice health of team mate
        health_team_mate = +prompt(`You have ${max_of_health-3} point of health max to give to your ${element.id_name}, \nhow many hp do you to give to him ?`);
        // health_team_mate = check_input_available(health_team_mate, max_of_health, i);
        element.health_point += health_team_mate;
        console.log(`Your ${element.id_name} has ${element.health_point} hp`);
        max_of_health -= health_team_mate;

        // choice attack point of team mate
        attack_team_mate = +prompt(`You have ${max_of_attack} point of attack max to give to your ${element.id_name}, \nhow many attack power do you to give to him ?`);
        // attack_team_mate = check_input_available(attack_team_mate, max_of_attack, i);
        element.attack_power = attack_team_mate;
        max_of_attack -= attack_team_mate;
        console.log(`Your ${element.id_name} has ${element.attack_power} attack`);


        }

    });
    console.log(INSTANCES.team);

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

/**     get a list of team mate alive
 * 
 * @param {*} list_team : team to check if alive
 * @returns : new list of alive team mate
 */
export function getRandom_team_mate_alive_list(list_team) {
    let alive_team = [];
    list_team.forEach((element , i)=> {
        
        if (element.health_point > 0) {
            alive_team.push(list_team[i]);
        }
    });
    
    if (alive_team.length == 0) {
        console.log(`Everyone is dead sorry :{`);
        return -1;
    }
    return alive_team;
}

/**    get a random team mate
 * 
 * @param {*} list_team : list to get a random team mate
 * @returns             : a random team mate
 */
export function getRandom_team_mate(list_team) {
    let mate_index = Math.floor(Math.random() * list_team.length);
    return list_team[mate_index];
}


/**     boss attack randomdly one character of team's player
 * 
 * @param {*} list_team      : team to check
 * @param {*} current_boss   : boss which attack character
 */
export function attack_random_team_mate(list_team, current_boss) {
    
    let team_alive = getRandom_team_mate_alive_list(list_team);
    let mate = getRandom_team_mate(team_alive);
    let current_attack_power;


    if (mate.attack_position == "defense") {
        current_attack_power = current_boss.attack_power;
        console.log(`Your mate ${mate.name} ${mate.id_name} is on mode ${mate.attack_position} so, damage will be divided by two`);
        console.log(`${current_boss.name} attack power had ${current_boss.attack_power} power of attack`);
        current_boss.attack_power *= 0.5;
        console.log(`${current_boss.name} attack power has now ${current_boss.attack_power} power of attack`);

        current_boss.attack_to(mate);
        current_boss.attack_power = current_attack_power;

    } else if (mate.attack_position == "attack"){
        current_boss.attack_to(mate);
    }

    team_alive = getRandom_team_mate_alive_list(team_alive);
    return team_alive;
}


// la posture de combat peut valoir soit “attaque” , soit “défense” 
// un héro qui attaque alors que sa posture de combat est en “attaque” infligera 20% plus de dégât au boss.
// un héro qui se fait attaquer par le boss alors que sa posture de combat est en “défense” subira que la moitié des dégâts 



/** check type of team mate to know what speciality of attack has team mate to attack boss
 * 
 * @param {*} list_team : team to check speciality
 * @param {*} list_team : boss to attack
 */
export function check_type_team_mate_and_attack(mate,current_boss){
    
    let pos_attack;
    let current_power;

        switch (mate.id_name) {
            case "warrior":
                console.log(`Your ${mate.name} is a ${mate.id_name} so has => ${mate.speciality[0]} and has ${mate.speciality[1]} points !`);

                pos_attack = ask_attack_position(mate, INSTANCES.Postures);

                if (mate.attack_position == "attack" ) {

                    if (mate.speciality[1] >= 4) {
                        current_power =mate.attack_power;
                        console.log(`${mate.name} the ${mate.id_name} had ${mate.attack_power} attack power `);
    
                        mate.attack_power *=1.2;                        
                        console.log(`${mate.name} the ${mate.id_name} has now  ${mate.attack_power} attack power`);

                        mate.attack_power *=1.25;
                        console.log(`${mate.name} the ${mate.id_name} has increased now his attack power by 25% => attack power : ${mate.attack_power} $:) `);

    
                        mate.attack(current_boss);
                        mate.attack_power = current_power;
                        mate.speciality[1] = 0;
                        
                    } else if (mate.speciality[1] < 4) {
                        
                        current_power =mate.attack_power;
                        console.log(`${mate.name} the ${mate.id_name} had ${mate.attack_power} attack power `);
    
                        mate.attack_power *=1.2;
                        console.log(`${mate.name} the ${mate.id_name} has now  ${mate.attack_power} attack power `);
    
                        mate.attack(current_boss);
                        mate.attack_power = current_power;

                        mate.speciality[1]++;
                        console.log(`Your ${mate.id_name} get one more point of rage and has now ${mate.speciality[1]} of ${mate.speciality[0]} !`);
                    }

        
                } else if( mate.attack_position == "defense") {

                    mate.is_defense_mode();
                }
                
    
                break;
            case "mage":
                console.log(`Your ${mate.name} is a ${mate.id_name} so has => ${mate.speciality[0]} and has ${mate.speciality[1]} mana !`);
                alert(`If you want to attack with your ${mate.id_name}, it will cost you 2 mana !`);
                pos_attack = ask_attack_position(mate, INSTANCES.Postures);

                
                if (mate.attack_position == "attack") {

                    if (mate.speciality[1] == 0) {
                        console.log(`Your ${mate.name} the ${mate.id_name} can not attack because he has only ${mate.speciality[1]} mana :/`);
                        mate.speciality[1] = 7;
                        console.log(`Your ${mate.id_name} has now ${mate.speciality[1]} mana !`);

                    } else if (mate.speciality[1] > 0) {
                        
                        current_power =mate.attack_power;
                        console.log(`${mate.name} the ${mate.id_name} had ${mate.attack_power} attack power `);
    
                        mate.attack_power *=1.2;
                        console.log(`${mate.name} the ${mate.id_name} has now  ${mate.attack_power} attack power `);
    
                        mate.attack(current_boss);
                        mate.attack_power = current_power;
    
                        mate.speciality[1] -= 2;
                        console.log(`Your ${mate.id_name} has now ${mate.speciality[1]} mana !`);
                    }
                } else if( mate.attack_position == "defense") {

                    mate.is_defense_mode();
                }
    
                
                break;
            case "archer":
                console.log(`Your ${mate.name} is a ${mate.id_name} so has => ${mate.speciality[0]} and has ${mate.speciality[1]} arrows !`);
                alert(`If you want to attack with your ${mate.id_name}, it will cost you 2 arrows !`);
                pos_attack = ask_attack_position(mate, INSTANCES.Postures);

    
                if (mate.attack_position == "attack") {

                    if (mate.speciality[1] == 0) {
                        console.log(`Your ${mate.name} the ${mate.id_name} can not attack because he has only ${mate.speciality[1]} arrows :/`);
                        mate.speciality[1] = 6;
                        console.log(`Your ${mate.id_name} has now ${mate.speciality[1]} arrows !`);
                    } else if (mate.speciality[1] > 0) {
                        
                        current_power =mate.attack_power;
                        console.log(`${mate.name} the ${mate.id_name} had ${mate.attack_power} attack power `);
    
                        mate.attack_power *=1.2;
                        console.log(`${mate.name} the ${mate.id_name} has now  ${mate.attack_power} attack power `);
    
                        mate.attack(current_boss);
                        mate.attack_power = current_power;
    
                        mate.speciality[1] -= 2;
                        console.log(`Your ${mate.id_name} has now ${mate.speciality[1]} arrows !`);
                    }
                    
                } else if( mate.attack_position == "defense")  {

                    mate.is_defense_mode();
                }    
                break;
        }

}

export function team_attack_boss(current_boss, list_team) {
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Beginning of Team's attack ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n");


    list_team.forEach((element, i) => {
        console.log(`                   ***************** ${element.name} ********************`);
        check_type_team_mate_and_attack(element, current_boss);
    });

    console.log("\n");
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ End of Team's attack ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

}

