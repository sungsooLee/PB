import { BaseModule } from '../../../cmm/BaseModule.js';


export default class Days extends BaseModule {
    constructor(elem) {
        super(elem);

        [this.now, this.setNow] = this.useState('now', '');
        [this.formatter, this.setFormatter] = this.useState('formatter', 'YYYY-MM-DD');
        [this.chngFormDay, this.setChngFormDay] = this.useState('chngFormDay', '');

        [this.startDt, this.setStartDt] = this.useState('startDt', '');
        [this.endDt, this.setEndDt] = this.useState('endDt', '');
        [this.diffDay, this.setDiffDay] = this.useState('diffDay', 0);

        [this.refDay, this.setRefDay] = this.useState('refDay', '');
        [this.plusDay, this.setPlusDay] = this.useState('plusDay', 0);
        [this.resDay, this.setResDay] = this.useState('resDay', '');

        [this.refDay2, this.setRefDay2] = this.useState('refDay2', '');
        [this.minusDay, this.setMinusDay] = this.useState('minusDay', 0);
        [this.resDay2, this.setResDay2] = this.useState('resDay2', '');


    }

    init() {
        super.init(this);

        this.bind('formatter', $$('#input1'), 'input');
        this.bind('chngFormDay', $$('#input2'), 'input');
        this.bind('startDt', $$('#startDt'), 'input');
        this.bind('endDt', $$('#endDt'), 'input');
        this.bind('diffDay', $$('#diffDay'), 'input');
        this.bind('refDay', $$('#refDt'), 'input');
        this.bind('plusDay', $$('#plusDay'), 'input');
        this.bind('resDay', $$('#resultDay'), 'input');
        this.bind('refDay2', $$('#refDt2'), 'input');
        this.bind('minusDay', $$('#minusDay'), 'input');
        this.bind('resDay2', $$('#resultDay2'), 'input');


        const now = dayjs();
        this.setNow(now);
        console.log('now : ' , now.format(this.formatter.value));
        this.setChngFormDay(now.format(this.formatter.value));
        this.setStartDt(now.format(this.formatter.value));
        this.setEndDt(now.add(7, 'day').format(this.formatter.value));
        this.setRefDay(now.format(this.formatter.value));
        this.setRefDay2(now.format(this.formatter.value));

        this.registerCallback('click', $$('#btn1'), this.formatChange);
        this.registerCallback('click', $$('#btn2'), this.calcDiff);
        this.registerCallback('click', $$('#btn3'), this.addDays);
        this.registerCallback('click', $$('#btn4'), this.subtractDays);
    }

    formatChange () {
        this.setChngFormDay(this.now.value.format(this.formatter.value));
    }

    calcDiff () {

        const stDt = dayjs(this.startDt.value);
        const edDt = dayjs(this.endDt.value);

        const diffDay = edDt.diff(stDt, 'day');
        console.log('diffDay : ', diffDay);

        this.setDiffDay(diffDay);
    }

    addDays () {
        const refDt = dayjs(this.refDay, 'day');

        const plusNum = this.plusDay.value;
        console.log('plusNum : ' , plusNum);
        this.setResDay(refDt.add(plusNum, 'day').format(this.formatter.value));
    }

    subtractDays () {

        const refDt = dayjs(this.refDay2, 'day');

        const minusNum = this.minusDay.value;
        console.log('minusNum : ' , minusNum);
        this.setResDay2(refDt.subtract(minusNum, 'day').format(this.formatter.value));
    }

    destroy() {
        super.init(this);
    }
}