import {Dept} from './dept';

export class Site {
  id: number;
  code: string;
  name: string;

  shortName?: string;
  type?: string;
  roomType?: string;
  capacity?: number;
  multimedia?: string;
  name4Training?: string;
  memo?: string;

  deptId?: number;
  dept?: Dept;

  static tooltip(room: Classroom): string {
    if (!room) {
      return '';
    }
    const tips = [];
    if (room.roomType) {
      tips.push(`教室类别：${room.roomType}`);
    }
    if (room.capacity) {
      tips.push(`座位数：${room.capacity}`);
    }
    if (room.multimedia) {
      tips.push(`多媒体：是`);
    }
    return tips.join('\n');
  }
}

export declare type Classroom = Site;
