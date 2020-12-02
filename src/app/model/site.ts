import {Dept} from './dept';

export class Site {
  id: number;
  code: string;
  name: string;

  shortName?: string;
  type?: string;
  roomType?: string;
  capacity?: number;
  multimedia?: string;
  name4Training?: string;
  memo?: string;

  deptId?: number;
  dept?: Dept;

}

export declare type Classroom = Site;
