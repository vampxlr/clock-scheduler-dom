
export default function clockReducer(clock=[],action){
    let new_login_state = [];
    var array =clock;
    var temp;
    switch(action.type){

        case'LOGIN_CHECK_LOGIN':


            new_login_state.status=action.bool;
            return new_login_state;


        default:
            // console.log("in login")
            return clock
    }
}