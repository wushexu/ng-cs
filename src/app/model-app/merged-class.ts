import {Class} from '../model-api/class';
import {sortBy, groupBy, values} from 'underscore';

export class MergedClass extends Class {
  _merging: {
    sameYearMajor: boolean,
    classes: Class[]
  } = {
    sameYearMajor: true,
    classes: []
  };

/*
  static merge(class1: Class | MergedClass, class2: Class): Class {

    let classM: MergedClass;
    if ((class1 as MergedClass)._merging) {
      classM = class1 as MergedClass;
    } else {
      classM = Object.assign(new MergedClass(), class1);
      classM._merging.classes.push(class1);
    }
    classM._tooltip = null;
    const merging = classM._merging;
    const classes: Class[] = merging.classes;
    classes.push(class2);
    merging.sameYearMajor = merging.sameYearMajor && class2.majorId === classM.majorId
      && class2.year === classM.year && class2.degree === classM.degree;

    classM.name = values(groupBy(classes, c => `${c.year}-${c.majorId}-${c.degree}`))
      .map(cs => cs.length === 1 ? cs[0].name : MergedClass.mergeClassesName(cs))
      .join('，');

    return classM;
  }*/

  static mergeClasses(classes: Class[]): Class {

    const class1 = classes[0];
    const classM: MergedClass = Object.assign(new MergedClass(), class1);

    const merging = classM._merging;
    merging.classes = classes;

    const notSameYearMajor = classes.slice(1)
      .find(c =>
        c.majorId !== class1.majorId
        || c.year !== class1.year
        || c.degree !== class1.degree);
    merging.sameYearMajor = !notSameYearMajor;

    classM.name = values(groupBy(classes, c => `${c.year}-${c.majorId}-${c.degree}`))
      .map(cs => cs.length === 1 ? cs[0].name : MergedClass.mergeClassesName(cs))
      .join('，');

    return classM;
  }

  private static mergeClassesName(classes: Class[]) {
    classes = sortBy(classes, 'classNo');
    let seq = true;
    for (let i = 1; i < classes.length; i++) {
      if (classes[i].classNo - classes[0].classNo !== i) {
        seq = false;
        break;
      }
    }
    let classNo;
    if (seq) {
      // 1~2
      classNo = `${classes[0].classNo}~${classes[classes.length - 1].classNo}`;
    } else {
      // 1,3
      classNo = classes.map(c => c.classNo).join();
    }
    return classes[0].name.replace(/-\d\[/, `-${classNo}[`);
  }
}
