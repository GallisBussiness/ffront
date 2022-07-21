export function refreshAuth(auth) {
    window.localStorage.setItem('_auth_freedocteur_state',JSON.stringify({...auth,status:'ACTIVATE'}));
}