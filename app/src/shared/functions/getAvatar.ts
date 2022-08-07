import {AVATAR_URL} from '../constants/properties/paths';

export function getAvatar(avatar: string) {
  return `${AVATAR_URL}/${avatar}`;
}
