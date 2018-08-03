/**
When the button's clicked:
- call for TrezorConnect action
- show a notification with response (if succeed)
*/

function onClick() {
    // window.__TREZOR_CONNECT_SRC = 'https://localhost:8088/';
    // window.__TREZOR_CONNECT_SRC = 'http://localhost:8082/';
    window.__TREZOR_CONNECT_SRC = 'https://sisyfos.trezor.io/connect/';
    window.TrezorConnect.getAddress({ 
        path: "m/49'/0'/0'/0/0"
    }).then(response => {
        console.warn("RESP", response)
        const message = response.success ? `BTC Address: ${ response.payload.address }` : `Error: ${ response.payload.error }`;
        chrome.notifications.create(new Date().getTime().toString(), {
            type: 'basic',
            iconUrl: 'icons/48.png',
            title: 'TrezorConnect',
            message
        });
    }).catch(error => {
        console.error("TrezorConnectError", error)
    });
}
chrome.browserAction.onClicked.addListener(onClick);

window.addEventListener('message', (ev) => {
    console.warn("IFRAME", ev.data)
})
