import * as CLASSES from "./classes.js"

/** Créez trois boss : Sauron, Chronos, Lilith.*/

export let SAURON = new CLASSES.Boss("Sauron", 20, 120);
export let CHRONOS = new CLASSES.Boss("Chronos", 30, 100);
export let LILITH = new CLASSES.Boss("Lilith", 15, 150);

export let boss_list = [SAURON, CHRONOS, LILITH];

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

export let Postures = ["attack", "defense"];
export let WARRIOR = new CLASSES.Hero("warrior","",[],0);
export let MAGE = new CLASSES.Hero("mage","",[],0);
export let ARCHER = new CLASSES.Hero("archer","",[],0);

export let WARRIOR_test = new CLASSES.Hero("warrior test", "ariel warrior", [], 60, 40);
export let MAGE_test = new CLASSES.Hero("mage test","ariel mage",[],40,50 );
export let ARCHER_test = new CLASSES.Hero("archer test","ariel archer",[],50,30 );
export let team_test = [WARRIOR_test, MAGE_test, ARCHER_test];

export let max_hp = 150;
export let max_attack = 120;
export let team = [WARRIOR, MAGE, ARCHER];
//! DONE
/********************************************************************/
