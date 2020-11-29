import {Dept} from './dept';

export class Major {
  id: number;
  name: string;

  shortName?: string;
  degree?: string;

  deptId?: number;
  dept?: Dept;

// {
//   "id": 1,
//   "degree": "高职",
//   "name": "理化测试与质检技术(无损检测技术)",
//   "short_name": "理化",
//   "dept_id": 1
// }
}
