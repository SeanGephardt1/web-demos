//  Format a small integer to text
function FormatNumbersToString( value )
{
    if ( typeof value !== "number" )
    {
        return "NaN";
    }

    var _rv = undefined;
    switch ( value )
    {
        case 0: { _rv = "Zero"; break; }
        case 1: { _rv = "One"; break; }
        case 2: { _rv = "Two"; break; }
        case 3: { _rv = "Three"; break; }
        case 4: { _rv = "Four"; break; }
        case 5: { _rv = "Five"; break; }
        case 6: { _rv = "Six"; break; }
        case 7: { _rv = "Seven"; break; }
        case 8: { _rv = "Eight"; break; }
        case 9: { _rv = "Nine"; break; }
        default: { _rv = value; break; }
    }
    return _rv;
};