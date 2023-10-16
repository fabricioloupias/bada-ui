(async function () {
    window.WebChat.renderWebChat(
        {
            directLine: window.WebChat.createDirectLine({
                secret: '',
                token: '',
                domain: 'http://localhost:9478/directline',
                webSocket: false // defaults to true
            }),
            styleOptions: {
                botAvatarInitials: 'BF',
                userAvatarInitials: 'WC'
            }
        },
        document.getElementById('webchat')
    );

    document.querySelector('#webchat > *').focus();
})().catch(err => console.error(err));