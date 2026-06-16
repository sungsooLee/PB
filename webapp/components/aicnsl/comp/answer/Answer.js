import {BaseModule} from "../../../cmm/BaseModule.js";

export default class Answer extends BaseModule {
    constructor(elem, data = {}) {
        super(elem);
        this.rootElem = elem;
        this.callback = null;
        this.quesData = null;
        this.srchId   = null;

        [this.quesData, this.setQuesData ] = this.useState('quesData', '');
        [this.srchId, this.setSrchId] = this.useState('srchId', '');
    }

    init(data, callback) {
        super.init(this);

        this.callback = callback;
        console.log('answer : ' , data);
        console.log('rootElem : ' , this.rootElem);
        console.log('this.callback : ' , this.callback);

        $$(this.rootElem).find('#rltCmpln').hide();
        $$(this.rootElem).find('#divThinking').hide();
        $$(this.rootElem).find('#preThinkTxt').hide();
        $$(this.rootElem).find('#likeDisLikePanel').hide();
        $$(this.rootElem).find('#btnReasonDisplay').hide();
    }

    // 응답 데이터 세팅
    appendResTxt ( quesData, data ) {
        //console.log('answer append : ', data);
    	const answerPreId ='#answerPre_' + this.quesData.quesId;
        $$(this.rootElem).show();
        $$(this.rootElem).find(answerPreId).append(data); //data.replace("\n", "")
    }
    
    // 관련 민원 세팅
    appendComplaintTxt ( data ) {
        if ( data ) {
            console.log('appendComplaintTxt! : ' , data);

            const complaintObj = data.complaint_contents.contents.split(':');
            const docTitle    = complaintObj[1].trim();
            const docContents = complaintObj[2].trim();

            $$(this.rootElem).find('#rltCmpln').show();
            $$(this.rootElem).find('#rltCmplnTtl').text(docTitle);
            $$(this.rootElem).find('#rltCmplnDtl').html(docContents);
        }
    }
    
    // AI 추론과정 세팅
    appendThinkingTxt ( quesData, data ) {
    	this.quesData = quesData;
    	if ( data ) {
    		const divId ='#divThinking_' + this.quesData.quesId;
    		const preId ='#preThinkTxt_' + this.quesData.quesId;
    		const extraId ='#extraDiv_' + this.quesData.quesId;
    		const strongId ='#strongThinkTitle_' + this.quesData.quesId;
    		console.log('divId : ' , divId);
    		console.log('preId : ' , preId);
    		console.log('extraId : ' , extraId);
    		console.log('strongId : ' , strongId);
    		
    		let divThinking = $$(this.rootElem).find(divId);
    		divThinking.show();
    		    		
    		let preThinkTxt = $$(this.rootElem).find(preId);
    		preThinkTxt.hide();
    		
    		let strongThinkTitle = $$(this.rootElem).find(strongId);
    		
    		$$(this.rootElem).find(extraId).show();
    		
    		this.registerCallback('click', divThinking, () => this.toggleThinkTxt(divThinking, preThinkTxt, strongThinkTitle, preId) );
    		//$$(this.rootElem).find('#preThinkTxt').hide();
            //$$(this.rootElem).find('#preThinkTxt').html(data);
    		preThinkTxt.append(data);
    	}
    }
    
    async toggleThinkTxt(divThinking, preThinkTxt, strongThinkTitle, preId) {
    	let toogleElement = document.getElementById(preId.replace('#',''));
    	console.log('-preId : ' , preId);
    	console.log('-toogleElement : ' , toogleElement);
    	if(toogleElement.style.display === "none") {
    		preThinkTxt.show();
    		strongThinkTitle.html('▾ AI 추론과정');
    	} else {
    		preThinkTxt.hide();
    		strongThinkTitle.html('▸ AI 추론과정');
    	}
    }

    showLikeDisLikePanel ( data, srchId ) {

        console.log('data : ' , data);
        console.log('srchId : ' , srchId);

        if ( data ) {
            this.quesData = data;
        }

        if ( srchId ) {
            this.setSrchId(srchId);
        }


        $$(this.rootElem).find('#likeDisLikePanel').css({'display': 'flex'});

        console.log('btnLike : ' , $$(this.rootElem).find('#btnLike'));

        this.registerCallback('click', $$(this.rootElem).find('#btnLike'), () => this.handleFeedbackBtnClick('1') );
        this.registerCallback('click', $$(this.rootElem).find('#btnDisLike'), () => this.handleFeedbackBtnClick('0') );
    }

    showReasonBtn (callback) {
        this.callback = callback;
        console.log('showReasonBtn!!', this.callback);

        const btnId ='#btnReasonDisplay_' + this.quesData.quesId;

        $$(this.rootElem).find(btnId).show();
        this.registerCallback('click', $$(this.rootElem).find(btnId), () => this.callback() )
    }

    hideReasonBtn ( quesId ) {
        $$(this.rootElem).find('#btnReasonDisplay_' + quesId).hide();
    }

    async handleReasonDisplayBtn () {
        console.log('handleReasonDisplayBtn!!');
        this.callback();
    }

    async handleFeedbackBtnClick ( btnType ) {

        const param = {
            nsrRstScre : btnType,
            srchId : this.srchId.value
        };

        console.log('handleFeedbackBtnClick param : ' , param );

        const res = await ApiUtils.sendPost('/api/aiCnsl/reqFeedback.json', param);
        console.log('res : ' , res );

        if (res.resultCode === '000000') {
            if ( btnType === '1') {
                $$(this.rootElem).find('#btnLike').find('.icon-thumbsup').removeClass('bg-icon-gray_1');
                $$(this.rootElem).find('#btnLike').find('.icon-thumbsup').addClass('bg-brandPrimary-blue400');
                $$(this.rootElem).find('#btnDisLike').find('.icon-thumbsdown').removeClass('bg-brandPrimary-blue400');
                $$(this.rootElem).find('#btnDisLike').find('.icon-thumbsdown').addClass('bg-icon-gray_1');
            } else {
                $$(this.rootElem).find('#btnDisLike').find('.icon-thumbsdown').removeClass('bg-icon-gray_1');
                $$(this.rootElem).find('#btnDisLike').find('.icon-thumbsdown').addClass('bg-brandPrimary-blue400');
                $$(this.rootElem).find('#btnLike').find('.icon-thumbsup').removeClass('bg-brandPrimary-blue400');
                $$(this.rootElem).find('#btnLike').find('.icon-thumbsup').addClass('bg-icon-gray_1');
            }

        }
    }


    destroy() {
        super.destroy();
    }
}