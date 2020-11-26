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

  dept?: Dept;

// {
//   "id": 1,
//   "capacity": 0,
//   "code": "90194",
//   "memo": null,
//   "multimedia": "",
//   "name": "信息223A",
//   "name4training": "",
//   "room_type": "标准教室",
//   "short_name": null,
//   "dept_id": 2
// }
}
