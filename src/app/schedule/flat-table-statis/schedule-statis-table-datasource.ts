import {ScheduleCompareFieldMappers, TableDatasource} from '../../common/table-datasource';
import {ScheduleAggregated} from '../../model-api/schedule-aggregated';


export class ScheduleStatisTableDatasource extends TableDatasource<ScheduleAggregated> {

  constructor() {
    super();

    this.compareFieldMappers = ScheduleCompareFieldMappers;
  }

}
