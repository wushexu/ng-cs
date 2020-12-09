import {Week} from './week';

export class Term {
  id: string;
  name?: string;

  termYear: number;
  termMonth: number;

  firstDay: string;
  lastDay: string;

  weeks?: Week[];
}
