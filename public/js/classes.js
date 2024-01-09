
/* Création des Boss
(à l'aide d'une classe ou d'un objet)

Créez trois boss : Sauron, Chronos, Lilith.
Chaque boss a un nom, des points d'attaque ainsi que des points de vie 
les points d'attaques représente le nombre de dégâts  qu'il infligera aux point de vie d'un héro à chaque attaque. 
les points de vie représente la santé du boss. si elle tombe à 0, le boss meurt. Pour rappel le but du jeu est de réduire ces point de vie à 0.
Les points d'attaque et les points de vie de chaque Boss sont différents et a votre bon vouloir.
 */ 

export class Boss {

    /**     Create a object Boss
     * 
     * @param {*} name          : name of Boss
     * @param {*} attack_power  : point of attack Boss
     * @param {*} healt_point   : health point of Boss
     */
    constructor ( name, attack_power, health_point, current_hp){
        this.name = name;
        this.attack_power = attack_power;
        this.health_point = health_point;
        this.current_hp = current_hp;

        this.attack_to = function(character) {
            console.log(`--------------------- ${this.name} ---------------------`);
            console.log(`${this.name} has ${this.attack_power} of power attack and will attack !\n Be carefull with your ${character.name} (${character.id_name}) he only has ${character.health_point} hp `);

            character.health_point -= this.attack_power;
            console.log(`Your ${character.name} (${character.id_name}) has now ${character.health_point} hp remains :/`);
            console.log(`---------------------------------------------------`);

        }
        
    }

}

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

export class Hero extends Boss{
    constructor (id_name, name,attack_position ,attack_power, speciality ,health_point){

        super(name, attack_power, health_point);
        this.id_name = id_name;
        this.attack_position = attack_position;
        this.speciality = speciality;

        this.attack = function(current_boss) {

            console.log(`${this.name} has ${this.attack_power} of attack power and will attack ${current_boss.name} :-}!`);
            current_boss.current_hp -= this.attack_power;
            console.log(`${current_boss.name} has now ${current_boss.current_hp} hp remains :} mouahaha mouahaha`);
        }

        this.is_defense_mode = function() {
            console.log(`${this.name} the ${this.id_name} is on mode ${this.attack_position} :@`);
            
        }
    }
}

//! DONE
/********************************************************************/


// export class Patient {
//     /**     Create a object Patient
//      * 
//      * @param {*} name : name of patient
//      * @param {*} illness : illness of patient
//      * @param {*} money : money of patient
//      * @param {*} pocket : pocket of patient
//      * @param {*} health : health of patient
//      * @param {*} patient_diagnostic : diagnostic of patient
//      */
//         constructor(name, illness, money, pocket, health, localisation, patient_diagnostic){
//             this.name = name;
//             this.illness = illness;
//             this.money = money;
//             this.pocket = pocket;
//             this.health = health;
//             this.localisation = localisation;
//             this.patient_diagnostic = patient_diagnostic;
    
//             /** move patient to place , adding place's name in localisation
//              * @param {*} place : place to move to
//              */
//             this.moveTo = function(place) {
//                 this.localisation.push(place.name);
//                 place.people.push(this.name);
//             }
//             this.payerArticle = function(article) {
//                 this.argent -= article.price;
//             }
//         }
//     }