export function authGuard(to, from, next){
    const token = localStorage.getItem('token');

    if(token){
        next();
    } else{
        next('/');
    }
}