
export class Automobile
{
    constructor(doors,engine,color)
    {
        this.doors = doors;
        this.engine = engine;
        this.color = color; 
    };
}

export class carFactory{
    createCar(type)
    {
        switch(type)
        {
            case 'civic': return new Automobile(4, "v4", "black");

            case 'honda': return new Automobile(2, "v4", "red");

        };
    };
};