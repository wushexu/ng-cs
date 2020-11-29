import {Class} from '../model/class';
import {Teacher} from '../model/teacher';
import {Site} from '../model/site';
import {MonthDim} from './month-dim';
import {Term} from '../model/term';
import {Course} from '../model/course';

export class ScheduleContext {
  theClass?: Class;
  course?: Course;
  teacher?: Teacher;
  site?: Site;
  monthDim?: MonthDim;
  term?: Term;
}
