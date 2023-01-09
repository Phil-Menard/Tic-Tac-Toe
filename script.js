const gameBoard = (() => {
    const cases = document.querySelectorAll('.square');
    
    for (let i = 0; i < cases.length; i++)  {
        cases[i].addEventListener('click', function(){
            if (cases[i].textContent == '') {
                if (gameManager.xTurn)  {
                    cases[i].textContent = 'X';
                    gameManager.xTurn = false;
                    gameManager.oTurn = true;
                }
                else if (gameManager.oTurn) {
                    cases[i].textContent = 'O';
                    gameManager.xTurn = true;
                    gameManager.oTurn = false;
                }
            }
            
        })
    }

    return {};
})();

const gameManager = (() => {
    let xTurn = true;
    let oTurn = false;

    return {xTurn, oTurn};
})();

const Player = () => {

}

/*
le gamemanager va s'occuper de dire quel joueur doit jouer 
le joueur 1 affiche un 'X' quand il clique sur une case et passe son tour si cette dernière est vide
le joueur 2 affiche un 'O' quand il clique sur une case et passe son tour si cette dernière est vide
le gamemanager arrête la partie quand toutes les cases sont remplies, ou quand un joueur a aligné trois signes
*/