import React , { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../redux/action'




class Root extends Component {



    componentDidMount(){


    }
    componentWillMount() {


    }
    componentDidUpdate(){

    }



    render(){
        return(
            <div>
                <div className="pie" data-start="0" data-value="30"></div>
                <div className="pie highlight" data-start="30" data-value="30"></div>
                <div className="pie" data-start="60" data-value="40"></div>
                <div className="pie big" data-start="100" data-value="260"></div>
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