import * as INSTANCES from "./instances.js"
import * as FUNCTIONS from "./functions.js"
// GeekOfLegends
 

// Configuration du Projet
 

// Créez un repository Github. en PRIVATE
// Utilisez une structure de dossier organisée.
// Commitez avec des noms explicites minimum 25 commits.
// ce projet est un jeu interactif: Utilisez des alert, prompt et console.log
 

/* Objectif :
 

Ce jeu consiste en l'affrontement entre 3 héros, crées et contrôlés par le joueur, contre un boss.

Le jeu se déroule au “tour par tour” c'est à dire que chaque personnage attaquera à sont tour et celà en boucle jusque l'un des deux camp soit vaincu.
 */
 

/* Création des Boss
(à l'aide d'une classe ou d'un objet)

Créez trois boss : Sauron, Chronos, Lilith.
Chaque boss a un nom, des points d'attaque ainsi que des points de vie 
les points d'attaques représente le nombre de dégâts  qu'il infligera aux point de vie d'un héro à chaque attaque. 
les points de vie représente la santé du boss. si elle tombe à 0, le boss meurt. Pour rappel le but du jeu est de réduire ces point de vie à 0.
Les points d'attaque et les points de vie de chaque Boss sont différents et a votre bon vouloir.
 */ 

// console.log(INSTANCES.SAURON);
// console.log(INSTANCES.CHRONOS);
// console.log(INSTANCES.LILITH);

//! DONE
/********************************************************************/


/* Création des Héros
 

Créez 3 héros : un guerrier, un mage, et un archer.
Chaque héros a un nom, une posture de combat,  des points d'attaque ainsi que des points de vie 
les points d'attaques représente le nombre de dégâts  qu'il infligera aux point de vie du boss à chaque attaque. 
les points de vie représente la santé du héro. si elle tombe à 0, le héro est mort.
la posture de combat peut valoir soit “attaque” , soit “défense” 
un héro qui attaque alors que sa posture de combat est en “attaque” infligera 20% plus de dégât au boss.
un héro qui se fait attaquer par le boss alors que sa posture de combat est en “défense” subira que la moitié des dégâts 
 */ 

/* Chaque héros possèdent des particularités selon leur rôle.

Le Guerrier

Le guerrier possède des points de rage ( initialement à 0 ) 
Le guerrier gagne 1 point de rage à la fin de chaque tour 
Lorsque le guerrier attaque, si il possède 4 points de rage, les dégâts qu'il infligera seront augmenté de 25% ce tour ci et ses points de rage redescendent à 0.
 

Le Mage

Le mage possède des points de mana ( initialement à 7 ) 
Les attaques coûtent 2 points de mana.
Si le mage ne possède pas assez de mana lorsque il doit attaquer, il récupère 7 points de mana au lieu d'infliger des dégâts.
 

l'Archer

L'archer possède des flèches (initialement à 6)
Les attaques coûtent 2 flèches.
Si L'archer ne possède pas assez de flèche lorsque il doit attaquer, il récupère 6 flèches au lieu d'infliger des dégâts.
 */ 


// console.log(INSTANCES.WARRIOR);
// console.log(INSTANCES.MAGE);
// console.log(INSTANCES.ARCHER);

//! DONE
/********************************************************************/

 

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

// FUNCTIONS.random_boss(INSTANCES.boss_list);

// let boss = FUNCTIONS.random_boss(INSTANCES.boss_list);
// console.log(boss);

// console.log(INSTANCES.WARRIOR_test );
// console.log(INSTANCES.MAGE_test );
// console.log(INSTANCES.ARCHER_test );

/*********************** true game */
function game() {
    
    FUNCTIONS.create_character();
    console.table(INSTANCES.team);

    let boss_game = FUNCTIONS.random_boss(INSTANCES.boss_list);
    console.table(boss_game );

    //check if boss current is still alive
    let check_team_alive = FUNCTIONS.check_team_is_alive(INSTANCES.team);
    let boss_alive = FUNCTIONS.check_boss_is_alive(boss_game);
    console.log(`the ${boss_game.name} still alive ? : ${boss_alive}`);

    //check if boss current hp under 20% of his max hp
    let boss_20 = FUNCTIONS.check_boss_under_20(boss_game);
    console.log(` the current hp of ${boss_game.name} is : ${boss_game.current_hp} hp`);
    console.log(`the ${boss_game.name} under 20 % of his hp max? : ${boss_20}`);

    //enigme to defeat current boss
    let current_enigme = FUNCTIONS.get_enigme(boss_game, INSTANCES.enigmes);
    // FUNCTIONS.enigme_for_boss_under20(boss_game, current_enigme);
    // console.log(current_enigme.enigme);

}


// game();

//**************************************************/

