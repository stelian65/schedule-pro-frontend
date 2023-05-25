import store from "../store"

export const UserRoles = {
    USER:"USER",
    ADMIN:"ADMIN"
}

export function authorize(role){
    if(!store.getters.getIsAuthenticated){
        return false;
    }
    const currentUser = store.getters.getUser;
    if(!currentUser){
        return false
    }

    return role === currentUser.role

}