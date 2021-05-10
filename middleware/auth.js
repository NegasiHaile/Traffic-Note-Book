import firebase from 'firebase/app'
import 'firebase/auth'

export default function({route, redirect}){
    if(route.path !== '/'){
        if(!firebase.auth().currentUser){
            return redirect('/')
        }
    }
    else if(route.path === '/'){
        if(!firebase.auth().currentUser){
            
        }else{
        return redirect('/')
        }
    }

//     if(route.path == '/SAdmin/Records'){
//         return redirect('/SAdmin/Records/All')
// }
    
}