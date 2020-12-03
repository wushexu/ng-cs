import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {Course} from '../model/course';
import {Teacher} from '../model/teacher';


@Injectable()
export class TeacherCourseService {

  constructor(protected http: HttpClient) {
    // let apiBase = environment.apiBase || '';
    // this.baseUrl = `${apiBase}/profile`;
  }

  getAllTeachers(): Observable<Teacher[]> {

    return of([
      {
        id: 1,
        code: '03006',
        name: '吕军吕军'
      },
      {
        id: 2,
        code: '11057',
        name: '高雪艳'
      },
      {
        id: 3,
        code: '17538',
        name: '杨霖'
      },
      {
        id: 4,
        code: '03004',
        name: '胡春亮'
      },
      {
        id: 5,
        code: '03003',
        name: '赵婉芳'
      },
      {
        id: 6,
        code: '17650',
        name: '李发昇'
      },
      {
        id: 7,
        code: '13001',
        name: '刘兆华'
      },
      {
        id: 8,
        code: '11261',
        name: '赵秀强'
      },
      {
        id: 9,
        code: '15021',
        name: '李晓凤'
      },
      {
        id: 10,
        code: '11265',
        name: '王颖'
      },
      {
        id: 11,
        code: '11095',
        name: '张朝伟'
      },
      {
        id: 12,
        code: '13006',
        name: '李欣'
      },
      {
        id: 13,
        code: '17432',
        name: '齐向前'
      },
      {
        id: 14,
        code: '12008',
        name: '王曦'
      },
      {
        id: 15,
        code: '19046',
        name: '侯磊'
      },
      {
        id: 16,
        code: '17569',
        name: '朱煦'
      },
      {
        id: 17,
        code: '11093',
        name: '史连峰'
      },
      {
        id: 18,
        code: '04007',
        name: '张艳'
      },
      {
        id: 19,
        code: '17633',
        name: '丁柱'
      },
      {
        id: 20,
        code: '04013',
        name: '王文清'
      },
      {
        id: 21,
        code: '11012',
        name: '王明春'
      },
      {
        id: 22,
        code: '11231',
        name: '孟庆宝'
      },
      {
        id: 23,
        code: '19004',
        name: '刘俊辉'
      },
      {
        id: 24,
        code: '17402',
        name: '郭立娜'
      },
      {
        id: 25,
        code: '17596',
        name: '朱俐俐'
      },
      {
        id: 26,
        code: '17948',
        name: '吴钢'
      },
      {
        id: 27,
        code: '04014',
        name: '杜向然'
      },
      {
        id: 28,
        code: '11277',
        name: '郭皓'
      },
      {
        id: 29,
        code: '13036',
        name: '张思斯'
      },
      {
        id: 30,
        code: '17570',
        name: '燕骥超'
      },
      {
        id: 31,
        code: '11240',
        name: '杨国强'
      },
      {
        id: 32,
        code: '18020',
        name: '石磊（大）'
      },
      {
        id: 33,
        code: '17403',
        name: '李亚梅'
      },
      {
        id: 34,
        code: '17415',
        name: '王永杰'
      },
      {
        id: 35,
        code: '17666',
        name: '赵武尔'
      },
      {
        id: 36,
        code: '17550',
        name: '冷梅芳'
      },
      {
        id: 37,
        code: '01011',
        name: '陈岗'
      },
      {
        id: 38,
        code: '02016',
        name: '张弘'
      },
      {
        id: 39,
        code: '17543',
        name: '时婷婷'
      },
      {
        id: 40,
        code: '04005',
        name: '李建刚'
      },
      {
        id: 41,
        code: '04006',
        name: '王英'
      },
      {
        id: 42,
        code: '17368',
        name: '马冉冉'
      },
      {
        id: 43,
        code: '06012',
        name: '王丽军'
      },
      {
        id: 44,
        code: '17581',
        name: '周璐'
      },
      {
        id: 45,
        code: '17656',
        name: '张哲'
      },
      {
        id: 46,
        code: '17256',
        name: '闫玉荣'
      },
      {
        id: 47,
        code: '17609',
        name: '倪峰'
      },
      {
        id: 48,
        code: '17473',
        name: '金柳柳'
      },
      {
        id: 49,
        code: '17401',
        name: '郝雪洁'
      },
      {
        id: 50,
        code: '17547',
        name: '张金伟'
      },
      {
        id: 51,
        code: '17662',
        name: '张宇诺'
      },
      {
        id: 52,
        code: '11247',
        name: '闫高杰'
      },
      {
        id: 53,
        code: '05019',
        name: '张敏（经贸）'
      },
      {
        id: 54,
        code: '05001',
        name: '曹晓发'
      },
      {
        id: 55,
        code: '11293',
        name: '于国栋'
      },
      {
        id: 56,
        code: '17250',
        name: '陈思远'
      },
      {
        id: 57,
        code: '17456',
        name: '孙瑛'
      },
      {
        id: 58,
        code: '05013',
        name: '李建颖'
      },
      {
        id: 59,
        code: '15005',
        name: '刘宝森'
      },
      {
        id: 60,
        code: '05004',
        name: '张馥通'
      },
      {
        id: 61,
        code: '17548',
        name: '袁晖'
      },
      {
        id: 62,
        code: '11050',
        name: '王鹤翔'
      },
      {
        id: 63,
        code: '17537',
        name: '齐亚平'
      },
      {
        id: 64,
        code: '17407',
        name: '张楠'
      },
      {
        id: 65,
        code: '17613',
        name: '刘杨'
      },
      {
        id: 66,
        code: '17433',
        name: '闫岩'
      },
      {
        id: 67,
        code: '18008',
        name: '魏玮'
      },
      {
        id: 68,
        code: '17249',
        name: '薛玲'
      },
      {
        id: 69,
        code: '05022',
        name: '张继业'
      },
      {
        id: 70,
        code: '11053',
        name: '贾军'
      },
      {
        id: 71,
        code: '05003',
        name: '张微娜'
      },
      {
        id: 72,
        code: '13019',
        name: '樊薇'
      },
      {
        id: 73,
        code: '17630',
        name: '陈俊良'
      },
      {
        id: 74,
        code: '17507',
        name: '赵海霞'
      },
      {
        id: 75,
        code: '17446',
        name: '王婕霖'
      },
      {
        id: 76,
        code: '17610',
        name: '孙丹'
      },
      {
        id: 77,
        code: '17540',
        name: '李浩然'
      },
      {
        id: 78,
        code: '17406',
        name: '范明'
      },
      {
        id: 79,
        code: '17343',
        name: '徐黎明'
      },
      {
        id: 80,
        code: '11246',
        name: '张明齐'
      },
      {
        id: 81,
        code: '17636',
        name: '刘文霞'
      },
      {
        id: 82,
        code: '17426',
        name: '李会卿'
      },
      {
        id: 83,
        code: '17612',
        name: '李婧'
      },
      {
        id: 84,
        code: '17536',
        name: '赵倩'
      },
      {
        id: 85,
        code: '17952',
        name: '姜川'
      },
      {
        id: 86,
        code: '01009',
        name: '贺东'
      },
      {
        id: 87,
        code: '05016',
        name: '方煜'
      },
      {
        id: 88,
        code: '17629',
        name: '何知秋'
      },
      {
        id: 89,
        code: '17529',
        name: '欧阳万钧'
      },
      {
        id: 90,
        code: '17611',
        name: '孙琳'
      },
      {
        id: 91,
        code: '01007',
        name: '郑爱红'
      },
      {
        id: 92,
        code: '17642',
        name: '张玉娜'
      },
      {
        id: 93,
        code: '11212',
        name: '石岩'
      },
      {
        id: 94,
        code: '17640',
        name: '王丽丽'
      },
      {
        id: 95,
        code: '17637',
        name: '张雪艳'
      },
      {
        id: 96,
        code: '02004',
        name: '李晗芳'
      },
      {
        id: 97,
        code: '06007',
        name: '李锦'
      },
      {
        id: 98,
        code: '16005',
        name: '李琳'
      },
      {
        id: 99,
        code: '17957',
        name: '周圩'
      },
      {
        id: 100,
        code: '18022',
        name: '刘淑兰'
      },
      {
        id: 101,
        code: '17414',
        name: '谢丹'
      },
      {
        id: 102,
        code: '17413',
        name: '崔建'
      },
      {
        id: 103,
        code: '17362',
        name: '吴小龙'
      },
      {
        id: 104,
        code: '17369',
        name: '谢君'
      },
      {
        id: 105,
        code: '17412',
        name: '赵然'
      },
      {
        id: 106,
        code: '17354',
        name: '王骏'
      },
      {
        id: 107,
        code: '17546',
        name: '徐通'
      },
      {
        id: 108,
        code: '17600',
        name: '张建成'
      },
      {
        id: 109,
        code: '17366',
        name: '宋中辉'
      },
      {
        id: 110,
        code: '17956',
        name: '刘飞'
      },
      {
        id: 111,
        code: '11300',
        name: '谢佳辉'
      },
      {
        id: 112,
        code: '17353',
        name: '张雪莲'
      },
      {
        id: 113,
        code: '16003',
        name: '李艳'
      },
      {
        id: 114,
        code: '11230',
        name: '胡顺利'
      },
      {
        id: 115,
        code: '17410',
        name: '张芃然'
      },
      {
        id: 116,
        code: '17646',
        name: '王金慧'
      },
      {
        id: 117,
        code: '15058',
        name: '张琪'
      },
      {
        id: 118,
        code: '17282',
        name: '张颖衍'
      },
      {
        id: 119,
        code: '17319',
        name: '陈硕'
      },
      {
        id: 120,
        code: '11297',
        name: '吴婷'
      },
      {
        id: 121,
        code: '11070',
        name: '李肖楠'
      },
      {
        id: 122,
        code: '01016',
        name: '徐丽'
      },
      {
        id: 123,
        code: '15003',
        name: '缪劲松'
      },
      {
        id: 124,
        code: '17210',
        name: '于祯妮'
      },
      {
        id: 125,
        code: '17335',
        name: '崔怀荣'
      },
      {
        id: 126,
        code: '11259',
        name: '胡微'
      },
      {
        id: 127,
        code: '17663',
        name: '杨敏'
      },
      {
        id: 128,
        code: '17631',
        name: '张申'
      },
      {
        id: 129,
        code: '17564',
        name: '陶静'
      },
      {
        id: 130,
        code: '17453',
        name: '崔波'
      },
      {
        id: 131,
        code: '01014',
        name: '王青'
      },
      {
        id: 132,
        code: '10001',
        name: '王战'
      },
      {
        id: 133,
        code: '11096',
        name: '刘艳'
      },
      {
        id: 134,
        code: '17465',
        name: '宁海博'
      },
      {
        id: 135,
        code: '06014',
        name: '白璐'
      },
      {
        id: 136,
        code: '11011',
        name: '武宝林'
      },
      {
        id: 137,
        code: '06016',
        name: '李超（女）'
      },
      {
        id: 138,
        code: '11109',
        name: '李威'
      },
      {
        id: 139,
        code: '06010',
        name: '张敏'
      },
      {
        id: 140,
        code: '11236',
        name: '蒋瑛珺'
      },
      {
        id: 141,
        code: '06003',
        name: '吴菲'
      },
      {
        id: 142,
        code: '11275',
        name: '康向阳'
      },
      {
        id: 143,
        code: '17252',
        name: '程文阁'
      },
      {
        id: 144,
        code: '15033',
        name: '张如凯'
      },
      {
        id: 145,
        code: '11049',
        name: '周章海'
      },
      {
        id: 146,
        code: '11238',
        name: '熊海生'
      },
      {
        id: 147,
        code: '11068',
        name: '宋秀萍'
      },
      {
        id: 148,
        code: '02013',
        name: '张世良'
      },
      {
        id: 149,
        code: '17651',
        name: '杨静'
      },
      {
        id: 150,
        code: '17308',
        name: '张良'
      },
      {
        id: 151,
        code: '11098',
        name: '麻荔波'
      },
      {
        id: 152,
        code: '11037',
        name: '苏天放'
      },
      {
        id: 153,
        code: '11294',
        name: '刘宏涛'
      },
      {
        id: 154,
        code: '12023',
        name: '郑罗坤'
      },
      {
        id: 155,
        code: '11097',
        name: '吴泽亮'
      },
      {
        id: 156,
        code: '15035',
        name: '任振振'
      },
      {
        id: 157,
        code: '12003',
        name: '赵宇'
      },
      {
        id: 158,
        code: '11086',
        name: '黄跃华'
      },
      {
        id: 159,
        code: '12005',
        name: '李超（男）'
      },
      {
        id: 160,
        code: '11035',
        name: '兰洋'
      },
      {
        id: 161,
        code: '02002',
        name: '吴金龙'
      },
      {
        id: 162,
        code: '11201',
        name: '苑靖国'
      },
      {
        id: 163,
        code: '06009',
        name: '黄晓平'
      },
      {
        id: 164,
        code: '17539',
        name: '高越虹'
      },
      {
        id: 165,
        code: '11295',
        name: '宁文才'
      },
      {
        id: 166,
        code: '11107',
        name: '张海奉'
      },
      {
        id: 167,
        code: '19032',
        name: '韩俊欢'
      },
      {
        id: 168,
        code: '09031',
        name: '王惠林'
      },
      {
        id: 169,
        code: '05017',
        name: '郭会玲'
      },
      {
        id: 170,
        code: '11253',
        name: '高秋颖'
      },
      {
        id: 171,
        code: '06004',
        name: '吴质洁'
      },
      {
        id: 172,
        code: '11021',
        name: '杨信红'
      },
      {
        id: 173,
        code: '11208',
        name: '刘磊'
      },
      {
        id: 174,
        code: '02007',
        name: '王雅涛'
      },
      {
        id: 175,
        code: '19041',
        name: '孙李宏'
      },
      {
        id: 176,
        code: '11232',
        name: '马庆军'
      },
      {
        id: 177,
        code: '19039',
        name: '马喜仲'
      },
      {
        id: 178,
        code: '11041',
        name: '陈祥光'
      },
      {
        id: 179,
        code: '11218',
        name: '吴国强'
      },
      {
        id: 180,
        code: '11221',
        name: '李锡坤'
      },
      {
        id: 181,
        code: '13016',
        name: '许文胜'
      },
      {
        id: 182,
        code: '15001',
        name: '刘泽宇'
      },
      {
        id: 183,
        code: '17687',
        name: '张红兵'
      },
      {
        id: 184,
        code: '11043',
        name: '葛涛'
      },
      {
        id: 185,
        code: '11044',
        name: '贾富'
      },
      {
        id: 186,
        code: '15049',
        name: '赵桂华'
      },
      {
        id: 187,
        code: '17287',
        name: '张以贵'
      },
      {
        id: 188,
        code: '19003',
        name: '李亮宽'
      },
      {
        id: 189,
        code: '17420',
        name: '吴少森'
      },
      {
        id: 190,
        code: '15031',
        name: '李菲菲'
      },
      {
        id: 191,
        code: '11079',
        name: '郭国杰'
      },
      {
        id: 192,
        code: '06015',
        name: '王冉然'
      },
      {
        id: 193,
        code: '11038',
        name: '赫永霞'
      },
      {
        id: 194,
        code: '11010',
        name: '王坤龙'
      },
      {
        id: 195,
        code: '17305',
        name: '张子钊'
      },
      {
        id: 196,
        code: '01012',
        name: '张丛林'
      },
      {
        id: 197,
        code: '19014',
        name: '于志民'
      },
      {
        id: 198,
        code: '19001',
        name: '冯涛'
      },
      {
        id: 199,
        code: '11296',
        name: '杨冬'
      },
      {
        id: 200,
        code: '12013',
        name: '轮机系待定1'
      },
      {
        id: 201,
        code: '15010',
        name: '杨玉坤'
      },
      {
        id: 202,
        code: '15002',
        name: '杨俊峰'
      },
      {
        id: 203,
        code: '19035',
        name: '庞加茂'
      },
      {
        id: 204,
        code: '02015',
        name: '刘刚'
      },
      {
        id: 205,
        code: '17471',
        name: '郑冠超'
      },
      {
        id: 206,
        code: '01017',
        name: '刘贞贤'
      },
      {
        id: 207,
        code: '02027',
        name: '马志超'
      },
      {
        id: 208,
        code: '11045',
        name: '徐燕铭'
      },
      {
        id: 209,
        code: '11256',
        name: '昃丽娜'
      },
      {
        id: 210,
        code: '13005',
        name: '杨春英'
      },
      {
        id: 211,
        code: '11255',
        name: '张学勇'
      },
      {
        id: 212,
        code: '01002',
        name: '侯顺利'
      },
      {
        id: 213,
        code: '17552',
        name: '王双杰'
      },
      {
        id: 214,
        code: '17969',
        name: '李男'
      },
      {
        id: 215,
        code: '17679',
        name: '呼阳'
      },
      {
        id: 216,
        code: '03001',
        name: '高松'
      },
      {
        id: 217,
        code: '01003',
        name: '翟维红'
      },
      {
        id: 218,
        code: '01020',
        name: '梁忠先'
      },
      {
        id: 219,
        code: '11106',
        name: '宋梦华'
      },
      {
        id: 220,
        code: '17670',
        name: '郭志强'
      },
      {
        id: 221,
        code: '06018',
        name: '张小兵'
      },
      {
        id: 222,
        code: '17618',
        name: '董树伟'
      },
      {
        id: 223,
        code: '17658',
        name: '吴小呈'
      },
      {
        id: 224,
        code: '18012',
        name: '赵秀花'
      },
      {
        id: 225,
        code: '04004',
        name: '吴士杰'
      },
      {
        id: 226,
        code: '17628',
        name: '张金凤'
      },
      {
        id: 227,
        code: '04015',
        name: '李强'
      },
      {
        id: 228,
        code: '17657',
        name: '张怀亮'
      },
      {
        id: 229,
        code: '17676',
        name: '董耀明'
      },
      {
        id: 230,
        code: '17306',
        name: '林海燕'
      },
      {
        id: 231,
        code: '11013',
        name: '冯彩静'
      },
      {
        id: 232,
        code: '04001',
        name: '吴树锦'
      },
      {
        id: 233,
        code: '06020',
        name: '刘晓杰'
      },
      {
        id: 234,
        code: '17683',
        name: '张雅欣'
      },
      {
        id: 235,
        code: '17468',
        name: '周宏宇'
      },
      {
        id: 236,
        code: '17653',
        name: '王跃强'
      },
      {
        id: 237,
        code: '17535',
        name: '王雯怡'
      },
      {
        id: 238,
        code: '17371',
        name: '张瑾'
      },
      {
        id: 239,
        code: '04008',
        name: '高超'
      },
      {
        id: 240,
        code: '06022',
        name: '曹珅'
      },
      {
        id: 241,
        code: '17617',
        name: '李享'
      },
      {
        id: 242,
        code: '04003',
        name: '石琳'
      },
      {
        id: 243,
        code: '17680',
        name: '李彬'
      },
      {
        id: 244,
        code: '17605',
        name: '杨铁军'
      },
      {
        id: 245,
        code: '17621',
        name: '龚振华'
      },
      {
        id: 246,
        code: '05021',
        name: '周艳'
      },
      {
        id: 247,
        code: '17644',
        name: '阮香颖'
      },
      {
        id: 248,
        code: '11301',
        name: '杨丽华'
      },
      {
        id: 249,
        code: '17661',
        name: '孔繁玲'
      },
      {
        id: 250,
        code: '05018',
        name: '陈静'
      },
      {
        id: 251,
        code: '14001',
        name: '汪蓄'
      },
      {
        id: 252,
        code: '11092',
        name: '赵志刚'
      },
      {
        id: 253,
        code: '17674',
        name: '朱向阳'
      },
      {
        id: 254,
        code: '17638',
        name: '杨方圆'
      },
      {
        id: 255,
        code: '11214',
        name: '武莉'
      },
      {
        id: 256,
        code: '17585',
        name: '冯熳'
      },
      {
        id: 257,
        code: '17422',
        name: '杨玉秀'
      },
      {
        id: 258,
        code: '17639',
        name: '周建启'
      },
      {
        id: 259,
        code: '06005',
        name: '刘蕾'
      },
      {
        id: 260,
        code: '17635',
        name: '杨文侠'
      },
      {
        id: 261,
        code: '17685',
        name: '赵侠'
      },
      {
        id: 262,
        code: '17951',
        name: '刘童'
      },
      {
        id: 263,
        code: '05002',
        name: '谭刘元'
      },
      {
        id: 264,
        code: '17464',
        name: '贾明然'
      },
      {
        id: 265,
        code: '17678',
        name: '范成龙'
      },
      {
        id: 266,
        code: '17423',
        name: '张婷'
      },
      {
        id: 267,
        code: '17586',
        name: '李子健'
      },
      {
        id: 268,
        code: '17555',
        name: '孙佩玲'
      },
      {
        id: 269,
        code: '17506',
        name: '李秀凤'
      },
      {
        id: 270,
        code: '17673',
        name: '易晓蓉'
      },
      {
        id: 271,
        code: '06017',
        name: '姚茜'
      },
      {
        id: 272,
        code: '17953',
        name: '姜灿'
      },
      {
        id: 273,
        code: '17588',
        name: '董英杰'
      },
      {
        id: 274,
        code: '17565',
        name: '邓珂'
      },
      {
        id: 275,
        code: '11229',
        name: '杨珍'
      },
      {
        id: 276,
        code: '18026',
        name: '阎妍'
      },
      {
        id: 277,
        code: '17440',
        name: '黄婧'
      },
      {
        id: 278,
        code: '06021',
        name: '李宏娟'
      },
      {
        id: 279,
        code: '17684',
        name: '赵景帅'
      },
      {
        id: 280,
        code: '17349',
        name: '张荣华'
      },
      {
        id: 281,
        code: '15009',
        name: '强璐璐'
      },
      {
        id: 282,
        code: '12032',
        name: '白晶'
      },
      {
        id: 283,
        code: '15029',
        name: '兰佩莉'
      },
      {
        id: 284,
        code: '18027',
        name: '刘美廷'
      },
      {
        id: 285,
        code: '17681',
        name: '宋林慧'
      },
      {
        id: 286,
        code: '15054',
        name: '陈宏伟'
      },
      {
        id: 287,
        code: '17409',
        name: '蒋博'
      },
      {
        id: 288,
        code: '02014',
        name: '陈永利'
      },
      {
        id: 289,
        code: '18005',
        name: '刘伟'
      },
      {
        id: 290,
        code: '17682',
        name: '张鑫'
      },
      {
        id: 291,
        code: '12026',
        name: '姜淑亮'
      },
      {
        id: 292,
        code: '04002',
        name: '杨钢'
      },
      {
        id: 293,
        code: '17307',
        name: '田建全'
      },
      {
        id: 294,
        code: '17671',
        name: '孟涛'
      },
      {
        id: 295,
        code: '17292',
        name: '任广利'
      },
      {
        id: 296,
        code: '17428',
        name: '闵锐'
      },
      {
        id: 297,
        code: '17481',
        name: '姜璠'
      },
      {
        id: 298,
        code: '17677',
        name: '徐慧超'
      },
      {
        id: 299,
        code: '06011',
        name: '宋冬冬'
      },
      {
        id: 300,
        code: '11081',
        name: '张艳（轮机工程）'
      },
      {
        id: 301,
        code: '17669',
        name: '王天坤'
      },
      {
        id: 302,
        code: '11024',
        name: '孙忠敏'
      },
      {
        id: 303,
        code: '11291',
        name: '刘晓阳'
      },
      {
        id: 304,
        code: '09004',
        name: '韩东红'
      },
      {
        id: 305,
        code: '03007',
        name: '王文彦'
      },
      {
        id: 306,
        code: '17686',
        name: '王艳'
      },
      {
        id: 307,
        code: '17652',
        name: '袁彦捷'
      },
      {
        id: 308,
        code: '19045',
        name: '苏桂娟'
      },
      {
        id: 309,
        code: '01005',
        name: '曹媛'
      },
      {
        id: 310,
        code: '02022',
        name: '杜金印'
      },
      {
        id: 311,
        code: 'T林树立',
        name: '林树立'
      },
      {
        id: 312,
        code: 'T王建明',
        name: '王建明'
      },
      {
        id: 313,
        code: 'T李新海',
        name: '李新海'
      },
      {
        id: 314,
        code: 'T张风城',
        name: '张风城'
      },
      {
        id: 315,
        code: 'T邵大群',
        name: '邵大群'
      },
      {
        id: 316,
        code: 'T姚宝庆',
        name: '姚宝庆'
      },
      {
        id: 317,
        code: 'T韩迪',
        name: '韩迪'
      },
      {
        id: 318,
        code: 'T孝建伟',
        name: '孝建伟'
      }
    ]);
  }

  filterTeachers(params: { size?: number, key?: string } = {}): Observable<Teacher[]> {
    // tslint:disable-next-line:prefer-const
    let {size, key} = params;
    if (typeof size === 'undefined') {
      size = 10;
    }

    // const numericKey = /\d+/.test(key);

    return this.getAllTeachers().pipe(
      map(teachers => {
        const filtered = [];
        let count = 0;
        for (const teacher of teachers) {
          if (!key || teacher.name.indexOf(key) >= 0 || teacher.code.indexOf(key) >= 0) {
            filtered.push(teacher);
            count++;
            if (size > 0 && count >= size) {
              break;
            }
          }
        }
        return filtered;
      })
    );
  }

  getTeacherByIdc(idc: string): Observable<Teacher> {
    return of({
      id: 255,
      code: '11214',
      name: '武莉'
    });
  }

  getCourses(): Observable<Course[]> {


    return of([]);
  }

}
