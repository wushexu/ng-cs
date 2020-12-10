import {Schedule} from '../../model-api/schedule';
import {ScheduleCompareFieldMappers, TableDatasource} from '../../common/table-datasource';


export class ScheduleTableDatasource extends TableDatasource<Schedule> {

  constructor() {
    super();

    this.compareFieldMappers = ScheduleCompareFieldMappers;
  }

}
