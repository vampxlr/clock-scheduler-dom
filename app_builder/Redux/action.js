
let actions = {


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