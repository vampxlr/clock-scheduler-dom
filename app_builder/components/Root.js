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