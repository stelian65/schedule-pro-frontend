import store from '../store'
import axios from 'axios'
import { useRouter} from 'vue-router'

export async function logout(){
   const token = store.getters.getToken;
   await  axios.get('/api/auth/logout',{
        headers:{
            Authorization: 'Bearer ' + token
        }
    }).then(() => {
        store.dispatch('logout');
    });
}