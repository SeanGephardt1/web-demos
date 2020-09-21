let instance = null;

export default class Car2
{
    constructor(doors,engine,color)
    {
        if (instance === null)
        {
            this.doors = doors;
            this.engine = engine;
            this.color = color; 
            instance = this; 
        }
        else
        {
            return instance;
        }
    };
}