import {saveLocal,getLocal} from '../../utils/webStorage'

function getId(pies) {
    return pies.reduce((maxId,pie)=>{
            return Math.max(pie.id,maxId)
        },-1)+1
}

export default function pieReducer(pieState=[],action){
    let new_pieState = [...pieState];
    switch(action.type){

        case'PIE_LOCAL_GET_PIE_STATE':
            new_pieState= getLocal("pieState")
            return new_pieState;
        case'PIE_LOCAL_ADD_PIE_TO_STATE':
            let startingAngle=action.startingAngle
            let angleValue=action.angleValue
            let color = action.color
            let className=action.className
            let amOrPm=action.amOrPm



            if(startingAngle!=undefined){
               console.log("in add pie");


                new_pieState =[ {
                    id:getId(new_pieState),
                    startingAngle:startingAngle,
                    angleValue:angleValue,
                    color:color,
                    className:className,
                    amOrPm:amOrPm
                }
                    , ...new_pieState
                    ]
                }

                saveLocal("pieState",new_pieState)
            return new_pieState;


        case'PIE_LOCAL_DELETE_PIE_FROM_STATE':
            let pie;
            pie = new_pieState[action.id];
            new_pieState = new_pieState.filter(pie=>{
                return pie.id !== action.id
            })




            saveLocal("pieState",new_pieState)
            return new_pieState


        default:
            // console.log("in login")
            return pieState
    }
}