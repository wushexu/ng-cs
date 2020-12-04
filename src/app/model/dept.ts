import {Major} from './major';

export class Dept {
  id: number;
  name: string;

  shortName?: string;
  type?: string; // TYPE_NORMAL: N; TYPE_ELSE: E

  majors?: Major[];

}
