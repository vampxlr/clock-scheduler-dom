import React , {Component} from 'react'
import { render } from 'react-dom'
import Root from './components/Root'

import configureStore from './redux/store'
import { Provider } from 'react-redux'




    let initialState = {
        todos_repository:[
            {
                id:0,
                remote:false,
                todos:[
                    {
                        id:0,
                        text:"something",
                        completed:true
                    }
                ],
                workspace_id:null,
                workspace_name:"local"
            }
        ],
        login:[
                {
                    status:false
                }
            ],
        workspaceData:[

            {
                id:0,
                name:"Local Workspace",
                active:true
            }
        ]






    }
let secondState= {
    todos_repository:[
        {
            id:0,
            remote:false,
            todos:[
                {
                    id:0,
                    text:"first",
                    completed:true
                },
                {
                    id:1,
                    text:"second",
                    completed:true
                },
                {
                    id:2,
                    text:"third",
                    completed:false
                },
                {
                    id:3,
                    text:"fourth task element",
                    completed:false
                }

            ],
            workspace_id:null,
            workspace_name:"local"
        }
    ],
    login:[
        {
            status:false
        }
    ],
    workspaceData:[

        {
            id:0,
            name:"Local Workspace",
            active:true
        }
    ]
};

    let store = configureStore()
    render(
        <Provider store={store}>
            <Root/>
        </Provider>,
        document.getElementById('app')
    );







