var words = [];
var wordlist = [];
var input, score, state, lives;
var starttime, totaltime;
const speed = 0.2;
const ratio = 0.01;

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
        word.move(speed + (score/200));
        if(word.isDead())
        {
            lives--;
            words.splice(index, 1);
        }
    }
    if(lives < 1)
    {
        totaltime = Math.floor((millis() - starttime) / 1000);
        state = 2;
        return;
    }

    if(Math.random() > (1 - ratio - (score/500000) ))
    {
        words.push(new Word(getRandomWord()));
    }    
    
    fill(0, 255, 0);
    textSize(20);
    let currentTime = Math.floor((millis() - starttime) / 1000);

    text(`Score: ${score}\nLives: ${lives}/10\nTime: ${currentTime} seconds`, 0, height-55);

    textSize(50);
    textAlign(CENTER);
    text(`> ${input}`, (width/2), height-10);
}

function checkInput()
{   
    if(state != 1)
    {
        words = [];
        score = 0;
        lives = 10;
        state = 1;
        starttime = millis();
        input = [];
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

function getRandomWord()
{
    index = Math.floor( Math.random() * wordlist.length );
    return wordlist[index];
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