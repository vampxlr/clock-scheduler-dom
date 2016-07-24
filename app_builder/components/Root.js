import React , { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../redux/action'
import {radiansToDegrees,pixelToDegree} from '../utils/pieGeometry'


Array.prototype.subtractArrayById = function(pieStateSelected) {
    let pieStateAllExceptSelected = this;
    for(var key in pieStateSelected){

        pieStateAllExceptSelected = pieStateAllExceptSelected.filter(function(v){
            return v.id != pieStateSelected[key].id
        })

    }
    return pieStateAllExceptSelected


};

function randomColor(){
    var allowed = "ABCDEF0123456789", S = "#";

    while(S.length < 7){
        S += allowed.charAt(Math.floor((Math.random()*16)+1));
    }
    return S;
}



class Root extends Component {

    deleteAllAddedStylesheetRef(){
        var styleSheetRef= this.state.styleSheetRef

        var length = styleSheetRef.length
        for(var i =0;i<length;i++){
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
        this.setState({styleSheetRef: styleSheetRef});

    }

    addVisualPiesByPieState(pieState,addToExisting=false,pieColor=false){
        pieState.reverse()
        var styleSheetRef= this.state.styleSheetRef
        var cbs = [...this.state.circle];

        if(true){
            console.log("not addToExisting")
            console.log("cbs inside not addToExisting")
            console.log(cbs)

            cbs= []
            cbs.push(<div key={0} className="pie big" data-start={0} data-value={360}></div>);
            this.setState({circle: [...cbs]});
            console.log("cbs inside addToExisting after insertion of big pie")
            console.log(cbs)

        }

    console.log("cbs before pieState adding")
    console.log(cbs)
        for(var key in pieState) {

            if (pieState.hasOwnProperty(key)) {
                console.log("inside pie State loop")
                console.log(pieState)
                console.log(key)
                var styleSheetRefObject = {
                    objectId :pieState[key].id,
                    styleSheetRef: document.styleSheets[0].cssRules.length
                }

                if(pieColor==false){
                    document.styleSheets[0].insertRule('.pie[data-key="' + (parseInt(pieState[key].id)+1) +'"]:BEFORE { background-color:'+ pieState[key].color+' }', document.styleSheets[0].cssRules.length)

                }else
                {
                    document.styleSheets[0].insertRule('.pie[data-key="' + (parseInt(pieState[key].id)+1) +'"]:BEFORE { background-color:'+ pieColor+' }', document.styleSheets[0].cssRules.length)

                }

                styleSheetRef.push(styleSheetRefObject);


                styleSheetRefObject = {
                    objectId :pieState[key].id,
                    styleSheetRef: document.styleSheets[0].cssRules.length
                }

                if(pieColor==false){
                    document.styleSheets[0].insertRule('.pie[data-key="' + (parseInt(pieState[key].id)+1) +'"]:AFTER { background-color:'+ pieState[key].color+' }', document.styleSheets[0].cssRules.length)

                }else
                {
                    document.styleSheets[0].insertRule('.pie[data-key="' + (parseInt(pieState[key].id)+1) +'"]:AFTER { background-color:'+ pieColor+' }', document.styleSheets[0].cssRules.length)

                }

                styleSheetRef.push(styleSheetRefObject);


                if(pieState[key].angleValue>180){
                    cbs.push(<div id={"pie big"+(parseInt(pieState[key].id)+1)} data-key={parseInt(pieState[key].id)+1} key={parseInt(pieState[key].id)+1} className={pieState[key].className} data-start={pieState[key].startingAngle} data-value={pieState[key].angleValue}></div>);

                } else {
                    cbs.push(<div id={"pie"+(parseInt(pieState[key].id)+1)} data-key={parseInt(pieState[key].id)+1} key={parseInt(pieState[key].id)+1} className={pieState[key].className} data-start={pieState[key].startingAngle} data-value={pieState[key].angleValue}></div>);

                }
            }


        }
       /* var array_of_key = []
        var location_of_conflict=[]
        for(var key_cbs in cbs){
            if (pieState.hasOwnProperty(key)) {
                console.log("cbs loop************************************")
                console.log("key_cbs")
                console.log(key_cbs)
                console.log("cbs[key_cbs]")
                console.log(cbs[key_cbs])
                for (var key_array in array_of_key) {
                    if (pieState.hasOwnProperty(key)) {
                        console.log("array_of_key loop!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                        console.log("key_array")
                        console.log(key_array)
                        console.log("array_of_key[key_array]")
                        console.log(array_of_key[key_array])
                        console.log(array_of_key[key_array].key + " ----- " + cbs[key_cbs].key)
                        if (array_of_key[key_array].key == cbs[key_cbs].key) {
                            console.log("__________________****************________________________")
                            console.log(key_cbs)
                            location_of_conflict.push(key_cbs)
                        }
                    }

                }
                array_of_key.push(cbs[key_cbs])
            }

        }

        console.log("before setting circle stylesheetRef")
        console.log(styleSheetRef)
        console.log("before setting circle CBS")
        console.log([...cbs])
*/
        this.setState({styleSheetRef: styleSheetRef});
        this.setState({circle: [...cbs]});

    }

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
        let pieState = pieStateMother
        this.deleteAllAddedStylesheetRef()

        this.addVisualPiesByPieState(pieState)

    }



    renderSelectedPiesWithReduxSelectionState(pieStateAllMother,pieStateSelectedMother){
        console.log("inside selection state")
        let pieStateAll = [...pieStateAllMother]
        let pieStateAllExceptSelected = [...pieStateAllMother] // still contains all
        let pieStateSelected = [...pieStateSelectedMother]

        pieStateAllExceptSelected=  pieStateAllExceptSelected.subtractArrayById(pieStateSelected)

        console.log("pieStateAllExceptSelected")
        console.log(pieStateAllExceptSelected)
        this.deleteAllAddedStylesheetRef()
        this.addVisualPiesByPieState(pieStateAllExceptSelected)
        this.addVisualPiesByPieState(pieStateSelected,true,"white")






        /*console.log("pieStateSelected")
        //pieState.reverse()
        console.log(pieStateSelected)
        var cbs = this.state.circle;
        let pie
        console.log("before for loop before setting empty array")
        console.log(cbs)
        var styleSheetRef= this.state.styleSheetRef
        cbs=[]
        var data_start = 0;
        var data_value = 360;

        console.log("styleSheetRef")
        console.log(styleSheetRef)
        for(var key in pieStateSelected){
            console.log("pieState Selected KEY")
            console.log(key)
            console.log("pieStateSelected[key]")
            console.log(pieStateSelected[key])
            pieStateAllExceptSelected = pieStateAllExceptSelected.filter(function(v){
                return v.id != pieStateSelected[key].id
            })
            console.log("pieStateAllExceptSelected")
            console.log(pieStateAllExceptSelected)




        }

        console.log("all pie states")
        console.log(pieStateAllMother)
        console.log("except selected pie states")
        console.log(pieStateAllExceptSelected)
        //console.log(pieStateAllMother.subtractArrayById(pieStateSelectedMother))*/


    }


    renderSelectedPiesWithReduxSelectionStateSecond(pieStateSelectedMother){

        for(var key in pieStateSelectedMother){
            if (pieStateSelectedMother.hasOwnProperty(key)) {
                var id = pieStateSelectedMother[key].id + 1
                var angle = pieStateSelectedMother[key].startingAngle
                document.getElementById("pie" + id).setAttribute("data-start", angle);
            }
        }
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

           /* console.log(this.props.actions.selection_local_selectPieObjectByAngle(30))
            console.log(this.props.actions.selection_local_updateSelectedPiesAngleByAngle(0))
            this.renderSelectedPiesWithReduxSelectionState(this.props.pieState,this.props.selectionState)

            console.log(this.props.actions.selection_local_updateSelectedPiesAngleByAngle(170))

            this.renderSelectedPiesWithReduxSelectionState(this.props.pieState,this.props.selectionState)

            console.log(this.props.actions.selection_local_updateSelectedPiesAngleByAngle(120))

            this.renderSelectedPiesWithReduxSelectionState(this.props.pieState,this.props.selectionState)*/

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

            this.props.actions.selection_local_selectPieObjectByAngle(Math.round(pixelToDegree(x,y)))

        }
        if(this.counter>1 && this.counter%10==0)
        {
            this.props.actions.selection_local_updateSelectedPiesAngleByAngle(Math.round(pixelToDegree(x,y)))
            this.renderSelectedPiesWithReduxSelectionStateSecond(this.props.selectionState)
            //this.renderSelectedPiesWithReduxSelectionState(this.props.pieState,this.props.selectionState)
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