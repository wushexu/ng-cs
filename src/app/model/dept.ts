import {Major} from './major';

export class Dept {
  id: number;
  name: string;

  shortName?: string;
  type?: string;

  majors?: Major[];

  // {
//   "id": 1,
//   "name": "工程技术系",
//   "short_name": "工程系",
//   "type": null
// }
}
