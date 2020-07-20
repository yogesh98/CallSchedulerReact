import ContactCard from './ContactCard'
import HttpService from '../../services/HttpService'
import React,{useState, useEffect} from "react"

function ContactDeck(props){

    const [contactList, updateContactList] = useState(
        {
            users:[],
            success: false
        }
    )
    
    function getAllUsers(){
        if (contactList.success === false){
            const http = new HttpService();
            let registered_users = "user/get-registered-users";
            const tokenId = "user-token";

            return http.getData(registered_users,tokenId).then(data=>{
                console.log(JSON.stringify(data));
                updateContactList(
                    {
                        users: data.users,
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

    getAllUsers()

    let contacts = contactList.users.map(item => <ContactCard key = {item.id} user={item} thisUser = {props.userProf} updateConnections = {props.updateConnections}/>)

    return (
        <div>
            {
            contactList.success?
                <div>
                {contacts}
                </div>
            :
                <div>
                <h1>Loading...</h1>
                </div>
            }
        </div>
    )
}

export default ContactDeck