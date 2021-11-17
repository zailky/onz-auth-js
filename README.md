[![npm version](https://badge.fury.io/js/onz-auth.svg)](https://badge.fury.io/js/onz-auth)
[![Release](https://github.com/zailky/onz-auth-js/actions/workflows/release.yml/badge.svg?branch=main)](https://github.com/zailky/onz-auth-js/actions/workflows/release.yml)

<img src="logotextdark.jpg" alt="OnzAuth" width="300"/>


# OnzAuth JavaScript SDK
OnzAuth's JS SDK for Passwordless Authentication using Email.

<br />

## Questions
Join our [Slack Community](https://join.slack.com/t/slack-bxk5215/shared_invite/zt-yngnrstf-DcioVlmAmDKU1VV4MeN26w) 

<br />

# Install

```shell
npm install onz-auth --save
```

or

```html
<script src="https://unpkg.com/onz-auth@1.0.18/dist/onz-auth-js-sdk.min.js"></script>
```

<br />

# Events

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
    </tbody>
</table>