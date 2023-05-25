import store from '../store'
import axios from 'axios'

export function logout(){
   const token = store.getters.getToken;
    axios.get('/api/auth/logout',{
        headers:{
            Authorization: 'Bearer ' + token
        }
    }).then(store.dispatch('logout'));
}