// test 
function game2() {
    
    // console.table(INSTANCES.team_test);
    let boss_game = FUNCTIONS.random_boss(INSTANCES.boss_list);
    // console.log(boss_game.name);
    console.table(boss_game);

    /*** first tour ***/

    //check if boss current is still alive
    let check_team_alive = FUNCTIONS.check_team_is_alive(INSTANCES.team_test);
    // console.log(check_team_alive);
    let boss_alive = FUNCTIONS.check_boss_is_alive(boss_game);
    console.log(`the ${boss_game.name} still alive ? : ${boss_alive}`);
    let boss_20 = FUNCTIONS.check_boss_under_20(boss_game);

    while (boss_alive && check_team_alive && !boss_20 ) {
        
        //team will attack current boss
        FUNCTIONS.team_attack_boss( boss_game ,INSTANCES.team_test);

        let team_remain = FUNCTIONS.getRandom_team_mate_alive_list(INSTANCES.team_test);

        //boss attack randomdly one of character's user
        team_remain = FUNCTIONS.attack_random_team_mate(team_remain, boss_game,INSTANCES.enigmes);

        FUNCTIONS.check_type_team_mate_and_attack(team_remain);


        // it's work, don't forget to put in while loop
        check_team_alive = FUNCTIONS.check_team_is_alive(team_remain);
        console.log(`team is alive ? : ${check_team_alive}`);


    
        //check if boss current is still alive
        boss_alive = FUNCTIONS.check_boss_is_alive(boss_game);
        console.log(`the ${boss_game.name} still alive ? : ${boss_alive}`);
        console.log(` the current hp of ${boss_game.name} is : ${boss_game.current_hp} hp`);
        console.log(`the ${boss_game.name} under 20 % of his hp max? : ${boss_20}`);

    }

    // //check if boss under 20 for enigme moment
    // if (boss_20) {
    //     console.log(`This a crucial moment !!`);
    //        //enigme to defeat current boss
    //         let current_enigme = FUNCTIONS.get_enigme(boss_game, INSTANCES.enigmes);
    //         FUNCTIONS.enigme_for_boss_under20(boss_game, current_enigme);
    
    //         if (boss_game.current_hp > 0) {
    //             console.log(`You couldn't kill the boss, ${boss_game.name } will kill your team >:}`);
    //             FUNCTIONS.destroy_all_team(INSTANCES.team_test);
    //         }
    // } else{

    //     console.log(`End of the game`);
    // }

}

game2();

/* Combat


le jeu se déroule en “tour” .

Durant chaque tour, chaque personnage effectuera une action à tour de rôle dans un ordre précis.

Le Guerrier tentera une attaque contre le boss.
Le Mage tentera une attaque contre le boss.
L'Archer tentera une attaque contre le boss.
Le boss tentera d'attaquer un héro toujours en vie (choisi aléatoirement).
le joueur pourra changer la posture de combat de chaque héros encore en vie a la fin de chaque tour.
 

Un héro ne peut pas faire d'action si il est mort (point de vie à 0)

Ceci se répète jusque à ce que :

tout les héros meurent (perdu)
ou que le boss meurt (gagner)
ou que les points de vie du boss soient en dessous de 20% (énigme pour les boss)
 

Énigmes pour les Boss

Quand un boss a 20% de points de vie, l'ordinateur posera une énigme parmi 3 possible (aléatoire).
Le joueur aura jusque à trois tentative pour répondre correctement.
Si il y parvient, le boss est vaincu et le joueur gagner la partie.
Dans le cas contraire, l'équipe des héros est décimée, le joueur a perdu.
 */ 

 

// ________________________________________________________________________________________________________________

 

// BONUS
 

// Jeu robuste 

// il faut que votre code puisse supporter les réponses inattendue de l'utilisateur.
 

// Attaque critique de l'archer 

// l'archer aura une chance sur quatre d'infliger une coup critique et de faire plus de dégâts (exemple: + 50% de dégâts)
 

// Faiblesse élémentaire du Mage

// Le Mage utilise désormais un sort élémentaire.
// le mage ainsi que les boss ont désormais un attribut élémentaire qui peut valoir soit:
// Feu
// Terre
// Eau
// L'attribut élémentaire est choisie aléatoirement pour les boss.
//  Et le joueur choisira l'attribut élémentaire du mage (durant la création des héros).
// Lorsque le mage attaque, il sera capable d'infliger plus de dégâts (+30%) si sont attribut élémentaire domine celui du boss.
// Le FEU domine la TERRE
// La TERRE domine l'EAU
// l'EAU domine le FEU
 

// Scénariser le jeu 

// Améliorez les messages dans la console et l'alert pour raconter l'histoire de manière dynamique.

// DOM, soyons fou…

// Certain l'ont fait avant vous. Oserez-vous le challenge ? (uniquement si vous avez valider le projet en avance)

// BON COURAGE ! 