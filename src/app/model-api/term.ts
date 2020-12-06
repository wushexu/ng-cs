import {Week} from './week';

export class Term {
  id: string;
  termYear: number;
  termMonth: number;

  name?: string;

  weeks?: Week[];
}
