import zoid from 'zoid';

export const OnzLogoutComponent = zoid.create({
    // The html tag used to render my component

    tag: 'onz-logout-component',

    // The url that will be loaded in the iframe or popup, when someone includes my component on their page

    url: ({ props }) => {
        return new URL('logout', props.idpURL).href;
    },

    // The size of the component on their page. Only px and % strings are supported
    dimensions: {
        width: '0px',
        height: '0px'
    },
    // The properties they can (or must) pass down to my component. This is optional.

    props: {
        idpURL: {
            type: 'string',
            required: true
        },
        idToken: {
            type: 'string',
            required: true,
            queryParam: 'id_token'
        },
        clientID: {
            type: 'string',
            required: true,
            queryParam: 'client_id'
        },
        onLogout: {
            type: 'function',
            required: true
        },
        onLogoutError: {
            type: 'function',
            required: true
        }
    },
});
