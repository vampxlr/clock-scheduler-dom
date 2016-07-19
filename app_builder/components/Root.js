import React , { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../redux/action'
import {radiansToDegrees,pixelToDegree} from '../utils/pieGeometry'


function randomColor(){
    var allowed = "ABCDEF0123456789", S = "#";

    while(S.length < 7){
        S += allowed.charAt(Math.floor((Math.random()*16)+1));
    }
    return S;
}

class Root extends Component {



    constructor(props, context) {
        super(props, context);
        this.counter=0;
        this.state = {
            circle:[],
            styleSheetRef:[]
        };
    };

    initializeCircle(){
        var cbs = this.state.circle;
        var data_start = 0;
        var data_value = 360;
        document.styleSheets[0].insertRule('.pie[data-start="'+data_start+'"] { -moz-transform: rotate(' + data_start + 'deg); /* Firefox */ -ms-transform: rotate(' + data_start + 'deg); /* IE */ -webkit-transform: rotate(' + data_start + 'deg); /* Safari and Chrome */ -o-transform: rotate(' + data_start + 'deg); /* Opera */transform:rotate(' + data_start + 'deg);}', 0);
        document.styleSheets[0].insertRule('.pie[data-value="'+data_value + '"]:BEFORE { -moz-transform: rotate(' + data_value + 'deg); /* Firefox */ -ms-transform: rotate(' + data_value + 'deg); /* IE */ -webkit-transform: rotate(' + data_value + 'deg); /* Safari and Chrome */ -o-transform: rotate(' + data_value + 'deg); /* Opera */transform:rotate(' + data_value + 'deg);}', 1);
        cbs.push(<div  key={0} className="pie big" data-start={data_start} data-value={data_value}></div>);
        this.setState({circle: cbs});
    }

    renderPieWithReduxPieState(pieStateMother){
        let pieState = [...pieStateMother]
        console.log(pieState)
        pieState.reverse()
        console.log(pieState)
        var cbs = this.state.circle;

        console.log("before for loop before setting empty array")
        console.log(cbs)

        cbs=[]
        var data_start = 0;
        var data_value = 360;
        cbs.push(<div key={0} className="pie big" data-start={data_start} data-value={data_value}></div>);
        console.log("before for loop after setting empty array")
        console.log(cbs)
        for(var key in pieState) {
            document.styleSheets[0].insertRule('.pie[data-key="' + (parseInt(key)+1) +'"]:BEFORE { background-color:'+pieState[key].color+' }', document.styleSheets[0].cssRules.length);

            cbs.push(<div id={"pie"+parseInt(key)+1} data-key={parseInt(key)+1} key={parseInt(key)+1} className={pieState[key].className} data-start={pieState[key].startingAngle} data-value={pieState[key].angleValue}></div>);

        }
        console.log("before setting circle")
        console.log(cbs)
        this.setState({circle: cbs});
    }


    renderLastPieWithReduxPieState(pieState){
        var cbs = this.state.circle;

      var key = 0;



        document.styleSheets[0].insertRule('.pie[data-start="'+ pieState[key].startingAngle+'"] { -moz-transform: rotate(' + pieState[key].startingAngle + 'deg); /* Firefox */ -ms-transform: rotate(' + pieState[key].startingAngle + 'deg); /* IE */ -webkit-transform: rotate(' + pieState[key].startingAngle + 'deg); /* Safari and Chrome */ -o-transform: rotate(' + pieState[key].startingAngle + 'deg); /* Opera */transform:rotate(' + pieState[key].startingAngle + 'deg);}', 0);
            document.styleSheets[0].insertRule('.pie[data-value="'+ pieState[key].angleValue + '"]:BEFORE { -moz-transform: rotate(' + pieState[key].angleValue + 'deg); /* Firefox */ -ms-transform: rotate(' + pieState[key].angleValue + 'deg); /* IE */ -webkit-transform: rotate(' + pieState[key].angleValue + 'deg); /* Safari and Chrome */ -o-transform: rotate(' + pieState[key].angleValue + 'deg); /* Opera */transform:rotate(' + pieState[key].angleValue + 'deg);}', 1);

            cbs.push(<div key={pieState.length} className={pieState[key].className} data-start={pieState[key].startingAngle} data-value={pieState[key].angleValue}></div>);
            this.setState({circle: cbs});


    }

    addPieToReduxStateWithAngle(startingAngle,angleValue){
        this.props.actions.pie_local_addPieToState(startingAngle-(angleValue/2),angleValue,randomColor(),"pie","AM")

    }

    componentDidMount(){

        //this.initializeCircle()
        setTimeout(()=>{

            this.renderPieWithReduxPieState(this.props.pieState)
            console.log(this.props.pieState)

        }, 10);
 }
    componentWillMount() {
        this.props.actions.pie_local_getPieState()

    }
    componentDidUpdate(){

    }
    handleClick(e){
        var x = e.nativeEvent.offsetX;
        var y = e.nativeEvent.offsetY;

     this.addPieToReduxStateWithAngle(Math.round(pixelToDegree(x,y)),30)
        setTimeout(()=>{

            this.renderPieWithReduxPieState(this.props.pieState)

        }, 10);

    }

    handleDragEnd(){
        this.counter = 0;
    }

    handleDrag(e){
        this.counter++
        var x = e.nativeEvent.offsetX;
        var y = e.nativeEvent.offsetY;
        console.log("x: "+x)
        console.log("y: "+y)
        console.log("counter: "+this.counter)
        console.log(e.nativeEvent)

    }

    handleDeleteAll(){
        this.props.actions.pie_local_deleteAllPieFromState();
        setTimeout(()=>{

            this.renderPieWithReduxPieState(this.props.pieState)
            console.log(this.props.pieState)

        }, 10);

    }
    render(){
        return(
            <div id="Root" >

            {this.state.circle}

                <div id="eventTracker" onClick={this.handleClick.bind(this)} onDrag={this.handleDrag.bind(this)} onDragEnd= {this.handleDragEnd.bind(this)} >
                </div>
                <button id="delete_all_btn" onClick={this.handleDeleteAll.bind(this)}>Delete All</button>
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