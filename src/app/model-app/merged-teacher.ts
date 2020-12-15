import {Teacher} from '../model-api/teacher';

export class MergedTeacher extends Teacher {
  _merging: {
    teachers: Teacher[]
  } = {teachers: []};

  static mergeTeachers(teachers: Teacher[]): Teacher {
    const teacher1 = teachers[0];
    const teacherM = Object.assign(new MergedTeacher(), teacher1);

    const merging = teacherM._merging;
    merging.teachers = teachers;

    teacherM.name = teachers.map(t => t.name).join('，');

    return teacherM;
  }

}
