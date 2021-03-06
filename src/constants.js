export const OnzAuthEnum = Object.freeze({ 
    Production: {
        AuthURL: 'https://auth.onzauth.com',
        IdpURL: 'https://idp.onzauth.com',
        IdpApiURL: 'https://idp-api.onzauth.com'
    }
});

export const OnzEvents = Object.freeze({        
    OnAuthenticated: 'authenticated',
    OnClosed: 'closed',
    OnError: 'error',
    OnRefreshed: 'refreshed',
    OnLoggedOut: 'logged_out' 
});