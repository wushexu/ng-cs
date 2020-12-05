import {Class} from '../model/class';
import {Teacher} from '../model/teacher';
import {Site} from '../model/site';
import {MonthDim} from './month-dim';
import {Term} from '../model/term';
import {Course} from '../model/course';
import {Dept} from '../model/dept';
import {Major} from '../model/major';
import {ScheduleFilter} from './schedule-filter';

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
