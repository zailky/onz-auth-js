[![npm version](https://badge.fury.io/js/onz-auth.svg)](https://badge.fury.io/js/onz-auth)
[![Release](https://github.com/zailky/onz-auth-js/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/zailky/onz-auth-js/actions/workflows/release.yml)

[<img src="logotextdark.jpg" alt="OnzAuth" width="300"/>](https://tryonzauth.com)


# OnzAuth JavaScript SDK
OnzAuth's JS SDK for Passwordless Authentication using Email.

<br />

## Questions
Join our [Slack Community](https://join.slack.com/t/onzauth/shared_invite/zt-196ryj3ar-rNWa1N0acoAQ0I7zMOKVGA) 

## Demo
View the [Demo Application](https://zailky.github.io/onz-auth-js/demo/index.htm)

Please refer to demo/index.htm for demo code
<br />

# Install

```shell
npm install onz-auth --save
```

or

```html
<script src="https://unpkg.com/onz-auth@1.0.21/dist/onz-auth-js-sdk.min.js"></script>
```

# Quickstart

You'll need a `CLIENT_ID`, which you can get by [creating a free account at OnzAuth](https://idp.onzauth.com).


```javascript
import onz from "onz-auth"; // If using npm or included in script import

// Initialisation
const auth = new onz.Auth({
    clientID: 'Your Client ID', // Options
    containerID: 'myDiv', // Optional, defaults to 'container'
    isIframe: true, // Optional, defaults to 'false'
});
```
### Sign in

Tokens will automatically be saved in localstorage with the following keys `access_token`, `id_token`, `expiry`, `refresh_token` after successful signin

```javascript
auth.showLogin(); // Shows the login popup
```

### Sign out

Tokens will automatically be cleared from localstorage after signing out
```javascript
auth.logout(); // Signs out the current user
```
### Events examples
```javascript

// Authenticated event, after log in successful, contains accessToken, idToken, refreshToken, expiry
auth.on("authenticated", (authResult) => {
    console.log('authentication result', authResult);
    console.log('authentication access token', authResult.accessToken);
});

// Error message
auth.on("error", (errorMessage) => {
    console.error('authentication error', errorMessage);
});

// On popup or iframe closed
auth.on("closed", () => {
    console.log('iframe or popup is closed');
});

```

## Options

<table>
    <thead>
        <tr>
            <th>Parameter Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>clientID</td>
            <td>string</td>
            <td>Yes</td>
            <td>Generated ClientID in OnzAuth</td>
        </tr>        
        <tr>
            <td>containerID</td>
            <td>string</td>
            <td>Optional</td>
            <td>The element container id for the iframe or popup to attach to, will default to 'container'</td>
        </tr>  
        <tr>
            <td>isIframe</td>
            <td>boolean</td>
            <td>Optional</td>
            <td>Value indicating whether it is a popup or an iframe, defaults to 'false'</td>
        </tr>                            
    </tbody>
</table>

<br />

## Methods

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Return Type</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>showLogin()</td>
            <td>nil</td>
            <td>Shows the login popup or iframe to initiate a new Log in flow</td>
        </tr>
        <tr>
            <td>refreshAccessToken(refreshToken: optional)</td>
            <td>nil</td>
            <td>Initiate refresh token call, will invoke <u>refreshed</u> event when succeeded.  Parameter is optional, will default to localstorage token</td>
        </tr>  
        <tr>
            <td>logout(idToken: optional)</td>
            <td>nil</td>
            <td>Signs out the user, will be using a hidden iframe, so when it finishes, <u>close</u> event will be invoked together with <u>logged_out</u>.  Parameter is optional, will default to localstorage token</td>
        </tr>  
        <tr>
            <td>isAuthenticated(accessToken: optional)</td>
            <td>boolean</td>
            <td>Checks if the current token is valid.  Parameter is optional, will default to localstorage token</td>
        </tr>
        <tr>
            <td>getOAuthTokens()</td>
            <td>object</td>
            <td>Gets authResult object from localstorage it exists</td>
        </tr> 
        <tr>
            <td>getAccessToken()</td>
            <td>string</td>
            <td>Gets access token from localstorage if it exists</td>
        </tr> 
        <tr>
            <td>getDecodedAccessToken()</td>
            <td>object</td>
            <td>Gets access token jwt object from localstorage if it exists</td>
        </tr> 
        <tr>
            <td>getIDToken()</td>
            <td>string</td>
            <td>Gets id token from localstorage if it exists</td>
        </tr> 
        <tr>
            <td>getDecodedIDToken()</td>
            <td>object</td>
            <td>Gets id token jwt object from localstorage if it exists</td>
        </tr>    
        <tr>
            <td>getRefreshToken()</td>
            <td>string</td>
            <td>Gets refresh token from localstorage if it exists</td>
        </tr>                                                   
    </tbody>
</table>

<br />

## Events

<table>
    <thead>
        <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Type</th>
            <th>Param</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>authenticated</td>
            <td>On login success</td>
            <td>object</td>
            <td>            
            <pre>{ 
    accessToken,
    refreshToken,
    idToken,
    expiry
}</pre>
            </td>
        </tr>        
        <tr>
            <td>refreshed</td>
            <td>When token is refreshed </td>
            <td>object</td>
            <td>
            <pre>{ 
    accessToken,
    refreshToken,
    idToken,
    expiry
}</pre>
            </td>
        </tr>  
        <tr>
            <td>error</td>
            <td>When an exception occurred</td>
            <td>string</td>
            <td align="center">errorMessage</td>
        </tr> 
        <tr>
            <td>closed</td>
            <td>When popup or iframe is closed</td>
            <td>nil</td>
            <td align="center">nil</td>
        </tr>  
        <tr>
            <td>logged_out</td>
            <td>When session is cleared and logged out</td>
            <td>nil</td>
            <td align="center">nil</td>
        </tr>                        
    </tbody>
</table>

<br/>