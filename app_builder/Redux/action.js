

let actions = {

    pie_local_getPieState: function pie_local_getPieState(){
        return{
            type:"PIE_LOCAL_GET_PIE_STATE"
        }

    },
    pie_local_addPieToState: function pie_local_addPieToState(startingAngle,angleValue,color,className,amOrPm){
        return{
            type:"PIE_LOCAL_ADD_PIE_TO_STATE",
            startingAngle:startingAngle,
            angleValue:angleValue,
            color:color,
            className:className,
            amOrPm:amOrPm
        }

    },

    pie_local_updatePieFromState: function pie_local_updatePieFromState(id,startingAngle,angleValue,color,className,amOrPm){
        return{
            type:"PIE_LOCAL_UPDATE_PIE_FROM_STATE",
            id:id,
            startingAngle:startingAngle,
            angleValue:angleValue,
            color:color,
            className:className,
            amOrPm:amOrPm
        }

    },

    pie_local_deletePieFromState: function pie_local_deletePieFromState(id){
        return{
            type:"PIE_LOCAL_DELETE_PIE_FROM_STATE",
            id:id
        }

    },

    pie_local_deleteAllPieFromState: function pie_local_deleteAllPieFromState(){
        return{
            type:"PIE_LOCAL_DELETE_ALL_PIE_FROM_STATE"
        }

    },


    workspace_local_setActiveWorkspace: function workspace_local_setActiveWorkspace(id){
        return{
            type:"WORKSPACE_LOCAL_SET_ACTIVE_WORKSPACE",
            id:id
        }

    },

    workspace_local_moveWorkspace: function workspace_local_moveWorkspace(direction,id,workspaceData){
        return(dispatch)=>{

            if(id<workspaceData.length && id>=0)
                if(direction.toUpperCase()=="UP"&& id<workspaceData.length-1)
                {
                    dispatch(actions.workspace_local_setActiveWorkspace(id+1))
                }
                else if (direction.toUpperCase()=="DOWN" &&id>0)
                {
                    dispatch(actions.workspace_local_setActiveWorkspace(id-1))

                }

        }

    },

    workspace_local_returnWorkspaces: function workspace_local_returnWorkspaces(data){
        return{
            type:"WORKSPACE_LOCAL_RETURN_WORKSPACES",
            data:data
        }
     },

    workspace_local_async_getWorkspaces:function workspace_local_async_getWorkspaces(){
        return (dispatch) => {
            chrome.storage.local.get('workspace_list_after_login', function (data) {
                dispatch(actions.workspace_local_returnWorkspaces(data.workspace_list_after_login))
            });
        }
    },


}

export default actions