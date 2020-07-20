import React , {useEffect}  from 'react'
import {useState} from 'react'
import {Card} from '@material-ui/core'
import {useDispatch,useSelector} from 'react-redux'
import {loadUserAction} from '../../store/actions/User/ProfileActions'
import {useStyles} from '../../styles'
import Skeleton from '@material-ui/lab/Skeleton';
import ContactDeck from './ContactDeck'
import ConnectionDeck from './ConnectionDeck'
import HttpService from '../../services/HttpService'

export default function ProfileView() {

    const dispatch = useDispatch();
    const classes = useStyles();
    const userProfile = useSelector(state => state.userProfile.userProfile);

    useEffect(() => {
        dispatch(loadUserAction());
    }, [dispatch])

    const [connectionsListParent, updateConnectionsListParent] = useState(
        {
            connections:[],
            success: false
        }
    )

    function getAllConnections(){
        if (userProfile.success === true && connectionsListParent.success === false){
            const http = new HttpService();
            let get_connections_url = "user/get-connected-users"
            const tokenId = "user-token"
            let body = { email: userProfile.user.email }
    
            return http.postData(body ,get_connections_url,tokenId).then(data=>{
                console.log(JSON.stringify(data));
                updateConnectionsListParent(
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


    return (
        <>
            <div className={classes.fullWidthProfile}>
            <Card>
                {
                    userProfile!="" && userProfile.success==true?
                            <div>
                            <h3><b>Name: </b>{userProfile.user.name}</h3>
                            <h3><b>Email: </b>{userProfile.user.email}</h3>
                            <h3><b>Account Creation Date: </b>{userProfile.user.created_at}</h3>
                            </div>
                    :
                    userProfile.success==false ?
                    userProfile.message
                    :
                    <Skeleton variant="rect" width={210} height={118} />

                }
            </Card>
            <br></br>
            <h1>Contacts:</h1>
            <ContactDeck userProf = {userProfile} updateConnections = {updateConnectionsListParent}/>
            <br></br>
            <h1>Connections:</h1>
            <ConnectionDeck userProf = {userProfile} connectionsList = {connectionsListParent} updateConnections = {getAllConnections} updateConnectionList = {updateConnectionsListParent}/>
            </div>
        </>
    )
}

