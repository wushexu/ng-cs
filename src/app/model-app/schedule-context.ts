import {Class} from '../model-api/class';
import {Teacher} from '../model-api/teacher';
import {Site} from '../model-api/site';
import {Term} from '../model-api/term';
import {Course} from '../model-api/course';
import {Dept} from '../model-api/dept';
import {Major} from '../model-api/major';
import {ScheduleFilter} from './schedule-params';
import {ScheduleGrouping} from './schedule-grouping';
import {Week} from '../model-api/week';

export class ScheduleContext {

  filter: ScheduleFilter;
  grouping?: ScheduleGrouping;

  dept?: Dept;
  major?: Major;
  theClass?: Class;
  course?: Course;
  teacher?: Teacher;
  site?: Site;

  yearMonth?: string;
  week?: Week;
  term?: Term;
}
