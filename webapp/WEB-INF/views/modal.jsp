<%@page contentType="text/html; character=UTF-8" pageEncoding="UTF-8"%>
<div id="cmmModal" class="micromodal-slide micromodal-slide-bottom modal" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true">

            <div class="modal__header">
                <strong id="modalTitle" class="modal__title title-large" data-bind="modalTitle">zdcfsdf</strong>
                <button id="closeBtn" type="button" class="modal__close" aria-label="팝업 닫기"></button>
            </div>

            <div class="modal__content">

                <div class="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam necessitatibus autem consequatur iusto delectus facere, corporis ut culpa atque, omnis placeat dolorem rem repellendus eligendi tempore, reprehenderit neque alias sequi.
                </div>

            </div>
            <div class="modal__footer">
                <%-- bottom-btn --%>
                <div class="bottom-btn">
                    <div class="btn-wrap">
                        <button id="btmBtn1" type="button" class="btn-large btn-outlined">버튼1</button>
                        <button id="btmBtn2" type="button" class="btn-large btn-primary">버튼2</button>
                    </div>
                </div>
                <%-- //bottom-btn --%>
            </div>
        </div>
    </div>
</div>

<div id="modal-company" class="micromodal-slide micromodal-slide-bottom micromodal-slide-bottom-full modal" aria-hidden="true">
	<div class="modal__overlay" tabindex="-1" data-micromodal-close>
		<div class="modal__container" role="dialog">
			<div class="modal__header">
				<strong class="modal__title title-large">업종 선택</strong>
				<button type="button" class="modal__close" aria-label="팝업 닫기" id="closeBtn"></button>
			</div>
			<div class="modal__content">
			</div>

			<div class="modal__footer">
				<%-- bottom-btn --%>
				<div class="bottom-btn">
					<div class="btn-wrap">
						<button type="button" id="selectBtn" class="btn-large btn-primary">선택완료</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="selectModal" class="micromodal-slide micromodal-slide-select modal" aria-hidden="true">
	<div class="modal__overlay" tabindex="-1" data-micromodal-close>
		<div class="modal__container" role="dialog" aria-modal="true">
			<div class="modal__header modal__header__alert">
				<strong id="selModalTitle" class="modal__title title-large" data-bind="modalTitle">zdcfsdf</strong>
				<button id="closeBtn2" type="button" class="modal__close" aria-label="팝업 닫기" data-micromodal-close=""></button>
			</div>
			<div class="modal__content">
				<div class="content content-fluid">
					<div class="select-option">
						<ul>
							<li><button type="button"><span>키맨</span></button></li>
							<li><button type="button"><span>내가 등록한 명함</span></button></li>
							<li><button type="button"><span>내가 등록한 명함 내가 등록한 명함 내가 등록한 명함 내가 등록한 명함</span></button></li>
							<li class="select-active"><button type="button" aria-label="선택됨"><span>내가 등록한 명함 내가 등록한 명함 내가 등록한 명함 내가 등록한 명함</span></button></li>
							<li class="select-active"><button type="button" aria-label="선택됨"><span>PB 1팀</span></button></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="menuModal" class="micromodal-slide micromodal-slide-left modal" aria-hidden="true">
	<div class="modal__overlay" tabindex="-1" data-micromodal-close>
		<div class="modal__container" role="dialog" aria-modal="true">

			<div class="main-header">
				<div class="left">
					<button id="btnHome" type="button" class="header-btn" aria-label="홈으로 가기"><i class="i-home"></i></button>
				</div>
				<div class="center">
					<strong>메뉴</strong>
				</div>
				<div class="right">
					<button id="btnClose" type="button" class="header-btn" aria-label="메뉴 닫기" data-micromodal-close><i class="i-close"></i></button>
				</div>
			</div>

			<div class="modal__content">
				<%-- //gnb --%>
			</div>
		</div>
	</div>
</div>

