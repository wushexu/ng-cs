import {Major} from './major';

export class Dept {
  id: number;
  name: string;

  shortName?: string;
  type?: string;

  majors?: Major[];

}
