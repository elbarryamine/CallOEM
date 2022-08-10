import {REACT_APP_AVATAR_URL} from '@env';
export function getAvatar(avatar: string) {
  return `${REACT_APP_AVATAR_URL}/${avatar}`;
}
