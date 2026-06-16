<%-- main --%>
<main>
  <%-- header --%>
  <jsp:include page="../loading.jsp" />
  <header>
    <div id="basicHeader" class="main-header" style="display : none">
      <div class="left">
        <button type="button" id="backBtn" class="header-btn" aria-label="뒤로 가기"><i class="i-back"></i></button>
        <button type="button" id="homeBtn" class="header-logo-btn" aria-label="PB WON"></button>
      </div>
      <div class="center">
        <h1 id="basicHeaderTitle">Title</h1>
        <h1 id="mainHeaderTitle"><span class="blind">PBWON 홈</span></h1>
      </div>
      <div class="right">
        <button type="button" id="fvrtBtn" class="header-btn" aria-label="관심 펀드"><i class="i-favorite"></i></button>
        <button type="button" id="menuBtn" class="header-btn" aria-label="메뉴 열기"><i class="i-menu"></i></button>
      </div>
    </div>
  </header>
  <%-- //header --%>

  <%-- main-inner --%>
  <%-- content start --%>
  <div class="main-inner">
    <%-- container --%>
    <div id="container">

      <%-- content --%>
      <div class="content">
        

      </div>
      <%-- content --%>
    </div>
    <%-- container --%>
  </div>
  <%-- //content end --%>
  <%-- //main-inner --%>


  <%-- bottom-btn --%>
  <div id="layoutBtnDiv" class="bottom-btn" style="display : none">
    <div class="btn-wrap">
      <button id="layoutBtn1" type="button" class="btn-large btn-outlined">등록</button>
      <button id="layoutBtn2" type="button" class="btn-large btn-primary"><i class="ico-check"></i><span>공유</span></button>
    </div>
  </div>
  <%-- //bottom-btn --%>

  <%-- main --%>
  <div id="mainBtnDiv" class="bottom-btn bottom-btn-main" style="display : none">
    <div class="main-nav">
      <ul>
        <li id="btnFund" class="list01">
          <a href="javascript:void(0);">
            <div class="icon"></div>
            <strong>상품</strong>
          </a>
        </li>
        <li id="btnInvInf" class="list02">
          <a href="javascript:void(0);">
            <div class="icon"></div>
            <strong>투자정보</strong>
          </a>
        </li>
        <li id="btnHome" class="list03 is-current">
          <a href="javascript:void(0);" aria-current="page">
            <div class="icon"></div>
            <strong>홈</strong>
          </a>
        </li>
        <li id="btnFnc" class="list04">
          <a href="javascript:void(0);">
            <div class="icon"></div>
            <strong>금융+</strong>
          </a>
        </li>
        <li id="btnNoti" class="list05">
          <a href="javascript:void(0);">
            <div class="icon"></div>
            <strong>알림</strong>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <%-- main --%>
  
  <%-- financial news --%>
  <div id="fncNewsBtnDiv" class="bottom-btn" style="display : none">
  	<div id="fncNewsPlayer" class="financial-player">
	  	<div class="financial-player-top">
	  		<div class="financial-player-title">
	  			<div class="financial-player-title">
					<i class="icon-only icon-24 icon-radio bg-icon-white"></i>
					<strong id="playerTxt"></strong>
					<span class="soundwave-container">
						<span class="bar"></span>
						<span class="bar"></span>
						<span class="bar"></span>
					</span>
				</div>
	  		</div>
	  		<div class="financial-player-controller">
	  			<button type="button" aria-label="재생" id="ttsPlay">
	  				<i class="icon-only icon-24 icon-player-play bg-icon-white"></i>
	  			</button>
	  			<button type="button" aria-label="일시정지" id="ttsPause">
	  				<i class="icon-only icon-24 icon-player-pause bg-icon-white"></i>
	  			</button>
	  			<button type="button" aria-label="이전" id="ttsPrev">
	  				<i class="icon-only icon-24 icon-player-prev bg-icon-white"></i>
	  			</button>
	  			<button type="button" aria-label="다음" id="ttsNext">
	  				<i class="icon-only icon-24 icon-player-next bg-icon-white"></i>
	  			</button>
	  		</div>
	  	</div>
	  	<div id="fncNewsPlayerBottom" class="financial-player-bottom" style="display : none">
			<p></p>
		</div>
  	</div>
  </div>
  <%-- //financial news --%>

</main>

<%-- main --%>
