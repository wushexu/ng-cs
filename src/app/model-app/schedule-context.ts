import {Class} from '../model-api/class';
import {Teacher} from '../model-api/teacher';
import {Site} from '../model-api/site';
import {MonthDim} from './month-dim';
import {Term} from '../model-api/term';
import {Course} from '../model-api/course';
import {Dept} from '../model-api/dept';
import {Major} from '../model-api/major';
import {ScheduleFilter} from './schedule-params';

export class ScheduleContext {

  filter: ScheduleFilter;

  dept?: Dept;
  major?: Major;
  theClass?: Class;
  course?: Course;
  teacher?: Teacher;
  site?: Site;
  monthDim?: MonthDim;
  term?: Term;
}
