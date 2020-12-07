export class Course {
  code: string;
  name: string;

  cate?: string;
  style?: string;
  examineMethod?: string;
  labByTheory?: boolean;
  locationType?: string;

  static courseTooltip(course: Course): string {
    if (!course) {
      return '';
    }

    const tips = [];

    if (course.style) {
      tips.push(`课程性质：${course.style}`);
    }
    if (course.cate) {
      tips.push(`课程类别：${course.cate}`);
    }
    if (course.examineMethod) {
      tips.push(`考核方式：${course.examineMethod}`);
    }
    if (course.locationType) {
      tips.push(`场地要求：${course.locationType}`);
    }
    return tips.join('\n');
  }
}
