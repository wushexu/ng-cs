import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Schedule} from '../../model/schedule';
import {Dept} from '../../model/dept';
import {Major} from '../../model/major';
import {Class} from '../../model/class';
import {Course} from '../../model/course';
import {Teacher} from '../../model/teacher';
import {Site} from '../../model/site';

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.css']
})
export class DayScheduleComponent implements OnInit, AfterViewInit {

  schedules: Schedule[];

  displayedColumns = ['c12', 'c34', 'c56', 'c78', 'c90'];

  constructor() {
  }

  ngOnInit(): void {

    const dept: Dept = {
      id: 1,
      name: '工程技术系',
      shortName: '工程系',
      type: null
    };

    const major: Major = {
      id: 1,
      degree: '高职',
      name: '理化测试与质检技术(无损检测技术)',
      shortName: '理化',
      dept
    };

    const clazz: Class = {
      id: 1,
      classNo: 1,
      degree: '高职',
      name: '理化19-1',
      size: 40,
      year: 2019,
      major
    };

    const course: Course = {
      code: '2001367',
      cate: '专业技能课',
      examineMethod: '考查',
      labByTheory: true,
      locationType: '一体化教室',
      name: '磁粉检测法1',
      style: '必修课'
    };

    const teacher: Teacher = {
      id: 1,
      code: '03006',
      female: false,
      mail: null,
      name: '吕军',
      phone: null
    };

    const site: Site = {
      id: 1,
      capacity: 0,
      code: '90194',
      memo: null,
      multimedia: '',
      name: '信息223A',
      name4Training: '',
      roomType: '标准教室',
      shortName: null,
      dept
    };

    const schedule1: Schedule = {
      id: 1,
      date: '20201012',
      dayOfWeek: 1,
      termMonth: 9,
      termYear: 2020,
      timeEnd: 2,
      timeStart: 1,
      trainingType: 'E',
      weekno: 6,
      site,
      theClass: clazz,
      course,
      teacher,
    };

    this.schedules = [schedule1];
  }

  ngAfterViewInit(): void {
  }

}
