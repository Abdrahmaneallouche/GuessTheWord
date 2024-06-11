
//words
let word=''
const words={
  Footballer:['Messi','Cristiano','Zidane','Maradona','pele','nedved','cruyff','mbappe','neymar','haaland','slimani',"Hazard"],
  fruits:['banana','orange','kiwi','apple','melon','cherry','grapes','lemon','mango','peach','plum'],
  cars:['audi','bmw','ferrari','mercedes','ford','toyota','volvo' ,"Ford","Honda","Jeep","Mazda","Fiat","Porsche"],
  hero:['batman','cyborg','robin','wanda','flash',"Thor","Hulk","Vision","Drax","Loki", "Rocket"],
  emotions:['angry','sad','silly','hopeful','wonder','hate','happy','curios',"Shame","Pride","Guilt","Love","Hope","Faith"],
  personality:[ "Polite","Gentle","Smart","Loyal","Brisk","Warm","Charm","Cheer","Sweet","Humble","Funny",],
  animals:["Bird","Horse","Mouse","Rabbit","Sheep","Goose","Panda","Tiger","Zebra","Llama","Lemur","Koala","Giraf","Eagle"],
  fish:['shark','orca','piranha','whale','lobster','squid',"Salmon",,'tuna','crab','octopus'],
  country:[ "China","India","Japan","Spain","Brazil","Italy","Egypt","Mexico", "Poland", "Canada","Norway",],
}

const keys=Object.keys(words)
const randomKey=keys[Math.floor(Math.random()*keys.length)]
const value=words[randomKey]
word=value[Math.floor(Math.random()*value.length)].toLowerCase()

const lostSound=document.querySelector('#lostSound')
const winSound= document.querySelector('#winSound')
//words 
document.querySelector('.category').innerHTML=randomKey
let letter= Array.from(word) 
 
 
let numberOfTries=6 
 
let numberOfLetters= letter.length 
let currentTry=1 
let numberOfHints=3 
const guessBtn=document.querySelector('.check') 
const win=document.querySelector('.win') 
const lose=document.querySelector('.lose') 
const stars=document.querySelector('.stars') 
const playAgain=document.querySelectorAll('.playAgain') 
 
document.querySelector('.hint span').innerHTML=numberOfHints 
const hintButton=document.querySelector('.hint') 
hintButton.addEventListener('click',getHint) 
 
function generateInputs(){ 

const inputsContainer=document.querySelector('.inputs') 
for(let i =1;i<=numberOfTries;i++){ 
  const tryDiv=document.createElement('div') 
  tryDiv.classList.add(`try${i}`) 
  tryDiv.innerHTML=`<span>try-${i}</span>` 
  if(i!==1)tryDiv.classList.add('disabled-inputs') 
for(let j=1;j<=numberOfLetters;j++){ 
  const input=document.createElement('input') 
  input.type='text' 
  input.id=`guess${i}-letter${j}` 
  input.setAttribute('maxlength','1') 
tryDiv.appendChild(input) 
} 
inputsContainer.appendChild(tryDiv) 
 
 
   
} 
inputsContainer.children[0].children[1].focus() 
 
//DISABLED INPUT 
const disabledInputs=document.querySelectorAll('.disabled-inputs  input') 
disabledInputs.forEach(input=>{ 
  input.disabled= true 
 
}) 
 
const inputs=document.querySelectorAll('input') 
inputs.forEach((input,index)=>{ 
  input.addEventListener('input',function(){ 
    this.value=this.value.toUpperCase() 
    const nextInput=inputs[index+1] 
    if(nextInput) nextInput.focus() 
  }) 
  
  input.addEventListener('keydown',function(event){ 
    const currentIndex=Array.from(inputs).indexOf(event.target) 
   
     
    if(event.key==='ArrowRight'){ 
      const nextInput=currentIndex +1 
    
    if(nextInput<inputs.length) inputs[nextInput].focus() 
    } 
    if(event.key==='ArrowLeft'){ 
      const previousInput=currentIndex -1 
    
    if(previousInput>=0) inputs[previousInput].focus() 
    } 
 
  }) 
}) 
 
} 
guessBtn.addEventListener('click',handleGuess) 

