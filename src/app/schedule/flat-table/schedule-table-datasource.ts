import {Schedule} from '../../model-api/schedule';
import {TableDatasource} from '../../common/table-datasource';


export class ScheduleTableDatasource extends TableDatasource<Schedule> {

  constructor() {
    super();

    this.compareFieldMappers = {
      // date: s => s.date,
      // courseType: s => s.courseType,
      // trainingType: s => s.trainingType,
      lessonIndex: s => s.timeStart,
      class: s => s.theClass ? s.theClass.name : 0,
      classroom: s => s.site ? s.site.name : 0,
      course: s => s.course ? s.course.name : 0,
      teacher: s => s.teacher ? s.teacher.name : 0
    };
  }

}
