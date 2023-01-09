const gameboard = (() => {
    const cases = document.querySelectorAll('.square');
    
    for (let i = 0; i < cases.length; i++)  {
        cases[i].addEventListener('click', function(){
            cases[i].textContent = 'X';
        })
    }

    const printCases = function(){for (let i = 0; i < cases.length; i++)  {
        (i % 2 == 0) ? cases[i].textContent = "X" : cases[i].textContent = "O";
    }} 

    return {printCases};
})();

const gamemanager = (() => {
    let xTurn = true;
    let yTurn = false;
})();

const Player = () => {

}

/*
le gamemanager va s'occuper de dire quel joueur doit jouer 
le joueur 1 affiche un 'X' quand il clique sur une case et passe son tour si cette dernière est vide
le joueur 2 affiche un 'O' quand il clique sur une case et passe son tour si cette dernière est vide
le gamemanager arrête la partie quand toutes les cases sont remplies, ou quand un joueur a aligné trois signes
*/