import {TableDatasource} from '../../common/table-datasource';
import {ScheduleAggregated} from '../../model-api/schedule-aggregated';


export class ScheduleStatisTableDatasource extends TableDatasource<ScheduleAggregated> {

  constructor() {
    super();

    this.compareFieldMappers = {
      // date: s => s.date,
      // trainingType: s => s.trainingType,
      term: s => s.termId,
      lessonIndex: s => s.timeStart,
      dept: s => s.dept ? s.dept.name : 0,
      major: s => s.major ? s.major.name : 0,
      class: s => s.theClass ? s.theClass.name : 0,
      classroom: s => s.site ? s.site.name : 0,
      course: s => s.course ? s.course.name : 0,
      teacher: s => s.teacher ? s.teacher.name : 0
    };
  }

}
