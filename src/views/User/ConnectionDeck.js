import ConnectionCard from './ConnectionCard'
import HttpService from '../../services/HttpService'
import React,{useState, useEffect} from "react"

function ConnectionDeck(props){

    let firstRender = true

    const [connectionList, updateConnectionList] = useState(
        {
            connections:[],
            success: false
        }
    )

    function getAllConnections(){
        if (props.userProf.success === true && connectionList.success === false){
            const http = new HttpService();
            let get_connections_url = "user/get-connected-users"
            const tokenId = "user-token"
            let body = { email: props.userProf.user.email }
    
            return http.postData(body ,get_connections_url,tokenId).then(data=>{
                console.log(JSON.stringify(data));
                updateConnectionList(
                    {
                        connections: data.result,
                        success: true
                    }
                )
                return data;
            }).catch((error)=> {
                console.log(error)
                return error; 
                });
        }
    }

    useEffect(() => {
        getAllConnections();
    }, [connectionList])

    let connectionCardList = connectionList.connections.map(item => <ConnectionCard connection = {item} thisUser = {props.userProf} updateConnection = {updateConnectionList}/>)
    if (firstRender === true){
        getAllConnections()
    }

    return (
        <div>
            {
                connectionList.success?
                    <div>
                    {connectionCardList}
                    </div>
                :
                    <div>
                    <h1>Loading...</h1>
                    </div>
            }
        </div>
    )
}

export default ConnectionDeck