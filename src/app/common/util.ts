import {reduce} from 'underscore';

export function sum(array) {
  return reduce(array,
    (acc, cur) => acc + cur || 0, 0);
}
