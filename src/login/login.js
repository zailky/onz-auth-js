import zoid from 'zoid';

export const OnzLoginComponent = zoid.create({
    // The html tag used to render my component

    tag: 'onz-login-component',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page

    url: ({ props }) => {
        //return new URL('dummy.htm', window.location.href).href;
        //return "https://idp-develop.zailky.com/signin"
        return new URL('signin', props.apiURL).href;
    },

    // The size of the component on their page. Only px and % strings are supported
    dimensions: {
        width: '400px',
        height: '600px'
    },
    // The properties they can (or must) pass down to my component. This is optional.

    props: {
        apiURL: {
            type: 'string',
            required: true
        },
        clientID: {
            type: 'string',
            required: false,
            queryParam: 'client_id'
        },
        onLogin: {
            type: 'function',
            required: true
        },
        onLoginError: {
            type: 'function',
            required: true
        }
    },
});
