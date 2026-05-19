const startBtn = document.getElementById("start-button");
document.addEventListener('DOMContentLoaded',()=>{
const words = ["java","html","shedly"];
let word; 
const attemps = 5 ;
let hiddenWord;
const wordContainer = document.getElementById("word-container");
const guessInput = document.getElementById("deviner");
const guessBtn = document.getElementById("start-button");
const nxtBtn = document.getElementById("next-button");
const attempsDisp = document.getElementById("attemps");
const message = document.getElementById("message");
function intializeGame(){
word = words[Math.floor(Math.random * (words.length))];
hiddenWord = "-".repeat(word.length);
wordContainer.textContent = hiddenWord;
attemps = 5;
attempsDisp.textContent=`Tentatives Restante:${attemps}`;
guessInput.value="";
message.textContent="";
guessInput.disabled=false;
guessBtn.disabled=false;
nxtBtn.disabled=true;
};
intializeGame();
document.addEventListener('keypress',function(e){
if(e.key==='Enter'){
    e.preventDefault();
    guessBtn.click();
}
else if (e.key==='Espace')
{
    e.preventDefault();
    nxtBtn.click();
}
const guess = guessInput.value.toLowerCase();
if(word.includes(guess)){
message.textContent = "";
for(let i=0; i<word.length; i++)
{
    if(word[i]===guess)
    {
        hiddenWord = hiddenWord.substring(0,i)+guess+hiddenWord.substring(i+1);
    }
}
};
wordContainer.textContent = hiddenWord;
if(hiddenWord===word)
{
    message.textContent="Vous Avez Deviner Le Mot";
    guessInput.disabled=true;
    guessBtn.disabled=true;
    nxtBtn.disabled=false;
}
else 
{
    attemps--;
    attempsDisp.textContent=`Tentatives Restante:${attemps}`;
    message.textContent =`Vous avez épuié toutes vos tentives.Le Mot était "${word}"`;
    guessInput.disabled=true;
    guessBtn.disabled=true; 
    nxtBtn.disabled=false;
}
guessBtn.value="";
});
nxtBtn.addEventListener('click',()=>{
    intializeGame();
});
});



