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
      var styleSheetRef= this.state.styleSheetRef
        cbs=[]
        var data_start = 0;
        var data_value = 360;
        var lenght = styleSheetRef.length
        for(var i =0;i<lenght;i++){
            console.log("delete ref: ")
            console.log(i)
            document.styleSheets[0].deleteRule(styleSheetRef.pop().styleSheetRef)
        }
        console.log("styleSheetRef: ")
        console.log(styleSheetRef)
        console.log("document.styleSheets[0].cssRules")
        console.log(document.styleSheets[0].cssRules)
        console.log("document.styleSheets[0].cssRules.length")
        console.log(document.styleSheets[0].cssRules.length)

        cbs.push(<div key={0} className="pie big" data-start={data_start} data-value={data_value}></div>);

        for(var key in pieState) {
            var styleSheetRefObject = {
                objectId :pieState[key].id,
                styleSheetRef: document.styleSheets[0].cssRules.length
            }
            document.styleSheets[0].insertRule('.pie[data-key="' + (parseInt(key)+1) +'"]:BEFORE { background-color:'+pieState[key].color+' }', document.styleSheets[0].cssRules.length)

            styleSheetRef.push(styleSheetRefObject);


            styleSheetRefObject = {
                objectId :pieState[key].id,
                styleSheetRef: document.styleSheets[0].cssRules.length
            }
            document.styleSheets[0].insertRule('.pie[data-key="' + (parseInt(key)+1) +'"]:AFTER { background-color:'+pieState[key].color+' }', document.styleSheets[0].cssRules.length)

            styleSheetRef.push(styleSheetRefObject);


            if(pieState[key].angleValue>180){
                cbs.push(<div id={"pie big"+(parseInt(key)+1)} data-key={parseInt(key)+1} key={parseInt(key)+1} className={pieState[key].className} data-start={pieState[key].startingAngle} data-value={pieState[key].angleValue}></div>);

            } else {
                cbs.push(<div id={"pie"+(parseInt(key)+1)} data-key={parseInt(key)+1} key={parseInt(key)+1} className={pieState[key].className} data-start={pieState[key].startingAngle} data-value={pieState[key].angleValue}></div>);

            }
        }
        console.log("before setting circle")
        console.log(styleSheetRef)
        this.setState({styleSheetRef: styleSheetRef});
        this.setState({circle: cbs});
    }



    renderSelectiedPiesWithReduxSelectionState(pieStateMother){
        console.log("inside selection state")
        let pieState = [...pieStateMother]
        console.log(pieState)
        pieState.reverse()
        console.log(pieState)
        var cbs = this.state.circle;

        console.log("before for loop before setting empty array")
        console.log(cbs)
        var styleSheetRef= this.state.styleSheetRef
        cbs=[]
        var data_start = 0;
        var data_value = 360;

        console.log("styleSheetRef")
        console.log(styleSheetRef)
        for(var key in pieState){
            var styleSheetRefs = styleSheetRef.filter(function(v){
                return v.objectId == pieState[key].id
            })
            console.log("selection state index")
            console.log(styleSheetRefs.reverse()) // sort styleSheetRefs descending for deletion
            if(styleSheetRefs){
                for(var key in styleSheetRefs){
                    document.styleSheets[0].deleteRule(styleSheetRefs[key].styleSheetRef)
                    console.log("deleting stylesheet ref")
                    console.log(styleSheetRefs[key].styleSheetRef)

                }
            }

        }

        /*console.log("styleSheetRef: ")
        console.log(styleSheetRef)
        console.log("document.styleSheets[0].cssRules")
        console.log(document.styleSheets[0].cssRules)
        console.log("document.styleSheets[0].cssRules.length")
        console.log(document.styleSheets[0].cssRules.length)

        cbs.push(<div key={0} className="pie big" data-start={data_start} data-value={data_value}></div>);

        for(var key in pieState) {
            var styleSheetRefObject = {
                objectId :pieState[key].id,
                styleSheetRef: document.styleSheets[0].cssRules.length
            }
            document.styleSheets[0].insertRule('.pie[data-key="' + (parseInt(key)+1) +'"]:BEFORE { background-color:'+pieState[key].color+' }', document.styleSheets[0].cssRules.length)

            styleSheetRef.push(styleSheetRefObject);


            styleSheetRefObject = {
                objectId :pieState[key].id,
                styleSheetRef: document.styleSheets[0].cssRules.length
            }
            document.styleSheets[0].insertRule('.pie[data-key="' + (parseInt(key)+1) +'"]:AFTER { background-color:'+pieState[key].color+' }', document.styleSheets[0].cssRules.length)

            styleSheetRef.push(styleSheetRefObject);


            if(pieState[key].angleValue>180){
                cbs.push(<div id={"pie big"+(parseInt(key)+1)} data-key={parseInt(key)+1} key={parseInt(key)+1} className={pieState[key].className} data-start={pieState[key].startingAngle} data-value={pieState[key].angleValue}></div>);

            } else {
                cbs.push(<div id={"pie"+(parseInt(key)+1)} data-key={parseInt(key)+1} key={parseInt(key)+1} className={pieState[key].className} data-start={pieState[key].startingAngle} data-value={pieState[key].angleValue}></div>);

            }
        }
        console.log("before setting circle")
        console.log(styleSheetRef)
        this.setState({styleSheetRef: styleSheetRef});
        this.setState({circle: cbs});*/
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
            //console.log(this.props.actions.selection_local_selectPieObjectById(10))

            this.renderPieWithReduxPieState(this.props.pieState)
            console.log(this.props.pieState)

        }, 10);

        setTimeout(()=>{
            //console.log(this.props.actions.selection_local_selectPieObjectById(10))

            console.log(this.props.actions.selection_local_selectPieObjectByAngle(30))
            console.log(this.props.actions.selection_local_updateSelectedPiesAngleByAngle(0))
            this.renderSelectiedPiesWithReduxSelectionState(this.props.selectionState)

        }, 1000);
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

        if(this.counter==1)
        {
            alert(Math.round(pixelToDegree(x,y)))
            this.props.actions.pie_local_getPieObjectById(0)
        }

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