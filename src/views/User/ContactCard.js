import React from "react"
import {Card} from '@material-ui/core'
import HttpService from '../../services/HttpService'

function ContactCard(props){
    console.log(props)

    function DisableButtons(){
        //Get list of connections for user disable buttons for people with those connections

    }

    function HandleConnection(){
        //Create new connection for button press!
        console.log("Create Connection")
        const http = new HttpService();
        let create_connections_url = "user/create-connection";
        const tokenId = "user-token";
        console.log(props.user.email)
        let postInfo = { email: props.thisUser.user.email , emailRec: props.user.email };

        http.postData(postInfo, create_connections_url,tokenId).then(data=>{
            console.log(JSON.stringify(data));
        }).catch((error)=> {
            console.log(error)
            return error; 
            });
        // props.updateConnections()
    }
    return (
        <div>
        <br></br>
        <Card>
            <div className='rowC'>
                {props.user.name}
                {props.user.email}
                <button onClick = {HandleConnection}>Connect</button>
            </div>
        </Card>
        <br></br>
        </div>
    )
}

export default ContactCard