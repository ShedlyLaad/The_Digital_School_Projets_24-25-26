const cells = document.querySelector(".cell");
const stattxt =  document.querySelector("#statusText");
const res = document.querySelector("#btn-rst");
const gaincondi = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],   
];
let options =["", "", "", "", "", "", "", "", ""];
let currentplayer ="X";
let runn = false;
function cellClick(){
    const cellInd = this.getAttribute("#cellIndex");
    if (options[cellInd] == "" || !runn)  return;
 updateCell(this, cellInd);
 changeplayer();
 checkwin();
 restartGame();
 }
intializing_game();
function intializing_game(){
cells.forEach(cell => cell.addEventListener("click", cellClick()));
res.addEventListener("click",restartGame());
stattxt.innerHTML =`${currentplayer}'s Turn Now!!`;
runn = true;

}
function updateCell(cells, index){
options[index] = currentplayer;
cells.innerHTML  = currentplayer;

}
console.log(updateCell());
function changeplayer(){
currentplayer = (currentplayer == "X") ? "O" : "X";
stattxt.innerHTML  = `${currentplayer}'s Turn Now`

}
console.log(changeplayer());
function checkwin(){
let roundW = false ;
for(let i = 0; i < gaincondi.length; i++)
{
const conditions = gaincondi[i];
const cellA = options[conditions[0]];     
const cellB = options[conditions[1]]; 
const cellC = options[conditions[2]];
if (cellA =="" || cellB == "" || cellC == "")continue; 
if (cellA == cellB && cellB == cellC){

    roundW = true;
    break;
}
}
if (roundW){
stattxt.textContent = `${currentplayer} wins! `
runn = false;
}
else if(!options.includes("")) { 
stattxt.innerHTML = `Draw`;
runn = false;  
}
else changeplayer();
}
console.log(checkwin());
function restartGame(){
currentplayer = "X"; 
let options =["", "", "", "", "", "", "", "", ""];
stattxt.textContent = `${currentplayer}'s Turn Now!!`
cells.forEach(cell => cell.textContent="");
runn=true;
}
console.log(restartGame());