export const OnzAuthEnum = Object.freeze({ 
    Production: {
        AuthURL: 'https://auth.onzauth.com',
        IdpURL: 'https://idp.onzauth.com',
        IdpApiURL: 'https://idp-api.onzauth.com'
    },
    Development: {
        AuthURL: 'https://auth-develop.onzauth.com',
        IdpURL: 'https://idp-develop.onzauth.com',
        IdpApiURL: 'https://idp-api-develop.onzauth.com'
    }
});

export const OnzEvents = Object.freeze({    
    OnAuthenticationFailure: 'authentication-failure',    
    OnAuthenticated: 'authenticated',
    OnClosed: 'closed',
    OnError: 'error',
    OnRefreshed: 'refreshed',
    OnRefreshFailure: 'refresh-failure',
    ClientIdFailure: 'client-id-failure'
});