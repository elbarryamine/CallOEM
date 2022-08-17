declare module '@assets/images/*';
declare module 'react-native-webrtc-web-shim' {
  export {RTCView};
}

declare module '@env' {
  export const REACT_APP_WEBSOCKET: string;
  export const REACT_APP_BASE_URL: string;
  export const REACT_APP_AVATAR_URL: string;
}
