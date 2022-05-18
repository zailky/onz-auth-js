import zoid from 'zoid';

export const OnzLoginComponent = zoid.create({
    // The html tag used to render my component
    tag: 'onz-login-component',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page
    url: ({ props }) => {
        return new URL('signin', props.idpURL).href;
    },

    // The size of the component on their page. Only px and % strings are supported
    dimensions: {
        width: '350px',
        height: '550px'
    },    
    autoResize: {
        width: false,
        height: true,
    },

    // The properties they can (or must) pass down to my component. This is optional.
    props: {
        idpURL: {
            type: 'string',
            required: true
        },
        clientID: {
            type: 'string',
            required: true,
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
