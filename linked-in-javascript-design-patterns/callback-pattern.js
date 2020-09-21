// callback pattern
const calc = () => {
    return "calc(): " + 4 * 4;
};

const printCalc = (callback) => {
    console.debug("printCalc()", callback());
};

export 
{
    calc,
    printCalc
};