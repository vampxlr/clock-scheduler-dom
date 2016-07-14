

exports.radiansToDegrees=function(rad) {
    return (rad / Math.PI)*180;
}
exports.pixelToDegree=function(x,y,centerY=100,centerX=100){

    var delY = y - centerY
    var delX = x - centerX
    console.log("delX: " + delX)
    console.log("delY: " + delY)
    var quadrant = 1;



    var gradient = delY/delX
    console.log("gradient: " + gradient)

    var radSlope = Math.atan(gradient)
    var degrees = exports.radiansToDegrees(radSlope) + 90



    if(delY>0 && delX>0)
    {
        quadrant = 1
        console.log("degrees: " + degrees)
        console.log("quadrant: " + quadrant)
        return degrees
    }

    if(delY>=0 && delX<0)
    {
        quadrant = 2
        console.log("degrees: " + degrees + 180)
        console.log("quadrant: " + quadrant)
        return degrees + 180

    }
    if(delY<0 && delX<0)
    {
        quadrant = 3
        console.log("degrees: " + degrees + 180)
        console.log("quadrant: " + quadrant)
        return degrees + 180

    }
    if(delY<0 && delX>0)
    {
        quadrant = 4
        console.log("degrees: " + degrees)
        console.log("quadrant: " + quadrant)
        return degrees
    }
    console.log("degrees: " + degrees)
    console.log("quadrant: " + quadrant)

    return degrees

}

