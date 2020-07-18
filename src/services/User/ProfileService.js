import HttpService from '../HttpService';



export const LoadUserProfile = () =>{
    const http = new HttpService();
    let signUpUrl = "user/view-profile";
    const tokenId = "user-token";
   
    return http.getData(signUpUrl,tokenId).then(data=>{
        console.log(JSON.stringify(data));
        return data;
    }).catch((error)=> {
        console.log(error)
        return error; 
         });
}


// export const LoadUsers = () =>{
//     const http = new HttpService();
//     let registered_users = "user/get-registered-users";
//     const tokenId = "user-token";
   
//     return http.getData(registered_users,tokenId).then(data=>{
//         console.log(JSON.stringify(data));
//         return data;
//     }).catch((error)=> {
//         console.log(error)
//         return error; 
//          });
// }


