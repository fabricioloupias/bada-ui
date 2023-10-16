// "use client"

// import Script from "next/script"
// import { Button, Card } from "@/components/antd"
// import { useBoundStore } from "../../store"
// import { useMemo } from "react";

// export default function WebChat() {
//     const botServiceUrl = useBoundStore(state => state.botServiceUrl);

//     // if (!botServiceUrl) {
//     //     return (
//     //         <>
//     //             <Button>
//     //                 Conectar a bot
//     //             </Button>
//     //         </>
//     //     )
//     // }

//     return (
//         <>
//             <Card
//                 bodyStyle={{
//                     height: '100%',
//                     padding: 0
//                 }}
//                 style={{
//                     height: '95%'
//                 }}>
//                 <div id="webchat"
//                     style={{
//                         height: '100%'
//                     }} role="main"></div>
//                 {/* <Script src="lib/scripts/webchat.js" strategy="lazyOnload" /> */}
//                 <Script
//                     crossOrigin='anonymous'
//                     src="https://cdn.botframework.com/botframework-webchat/latest/webchat.js"
//                     onLoad={() => {
//                         window.WebChat.renderWebChat(
//                             {
//                                 directLine: window.WebChat.createDirectLine({
//                                     secret: '',
//                                     token: '',
//                                     domain: 'http://localhost:9478/directline',
//                                     webSocket: false // defaults to true
//                                 }),
//                                 styleOptions: {
//                                     botAvatarInitials: 'BF',
//                                     userAvatarInitials: 'WC'
//                                 }
//                             },
//                             document.getElementById('webchat')
//                         );

//                         window.WebChat.
//                     }}
//                 />
//             </Card>
//         </>
//     )
// }