function handleGuess(){
  let success=true
  for(let i =1;i<=numberOfLetters;i++){
    const inputField=document.querySelector(`#guess${currentTry}-letter${i}`)
    const letter=inputField.value.toLowerCase()
    const realLetter=word[i-1]
   
    if(letter===realLetter){
      inputField.classList.add('yes')
    }else if(word.includes(letter) && letter!==''){
      inputField.classList.add('maybe')
      success=false
  }   else{
      inputField.classList.add('no')
       success=false
     }
  }
  
  if(success){
  winSound.play()
   let allTries=document.querySelectorAll('.inputs  div')
   allTries.forEach((div)=>{div.classList.add('disabled-inputs')})
   guessBtn.disabled=true
   win.classList.add('open')
   if(numberOfHints===3){
    document.querySelector('.noHint').innerHTML='Your Genius'
   }
   hintButton.disabled=true
    }
  
   else{
    document.querySelector(`.try${currentTry}`).classList.add('disabled-inputs')
    const disabledInp=document.querySelectorAll(`.try${currentTry} input`)
    disabledInp.forEach(input=>{input.disabled=true})
   currentTry++
  
  
   const notDisInputs=document.querySelectorAll(`.try${currentTry} input`)
   notDisInputs.forEach(input=>{input.disabled=false})
  let el= document.querySelector(`.try${currentTry}`)
  if(el){
    document.querySelector(`.try${currentTry}`).classList.remove('disabled-inputs')
  el.children[1].focus()
  if(currentTry>2 && currentTry<=4){
    
    stars.children[2].style.color='black'
  }
  if(currentTry>4){
    stars.children[1].style.color='black'
    stars.children[2].style.color='black'
  }
  }
   if(currentTry>numberOfTries){
    lose.classList.add('open')
    guessBtn.disabled=true
    hintButton.disabled=true
    document.querySelector('.wordLose').innerHTML=word
    lostSound.play()
   }
   
  }
   }
   function getHint() { 
    if (numberOfHints > 0) { 
      numberOfHints--; 
      document.querySelector('.hint span').innerHTML = numberOfHints; 
    } 
     
    if (numberOfHints === 0) { 
      document.querySelector('.hint').innerHTML = 'no hint'; 
      hintButton.disabled = true; 
    } 
     
    const enabledInputs = document.querySelectorAll('input:not([disabled])'); 
    const emptyEnabledInputs = Array.from(enabledInputs).filter(input => input.value === ''); 
   
    if (emptyEnabledInputs.length > 0) { 
      const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length); 
      const randomInput = emptyEnabledInputs[randomIndex]; 
      const indexToFill = Array.from(enabledInputs).indexOf(randomInput); 
   
   
      if (indexToFill !== -1) { 
        randomInput.value = word[indexToFill].toUpperCase(); 
     
      } 
       
    } 
    
  } 
  
  window.onload=function(){
    generateInputs()
  }
  
 
  function restartGame() {
    // Reset tries and hints
    currentTry = 1;
    numberOfHints = 3;
  
    const keys=Object.keys(words)
    const randomKey=keys[Math.floor(Math.random()*keys.length)]
    const value=words[randomKey]
    word=value[Math.floor(Math.random()*value.length)].toLowerCase()
    document.querySelector('.category').innerHTML = randomKey;
    let letter= Array.from(word) 
    numberOfLetters = letter.length;
  
    // Clear previous inputs
    const inputsContainer = document.querySelector('.inputs');
    inputsContainer.innerHTML = '';
  
    // Re-enable buttons and reset hint count display
    guessBtn.disabled = false;
    hintButton.disabled = false;
  
    // Check and update hint elements
    const hintSpan = document.querySelector('.hint span');
    const hintElement = document.querySelector('.hint');
  
    if (hintSpan) {
      hintSpan.innerHTML = numberOfHints;
    } else {
      console.error('Hint span element not found');
    }
  
    if (hintElement) {
      hintElement.innerHTML = `hint (<span>${numberOfHints}</span>)`;
    } else {
      console.error('Hint element not found');
    }
  
    // Reset stars' colors
    if (stars.children[1]) stars.children[1].style.color = '';
    if (stars.children[2]) stars.children[2].style.color = '';
  
    // Generate new inputs
    generateInputs();
  
    // Refocus the first input
    const firstInput = document.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  
  }
 playAgain.forEach(btn=>{
    btn.addEventListener('click',()=>{
    win.classList.remove('open')
    lose.classList.remove('open')
    lostSound.currentTime = 0;
    winSound.currentTime = 0;
    lostSound.pause()
    winSound.pause()
    restartGame()
  })
  })
   
  function handleBackSpace(event){
    if(event.key==='Backspace'){
      const inputs=document.querySelectorAll('input:not([disabled])')
      const cursorPosition=Array.from(inputs).indexOf(document.activeElement)
     const currentInput=inputs[cursorPosition]
     const prevInput=inputs[cursorPosition -1]
   
     if(cursorPosition>0){
    currentInput.value=''
     prevInput.value=''
     prevInput.focus()
     }
    }
  }

  document.addEventListener('keydown',handleBackSpace)
  
  
  
  
  
  
  