import {Major} from './major';
import {Dept} from './dept';
import {sum} from '../common/util';
import {MergedClass} from '../model-app/merged-class';

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

  _tooltip?: string;

  static classTooltip(theClass: Class): string {
    if (!theClass) {
      return null;
    }

    if (theClass._tooltip) {
      return theClass._tooltip;
    }

    const tips = [];

    if ((theClass as MergedClass)._merging) {
      // 合班上课
      const classM = theClass as MergedClass;
      const {sameYearMajor, classes} = classM._merging;
      const sizes = classes.map(c => c.size);
      const totalSize = sum(sizes);
      if (totalSize > 0) {
        tips.push(`人数：${totalSize}（${sizes.join('+')}）`);
      }
      for (const cla of classes) {
        tips.push(`班级：${cla.name}`);
      }
      if (sameYearMajor) {
        const {size, dept, major} = classM;
        if (dept) {
          tips.push(`系部：${dept.name}`);
        }
        if (major) {
          tips.push(`专业：${major.name}`);
        }
      }
    } else {
      const {size, dept, major} = theClass;
      if (size > 0) {
        tips.push(`人数：${size}`);
      }
      if (dept) {
        tips.push(`系部：${dept.name}`);
      }
      if (major) {
        tips.push(`专业：${major.name}`);
      }
    }

    theClass._tooltip = tips.join('\n');

    return theClass._tooltip;
  }

  static classSizeText(theClass: Class): string {
    if (!theClass) {
      return null;
    }

    if ((theClass as MergedClass)._merging) {
      // 合班上课
      const classM = theClass as MergedClass;
      const {classes} = classM._merging;
      const sizes = classes.map(c => c.size);
      const totalSize = sum(sizes);
      return `${totalSize}（${classes.length}个班）`;
    } else {
      return '' + theClass.size;
    }
  }
}
