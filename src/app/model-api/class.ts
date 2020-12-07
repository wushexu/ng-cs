import {Major} from './major';
import {Dept} from './dept';

export class Class {
  id: number;
  name: string;
  degree: string;
  year: number;
  classNo: number;
  size: number;

  deptId?: number;
  majorId?: number;

  dept?: Dept;
  major?: Major;

  static classTooltip(theClass: Class): string {
    if (!theClass) {
      return null;
    }
    const {dept, major} = theClass;

    const tips = [];
    if (dept) {
      tips.push(`系部：${dept.name}`);
    }
    if (major) {
      tips.push(`专业：${major.name}`);
    }
    return tips.join('\n');
  }
}
