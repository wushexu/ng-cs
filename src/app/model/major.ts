import {Dept} from './dept';

export class Major {
  id: number;
  name: string;

  shortName?: string;
  degree?: string;

  deptId?: number;
  dept?: Dept;

}
