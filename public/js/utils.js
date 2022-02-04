/* eslint-disable import/prefer-default-export */
export function createUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
