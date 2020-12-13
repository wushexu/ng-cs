import {reduce} from 'underscore';

export function sum(array) {
  return reduce(array,
    (acc, cur) => acc + cur || 0, 0);
}

export function errorHandler(error: any) {
  console.error(error);
}
