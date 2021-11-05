export const OnzAuthEnum = Object.freeze({ 
    Production: {
        AuthUrl: 'https://auth.zailky.com',
        IdpUrl: 'https://idp.zailky.com',
        IdpApiUrl: 'https://idp-api.zailky.com'
    },
    Development: {
        AuthUrl: 'https://auth-develop.zailky.com',
        IdpUrl: 'https://idp-develop.zailky.com',
        IdpApiUrl: 'https://idp-api-develop.zailky.com'
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