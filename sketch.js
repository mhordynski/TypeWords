var words, wordlist;
var input, score, state, lives;
var starttime, totaltime;
const speed = 0.2;
const ratio = 0.01;

const getRandomWord = () => wordlist[Math.floor( Math.random() * wordlist.length)];
const getGameTime = () => Math.floor((millis() - starttime) / 1000);

const calculateSpeed = () => speed + (score/200);
const calculateRatio = () => 1 - ratio - (score * 0.0001);

function preload()
{
    wordlist = loadStrings('words/english.txt');    
}

function setup()
{
    createCanvas(windowWidth, windowHeight);
    state = 0;
}

function draw()
{
    background(51);
    switch(state)
    {
        case 0:
            showMenu();
            break;
        case 1:
            gameLoop();
            break;
        case 2:
            showResults();
            break;
    }
}

function gameLoop()
{
    for(let [index, word] of words.entries())
    {
        word.show();
        word.move(calculateSpeed());
        if(word.isDead())
        {
            lives--;
            words.splice(index, 1);
        }
    }
    if(lives < 1)
    {
        endGame();
        return;
    }

    if(Math.random() > calculateRatio())
    {
        words.push(new Word(getRandomWord()));
    }    
    
    fill(0, 255, 0);
    textSize(20);
    text(`Score: ${score}\nLives: ${lives}/10\nTime: ${getGameTime()} seconds`, 0, height-55);

    textSize(50);
    textAlign(CENTER);
    text(`> ${input}`, (width/2), height-10);
}

function checkInput()
{   
    if(state != 1)
    {
        startGame();
    }
    for(let [index, word] of words.entries())
    {
        if(input.trim() == word.text)
        {
            score += word.text.length
            words.splice(index, 1);
        }
    }
    input = [];
}

function showMenu()
{
    fill(0, 255, 0)
    textSize(80);
    textAlign(CENTER);
    text('PRESS ENTER TO START', width/2, height/2);
}

function showResults()
{
    fill(0, 255, 0)
    textSize(80);
    textAlign(CENTER);
    text(`GAMEOVER\nSCORE: ${score}\nTIME: ${totaltime} seconds`, width/2, height/2);
}

function startGame()
{
    words = [];
    score = 0;
    lives = 10;
    state = 1;
    starttime = millis();
    input = [];
}

function endGame()
{
    totaltime = getGameTime();
    state = 2;
}

function keyTyped()
{
    input += key;
}

function keyPressed()
{
    if(keyCode === ENTER)
    {
        checkInput();
    }
    if(keyCode === BACKSPACE)
    {
        input = input.slice(0, -1);
    }
}
