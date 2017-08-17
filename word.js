class Word
{
    constructor(text)
    {
        this.x = 0
        this.text = text;
        this.y = Math.floor(Math.random() * (height - 100)) + 20;
    }

    show()
    {
        if(this.x < width/3)
        {
            fill(0, 255, 0);
        }
        else if(this.x < (2/3) * width)
        {
            fill(255, 255, 0);
        }
        else
        {
            fill(255, 0, 0);
        }
        textSize(20);
        text(this.text, this.x, this.y);
    }

    move(speed)
    {
        this.x += speed;
    }

    isDead()
    {
        if(this.x > width)
        {
            return true;
        }
        return false;
    }
}