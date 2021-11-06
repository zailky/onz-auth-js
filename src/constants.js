export const OnzAuthEnum = Object.freeze({ 
    Production: {
        AuthURL: 'https://auth.zailky.com',
        IdpURL: 'https://idp.zailky.com',
        IdpApiURL: 'https://idp-api.zailky.com'
    },
    Development: {
        AuthURL: 'https://auth-develop.zailky.com',
        IdpURL: 'https://idp-develop.zailky.com',
        IdpApiURL: 'https://idp-api-develop.zailky.com'
    }
});

export const OnzEvents = Object.freeze({    
    OnAuthenticationFailure: 'authentication-failure',    
    OnAuthenticated: 'authenticated',
    OnClosed: 'closed',
    OnError: 'error',
    OnRefreshed: 'refreshed',
    OnRefreshFailure: 'refresh-failure'
});