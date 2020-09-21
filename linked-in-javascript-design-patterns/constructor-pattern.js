import Car from './class-pattern.js';

export class SUV extends Car
{
    constructor(doors,engine,color)
    {
        super(doors,engine,color);
       
        this.wheels = 4;
    };
}

export class Hummer extends SUV
{
    constructor(doors,engine,color)
    {
        super(doors,engine,color);
       
        this.wheels = 4;
        this.guns = true;
    };
}