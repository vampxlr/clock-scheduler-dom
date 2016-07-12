import React , { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../redux/action'



class Root extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            pieObjects: [
                {
                    data_start:0,
                    data_value:360,
                    color:"red",
                    className:"pie big"
                }
            ],
            circle:[]
        };
        console.log(this.state)
    };


radiansToDegrees(rad) {
    return (rad / Math.PI)*180;
}

    pixelToDegree(x,y){
    var centerY=100;
    var centerX=100;

    var delY = y - centerY
    var delX = x - centerX
    console.log("delX: " + delX)
    console.log("delY: " + delY)
    var quadrant = 1;



    var gradient = delY/delX
    console.log("gradient: " + gradient)

        var radSlope = Math.atan(gradient)
   var degrees = this.radiansToDegrees(radSlope)



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



    renderPie(e) {
        console.log(e.nativeEvent)
    var cbs = this.state.circle;
        var pieObjects =this.state.pieObjects
    var classNames = "pie big"
    var data_start = 0;
    var data_value = 360;

        for(var key in pieObjects) {
            document.styleSheets[0].insertRule('.pie[data-start="'+ pieObjects[key].data_start+'"] { -moz-transform: rotate(' + pieObjects[key].data_start + 'deg); /* Firefox */ -ms-transform: rotate(' + pieObjects[key].data_start + 'deg); /* IE */ -webkit-transform: rotate(' + pieObjects[key].data_start + 'deg); /* Safari and Chrome */ -o-transform: rotate(' + pieObjects[key].data_start + 'deg); /* Opera */transform:rotate(' + pieObjects[key].data_start + 'deg);}', 0);
            document.styleSheets[0].insertRule('.pie[data-value="'+ pieObjects[key].data_value + '"]:BEFORE { -moz-transform: rotate(' + pieObjects[key].data_value + 'deg); /* Firefox */ -ms-transform: rotate(' + pieObjects[key].data_value + 'deg); /* IE */ -webkit-transform: rotate(' + pieObjects[key].data_value + 'deg); /* Safari and Chrome */ -o-transform: rotate(' + pieObjects[key].data_value + 'deg); /* Opera */transform:rotate(' + pieObjects[key].data_value + 'deg);}', 1);
            console.log(pieObjects[key])

            cbs.push(<div className={pieObjects[key].className} data-start={pieObjects[key].data_start} data-value={pieObjects[key].data_value}></div>);
            this.setState({circle: cbs});
        }
    }

    renderPieAngle(angle){
        var cbs = this.state.circle;
        var data_start = angle-30;
        var data_value = 60;
        document.styleSheets[0].insertRule('.pie[data-start="'+data_start+'"] { -moz-transform: rotate(' + data_start + 'deg); /* Firefox */ -ms-transform: rotate(' + data_start + 'deg); /* IE */ -webkit-transform: rotate(' + data_start + 'deg); /* Safari and Chrome */ -o-transform: rotate(' + data_start + 'deg); /* Opera */transform:rotate(' + data_start + 'deg);}', 0);
        document.styleSheets[0].insertRule('.pie[data-value="'+data_value + '"]:BEFORE { -moz-transform: rotate(' + data_value + 'deg); /* Firefox */ -ms-transform: rotate(' + data_value + 'deg); /* IE */ -webkit-transform: rotate(' + data_value + 'deg); /* Safari and Chrome */ -o-transform: rotate(' + data_value + 'deg); /* Opera */transform:rotate(' + data_value + 'deg);}', 1);
        cbs.push(<div className="pie" data-start={data_start} data-value={data_value}></div>);
        this.setState({circle: cbs});
    }

    initializeRender(){
        var objects =this.state.pieObjects
        for(var key in objects ) {
            console.log(objects[key])
            objects.push(<div className="pie big" data-start="0" data-value="360"></div>)

        }
    }
    componentDidMount(){

        var cbs = this.state.circle;
        var data_start = 0;
        var data_value = 360;
        document.styleSheets[0].insertRule('.pie[data-start="'+data_start+'"] { -moz-transform: rotate(' + data_start + 'deg); /* Firefox */ -ms-transform: rotate(' + data_start + 'deg); /* IE */ -webkit-transform: rotate(' + data_start + 'deg); /* Safari and Chrome */ -o-transform: rotate(' + data_start + 'deg); /* Opera */transform:rotate(' + data_start + 'deg);}', 0);
        document.styleSheets[0].insertRule('.pie[data-value="'+data_value + '"]:BEFORE { -moz-transform: rotate(' + data_value + 'deg); /* Firefox */ -ms-transform: rotate(' + data_value + 'deg); /* IE */ -webkit-transform: rotate(' + data_value + 'deg); /* Safari and Chrome */ -o-transform: rotate(' + data_value + 'deg); /* Opera */transform:rotate(' + data_value + 'deg);}', 1);
        cbs.push(<div className="pie big" data-start={data_start} data-value={data_value}></div>);
        this.setState({circle: cbs});
        this.renderPieAngle(180)
    }
    componentWillMount() {


    }
    componentDidUpdate(){

    }

    handleClick(e){
        var x = e.nativeEvent.offsetX;
        var y = e.nativeEvent.offsetY;
        console.log("x: " +x)
        console.log("y: " +y)
        console.log(this.pixelToDegree(x,y))
        this.renderPieAngle(this.pixelToDegree(x,y)+90)
    }


    render(){
        return(
            <div id="Root" >

            {this.state.circle}

            <div id="eventTracker" onClick={this.handleClick.bind(this)}>
            </div>
            </div>
        )
    }

}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch)
{
    return{
        actions: bindActionCreators(actions,dispatch)
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Root)