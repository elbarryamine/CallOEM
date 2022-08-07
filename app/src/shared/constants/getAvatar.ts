import {AVATAR_URL} from './configs';

export function getAvatar(avatar: string) {
  return `${AVATAR_URL}/${avatar}`;
}
