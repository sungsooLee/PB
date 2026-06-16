/* eslint-disable */
var MARKDOWN_TOC_DATA = [
  {
    "gid": 1,
    "name": "intro",
    "label": "Introduction",
    "children": [
      {
        "cid": 1,
        "sid": "feature",
        "name": "feature",
        "label": "IBChart 개요",
        "data": {
          "body": "`IBChart`는 웹 개발 환경에 가장 적합하도록 설계된 차트 컴포넌트입니다. 웹 환경에서 차트를 표현할 수 있고, 웹 서버 상의 동적 데이터를 조회 가능하게 함으로써 사용자가 선택한 조건에 맞는 차트를 보여줄 수 있습니다. ## 1. IBChart 특징 * `크로스 브라우징`, `크로스 플랫폼` 지원 * 별도의 개발툴이 필요 없는 순수 `javascript` 기반 컴포넌트 * 모든 주요 브라우저 및 운영체제에 일관된 배포 * 개발 생산성을 대폭 향상시킬 수 있는 개발 방안과 환경 제공 * 메시지 파일 형식을 통한 다국어 지원 ## 2. IBChart 적용 대상 업무 * 조회된 데이터를 그래픽컬하게 보여줄 필요가 있는 업무 `데이터 시각화` * 기존 C/S 환경과 비슷한 구조로 업무 환경을 웹으로 변경하고자 하는 업무 ## 3. IBChart 주요 기능 ### *다양한 차트 지원* * 일반적으로 많이 쓰이는 칼럼 차트, 꺽은선 차트 등을 비롯하여 바, 영역, 도넛 차트 등을 지원합니다. ![s](/assets/imgs/ibchart-feature.png) [다양한 차트 타입] ### *편리한 개발 방식 제공* * IBChart는 기존 웹 개발자들에게 익숙한 javascript를 이용하여 차트의 속성을 설정 및 제어 할 수 있습니다. ### *풍부한 디자인 옵션* * 차트 내의 개별 속성의 색상 선택 및 그라데이션 등의 지정이 가능하여 각각 웹 디자인 환경에 맞춰 차트를 표현할 수 있습니다. ### *다양한 특수 효과 지원* * IBChart는 차트 요소의 다양한 디자인 속성 이외에 차트를 조금 더 화려하게 보일 수 있는 특수 효과를 제공합니다. ![s](/assets/imgs/ibchart-feature2.png) [영역설정 효과와 그림자효과] ### *차트 확대 기능* * 수많은 데이터를 차트로 표현하게 되면 데이터의 식별이 어려워집니다. IBChart는 이러한 경우에 사용자가 원하는 차트 영역만큼 차트를 확대할 수 있도록 마우스 드래그를 통한 차트 확대 기능을 제공합니다. 또한 확대된 차트는 스크롤바를 통하여 이동하는데 마우스 드래그를 통한 차트 이공 기능을 지원합니다. ![s](/assets/imgs/ibchart-feature3.png) [마우스로 선택한 영역 확대] ### *이미지 파일 저장* * 현재 화면의 차트를 JPG, PNG 이미지로 저장하는 기능과 PDF, Excel, SVG 문서로 제공하며, 사용자가 원하는 경우 차트를 이미지로 저장한 후 다른 문서에서 삽입, 편집, 응용을 할 수 있습니다. ![s](/assets/imgs/ibchart-feature4.png) [이미지 저장 기능]"
        },
        "url": "docs/intro/feature.html"
      },
      {
        "cid": 2,
        "sid": "files",
        "name": "files",
        "label": "IBChart 구성",
        "data": {
          "body": "## IBChart 제품은 아래와 같은 파일, 폴더로 구성되어 있습니다. ``` ─ ibchart Folder ├─ ibleaders.js ├─ ibchart.js ├─ ibchartinfo.js └─ Down2Image.jsp ─ Ibsheet7_1.x.x.jar ``` ## 각 파일의 기능은 아래와 같습니다. ### *ibleaders.js* `제품 라이선스` 정보를 담고 있는 파일 ### *ibchart.js* IBChart 엔진 js 파일 ### *ibchartinfo.js* IBChart 생성 함수 및 개발시 유용하게 사용할 수 있는 js 함수를 담아둔 파일 ### *Down2Image.jsp* 이미지 다운로드 전용함수의 기능 구현을 위한 서버쪽 응용 프로그램 파일 * 이미지 다운로드 기능 지원을 위해서는 WAS 단에 `batik` 라이브러리와 `ibsheet7.jar` 가 설치되어 있어야 합니다. * 한글이 깨질 경우 jsp 내에서 UTF-8 환경설정 변수값을 변경해야 합니다. * 이미지 다운로드 jsp 프로그램 내에서 이미지 파일을 서버 디스크에 임시 저장하므로 TempFolder 변수에 서버의 물리적 디렉토리 경로를 설정해야 합니다. ### *Ibsheet7_1.x.x.jar* 다운로드를 위한 jar 파일"
        },
        "url": "docs/intro/files.html"
      }
    ]
  },
  {
    "gid": 2,
    "name": "start",
    "label": "Getting Started",
    "children": [
      {
        "cid": 5,
        "sid": "quick-start",
        "name": "quick-start",
        "label": "Quick Start",
        "data": {
          "body": "## 설치 `IBChart` 를 사용하기 위해 아래 4가지 js 파일을 include 합니다. ```html <script type=\"text/javascript\" src=\"/highcharts/highcharts.js\"></script> <script type=\"text/javascript\" src=\"/chart/ibleaders.js\"></script> <script type=\"text/javascript\" src=\"/chart/ibchartinfo.js\"></script> <script type=\"text/javascript\" src=\"/chart/ibchart.js\"></script> ``` * highcharts.js 파일은 highsoft의 highcharts입니다. IBChart를 이용하려면 `highcharts`를 반드시 사용해야 합니다. * highcharts.js는 기본으로 포함시키고 필요에 따라 highcharts의 module를 추가해서 사용합니다. ## 차트 객체 생성 차트 객체 생성은 차트가 만들어질 컨테이너가 구성된 이후에 설정 할 수 있습니다. 1. body 태그 하위에 컨테이너로 사용할 `div`를 생성 하고, body 태그의 `onload` 이벤트로 생성하는 방법 2. jQuery 라이브러리를 사용하는 경우 `$(document).ready();` 에서 설정하는 방법 * <span style=\"color:blue;\">일반적</span> 객체 생성 방법 ```html <!DOCTYPE html> <html> <head> … <script type=\"text/javascript\"> // 일반적으로 사용 시 function fnLoadPage() { // 차트 객체 생성 createIBChart(\"cont\", \"myChart\", { width:\"500px\", height:\"500px\" }); } </script> </head> <body onload=\"fnLoadPage();\"> <div id=\"cont\"></div> </body> </html> ``` * <span style=\"color:blue;\">jQuery 라이브러리</span> 사용 객체 생성 방법 ```html <!DOCTYPE html> <html> <head> … <script type=\"text/javascript\"> // jQuery 라이브러리 사용시 $(document).ready(function() { // 차트 객체 생성 createIBChart(\"cont\", \"myChart\", { width:\"500px\", height:\"500px\" }); }); </script> </head> <body> <div id=\"cont\"></div> </body> </html> ``` ## 차트 구성 옵션 설정 차트 객체 생성 완료 후 `setOptions` method를 이용하여 차트 구성 옵션을 설정합니다.[chart Properties 참고](/docs/props/chart/achart) ```html <!DOCTYPE html> <html> <head> … <script type=\"text/javascript\"> // 일반적으로 사용 시 function fnLoadPage() { // 차트 객체 생성 createIBChart(\"cont\", \"myChart\", { width:\"500px\", height:\"500px\" }); // 차트 구성 옵션 설정 myChart.setOptions({ // 사용자 설정 }); } </script> </head> <body onload=\"fnLoadPage();\"> <div id=\"cont\"></div> </body> </html> ``` ## 조회된 데이터 사용 조회된 데이터를 차트에 동적으로 적용합니다. 이를 위한 단계는 아래와 같습니다. 1. 조회 데이터(JSON or XML) 생성하기 <span style='color:red;'>[필수]</span> [※ 데이터 구조 참고](/docs/start/data-structure) 2. 조회 완료 이벤트 처리하기 <span style='color:blue;'>[선택]</span> ```javascript myChart.setEventListener(\"searchEnd\", function(event) { console.log(\"조회가 완료되었습니다.\"); }); ``` 3. 조회된 데이터(JSON or XML) 차트에 적용하기 <span style='color:red;'>[필수]</span> [loadSearchData](/docs/funcs/chartObject/loadSearchData) 함수를 이용해 조회된 데이터를 적용시킵니다."
        },
        "url": "docs/start/quick-start.html"
      },
      {
        "cid": 3,
        "sid": "chart-structure",
        "name": "chart-structure",
        "label": "IBChart의 구조",
        "data": {
          "body": "## 1. 차트 유형 `IBChart`의 형태는 아래와 같이 다양하게 표현 할 수 있습니다. * <span style=\"color:blue;\">꺾은선(Line Type)</span> ![s](/assets/imgs/ibchart-start1.png) * <span style=\"color:blue;\">부드러운 선(Spline Type)</span> ![s](/assets/imgs/ibchart-start2.png) * <span style=\"color:blue;\">산점(Scatter Type)</span> ![s](/assets/imgs/ibchart-start3.png) * <span style=\"color:blue;\">영역(Area Type)</span> ![s](/assets/imgs/ibchart-start4.png) * <span style=\"color:blue;\">막대(Column Type)</span> ![s](/assets/imgs/ibchart-start5.png) * <span style=\"color:blue;\">가로막대(Bar Type)</span> ![s](/assets/imgs/ibchart-start6.png) * <span style=\"color:blue;\">파이(Pie Type)</span> ![s](/assets/imgs/ibchart-start7.png) * <span style=\"color:blue;\">박스 플롯(Box Plot Type)</span> ![s](/assets/imgs/ibchart-start8.png) * <span style=\"color:blue;\">방사형(Polar Type)</span> ![s](/assets/imgs/ibchart-start9.png) * <span style=\"color:blue;\">워드클라우드형(WordCloud Type)</span> ![s](/assets/imgs/ibchart-start10.png) * <span style=\"color:blue;\">버블형(Bubble Type)</span> ![s](/assets/imgs/ibchart-start11.png) * <span style=\"color:blue;\">게이지형(Gauge Type)</span> ![s](/assets/imgs/ibchart-start12.png) * <span style=\"color:blue;\">히트맵형(Heatmap Type)</span> ![s](/assets/imgs/ibchart-start13.png) * <span style=\"color:blue;\">트리맵형(Treemap Type)</span> ![s](/assets/imgs/ibchart-start14.png) * <span style=\"color:blue;\">타일맵형(Tilemap Type)</span> ![s](/assets/imgs/ibchart-start15.png) * <span style=\"color:blue;\">피라미드형(Pyramid Type)</span> ![s](/assets/imgs/ibchart-start16.png) * <span style=\"color:blue;\">폭포형(Waterfall Type)</span> ![s](/assets/imgs/ibchart-start17.png) * <span style=\"color:blue;\">의존바퀴형(Dependencywheel Type)</span> ![s](/assets/imgs/ibchart-start18.png) * <span style=\"color:blue;\">생키형(Sankey Type)</span> ![s](/assets/imgs/ibchart-start19.png) * <span style=\"color:blue;\">네트워크형(Networkgraph Type)</span> ![s](/assets/imgs/ibchart-start20.png) ## 2. IBChart의 각 부분 명칭 ![s](/assets/imgs/ibchart-start-name.png)"
        },
        "url": "docs/start/chart-structure.html"
      },
      {
        "cid": 4,
        "sid": "data-structure",
        "name": "data-structure",
        "label": "데이터 구조",
        "data": {
          "body": "IBChart는 `XML`과 `JSON` 두가지 형식의 자료구조를 사용합니다. ## 데이터 XML 조회 함수를 통해 읽어들이는 XML 전체 구조는 아래와 같습니다. ```xml <?xml version='1.0'?> <![CDATA[ <IBCHART TYPE=\"\" BACKGROUNDCOLOR='#CCFFCC' BORDERWIDTH='1' BORDERCOLOR='#0000FF' ZOOMTYPE='x' TITLE='타이틀' SUBTITLE='부제목' > <ETC-DATA> <ETC key=\"sname\">홍길동</ETC> <ETC key=\"age\">20</ETC> </ETC-DATA> <DATA> <POINTSET AXISLABEL=\"1/4분기\"> <SERIES SERIESTYPE=\"line\" SERIESNAME=\"중국\" SERIESCOLOR=\"blue\" PointLabel=\"하나\" POINTCOLOR=\"yellow\">50</SERIES> <SERIES SERIESTYPE=\"area\" SERIESNAME=\"호주\" SERIESCOLOR=\"red\" PointLabel=\"열하나\" POINTCOLOR=\"block\">48</SERIES> <SERIES SERIESTYPE=\"spline\" SERIESNAME=\"KOREA\" SERIESCOLOR=\"green\" POINTNAME=\"스물하나\" POINTCOLOR=\"#EECCFF\">60</SERIES> </POINTSET> <POINTSET AXISLABEL=\"2/4분기\"> <SERIES POINTNAME=\"둘\" POINTCOLOR=\"\">22</SERIES> <SERIES POINTNAME=\"열둘\" POINTCOLOR=\" \">13</SERIES> <SERIES POINTNAME=\"스물둘\" POINTCOLOR=\"\">16</SERIES> </POINTSET> </DATA> </IBCHART> ]]> ``` * 조회 XML 구성 요소 |name|required|description| |----|----|---------------| |`IBCHART`|<span class='required'>필수</span>|조회 데이터의 최상위 요소| |`DATA`|<span class='required'>필수</span>|조회 데이터의 시작 요소| |`POINTSET`|<span class='required'>필수</span>|포인트 집합| |`SERIES`|<span class='required'>필수</span>|시리즈 포인트| |ETC-DATA|<span class='optional'>선택</span>|기타 데이터의 설정 요소| ## 데이터 JSON 조회 함수를 통해 읽어들이는 JSON 전체 구조는 아래와 같습니다. ```javascript { ibchart: { backgroundColor: \"white\", borderWidth: \"1\", borderColor: \"#0000FF\", zoomType: \"x\", title: \"타이틀\", subtitle: \"부제목\", etcData: [ {key:\"sname\",value:\"홍길동\"}, {key:\"age\",value:\"20\"} ], data: [{ axisLabel: \"1/4분기\", series: [{ seriesType: \"line\", seriesName: \"중국\", seriesColor: \"blue\", pointName: \"하나\", pointColor: \"yellow\", value: 220 },{ seriesType: \"column\", seriesName: \"호주\", seriesColor: \"#DDDDFF\", pointName: \"열하나\", pointColor: \"#C6E2FF\", value: 120 },{ seriesType: \"spline\", seriesName: \"KOREA\", seriesColor: \"green\", sointName: \"스물하나\", sointColor: \"#EECCFF\", Value: 55 }] },{ axisLabel: \"2/4분기\", series: [280,256,222] }] } } ``` * ETC-DATA가 아닌 `etcData` 임을 유의 * series 속성 안에서는 값만 나열할 수 있고, 값에 대한 속성을 명시할 때에는 `value` 속성을 사용 * 조회 JSON 구성 요소 |name|required|description| |----|----|---------------| |`ibchart`|<span class='required'>필수</span>|조회 데이터의 최상위 요소| |`data`|<span class='required'>필수</span>|조회 데이터의 시작 요소| |`series`|<span class='required'>필수</span>|시리즈 포인트| |etcData|<span class='optional'>선택</span>|기타 데이터 설정 요소|"
        },
        "url": "docs/start/data-structure.html"
      }
    ]
  },
  {
    "gid": 3,
    "name": "props",
    "label": "Properties",
    "children": [
      {
        "gid": 1,
        "name": "props-chart",
        "label": "chart",
        "children": [
          {
            "cid": 6,
            "sid": "achart",
            "name": "achart",
            "label": "chart 속성이란",
            "data": {
              "body": "> 차트의 기본 옵션을 설정 합니다. > 차트 기본 속성 설정은 `setOptions` 의 `chart`를 이용하여 차트의 기본 옵션을 정의 합니다. > 이 속성에서는 차트 유형, 차트의 배경색 등을 정의 할 수 있습니다. ### Info |name|type|required(default)|description| |---|---|---|--------| |type|`string`|<span class='optional'>선택(line)</span>|차트 유형| |plotBackgroundColor|`color`|<span class='optional'>선택(undefined)</span>|차트 영역의 배경색상| |plotBorderColor|`color`|<span class='optional'>선택(#cccccc)</span>|차트 영역의 border 색상| |plotBorderWidth|`number`|<span class='optional'>선택(0)</span>|차트 영역의 border 너비| |plotShadow|`boolean`|<span class='optional'>선택(false)</span>|차트 영역에 대한 그림자 표시 여부| |inverted|`boolean`|<span class='optional'>선택(false)</span>|X축과 Y축 반전 여부| |polar|`boolean`|<span class='optional'>선택(false)</span>|polar 차트 구성 여부| |zoomType|`string`|<span class='optional'>선택(undefined)</span>|마우스 드래그시 zoom 적용 방법 설정| |backgroundColor|`color`|<span class='optional'>선택(#ffffff)</span>|차트 컨테이너 영역의 배경색상| |borderColor|`color`|<span class='optional'>선택(#334eff)</span>|차트 컨테이너 영역의 border 색상| |borderWidth|`number`|<span class='optional'>선택(0)</span>|차트 컨테이너 영역의 border 너비| |borderRadius|`number`|<span class='optional'>선택(0)</span>|차트 컨테이너 영역에 대한 radius 적용 값| |shadow|`boolean`|<span class='optional'>선택(false)</span>|차트 컨테이너 영역에 대한 그림자 표시 여부| |margin|`number` or `Array`|<span class='optional'>선택(undefined)</span>|차트 컨테이너 영역에 대한 margin 값|"
            },
            "url": "docs/props/chart/achart.html"
          },
          {
            "cid": 7,
            "sid": "backgroundColor",
            "name": "backgroundColor",
            "label": "backgroundColor",
            "data": {
              "body": "> 차트 컨테이너 영역의 배경색상을 설정 하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |backgroundColor|`color`|<span class='optional'>선택(#ffffff)</span>|차트 컨테이너 영역의 배경색상| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { backgroundColor : \"#FFEFD5\" } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/backgroundColor.html"
          },
          {
            "cid": 8,
            "sid": "borderColor",
            "name": "borderColor",
            "label": "borderColor",
            "data": {
              "body": "> 차트 컨테이너 영역의 border 색상을 설정 하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |borderColor|`color`|<span class='optional'>선택(#334eff)</span>|차트 컨테이너 영역의 border 색상| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { borderColor : \"#D2691E\" } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/borderColor.html"
          },
          {
            "cid": 9,
            "sid": "borderRadius",
            "name": "borderRadius",
            "label": "borderRadius",
            "data": {
              "body": "> 차트 컨테이너 영역에 대한 radius 값을 설정 하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |borderRadius|`number`|<span class='optional'>선택(0)</span>|차트 컨테이너 영역에 대한 radius 값| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { borderRadius : 5 } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/borderRadius.html"
          },
          {
            "cid": 10,
            "sid": "borderWidth",
            "name": "borderWidth",
            "label": "borderWidth",
            "data": {
              "body": "> 차트 컨테이너 영역의 border 너비를 설정 하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |borderWidth|`number`|<span class='optional'>선택(0)</span>|차트 컨테이너 영역의 border 너비| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { borderWidth : 2 } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/borderWidth.html"
          },
          {
            "cid": 11,
            "sid": "inverted",
            "name": "inverted",
            "label": "inverted",
            "data": {
              "body": "> X축과 Y축 반전 여부를 설정 하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |inverted|`boolean`|<span class='optional'>선택(false)</span>|X축과 Y축 반전 여부| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { inverted : true }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/inverted.html"
          },
          {
            "cid": 12,
            "sid": "margin",
            "name": "margin",
            "label": "margin",
            "data": {
              "body": "> 차트 컨테이너 영역의 margin을 설정하는 속성입니다. > 한 쪽의 margin만 설정하고 싶을 때에는 marginTop, marginBottom, marginRight, marginLeft 를 사용할 수 있습니다. ### Info |name|type|required(default)|description| |---|---|---|---| |margin|`number` or `Array`|<span class='optional'>선택(undefined)</span>|차트 컨테이너 영역의 margin| |marginTop|`number`|<span class='optional'>선택(undefined)</span>|차트 컨테이너 영역 위쪽의 margin| |marginBottom|`number`|<span class='optional'>선택(undefined)</span>|차트 컨테이너 영역 아래쪽의 margin| |marginRight|`number`|<span class='optional'>선택(undefined)</span>|차트 컨테이너 영역 오른쪽의 margin| |marginLeft|`number`|<span class='optional'>선택(undefined)</span>|차트 컨테이너 영역 왼쪽의 margin| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { margin : [10, 0, 0, 0] // 위쪽 margin을 10으로 설정, 나머지 margin을 0으로 설정 } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/margin.html"
          },
          {
            "cid": 13,
            "sid": "plotBackgroundColor",
            "name": "plotBackgroundColor",
            "label": "plotBackgroundColor",
            "data": {
              "body": "> 차트 영역의 배경색상을 설정 하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |plotBackgroundColor|`color`|<span class='optional'>선택(undefined)</span>|차트 영역의 배경색상| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { plotBackgroundColor: \"#F5DEB3\" }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/plotBackgroundColor.html"
          },
          {
            "cid": 14,
            "sid": "plotBorderColor",
            "name": "plotBorderColor",
            "label": "plotBorderColor",
            "data": {
              "body": "> 차트 영역의 border 색상을 설정 하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |plotBorderColor|`color`|<span class='optional'>선택(#cccccc)</span>|차트 영역의 border 색상| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { plotBorderColor : \"#CD853F\", plotBorderWidth : 2 }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/plotBorderColor.html"
          },
          {
            "cid": 15,
            "sid": "plotBorderWidth",
            "name": "plotBorderWidth",
            "label": "plotBorderWidth",
            "data": {
              "body": "> 차트 영역의 border 너비를 설정 하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |plotBorderWidth|`number`|<span class='optional'>선택(0)</span>|차트 영역의 border 너비| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { plotBorderWidth : 2 }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/plotBorderWidth.html"
          },
          {
            "cid": 16,
            "sid": "plotShadow",
            "name": "plotShadow",
            "label": "plotShadow",
            "data": {
              "body": "> Plot 영역의 그림자 효과 여부를 설정 하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |plotShadow|`boolean`|<span class='optional'>선택(false)</span>|차트 영역에 대한 그림자 표시 여부| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { plotShadow : true }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/plotShadow.html"
          },
          {
            "cid": 17,
            "sid": "polar",
            "name": "polar",
            "label": "polar",
            "data": {
              "body": "> polar 차트 구성 여부를 설정 하는 속성입니다. `highcharts-more.js 필요` ### Info |name|type|required(default)|description| |---|---|---|---| |polar|`boolean`|<span class='optional'>선택(false)</span>|polar 차트 구성 여부 여부| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { polar : true }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-polar.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/polar.html"
          },
          {
            "cid": 18,
            "sid": "shadow",
            "name": "shadow",
            "label": "shadow",
            "data": {
              "body": "> 차트 컨테이너 영역에 대한 그림자 표시 여부를 설정 하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |shadow|`boolean`|<span class='optional'>선택(false)</span>|차트 컨테이너 영역에 대한 그림자 표시 여부| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { shadow : true }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/shadow.html"
          },
          {
            "cid": 19,
            "sid": "type",
            "name": "type",
            "label": "type",
            "data": {
              "body": "> 차트 유형을 설정하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |type|`string`|<span class='optional'>선택(line)</span>|차트 유형| ### Enum * type |value|description| |---|---| |area|영역 차트| |arearange|영역 범위 차트| |bar|가로 막대 차트| |boxplot|박스플롯 차트| |bubble|버블 차트 `highcharts-more.js 필요`| |packedbubble|조밀한 버블 차트 `highcharts-more.js 필요`| |column|세로 막대 차트| |columnrange|세로 막대 범위 차트| |errorbar|오차 막대 차트| |funnel|깔대기 차트 `modules/funnel.js 필요`| |gauge|게이지 차트 `highcharts-more.js 필요`| |solidgauge|솔리드 게이지 차트 `highcharts-more.js 필요` `modules/solid-gauge.js 필요`| |heatmap|히트맵 차트 `modules/heatmap.js 필요`| |treemap|트리맵 차트 `modules/treemap.js 필요`| |tilemap|타일맵 차트 `modules/tilemap.js 필요` `modules/heatmap.js 필요`| |line|꺾은선 차트| |pie|파이 차트| |pyramid|원뿔형 차트 `modules/funnel.js 필요`| |sankey|생키 차트 `modules/sankey.js 필요`| |scatter|산점 차트| |spline|부드러운선 차트| |areaspline|부드러운선 영역 차트| |waterfall|폭포형 차트 `highcharts-more.js 필요`| |wordcloud|워드클라우드형 차트| |dependencywheel|의존 바퀴 차트 `modules/sankey.js 필요` `modules/dependency-wheel.js 필요`| |sankey|생키 차트 `modules/sankey.js 필요`| |networkgraph|네트워크 그래프 차트 `modules/networkgraph.js 필요`| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { type: 'column' //세로 막대 차트 }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/type.html"
          },
          {
            "cid": 20,
            "sid": "zoomType",
            "name": "zoomType",
            "label": "zoomType",
            "data": {
              "body": "> 마우스 드래그시 zoom 적용 방법을 설정 하는 속성입니다. ### Info |name|type|required(default)|description| |---|---|---|---| |zoomType|`string`|<span class='optional'>선택(undefined)</span>|마우스 드래그시 zoom 적용 방법 설정| ### Enum * zoomType |Value|Description| |----|------------| |none|사용안함| |x|X축으로만 zoom 처리| |y|Y축으로만 zoom 처리| |xy|X축, Y축 양방향 zoom 처리| ### Example ```javascript //차트 기본 속성 설정 myChart.setOptions({ chart: { zoomType : \"x\" } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/chart/zoomType.html"
          }
        ]
      },
      {
        "gid": 2,
        "name": "props-pane",
        "label": "pane",
        "children": [
          {
            "cid": 21,
            "sid": "apane",
            "name": "apane",
            "label": "pane 속성이란",
            "data": {
              "body": "> pane에 대한 구성 옵션을 설정 합니다. (gague, solidgague, polar) > `setOptions` 의 `pane` 을 이용하여 정의 합니다. ### Info |name|type|required(default)|description| |---|---|---|----------------------| |background|`object`|<span class='optional'>선택</span>|배경 속성| |startAngle|`number`|<span class='optional'>선택</span>|앵글의 시작 점| |endAngle|`number`|<span class='optional'>선택</span>|앵글의 마지막 점| |background|`object`|<span class='optional'>선택</span>|배경 속성| |background.backgroundColor|`color`|<span class='optional'>선택(#cccccc)</span>|배경 색상| |background.borderColor|`color`|<span class='optional'>선택</span>|border 색상| |background.borderWidth|`number`|<span class='optional'>선택</span>|border의 너비| |background.innerRadius|`number` or `string`|<span class='optional'>선택</span>|pane 안쪽의 radius 적용 값| |background.outerRadius|`number` or `string`|<span class='optional'>선택</span>|pane 바깥쪽의 radius 적용 값| |center|`Array`|<span class='optional'>선택([\"50%\", \"50%\"])</span>|차트의 중심 위치 설정| |size|`number` or `string`|<span class='optional'>선택(85%)</span>|pane 크기 설정|"
            },
            "url": "docs/props/pane/apane.html"
          },
          {
            "cid": 22,
            "sid": "background",
            "name": "background",
            "label": "background",
            "data": {
              "body": "> 배경 속성을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |background|`object`|<span class='optional'>선택</span>|배경 속성| |background.backgroundColor|`color`|<span class='optional'>선택(#cccccc)</span>|배경 색상| |background.borderColor|`color`|<span class='optional'>선택</span>|border 색상| |background.borderWidth|`number`|<span class='optional'>선택</span>|border의 너비| |background.innerRadius|`number or string`|<span class='optional'>선택</span>|pane 안쪽의 radius 적용 값 (숫자 또는 퍼센트 값으로 설정)| |background.outerRadius|`number or string`|<span class='optional'>선택</span>|pane 바깥쪽의 radius 적용 값 (숫자 또는 퍼센트 값으로 설정)| ### Example ```javascript myChart.setOptions({ chart: { polar: true, type: 'area' }, xAxis: { categories: [\"평화주의자\",\"완벽주의자\",\"돕고자 하는 사람\",\"성취하는 사람\",\"개인주의자\",\"탐구하는 사람\",\"충실한 사람\",\"열정적인 사람\",\"도전하는 사람\"], tickmarkPlacement: 'on', lineWidth: 0 }, yAxis: { title: { text : \"\" }, gridLineInterpolation: 'polygon', lineWidth: 0, max: 100, min: 0 }, pane: [{ background: null, //background 속성 설정하지 않음 }], tooltip: { enabled: false }, legend: { enabled: false }, plotOptions: { series: { marker: { enabled: false, states: { hover: { enabled: false }, select: { enabled: false } } } } }, series: [{ data: [0, 0, 0, 0, 0, 100, 100, 100, 0], pointPlacement: 'on' }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/pane/background.html"
          },
          {
            "cid": 23,
            "sid": "center",
            "name": "center",
            "label": "center",
            "data": {
              "body": "> 차트의 중심을 설정합니다. > `[x, y]` 배열을 값으로 가집니다. `숫자`나 `%`를 넣을 수 있습니다. ### Info |name|type|required (default)|description| |---|---|---|---| |center|`Array`|<span class='optional'>선택</span>|차트의 중심 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"gauge\" }, pane: { center: [\"50%\",\"85%\"], // 차트의 중심 설정 startAngle: -120, endAngle: 120 }, yAxis: { min: 960, max: 1060, gridLineWidth: 0, plotBands: [{ from: 960, to: 1030, color: '#55BF3B' }, { from: 1030, to: 1050, color: '#DDDF0D' }, { from: 1050, to: 1060, color: '#DF5353' }], title: { text: \"hPa\" } }, tooltip: { pointFormat: \"{point.y} hPa\" }, series: [{ name: \"hPa\", data: [999] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/pane/center.html"
          },
          {
            "cid": 24,
            "sid": "endAngle",
            "name": "endAngle",
            "label": "endAngle",
            "data": {
              "body": "> 앵글의 마지막 점을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |endAngle|`number`|<span class='optional'>선택</span>|앵글의 마지막 점| ### Example ```javascript myChart.setOptions({ chart: { type: \"gauge\" }, pane: { startAngle: -120, endAngle: 120, // endAngle 속성 }, yAxis: { min: 960, max: 1060, gridLineWidth: 0, plotBands: [{ from: 960, to: 1030, color: '#55BF3B' // green }, { from: 1030, to: 1050, color: '#DDDF0D' // yellow }, { from: 1050, to: 1060, color: '#DF5353' // red }], title: { text: \"hPa\" } }, tooltip: { pointFormat: \"{point.y} hPa\" }, series: [{ name: \"hPa\", data: [999] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/pane/endAngle.html"
          },
          {
            "cid": 25,
            "sid": "size",
            "name": "size",
            "label": "size",
            "data": {
              "body": "> pane 의 크기를 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |size|`number` or `string`|<span class='optional'>선택(85%)</span>|pane 크기 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"gauge\" }, pane: { size:\"100%\", // pane 의 크기 설정 startAngle: -120, endAngle: 120 }, yAxis: { min: 960, max: 1060, gridLineWidth: 0, plotBands: [{ from: 960, to: 1030, color: '#55BF3B' }, { from: 1030, to: 1050, color: '#DDDF0D' }, { from: 1050, to: 1060, color: '#DF5353' }], title: { text: \"hPa\" } }, tooltip: { pointFormat: \"{point.y} hPa\" }, series: [{ name: \"hPa\", data: [999] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/pane/size.html"
          },
          {
            "cid": 26,
            "sid": "startAngle",
            "name": "startAngle",
            "label": "startAngle",
            "data": {
              "body": "> 앵글의 시작 점을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |startAngle|`number`|<span class='optional'>선택</span>|앵글의 시작 점| ### Example ```javascript myChart.setOptions({ chart: { type: \"gauge\" }, pane: { startAngle: -120, //startAngle 속성 endAngle: 120, }, yAxis: { min: 960, max: 1060, gridLineWidth: 0, plotBands: [{ from: 960, to: 1030, color: '#55BF3B' // green }, { from: 1030, to: 1050, color: '#DDDF0D' // yellow }, { from: 1050, to: 1060, color: '#DF5353' // red }], title: { text: \"hPa\" } }, tooltip: { pointFormat: \"{point.y} hPa\" }, series: [{ name: \"hPa\", data: [999] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/pane/startAngle.html"
          }
        ]
      },
      {
        "gid": 3,
        "name": "props-plotOptions",
        "label": "plotOptions",
        "children": [
          {
            "cid": 27,
            "sid": "aaplotOptions",
            "name": "aaplotOptions",
            "label": "plotOptions 속성이란",
            "data": {
              "body": "> 차트의 시리즈에 대한 구성 옵션을 설정 합니다. > 설정 시 <span style=\"color:blue;\">series 속성 하위</span>로 설정하게 되면 모든 시리즈에 적용되고 <span style=\"color:blue;\">차트 유형 속성 하위</span>로 설정하면 해당 차트 유형에만 구성 옵션이 적용 됩니다. `series의 속성은 모든 차트 유형의 속성보다 높은 우선 순위를 가집니다.` > 차트 유형별 지원하는 속성 정보는 아래와 같습니다. ### Info |properties|area|arearange|bar|boxplot|bubble|packedbubble|column|columnrange|errorbar|funnel|gauge|solidgauge|heatmap|treemap|tilemap|line|pie|pyramid|scatter|spline|areaspline|waterfall|wordcloud|dependencywheel|sankey|networkgraph| |:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:| |animation|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○| |borderColor|||○||||○|○||○|||||||○|○||||○||○|○|| |borderRadius|||○||||○|○||○|||○|○|○||○|○||||○||||| |borderWidth|||○||||○|○||○|||||||○|○||||○||○|○|| |center||||||||||○|||||||○|○||||||○||| |colorByPoint|||○|○|○|○|○|○|○|||||||○|||○||||||○|| |colorIterate|||||||||||||||||||||||○|||| |colorSort|||||||||||||||||||||||○|||| |connectEnds||||||||||||||||○||||||||||| |cursor|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○||○|○|○| |dashStyle|○|○|○||||○|○||||||||○|||○|○|○|○||||○| |dataLabels|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○||○|○|○| |endAngle||||||||||○|||||||○|○||||||||| |fillColor|○|○||○||||||○||||||||○|||○|||||| |fillOpacity|○|○||○||||||○||||||||○|||○|||||| |groupPadding|||○|○|||○|○|○|||||||||||||○||||| |innerSize|||||||||||||||||○|||||||||| |keys|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○| |layoutAlgorithm||||||○||||||||○|○|||||||||||○| |levels||||||||||||||○||||||||||||| |lineColor|○|○|||||||||||||||||||○|○||||| |lineWidth|○|○||○|○|○|||○||○|○||○||○|||○|○|○|○||||| |marker|○|○|||○|○|||||||○|||○|||○|○|○|||||○| |minLinkWidth||||||||||||||||||||||||○|○|| |negativeColor|○|○|○|○|○|○|○||○||||○|○|○|○|||○|○|○|○||||| |negativeFillColor|○|○|||||||||||||||||||○|||||| |nodePadding||||||||||||||||||||||||○|○|| |nodes||||||||||||||||||||||||○|○|○| |nodeWidth||||||||||||||||||||||||○|○|| |orientation|||||||||||||||||||||||○|||| |placeType|||||||||||||||||||||||○|||| |pointPadding|||○|○|||○|○|○||||○||○|||||||○||||| |pointPlacement|○|○|○|○|||○|○|○|||||||○||||○|○|○||||| |pointStart|○|○|○|○|○|○|○|○|○||○|○||○||○|||○|○|○|○||||| |pointWidth|||○|○|||○|○|○|||||||||||||○||||| |rotation|||||||||||||||||||||||○|||| |scaleType|||||||||||||||||||||||○|||| |shadow|○|○|○|○|||○|○|○|○||||||○|○|○||○|○|○||||| |showInLegend|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○||○|○|| |spiralType|||||||||||||||||||||||○|||| |stacking|○||○|○|○|○|○||○|||||○||○|||○|○|○|○||||| |startAngle||||||||||○|||||||○|○||||||○||| |states|○|○|○||○|○|○|○||○|||○|○|○|○|○|○|○|○|○|○|○|○|○|○| |step||||||||||||||||○||||||||||| |style|||||||||||||||||||||||○|||| |valueRange|||||||||||||||||||||||○|||| |visible|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○|○||○|○|○|"
            },
            "url": "docs/props/plotOptions/aaplotOptions.html"
          },
          {
            "cid": 28,
            "sid": "animation",
            "name": "animation",
            "label": "animation",
            "data": {
              "body": "> 시리즈 영역의 애니메이션 효과 사용 여부를 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |animation|`boolean`|<span class='optional'>선택(true)</span>|애니메이션 효과 사용 여부| ### Enum * animation |name|type|required|description| |---|---|---|---| |duration|`number`|<span class='optional'>선택(1000)</span>|애니메이션 지속 시간(밀리초)| ### Example ```javascript myChart.setOptions( { series: { animation: { duration: 2000 // 애니메이션 지속 시간 } } }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/animation.html"
          },
          {
            "cid": 29,
            "sid": "borderColor-2",
            "name": "borderColor",
            "label": "borderColor",
            "data": {
              "body": "> 시리즈 영역의 border 색상을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |borderColor|`color`|<span class='optional'>선택(#ffffff)</span>|border 색상| ### Example ```javascript myChart.setOptions({ plotOptions: { column: { borderColor :\"#dc143c\", // border 색상 borderWidth:5, borderRadius:20 } }, series: [{ type: \"column\", name: \"서울\", data: [60,40,20,80] },{ name: \"인천\", data: [30,50,90,70] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/borderColor.html"
          },
          {
            "cid": 30,
            "sid": "borderRadius-2",
            "name": "borderRadius",
            "label": "borderRadius",
            "data": {
              "body": "> 시리즈 영역 border의 radius 적용 값을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |borderRadius|`number`|<span class='optional'>선택(0)</span>|border의 radius 적용 값| ### Example ```javascript myChart.setOptions({ plotOptions: { column: { borderColor :\"#dc143c\", borderWidth:5, borderRadius:20 // border radius 적용 값 } }, series: [{ type: \"column\", name: \"서울\", data: [60,40,20,80] },{ name: \"인천\", data: [30,50,90,70] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/borderRadius.html"
          },
          {
            "cid": 31,
            "sid": "borderWidth-2",
            "name": "borderWidth",
            "label": "borderWidth",
            "data": {
              "body": "> 시리즈 영역 border의 너비를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |borderWidth|`number`|<span class='optional'>선택(1)</span>|border의 너비| ### Example ```javascript myChart.setOptions({ plotOptions: { column: { borderColor :\"#dc143c\", borderWidth:5, // border 너비 설정 borderRadius:20 } }, series: [{ type: \"column\", name: \"서울\", data: [60,40,20,80] },{ name: \"인천\", data: [30,50,90,70] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/borderWidth.html"
          },
          {
            "cid": 32,
            "sid": "center-2",
            "name": "center",
            "label": "center",
            "data": {
              "body": "> pie와 같은 유형의 차트에 대한 중심 위치를 설정 합니다. > 배열 내의 값은 숫자 또는 퍼센트 형태의 값으로 설정이 가능 합니다. ### Info |name|type|required|description| |---|---|---|---| |center|`array`|<span class='optional'>선택</span>|차트의 중심 위치| ### Example ```javascript myChart.setOptions({ chart: { type: \"pie\" }, plotOptions: { pie: { center:[\"20%\", \"80%\"] } }, series: [{ name : \"서울\", data : [60,40,20,80,90] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-center.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/center.html"
          },
          {
            "cid": 33,
            "sid": "colorByPoint",
            "name": "colorByPoint",
            "label": "colorByPoint",
            "data": {
              "body": "> 차트의 색상을 시리즈 별로 구분할 지, 포인트 별로 구분할 지 지정합니다. ### Info |name|type|required|description| |---|---|---|---| |colorByPoint|`boolean`|<span class='optional'>선택(false)</span>|차트 색상 구분 지정| ### Example ```javascript myChart.setOptions({ chart: { type: \"bar\" }, plotOptions: { bar: { colorByPoint: true // 포인트 별로 다르게 색 지정 } }, series: [{ name : \"서울\", data : [60,40,20,80,90] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-colorByPoint.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/colorByPoint.html"
          },
          {
            "cid": 34,
            "sid": "colorIterate",
            "name": "colorIterate",
            "label": "colorIterate",
            "data": {
              "body": "> Wordcloud 차트의 색 반복 여부를 설정 합니다. `only wordcloud` ### Info |name|type|required|description| |---|---|---|---| |colorIterate|`boolean`|<span class='optional'>선택(true)</span>|색상 반복 여부| ### Enum * colorIterate |value|description| |-----|-----------| |true|설정된 colors의 값으로 색을 반복해서 설정| |false|설정된 colors 값이 이외는 차트 draw()와 down2Image()할때마다 바뀜| ### Example ```javascript //wordcloud 차트 설정 myChart.setOptions({ chart: { type: \"wordcloud\" }, colors: [\"#0d0\", \"#fc0\"], plotOptions: { wordcloud: { colorIterate: true } } }, { append: false }); //wordcloud 데이터 로드 myChart.loadSearchData({ \"ibchart\": { \"data\": [{ \"series\": [{ \"seriesName\": \"WordCloud\", \"pointName\": \"IBLeaders\", \"value\": 60 }] }, { \"series\": [{ \"pointName\": \"아이비리더스\", \"value\": 50 }] }, { \"series\": [{ \"pointName\": \"IB Sheet 7\", \"value\": 40 }] }, { \"series\": [{ \"pointName\": \"IBChart(H) 7\", \"value\": 30 }] }] } }, { append: true }); ``` ![s](/assets/imgs/ibchart-colorlterate.png) ### 제공 버전 |version|desc| |---|---| |7.3.1.0|wordcloud 차트에만 적용가능|"
            },
            "url": "docs/props/plotOptions/colorIterate.html"
          },
          {
            "cid": 35,
            "sid": "colorSort",
            "name": "colorSort",
            "label": "colorSort",
            "data": {
              "body": "> Wordcloud 차트의 색 지정 방식을 설정하는 속성입니다. `only wordcloud` ### Info |name|type|required|description| |---|---|---|---| |colorSort|`string`|<span class='optional'>선택(none)</span>|색지정 방식| ### Enum * colorSort |value|description| |-----|-----------| |none|데이터 입력 순서| |rank|입력된 데이터의 최댓값부터 내림차순| ### Example ```javascript //wordcloud 차트 설정 myChart.setOptions({ chart: { type: \"wordcloud\" }, plotOptions: { wordcloud: { colorSort: \"rank\" } } }, { append: false }); //wordcloud 데이터 로드 myChart.loadSearchData({ \"ibchart\": { \"data\": [{ \"series\": [{ \"seriesName\": \"WordCloud\", \"pointName\": \"IBLeaders\", \"value\": 40 }] }, { \"series\": [{ \"pointName\": \"아이비리더스\", \"value\": 50 }] }, { \"series\": [{ \"pointName\": \"IB Sheet 7\", \"value\": 30 }] }, { \"series\": [{ \"pointName\": \"IBChart(H) 7\", \"value\": 20 }] }] } }, { append: true }); ``` ![s](/assets/imgs/ibchart-colorSort.png) ### 제공 버전 |version|desc| |---|---| |7.3.1.0|wordcloud 차트에만 적용가능|"
            },
            "url": "docs/props/plotOptions/colorSort.html"
          },
          {
            "cid": 36,
            "sid": "connectEnds",
            "name": "connectEnds",
            "label": "connectEnds",
            "data": {
              "body": "> 선의 시작과 끝을 연결할지 여부를 정합니다. > <span style=\"color:blue;\">참고</span>: `polar` 차트에만 적용됩니다. ### Info |name|type|required|description| |---|---|---|---| |connectEnds|`boolean`|<span class='optional'>선택(true)</span>|선의 시작과 끝 연결 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"line\", polar: true }, plotOptions: { line: { connectEnds: false // 선의 시작과 끝 연결 설정 } }, series: [{ name : \"서울\", data : [60,40,20,80,90] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-connectEnds.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/connectEnds.html"
          },
          {
            "cid": 37,
            "sid": "cursor",
            "name": "cursor",
            "label": "cursor",
            "data": {
              "body": "> 시리즈 영역 마우스 오버 시 커서의 모양을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |cursor|`string`|<span class='optional'>선택(default)</span>|커서 모양| ### Enum * cursor |value| | | | | | | | | | |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----| |default|alias|all-scroll|auto|cell|col-resize|context-menu|copy|crosshair|e-resize|ew-resize| |grab|grabbing|help|move|n-resize|ne-resize|nesw-resize|no-drop|none|not-allowed| |ns-resize|nw-resize|nwse-resize|pointer|progress|row-resize|s-resize|se-resize|sw-resize|text| |vertical-text|w-resize|wait|zoom-in|zoom-out| ### Example ```javascript myChart.setOptions({ chart: { type: \"bar\" }, plotOptions: { bar: { cursor : \"pointer\" // 커서 모양 설정 } }, series: [{ name : \"서울\", data : [60,40,20,80] },{ name : \"인천\", data : [30,50,90,70] },{ name : \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc|---|---|7.3.0.0||"
            },
            "url": "docs/props/plotOptions/cursor.html"
          },
          {
            "cid": 38,
            "sid": "dashStyle",
            "name": "dashStyle",
            "label": "dashStyle",
            "data": {
              "body": "> 차트 선의 종류를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |dashStyle|`string`|<span class='optional'>선택(Solid)</span>|선의 종류| ### Enum * dashStyle |value|description| |-----|-----------| |Solid|실선| |ShortDash|짧은 대쉬선| |ShortDot|짧은 점선| |ShortDashDot|짧은 대쉬+점| |ShortDashDotDot|짧은 대쉬+점+점| |Dot|점선| |Dash|대쉬선| |LongDash|긴 대쉬선| |DashDot|대쉬+점| |LongDashDot|긴 대쉬+점| |LongDashDotDot|긴 대쉬+점+점| ### Example ```javascript myChart.setOptions({ plotOptions: { line: { dashStyle:\"LongDash\" // 선 종류 설정 } }, series: [{ name : \"서울\", data : [60,40,20,80] },{ name : \"인천\", data : [30,50,90,70] },{ name : \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-dashStyle.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/dashStyle.html"
          },
          {
            "cid": 39,
            "sid": "dataLabels",
            "name": "dataLabels",
            "label": "dataLabels",
            "data": {
              "body": "> 데이터 라벨의 속성을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |dataLabels|`object`|<span class='optional'>선택</span>|데이터 라벨 속성| |dataLabels.align|`string`|<span class='optional'>선택(center)</span>|정렬 방법| |dataLabels.allowOverlap|`boolean`|<span class='optional'>선택(false)</span>|데이터 중복 허용 여부| |dataLabels.backgroundColor|`color`|<span class='optional'>선택(undefined)</span>|데이터 레이블 배경 색상| |dataLabels.borderColor|`color`|<span class='optional'>선택(undefined)</span>|데이터 레이블 테두리 색상| |dataLabels.borderRadius|`number`|<span class='optional'>선택(0)</span>|데이터 레이블 테두리 radius 값| |dataLabels.borderWidth|`number`|<span class='optional'>선택(0)</span>|데이터 레이블 테두리 너비| |dataLabels.distance|`number`|<span class='optional'>선택(30)</span>|끝지점 부터의 표시 위치 `pie, dependency-wheel 차트에서만 사용 가능`| |dataLabels.enabled|`boolean`|<span class='optional'>선택(false)</span>|표시 여부| |dataLabels.filter|`object`|<span class='optional'>선택</span>|데이터 레이블이 표시될 값 필터 <span style=\"color:blue;\">Ex) filter: {property: 'percentage', operator: '>', value: 4}</span>| |dataLabels.format|`string`|<span class='optional'>선택({y})</span>|출력 포맷 <span style=\"color:blue;\">Ex) format: ‘{y} mm’</span>| |dataLabels.formatter|`function()`|<span class='optional'>선택</span>|출력 포맷을 정의하는 callback <span style=\"color:blue;\">Ex) this.y 현재 y값</span>| |dataLabels.inside|`boolean`|<span class='optional'>선택</span>|상자 내부의 레이블 정렬 여부 <span style=\"color:blue;\">true</span>일 경우 내부의 정렬| |dataLabels.linkFormat|`string`|<span class='optional'>선택</span>|노드를 잇는 링크(선) 위에 나타나는 데이터 레이블 문자열 `graph 차트에서만 사용 가능`| |dataLabels.rotation|`number`|<span class='optional'>선택(0)</span>|기울기| |dataLabels.shadow|`boolean`|<span class='optional'>선택(false)</span>|그림자 여부| |dataLabels.style|`object`|<span class='optional'>선택</span>|스타일 속성| |dataLabels.useHTML|`boolean`|<span class='optional'>선택</span>|HTML 사용 여부| |dataLabels.verticalAlign|`string`|<span class='optional'>선택(bottom)</span>|수직 정렬 여부| |dataLabels.x|`number`|<span class='optional'>선택</span>|좌우 포지션 이동 값| |dataLabels.y|`number`|<span class='optional'>선택</span>|상하 포지션 이동 값| * dataLabels.style Info |name|type|required|description| |-----|-----|-----|------------| |color|`color`|<span class='optional'>선택</span>|폰트 색상| |fontSize|`string`|<span class='optional'>선택</span>|폰트 크기(px)| |fontWeight|`string`|<span class='optional'>선택(bold)</span>|폰트 bold 여부| * dataLabels.filter Info |name|type|required|description| |-----|-----|-----|------------| |operator|`operator`|<span class='optional'>선택</span>|비교할 연산자 ( \">\" , \"<\" , \">=\" , \"<=\" , \" == \" , \"===\" , \"!=\" , \"!==\")| |property|`string`|<span class='optional'>선택</span>|필터링 기준 데이터 포인트 속성 (x, y, name, percentage, sum 등)| |value|`number`|<span class='optional'>선택(bold)</span>|필터링 기준 값| ### Enum * align |value|description| |-----|-----------| |center|중앙 정렬| |left|좌측 정렬| |right|우측 정렬| * verticalAlign |value|description| |-----|-----------| |top|위쪽 정렬| |middle|중간 정렬| |bottom|아래쪽 정렬| ### Example ```javascript myChart.setOptions({ plotOptions: { column: { dataLabels : { // dataLabels 속성 설정 enabled:true, align:\"left\", backgroundColor:\"#ffdab9\", style:{ color:\"#800000\" }, formatter:function(){ return this.y + \"개\"; } } } }, series: [{ type: \"column\", name : \"서울\", data : [60,40,20,80] },{ name : \"인천\", data : [30,50,90,70] },{ name : \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-dataLabels.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/dataLabels.html"
          },
          {
            "cid": 40,
            "sid": "endAngle-2",
            "name": "endAngle",
            "label": "endAngle",
            "data": {
              "body": "> 앵글의 마지막 점을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |endAngle|`number`|<span class='optional'>선택</span>|앵글의 마지막 점| ### Example ```javascript myChart.setOptions({ chart: { type: \"pie\" }, plotOptions: { pie: { startAngle:-70, endAngle:70 // 앵글의 마지막 점 설정 } }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/endAngle.html"
          },
          {
            "cid": 41,
            "sid": "fillColor",
            "name": "fillColor",
            "label": "fillColor",
            "data": {
              "body": "> 시리즈 영역의 배경색을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |fillColor|`color`|<span class='optional'>선택</span>|시리즈 영역의 배경색| ### Example ```javascript myChart.setOptions({ chart: { type: \"area\" }, plotOptions: { area: { fillColor:\"#ffc0cb\" // 시리즈 영역의 배경색 } }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-fillColor.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/fillColor.html"
          },
          {
            "cid": 42,
            "sid": "fillOpacity",
            "name": "fillOpacity",
            "label": "fillOpacity",
            "data": {
              "body": "> 시리즈 영역의 배경의 불투명도를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |fillOpacity|`number`|<span class='optional'>선택(0.75)</span>|시리즈 영역의 배경 불투명도| ### Example ```javascript myChart.setOptions({ chart: { type: \"area\" }, plotOptions: { area: { fillOpacity:0.2 // 시리즈 영역의 배경 불투명도 } }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/fillOpacity.html"
          },
          {
            "cid": 43,
            "sid": "groupPadding",
            "name": "groupPadding",
            "label": "groupPadding",
            "data": {
              "body": "> 그룹 간 padding 적용 값을 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |groupPadding|`number`|<span class='optional'>선택(0.2)</span>|그룹 간 padding 적용 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, plotOptions: { column: { groupPadding : 0.4 // 그룹 간 padding 적용 값 } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-groupPadding.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/groupPadding.html"
          },
          {
            "cid": 44,
            "sid": "innerSize",
            "name": "innerSize",
            "label": "innerSize",
            "data": {
              "body": "> pie 와 같은 유형의 차트 내부 원의 크기를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |innerSize|`number or string`|<span class='optional'>선택(0)</span>|차트의 내부 원의 크기| ### Example ```javascript myChart.setOptions({ chart: { type: \"pie\" }, plotOptions: { pie: { innerSize : \"50%\" // 차트 내부 원 크기 설정 } }, series: [{ name: \"서울\", data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-innerSize.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/innerSize.html"
          },
          {
            "cid": 45,
            "sid": "keys",
            "name": "keys",
            "label": "keys",
            "data": {
              "body": "> 데이터 배열의 키를 지정합니다. ### Info |name|type|required|description| |---|---|---|---| |keys|`Array`|<span class='optional'>선택</span>|데이터 배열의 키 지정| ### Example ```javascript myChart.setOptions({ chart: { type: \"dependencywheel\" }, plotOptions: { dependencywheel: { keys: [\"from\", \"to\", \"weight\"], // 데이터 배열의 키 지정 } }, series: [{ data : ['한국', '중국', 6225], ['한국', '홍콩', 5287], ['한국', '베트남', 1628] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/keys.html"
          },
          {
            "cid": 46,
            "sid": "layoutAlgorithm",
            "name": "layoutAlgorithm",
            "label": "layoutAlgorithm",
            "data": {
              "body": "> 배치 알고리즘을 설정합니다. > <span style=\"color:blue\">참고</span> : `tilemap` 에서는 타일의 모양을 설정하는 속성입니다. ### Info |name|type|required|description| |---|---|---|---| |layoutAlgorithm|`string` or `object`|<span class='optional'>선택</span>|배치 방법 설정| * networkgraph.layoutAlgorithm Info |name|type|required|description| |-----|-----|-----|------------| |enableSimulation|`boolean`|<span class='optional'>선택(false)</span>|노드와 링크가 모이는 실시간 애니메이션 사용 여부| |friction|`number`|<span class='optional'>선택(-0.981)</span>|노드가 움직일 때 적용되는 마찰 정도 참고 : `-0.999` ~ `-0.85` 사이에서 사용하는 것을 추천합니다.| |gravitationalConstant|`number`|<span class='optional'>선택(0.0625)</span>|중간에 모이는 정도| |initialPositionRadius|`number`|<span class='optional'>선택(1)</span>|노드들이 최초로 생기는 위치 (중심부터의 거리)| |gravitationalConstant|`number`|<span class='optional'>선택(0.0625)</span>|중간에 모이는 정도| |linkLength|`number`|<span class='optional'>선택</span>|링크들의 길이 참고 : 노드 사이의 배치로 인해 설정한 길이보다 짧거나 길어질 수도 있습니다.| * packedbubble.layoutAlgorithm Info |name|type|required|description| |-----|-----|-----|------------| |bubblePadding|`number`|<span class='optional'>선택(5)</span>|버블 간 padding 설정| |gravitationalConstant|`number`|<span class='optional'>선택(0.01)</span>|서로 끌어당기는 정도| |initialPositionRadius|`number`|<span class='optional'>선택(20)</span>|버블이 최초로 생기는 위치 (중심부터의 거리)| |splitSeries|`boolean`|<span class='optional'>선택(false)</span>|버블이 대분류를 기준으로 모일 지 여부| |enableSimulation|`boolean`|<span class='optional'>선택(true)</span>|버블이 모이는 애니메이션 사용 여부| ### Enum * treemap.layoutAlgorithm |value| |-----| |sliceAndDice| |stripes| |squarified| |strip| * tilemap.layoutAlgorithm (타일의 모양을 설정합니다.) |value|description| |-----|-------| |hexagon|육각형| |circle|원| |diamond|다이아몬드| |square|사각형| ### Example ```javascript myChart.setOptions({ plotOptions: { packedbubble: { layoutAlgorithm:{ // 배치 알고리즘 설정 splitSeries: false, bubblePadding:10, gravitationalConstant: 0.02 } } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [10,15,40,40] },{ name: \"부산\", data : [50,40,20,70] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/layoutAlgorithm.html"
          },
          {
            "cid": 47,
            "sid": "levels",
            "name": "levels",
            "label": "levels",
            "data": {
              "body": "> 데이터 레벨 별 속성을 지정합니다. ### Info |name|type|required|description| |---|---|---|---| |levels|`object`|<span class='optional'>선택</span>|데이터 레벨 별 속성 지정| * levels Info |name|type|required|description| |-----|-----|-----|------------| |level|`number`|<span class='optional'>필수</span>|속성을 설정할 레벨 지정 (1부터 시작해서 자식마다 +1 됩니다.)| |[layoutAlgorithm](/docs/props/plotOptions/layoutAlgorithm)|`string`|<span class='optional'>선택</span>|배치 알고리즘 설정| |borderColor|`color`|<span class='optional'>선택</span>|테두리 색상| |borderWidth|`number`|<span class='optional'>선택</span>|테두리 너비| |color|`color`|<span class='optional'>선택</span>|색상 참고 : `colors` 나 `colorAxis` 속성이 우선됩니다.| |[dataLabels](/docs/props/plotOptions/dataLabels)|`object`|<span class='optional'>선택</span>|데이터 레이블 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"treemap\" }, plotOptions: { treemap: { levels: [ // 레벨 별 속성 설정 { level: 2, dataLabels: { enabled: true, color: \"#ffffff\" } }, { level: 1, borderWidth: 8, dataLabels: { enabled: true, backgroundColor: \"#ffffff\" } }, ] } }, series: [{ data : [ { id: '0.0', // level : 1 parent: '', value : 30, name: 'A' }, { id: '1.1', // level : 2 parent: '0.0', value : 20, name: 'a-1' }, { id: '1.2', // level : 2 parent: '0.0', value : 10, name: 'a-2' }, { id: '0.1', // level : 1 parent: '', value : 10, name: 'B' },{ id: '2.1', // level : 2 parent: '0.1', value : 10, name: 'b-1' } ] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/levels.html"
          },
          {
            "cid": 48,
            "sid": "lineColor",
            "name": "lineColor",
            "label": "lineColor",
            "data": {
              "body": "> 시리즈 선의 색상을 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |lineColor|`color`|<span class='optional'>선택</span>|시리즈 선의 색상| ### Example ```javascript myChart.setOptions({ plotOptions: { line: { lineColor:\"#990000\" // 시리즈의 선 색상 지정 } }, series: [{ name: \"서울\", data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/lineColor.html"
          },
          {
            "cid": 49,
            "sid": "lineWidth",
            "name": "lineWidth",
            "label": "lineWidth",
            "data": {
              "body": "> 시리즈 선의 너비를 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |lineWidth|`number`|<span class='optional'>선택(2)</span>|시리즈 선의 너비| ### Example ```javascript myChart.setOptions({ plotOptions: { line: { lineWidth: 5 } }, series: [{ name: \"서울\", data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/lineWidth.html"
          },
          {
            "cid": 50,
            "sid": "marker",
            "name": "marker",
            "label": "marker",
            "data": {
              "body": "> 포인트의 마커 속성을 설정합니다. > marker.symbol 을 적용하지 않으면 기본값은 `원 > 사각형 > 다이아몬드 > 삼각형 > 역삼각형` 순으로 지정됩니다. ### Info |name|type|required|description| |---|---|---|---| |marker|`object`|<span class='optional'>선택</span>|포인트 마커 속성| |marker.enabled|`boolean`|<span class='optional'>선택</span>|사용 여부| |marker.radius|`number`|<span class='optional'>선택(4)</span>|radius 적용 값| |marker.states|`object`|<span class='optional'>선택</span>|상태 속성| |marker.states.hover|`object`|<span class='optional'>선택</span>|마우스 hover시 속성| |marker.states.select|`object`|<span class='optional'>선택</span>|포인트 선택시 속성| |marker.symbol|`string` or `url`|<span class='optional'>선택</span>|포인트 마커 모양 설정| * markers.states.hover / markers.states.select Info |name|type|required|description| |---|---|---|---| |enabled|`boolean`|<span class='optional'>선택(true)</span>|사용 여부| |lineColor|`color`|<span class='optional'>선택</span>|라인 색상| |linewidth|`number`|<span class='optional'>선택(0)</span>|라인 너비| |fillColor|`color`|<span class='optional'>선택</span>|마커 색상| ### Enum * symbol |value|description| |-----|-----------| |circle|원| |square|사각형| |diamond|다이아몬드| |triangle|삼각형| |triangle-down|역삼각형| |url|사용자 지정 이미지 `url(이미지url)` 로 표현| ### Example ```javascript myChart.setOptions({ plotOptions: { line: { marker: { enabled: false } } }, series: [{ name: \"서울\", data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/marker.html"
          },
          {
            "cid": 51,
            "sid": "minLinkWidth",
            "name": "minLinkWidth",
            "label": "minLinkWidth",
            "data": {
              "body": "> 링크 선의 최소 너비를 설정합니다. > `sankey 차트`, `dependencywheel 차트`에서만 사용됩니다. ### Info |name|type|required|description| |---|---|---|---| |minLinkWidth|`number`|<span class='optional'>선택(0)</span>|링크 선의 최소 너비| ### Example ```javascript myChart.setOptions({ plotOptions: { sankey: { minLinkWidth: 5 // 노드를 잇는 링크 선의 최소 너비 설정 } }, series: [{ data:[ [\"node1\",\"node2\",20], [\"node1\",\"node3\",5], [\"node4\",\"node2\",3], [\"node5\",\"node1\",10] ] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/minLinkWidth.html"
          },
          {
            "cid": 52,
            "sid": "negativeColor",
            "name": "negativeColor",
            "label": "negativeColor",
            "data": {
              "body": "> 임계값 아래의 점 색상을 설정 합니다. > 어떤 기준값( 예: 0 )보다 아래로 내려갔을 경우 색상을 설정하는 기능입니다. ### Info |name|type|required|description| |---|---|---|---| |negativeColor|`color`|<span class='optional'>선택</span>|임계값 아래의 점 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"area\" }, plotOptions: { area: { negativeColor:\"#990000\" // 임계값 아래의 점 색상 } }, series: [{ name: \"서울\", data : [-60,40,-20,80] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-negaiveColor.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/negativeColor.html"
          },
          {
            "cid": 53,
            "sid": "negativeFillColor",
            "name": "negativeFillColor",
            "label": "negativeFillColor",
            "data": {
              "body": "> 임계값 아래의 배경 색상을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |negativeFillColor|`color`|<span class='optional'>선택</span>|임계값 아래의 배경 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"area\" }, plotOptions: { area: { negativeFillColor:\"#990000\" // 임계값 아래의 배경 색상 } }, series: [{ name: \"서울\", data : [-60,40,-20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/negativeFillColor.html"
          },
          {
            "cid": 54,
            "sid": "nodePadding",
            "name": "nodePadding",
            "label": "nodePadding",
            "data": {
              "body": "> 각 노드 간 padding 을 설정합니다. > `sankey 차트`, `dependencywheel 차트`에서만 사용됩니다. ### Info |name|type|required|description| |---|---|---|---| |nodePadding|`number`|<span class='optional'>선택(10)</span>|노드 간 padding| ### Example ```javascript myChart.setOptions({ plotOptions: { sankey: { nodePadding: 5 // 노드 간 padding 설정 } }, series: [{ data:[ [\"node1\",\"node2\",20], [\"node1\",\"node3\",5], [\"node4\",\"node2\",3], [\"node5\",\"node1\",10] ] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/nodePadding.html"
          },
          {
            "cid": 55,
            "sid": "nodeWidth",
            "name": "nodeWidth",
            "label": "nodeWidth",
            "data": {
              "body": "> 노드의 너비를 설정합니다. > `sankey 차트`, `dependencywheel 차트`에서만 사용됩니다. ### Info |name|type|required|description| |---|---|---|---| |nodeWidth|`number` or `string`|<span class='optional'>선택(20)</span>|노드 너비| ### Example ```javascript myChart.setOptions({ plotOptions: { sankey: { nodeWidth: 5 // 노드 너비 설정 } }, series: [{ data:[ [\"node1\",\"node2\",20], [\"node1\",\"node3\",5], [\"node4\",\"node2\",3], [\"node5\",\"node1\",10] ] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/nodeWidth.html"
          },
          {
            "cid": 56,
            "sid": "nodes",
            "name": "nodes",
            "label": "nodes",
            "data": {
              "body": "> 개별 노드에 대한 속성을 정의합니다. > `sankey 차트`, `dependencywheel 차트`에서만 사용이 가능합니다. ### Info |name|type|required|description| |---|---|---|---| |nodes|`Array[object]`|<span class='optional'>선택</span>|개별 노드 속성| |nodes.color|`color`|<span class='optional'>선택</span>|노드의 색상| |nodes.column|`number`|<span class='optional'>선택</span>|노드를 배치할 위치에 대한 열 인덱스| |[nodes.dataLables](/docs/props/plotOptions/dataLabels)|`object`|<span class='optional'>선택</span>|상태 속성| |nodes.height|`number`|<span class='optional'>선택</span>|노드의 높이| |nodes<hi>.id|`string`|<span class='optional'>선택</span>|노드의 ID 선언하지 않으면 데이터의 `from`나 `to` 를 참조해서 자동 생성합니다.| |nodes.offset|`number` or `string`|<span class='optional'>선택(0)</span>|노드의 상하 위치를 지정| ### Example ```javascript myChart.setOptions({ plotOptions: { sankey: { keys: ['from','to','weight'], nodes: [ // 각 노드 속성 설정 { id:\"node1\", color:\"#ff0000\", column:2, dataLabels:{ enabled:false } }, { id:\"node2\", color:\"#ff0000\", column:3, offset:-20 }, ] } }, series: [{ data:[ [\"node1\",\"node2\",20], [\"node1\",\"node3\",5], [\"node4\",\"node2\",3], [\"node5\",\"node1\",10] ] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-nodes.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/nodes.html"
          },
          {
            "cid": 57,
            "sid": "orientation",
            "name": "orientation",
            "label": "orientation",
            "data": {
              "body": "> Wordcloud 차트의 단어 회전 방향의 수를 설정합니다. `only wordcloud` ### Info |name|type|required|description| |---|---|---|---| |orientation|`number`|<span class='optional'>선택(1)</span>|회전 방향 수| ### Example ```javascript //wordcloud 차트 설정 myChart.setOptions({ chart: { type: \"wordcloud\" }, plotOptions: { wordcloud: { orientation: 2 // 회전 방향 수 } } }, { append: false }); //wordcloud 데이터 로드 myChart.loadSearchData({ \"ibchart\": { \"data\": [{ \"series\": [{ \"seriesName\": \"WordCloud\", \"pointName\": \"IBLeaders\", \"value\": 60 }] }, { \"series\": [{ \"pointName\": \"아이비리더스\", \"value\": 50 }] }, { \"series\": [{ \"pointName\": \"IB Sheet 7\", \"value\": 40 }] }, { \"series\": [{ \"pointName\": \"IBChart(H) 7\", \"value\": 30 }] }] } }, { append: true }); ``` ![s](/assets/imgs/ibchart-orientation.png) ### 제공 버전 |version|desc| |---|---| |7.3.1.0|wordcloud 차트에만 적용가능|"
            },
            "url": "docs/props/plotOptions/orientation.html"
          },
          {
            "cid": 58,
            "sid": "placeType",
            "name": "placeType",
            "label": "placeType",
            "data": {
              "body": "> Wordcloud 차트의 입력된 데이터를 spiralType에 맞게 위치하는 방식을 설정 합니다. `only wordcloud` ### Info |name|type|required|description| |---|---|---|---| |placeType|`string`|<span class='optional'>선택(\"linear\")</span>|단어 위치 방식| ### Enum * placeType |value|description| |-----|-----------| |linear|선형(내림차순)| |random|임의 위치(차트 draw()와 down2Image() 할 때마다 위치가 바뀜)| ### Example ```javascript //wordcloud 차트 설정 myChart.setOptions({ chart: { type: \"wordcloud\" }, plotOptions: { wordcloud: { placeType: \"random\" // 단어 위치 방식 설정 } } }, { append: false }); //wordcloud 데이터 로드 myChart.loadSearchData({ \"ibchart\": { \"data\": [{ \"series\": [{ \"seriesName\": \"WordCloud\", \"pointName\": \"IBLeaders\", \"value\": 60 }] }, { \"series\": [{ \"pointName\": \"아이비리더스\", \"value\": 50 }] }, { \"series\": [{ \"pointName\": \"IB Sheet 7\", \"value\": 40 }] }, { \"series\": [{ \"pointName\": \"IBChart(H) 7\", \"value\": 30 }] }] } }, { append: true }); ``` ![s](/assets/imgs/ibchart-placeType.png) ### 제공 버전 |version|desc| |---|---| |7.3.1.0|wordcloud 차트에만 적용 가능|"
            },
            "url": "docs/props/plotOptions/placeType.html"
          },
          {
            "cid": 59,
            "sid": "pointPadding",
            "name": "pointPadding",
            "label": "pointPadding",
            "data": {
              "body": "> 포인트 간 padding 적용 값을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |pointPadding|`number`|<span class='optional'>선택(1)</span>|포인트 간 padding 적용 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, plotOptions: { column: { pointPadding: 0.4 // 포인트 간 padding 적용 값| } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-pointPadding.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/pointPadding.html"
          },
          {
            "cid": 60,
            "sid": "pointPlacement",
            "name": "pointPlacement",
            "label": "pointPlacement",
            "data": {
              "body": "> 포인트의 위치를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |pointPlacement|`string`|<span class='optional'>선택</span>|포인트 위치| ### Enum * pointPlacement |value|description| |-----|-----------| |on|축의 점 위치| |between|축의 점간 사이 위치| ### Example ```javascript myChart.setOptions({ plotOptions: { column: { pointPlacement:\"between\" //컬럼차트 속성은 포인트와 포인트 사이 }, line : { pointPlacement:\"on\" //라인차트 속성은 x축 포인트 위에 } }, series: [{ type: \"column\", name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-pointPlacement.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/pointPlacement.html"
          },
          {
            "cid": 61,
            "sid": "pointStart",
            "name": "pointStart",
            "label": "pointStart",
            "data": {
              "body": "> 포인트 시작 점을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |pointStart|`number`|<span class='optional'>선택(0)</span>|포인트 시작 점| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, plotOptions: { column: { pointStart:2 // 포인트 시작점 설정 } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-pointStart.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/pointStart.html"
          },
          {
            "cid": 62,
            "sid": "pointWidth",
            "name": "pointWidth",
            "label": "pointWidth",
            "data": {
              "body": "> 포인트의 너비를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |pointWidth|`number`|<span class='optional'>선택</span>|포인트 너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, plotOptions: { column: { pointWidth: 20 // 포인트의 너비 설정 } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-pointWidth.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/pointWidth.html"
          },
          {
            "cid": 63,
            "sid": "rotation",
            "name": "rotation",
            "label": "rotation",
            "data": {
              "body": "> Wordcloud 차트의 단어 회전 범위를 설정합니다. `only wordcloud` ### Info |name|type|required|description| |---|---|---|---| |rotation|`number`|<span class='optional'>선택([0,90])</span>|회전 각도 범위의 시작과 끝을 설정| ### Example ```javascript //wordcloud 차트 설정 myChart.setOptions({ chart: { type: \"wordcloud\" }, plotOptions: { wordcloud: { orientation: 2, rotation: [-45,0] // 회전 각도를 -45도 ~ 0도로 설정 } } }, { append: false }); //wordcloud 데이터 로드 myChart.loadSearchData({ \"ibchart\": { \"data\": [{ \"series\": [{ \"seriesName\": \"WordCloud\", \"pointName\": \"IBLeaders\", \"value\": 60 }] }, { \"series\": [{ \"pointName\": \"아이비리더스\", \"value\": 50 }] }, { \"series\": [{ \"pointName\": \"IB Sheet 7\", \"value\": 40 }] }, { \"series\": [{ \"pointName\": \"IBChart(H) 7\", \"value\": 30 }] }] } }, { append: true }); ``` ![s](/assets/imgs/ibchart-rotation.png) ### 제공 버전 |version|desc| |---|---| |7.3.1.0|wordcloud 차트에만 적용가능|"
            },
            "url": "docs/props/plotOptions/rotation.html"
          },
          {
            "cid": 64,
            "sid": "scaleType",
            "name": "scaleType",
            "label": "scaleType",
            "data": {
              "body": "> Wordcloud 차트의 입력된 데이터를 정규화하는 방식을 설정 합니다. `only wordcloud` ### Info |name|type|required|description| |---|---|---|---| |scaleType|`string`|<span class='optional'>선택(linear)</span>|입력데이터의 정규화 방식| ### Enum * scaleType |value|description| |-----|-----------| |none|사용안함| |log|로그형| |sqrt|제곱형| |linear|선형| ### Example ```javascript //wordcloud 차트 설정 myChart.setOptions({ chart: { type: \"wordcloud\" }, plotOptions: { wordcloud: { scaleType: \"none\" // 입력된 데이터의 정규화 방식 설정 } } }, { append: false }); //wordcloud 데이터 로드 myChart.loadSearchData({ \"ibchart\": { \"data\": [{ \"series\": [{ \"seriesName\": \"WordCloud\", \"pointName\": \"IBLeaders\", \"value\": 16 }] }, { \"series\": [{ \"pointName\": \"아이비리더스\", \"value\": 15 }] }, { \"series\": [{ \"pointName\": \"IB Sheet 7\", \"value\": 14 }] }, { \"series\": [{ \"pointName\": \"IBChart(H) 7\", \"value\": 13 }] }] } }, { append: true }); ``` ![s](/assets/imgs/ibchart-scaleType.png) ### 제공 버전 |version|desc| |---|---| |7.3.1.0|wordcloud 차트에만 적용 가능|"
            },
            "url": "docs/props/plotOptions/scaleType.html"
          },
          {
            "cid": 65,
            "sid": "shadow-2",
            "name": "shadow",
            "label": "shadow",
            "data": {
              "body": "> 시리즈의 그림자 표시 여부나 그림자 디자인을 설정 합니다. > shadow : false 로 사용 시 그림자를 비활성화 시킵니다. ### Info |name|type|required|description| |---|---|---|---| |shadow|`boolean` or `object`|<span class='optional'>선택(true)</span>|그림자 관련 설정| * shadow Info |name|type|required|description| |---|---|---|---| |color|`color`|<span class='optional'>선택</span>|색상| |offsetX|`number`|<span class='optional'>선택(1)</span>|수평 위치| |offsetY|`number`|<span class='optional'>선택(1)</span>|수직 위치| |opacity|`number`|<span class='optional'>선택(0.15)</span>|불투명도| |width|`number`|<span class='optional'>선택(3)</span>|너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, plotOptions: { series: { shadow: { // 그림자 디자인 설정 color: 'blue', width: 10, opacity: 1, offsetX: 0, offsetY: 0 } } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/shadow.html"
          },
          {
            "cid": 66,
            "sid": "showInLegend",
            "name": "showInLegend",
            "label": "showInLegend",
            "data": {
              "body": "> 해당 시리즈 정보를 범례에 포함 할지 여부를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |showInLegend|`boolean`|<span class='optional'>선택(true)</span>|범례 포함 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, plotOptions: { column: { showInLegend: false // column 차트의 정보는 범례에 포함시키지 않음 } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ type: \"line\", name: \"인천\", data : [30,50,90,70] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-showInLegend.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/showInLegend.html"
          },
          {
            "cid": 67,
            "sid": "spiralType",
            "name": "spiralType",
            "label": "spiralType",
            "data": {
              "body": "> Wordcloud 차트의 단어 배치 종류를 설정 합니다. `only wordcloud` ### Info |name|type|required|description| |---|---|---|---| |spiralType|`string`|<span class='optional'>선택(archimedean)</span>|단어 배치 종류| ### Enum * spiralType |value|description| |-----|-----------| |rectangular|사각형으로 배치| |archimedean|원형으로 배치| ### Example ```javascript //wordcloud 차트 설정 myChart.setOptions({ chart: { type: \"wordcloud\" }, plotOptions: { wordcloud: { spiralType: \"rectangular\" // 배치 종류 설정 } } }, { append: false }); //wordcloud 데이터 로드 myChart.loadSearchData({ \"ibchart\": { \"data\": [{ \"series\": [{ \"seriesName\": \"WordCloud\", \"pointName\": \"IBLeaders\", \"value\": 80 }] }, { \"series\": [{ \"pointName\": \"아이비리더스\", \"value\": 70 }] },{ \"series\": [{ \"pointName\": \"IB Sheet 8\", \"value\": 60 }] },{ \"series\": [{ \"pointName\": \"IB Chart\", \"value\": 50 }] }, { \"series\": [{ \"pointName\": \"IB Sheet 7\", \"value\": 40 }] }, { \"series\": [{ \"pointName\": \"IBChart(H) 7\", \"value\": 30 }] }] } }, { append: true }); ``` ![s](/assets/imgs/ibchart-spiralType.png) ### 제공 버전 |version|desc| |---|---| |7.3.1.0|wordcloud 차트에만 적용 가능|"
            },
            "url": "docs/props/plotOptions/spiralType.html"
          },
          {
            "cid": 68,
            "sid": "stacking",
            "name": "stacking",
            "label": "stacking",
            "data": {
              "body": "> 시리즈의 데이터 stack 방법을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |stacking|`string`|<span class='optional'>선택</span>|stack 방법| ### Enum * stacking |value|description| |-----|-----------| |null|사용 안함| |normal|일반 stack 방법| |percent|비율 stack 방법| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, plotOptions: { column: { stacking: \"normal\" // stack 방법 설정 } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-stacking.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/stacking.html"
          },
          {
            "cid": 69,
            "sid": "startAngle-2",
            "name": "startAngle",
            "label": "startAngle",
            "data": {
              "body": "> pie와 같은 유형의 차트에 대한 앵글의 시작 점을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |startAngle|`number`|<span class='optional'>선택</span>|앵글의 시작 점| ### Example ```javascript myChart.setOptions({ chart: { type: \"pie\" }, plotOptions: { pie: { startAngle:-70, // 앵글의 시작 점 설정 endAngle:70 } }, series: [{ data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/startAngle.html"
          },
          {
            "cid": 70,
            "sid": "states",
            "name": "states",
            "label": "states",
            "data": {
              "body": "> 시리즈의 상태 속성을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |states|`object`|<span class='optional'>선택</span>|시리즈의 상태 속성| |states.hover|`object`|<span class='optional'>선택</span>|마우스 hover 시 속성| ### Enum * states.hover Info |value|type|required|description| |-----|----|-------|-----------| |enabled|`boolean`|<span class='optional'>선택(true)</span>|사용 여부| |borderColor|`color`|<span class='optional'>선택</span>|테두리 색상| |borderWidth|`number`|<span class='optional'>선택(1)</span>|테두리 너비| |lineWidth|`number`|<span class='optional'>선택(2)</span>|라인 너비 (시리즈 형태가 선의 형태일 때 사용)| |brightness|`number`|<span class='optional'>선택(0.1)</span>|기본 색상 기준 밝기 정도| |color|`color`|<span class='optional'>선택</span>|hover 시 색상 `brightness` 과 동시에 설정 시 `color` 가 우선 적용됩니다.| ### Example ```javascript myChart.setOptions({ plotOptions: { bar: { states: { hover: { // 상태가 hover 일 때 설정 color: \"#ff0000\", borderColor:\"#000000\", borderWidth: 3 } } } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-states.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/states.html"
          },
          {
            "cid": 71,
            "sid": "step",
            "name": "step",
            "label": "step",
            "data": {
              "body": "> 포인트간 선에 대한 단계 표현 방법을 설정 합니다. 계단형 차트를 만들 때 사용합니다. ### Info |name|type|required|description| |---|---|---|---| |step|`string` or `boolean`|<span class='optional'>선택(left or false)</span>|단계 표현 방법| ### Enum * step |value|description| |-----|-----------| |null|사용 안함| |left|좌측 단계 표현 방법| |center|중간 단계 표현 방법| |right|우측 단계 표현 방법| ### Example ```javascript myChart.setOptions({ plotOptions: { line: { step: true } }, series: [{ name: \"서울\", data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-step.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/step.html"
          },
          {
            "cid": 72,
            "sid": "style",
            "name": "style",
            "label": "style",
            "data": {
              "body": "> Wordcloud 차트의 단어 스타일을 설정 합니다. `only wordcloud` ### Info |name|type|required|description| |---|---|---|---| |style.fontFamily|`string`|<span class='optional'>선택</span>|폰트 종류 (클라이언트 사용자에 있는 폰트만 유효(웹폰트 포함)) `주의` Export 시 서버에 해당 폰트가 있어야 동일하게 출력이 가능| |style.fontPadding|`number`|<span class='optional'>선택(1)</span>|단어간 여백| |style.fontWeight|`string`|<span class='optional'>선택(bold)</span>|폰트 두께| ### Enum * style.fontWeight |value|description| |-----|-----------| |normal|폰트 두께를 얇게 설정| |bold|폰트 두께를 굵게 설정| ### Example ```javascript //wordcloud 차트 설정 myChart.setOptions({ chart: { type: \"wordcloud\" }, plotOptions: { wordcloud: { style: { // wordcloud 차트의 단어 스타일 설정 fontFamily: \"맑은 고딕\", fontWeight: \"\", fontPadding: 0.2 } } } }, { append: false }); //wordcloud 데이터 로드 myChart.loadSearchData({ \"ibchart\": { \"data\": [{ \"series\": [{ \"seriesName\": \"WordCloud\", \"pointName\": \"IBLeaders\", \"value\": 60 }] }, { \"series\": [{ \"pointName\": \"아이비리더스\", \"value\": 50 }] }, { \"series\": [{ \"pointName\": \"IB Sheet 7\", \"value\": 40 }] }, { \"series\": [{ \"pointName\": \"IBChart(H) 7\", \"value\": 30 }] }] } }, { append: true }); ``` ![s](/assets/imgs/ibchart-placeType.png) ### 제공 버전 |version|desc| |---|---| |7.3.1.0|wordcloud 차트에만 적용 가능|"
            },
            "url": "docs/props/plotOptions/style.html"
          },
          {
            "cid": 73,
            "sid": "valueRange",
            "name": "valueRange",
            "label": "valueRange",
            "data": {
              "body": "> Wordcloud 차트의 입력된 데이터(글자)의 크기를 설정 합니다. `only wordcloud` ### Info |name|type|required|description| |---|---|---|---| |valueRange|`Array` or `string`|<span class='optional'>선택([15,60])</span>|단어 최소/최대 크기 지정| ### Enum * valueRange |value|description| |-----|-----------| |[number,number]|고정형 [최소 크기, 최대 크기] 를 숫자로 지정 `주의` 차트의 크기에 따라 최댓값을 바꿔줘야 합니다. 최소값과 최댓값이 차트의 크기에 비례해 큰 값이 설정될 경우나 최소값과 최댓값의 차이가 단어의 갯수에 비해 작을 경우 성능이 저하될 수 있습니다.| |responsive|반응형 (차트의 크기에 따라 글자 크기를 변경합니다.)| ### Example ```javascript //wordcloud 차트 설정 myChart.setOptions({ chart: { type: \"wordcloud\" }, plotOptions: { wordcloud: { valueRange: [15,60] // 글자의 최소/최대 크기를 설정 } } }, { append: false }); //wordcloud 데이터 로드 myChart.loadSearchData({ \"ibchart\": { \"data\": [{ \"series\": [{ \"seriesName\": \"WordCloud\", \"pointName\": \"IBLeaders\", \"value\": 60 }] }, { \"series\": [{ \"pointName\": \"아이비리더스\", \"value\": 50 }] }, { \"series\": [{ \"pointName\": \"IB Sheet 7\", \"value\": 40 }] }, { \"series\": [{ \"pointName\": \"IBChart(H) 7\", \"value\": 30 }] }] } }, { append: true }); ``` ![s](/assets/imgs/ibchart-placeType.png) ### 제공 버전 |version|desc| |---|---| |7.3.1.0|wordcloud 차트에만 적용 가능|"
            },
            "url": "docs/props/plotOptions/valueRange.html"
          },
          {
            "cid": 74,
            "sid": "visible",
            "name": "visible",
            "label": "visible",
            "data": {
              "body": "> 시리즈의 보임/숨김 여부를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |visible|`boolean`|<span class='optional'>선택(true)</span>|보임/숨김 여부| ### Example ```javascript myChart.setOptions({ plotOptions: { column: { visible: false // column 시리즈 숨김 } }, series: [{ type: \"column\", name: \"서울\", data : [60,40,20,80] },{ type: \"scatter\", name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-visible.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/plotOptions/visible.html"
          }
        ]
      },
      {
        "gid": 4,
        "name": "props-subtitle",
        "label": "subtitle",
        "children": [
          {
            "cid": 75,
            "sid": "aasubtitle",
            "name": "aasubtitle",
            "label": "subtitle 속성이란",
            "data": {
              "body": "> 부제목에 대한 구성 옵션을 설정 합니다. > 차트 기본 속성 설정은 `setOptions` 의 `subtitle`를 이용하여 정의 합니다. ### Info |name|type|required(default)|description| |---|---|---|--------| |text|`string`|<span class='optional'>선택</span>|부제목 문자열| |align|`string`|<span class='optional'>선택(center)</span>|부제목 좌우 정렬 값| |verticalAlign|`string`|<span class='optional'>선택</span>|부제목 상하 정렬 값 |x|`number`|<span class='optional'>선택(0)</span>|부제목 좌우 포지션 이동 값| |y|`number`|<span class='optional'>선택</span>|부제목 상하 포지션 이동 값| |style|`object`|<span class='optional'>선택</span>|부제목 스타일 설정| |style.color|`color`|<span class='optional'>선택</span>|부제목 폰트 색상| |style.fontSize|`string`|<span class='optional'>선택</span>|부제목 폰트 크기| |style.fontWeight|`string`|<span class='optional'>선택</span>|부제목 폰트 두께| |useHTML|`boolean`|<span class='optional'>선택(false)</span>|부제목 문자열에 html tag 사용 여부|"
            },
            "url": "docs/props/subtitle/aasubtitle.html"
          },
          {
            "cid": 76,
            "sid": "align",
            "name": "align",
            "label": "align",
            "data": {
              "body": "> 부제목의 좌우 정렬 방법을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |align|`string`|<span class='optional'>선택(center)</span>|좌우 정렬 값| ### Enum * align |value|description| |-----|-----------| |center|중앙 정렬| |left|좌측 정렬| |right|우측 정렬| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"cc별 중고자동차 판매량\" }, subtitle: { // subtitle 설정 text: \"2014년 1/4분기\", align: \"left\" } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/subtitle/align.html"
          },
          {
            "cid": 77,
            "sid": "style-2",
            "name": "style",
            "label": "style",
            "data": {
              "body": "> 부제목의 스타일을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |style.color|`string`|<span class='optional'>선택</span>|폰트 색상| |style.fontSize|`string`|<span class='optional'>선택</span>|폰트 크기| |style.fontWeight|`string`|<span class='optional'>선택</span>|폰트 두께| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"cc별 중고자동차 판매량\" }, subtitle: { // subtitle 설정 text: \"2014년 1/4분기\", style: { color: \"red\", fontSize: \"1.2em\", fontWeight: \"bold\" } } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/subtitle/style.html"
          },
          {
            "cid": 78,
            "sid": "text",
            "name": "text",
            "label": "text",
            "data": {
              "body": "> 부제목 문자열을 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |text|`string`|<span class='optional'>선택</span>|부제목 문자열| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"cc별 중고자동차 판매량\" }, subtitle: { // subtitle 설정 text: \"<span style='font-size: 1.2em; font-weight: bold; '>2014년</span> 1/4분기\" } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/subtitle/text.html"
          },
          {
            "cid": 79,
            "sid": "useHTML",
            "name": "useHTML",
            "label": "useHTML",
            "data": {
              "body": "> 부제목 문자열에 html tag 사용 여부를 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |useHTML|`boolean`|<span class='optional'>선택(false)</span>|부제목 문자열에 html tag 사용 여부| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"cc별 중고자동차 판매량\" }, subtitle: { // subtitle 설정 text: \"<span style='font-size: 1.2em; font-weight: bold; '>2014년</span> 1/4분기\", useHTML: true } }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-subtitle-useHTML.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/subtitle/useHTML.html"
          },
          {
            "cid": 80,
            "sid": "verticalAlign",
            "name": "verticalAlign",
            "label": "verticalAlign",
            "data": {
              "body": "> 부제목의 상하 정렬 값을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |verticalAlign|`string`|<span class='optional'>선택(center)</span>|상하 정렬 값| ### Enum * verticalAlign |value|description| |-----|-----------| |top|상단 정렬| |middle|중앙 정렬| |bottom|하단 정렬| ### Example ```javascript myChart.setOptions({ subtitle: { // subtitle 설정 text: \"2014년 1/4분기\", verticalAlign: \"middle\" } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/subtitle/verticalAlign.html"
          },
          {
            "cid": 81,
            "sid": "x",
            "name": "x",
            "label": "x",
            "data": {
              "body": "> 부제목의 좌우 포지션 이동값을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |x|`number`|<span class='optional'>선택(0)</span>|부제목 좌우 포지션 이동 값| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"cc별 중고자동차 판매량\" }, subtitle: { // subtitle 설정 text: \"2014년 1/4분기\", x: 40 } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/subtitle/x.html"
          },
          {
            "cid": 82,
            "sid": "y",
            "name": "y",
            "label": "y",
            "data": {
              "body": "> 부제목의 상하 포지션 이동값을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |y|`number`|<span class='optional'>선택(0)</span>|부제목 상하 포지션 이동 값| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"cc별 중고자동차 판매량\" }, subtitle: { // subtitle 설정 text: \"2014년 1/4분기\", y: 25 } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/subtitle/y.html"
          }
        ]
      },
      {
        "gid": 5,
        "name": "props-title",
        "label": "title",
        "children": [
          {
            "cid": 83,
            "sid": "aatitle",
            "name": "aatitle",
            "label": "title 속성이란",
            "data": {
              "body": "> 제목에 대한 구성 옵션을 설정 합니다. > 차트 기본 속성 설정은 `setOptions` 의 `title`를 이용하여 정의 합니다. ### Info |name|type|required(default)|description| |---|---|---|--------| |text|`string`|<span class='optional'>선택</span>|제목 문자열| |align|`string`|<span class='optional'>선택(center)</span>|좌우 정렬 값| |verticalAlign|`string`|<span class='optional'>선택</span>|상하 정렬 값 |x|`number`|<span class='optional'>선택(0)</span>|좌우 포지션 이동 값| |y|`number`|<span class='optional'>선택</span>|상하 포지션 이동 값| |style|`object`|<span class='optional'>선택</span>|스타일 설정| |style.color|`color`|<span class='optional'>선택</span>|폰트 색상| |style.fontSize|`string`|<span class='optional'>선택</span>|폰트 크기| |style.fontWeight|`string`|<span class='optional'>선택</span>|폰트 두께| |useHTML|`boolean`|<span class='optional'>선택(false)</span>|제목 문자열에 html tag 사용 여부|"
            },
            "url": "docs/props/title/aatitle.html"
          },
          {
            "cid": 84,
            "sid": "align-2",
            "name": "align",
            "label": "align",
            "data": {
              "body": "> 제목의 좌우 정렬 방법을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |align|`string`|<span class='optional'>선택(center)</span>|좌우 정렬 값| ### Enum * align |value|description| |-----|-----------| |center|중앙 정렬| |left|좌측 정렬| |right|우측 정렬| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"cc별 중고자동차 판매량\" }, subtitle: { // subtitle 설정 text: \"2014년 1/4분기\", align: \"left\" } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/title/align.html"
          },
          {
            "cid": 85,
            "sid": "style-3",
            "name": "style",
            "label": "style",
            "data": {
              "body": "> 제목의 스타일을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |style.color|`string`|<span class='optional'>선택</span>|폰트 색상| |style.fontSize|`string`|<span class='optional'>선택</span>|폰트 크기| |style.fontWeight|`string`|<span class='optional'>선택</span>|폰트 두께| |style.fontFamily|`string`|<span class='optional'>선택</span>|폰트 글꼴| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"2014년 1/4분기\", style: { color: \"red\", fontSize: \"1.2em\", fontWeight: \"bold\" } } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/title/style.html"
          },
          {
            "cid": 86,
            "sid": "text-2",
            "name": "text",
            "label": "text",
            "data": {
              "body": "> 제목 문자열을 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |text|`string`|<span class='optional'>선택</span>|제목 문자열| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"cc별 중고자동차 판매량\" }, subtitle: { // subtitle 설정 text: \"<span style='font-size: 1.2em; font-weight: bold; '>2014년</span> 1/4분기\" } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/title/text.html"
          },
          {
            "cid": 87,
            "sid": "useHTML-2",
            "name": "useHTML",
            "label": "useHTML",
            "data": {
              "body": "> 제목 문자열에 html tag 사용 여부를 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |useHTML|`boolean`|<span class='optional'>선택(false)</span>|제목 문자열에 html tag 사용 여부| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"<span style='font-size: 2em; font-weight: bold;'>cc별 중고자동차 판매량</span>\", useHTML: true }, subtitle: { // subtitle 설정 text: \"2014년 1/4분기\", useHTML: true } }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-title-useHTML.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/title/useHTML.html"
          },
          {
            "cid": 88,
            "sid": "verticalAlign-2",
            "name": "verticalAlign",
            "label": "verticalAlign",
            "data": {
              "body": "> 제목의 상하 정렬 값을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |verticalAlign|`string`|<span class='optional'>선택(center)</span>|상하 정렬 값| ### Enum * verticalAlign |value|description| |-----|-----------| |top|상단 정렬| |middle|중앙 정렬| |bottom|하단 정렬| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"2014년 1/4분기\", verticalAlign: \"middle\" } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/title/verticalAlign.html"
          },
          {
            "cid": 89,
            "sid": "x-2",
            "name": "x",
            "label": "x",
            "data": {
              "body": "> 제목의 좌우 포지션 이동값을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |x|`number`|<span class='optional'>선택(0)</span>|제목 좌우 포지션 이동 값| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"cc별 중고자동차 판매량\", x:40 } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/title/x.html"
          },
          {
            "cid": 90,
            "sid": "y-2",
            "name": "y",
            "label": "y",
            "data": {
              "body": "> 제목의 상하 포지션 이동값을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |y|`number`|<span class='optional'>선택(0)</span>|제목 상하 포지션 이동 값| ### Example ```javascript myChart.setOptions({ title: { // title 설정 text: \"cc별 중고자동차 판매량\", y: 25 } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/title/y.html"
          }
        ]
      },
      {
        "gid": 6,
        "name": "props-legend",
        "label": "legend",
        "children": [
          {
            "cid": 91,
            "sid": "alegend",
            "name": "alegend",
            "label": "legend 속성이란",
            "data": {
              "body": "> 차트의 범례에 대한 구성 옵션을 설정하는 속성입니다. > `setOptions` 의 `legend`를 이용하여 범례에 대한 구성 옵션을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|-------------| |enabled|`boolean`|<span class='optional'>선택(true)</span>|범례 표시 여부| |align|`string`|<span class='optional'>선택(center)</span>|가로 정렬 방법| |verticalAlign|`string`|<span class='optional'>선택(bottom)</span>|세로 정렬 방법| |backgroundColor|`color`|<span class='optional'>선택(undefined)</span>|배경색| |borderColor|`color`|<span class='optional'>선택(#999999)</span>|border 색상| |borderWidth|`number`|<span class='optional'>선택(1)</span>|border의 너비| |borderRadius|`number`|<span class='optional'>선택(5)</span>|radius 적용 값| |layout|`string`|<span class='optional'>선택(horizontal)</span>|배치 방법| |title|`object`|<span class='optional'>선택</span>|제목 속성| |title.text|`string`|<span class='optional'>선택(undefined)</span>|제목 문자열| |title.style|`object`|<span class='optional'>선택</span>|스타일 속성| |x|`number`|<span class='optional'>선택(0)</span>|좌우 포지션 이동 값| |y|`number`|<span class='optional'>선택(0)</span>|상하 포지션 이동 값| |floating|`boolean`|<span class='optional'>선택(false)</span>|플로팅영역 여부| |reversed|`boolean`|<span class='optional'>선택(false)</span>|시리즈 항목 역순| |itemStyle.color|`string`|<span class='optional'>선택</span>|시리즈 text 색상| |itemStyle.fontWeight|`string`|<span class='optional'>선택(bold)</span>|시리즈 text 굵기| |itemStyle.fontSize|`string`|<span class='optional'>선택(12px)</span>|시리즈 text 크기| |itemWidth|`number`|<span class='optional'>선택(0)</span>|시리즈 아이템 별 너비| |itemDistance|`number`|<span class='optional'>선택(20)</span>|시리즈 아이템 별 간격| |itemHoverStyle.color|`color`|<span class='optional'>선택(#000000)</span>|시리즈 아이템 마우스 호버시 색상| |shadow|`boolean`|<span class='optional'>선택(false)</span>|시리즈 아이템 그림자 표시 여부| |labelFormat|`string`|<span class='optional'>선택({name})</span>|범례 항목의 데이터 레이블 형식 설정| |labelFormatter|`function()`|<span class='optional'>선택(undefined)</span>|범례 항목의 데이터 레이블 형식 설정| |padding|`number`|<span class='optional'>선택(8)</span>|범례 상자 안의 padding 설정| |rtl|`boolean`|<span class='optional'>선택(false)</span>|범례 아이콘 표시 위치 설정| |symbolHeight|`number`|<span class='optional'>선택</span>|범례 아이콘 높이 설정| |symbolPadding|`number`|<span class='optional'>선택(5)</span>|범례 아이콘과 텍스트 사이 padding 설정 | |symbolRadius|`number`|<span class='optional'>선택</span>|범례 아이콘 radius 설정| |symbolWidth|`number`|<span class='optional'>선택</span>|범례 아이콘 너비 설정| |width|`number` or `string`|<span class='optional'>선택</span>|범례 상자 너비 설정|"
            },
            "url": "docs/props/legend/alegend.html"
          },
          {
            "cid": 92,
            "sid": "align-3",
            "name": "align",
            "label": "align",
            "data": {
              "body": "> 범례의 가로 정렬 방법을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |align|`string`|<span class='optional'>선택(center)</span>|가로 정렬 방법| ### Enum * align |value|description| |-----|-----------| |center|중앙 정렬| |left|좌측 정렬| |right|우측 정렬| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { align: \"left\" // 좌측 정렬 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/align.html"
          },
          {
            "cid": 93,
            "sid": "backgroundColor-2",
            "name": "backgroundColor",
            "label": "backgroundColor",
            "data": {
              "body": "> 범례의 배경색을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |backgroundColor|`color`|<span class='optional'>선택(undefined)</span>|배경색| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { backgroundColor: \"#AFEEEE\" // 배경색 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/backgroundColor.html"
          },
          {
            "cid": 94,
            "sid": "borderColor-3",
            "name": "borderColor",
            "label": "borderColor",
            "data": {
              "body": "> 범례의 border 색상을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |borderColor|`color`|<span class='optional'>선택(#999999)</span>|border 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { borderColor: \"#FF1493\" // border 색 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/borderColor.html"
          },
          {
            "cid": 95,
            "sid": "borderRadius-3",
            "name": "borderRadius",
            "label": "borderRadius",
            "data": {
              "body": "> 범례의 radius 적용 값을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |borderRadius|`number`|<span class='optional'>선택(5)</span>|radius 적용 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { borderRadius: 0 // radius 적용 값 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/borderRadius.html"
          },
          {
            "cid": 96,
            "sid": "borderWidth-3",
            "name": "borderWidth",
            "label": "borderWidth",
            "data": {
              "body": "> 범례 border의 너비를 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |borderWidth|`number`|<span class='optional'>선택(1)</span>|border의 너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { borderWidth: 5 // border 색 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/borderWidth.html"
          },
          {
            "cid": 97,
            "sid": "enabled",
            "name": "enabled",
            "label": "enabled",
            "data": {
              "body": "> 범례의 표시 여부를 설정 합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |enabled|`boolean`|<span class='optional'>선택(true)</span>|범례 표시 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { enabled: false // 범례 표시 여부 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/enabled.html"
          },
          {
            "cid": 98,
            "sid": "floating",
            "name": "floating",
            "label": "floating",
            "data": {
              "body": "> 범례의 플로팅 여부 옵션을 설정 합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |floating|`boolean`|<span class='optional'>선택(false)</span>|플로팅 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { floating: false // 범례 floating 여부 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/floating.html"
          },
          {
            "cid": 99,
            "sid": "itemDistance",
            "name": "itemDistance",
            "label": "itemDistance",
            "data": {
              "body": "> layout이 horizontal(수평) 일 때 범례 항목의 아이템 별 간격을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |itemDistance|`number`|<span class='optional'>선택(20)</span>|범례 항목의 아이템 별 간격 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { layout: \"horizontal\", itemDistance: 50 // 범례 항목의 아이템 별 간격 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/itemDistance.html"
          },
          {
            "cid": 100,
            "sid": "itemHoverStyle",
            "name": "itemHoverStyle",
            "label": "itemHoverStyle",
            "data": {
              "body": "> 범례 항목들의 마우스 호버시 스타일을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |itemHoverStyle|`object`|<span class='optional'>선택</span>|범례 항목의 마우스 호버 스타일 설정| |itemHoverStyle.color|`color`|<span class='optional'>선택(#000000)</span>|범례 항목의 마우스 호버시 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { itemHoverStyle: { color: \"#FF0000\" // 범례 항목의 마우스 호버시 색상 설정 } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/itemHoverStyle.html"
          },
          {
            "cid": 101,
            "sid": "itemStyle",
            "name": "itemStyle",
            "label": "itemStyle",
            "data": {
              "body": "> 범례 항목의 스타일을 설정하는 속성입니다. ### Info |name|type|required (default)|description| |---|---|---|---| |itemStyle|`object`|<span class='optional'>선택</span>|범례 항목의 스타일 설정| |itemStyle.color|`color`|<span class='optional'>선택</span>|범례 항목의 text 색상| |itemStyle.fontWeight|`string`|<span class='optional'>선택</span>|범례 항목의 text 굵기| |itemStyle.fontSize|`string`|<span class='optional'>선택</span>|범례 항목의 text 크기| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { itemStyle: { // 범례 항목의 스타일 설정 color: \"#FF0000\", // 범례 항목의 text 색상 fontWeight: \"bold\", // 범례 항목의 text 굵기 fontSize: \"1.5em\" // 범례 항목의 text 크기 } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/itemStyle.html"
          },
          {
            "cid": 102,
            "sid": "itemWidth",
            "name": "itemWidth",
            "label": "itemWidth",
            "data": {
              "body": "> 범례 항목의 아이템별 너비를 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |itemWidth|`number`|<span class='optional'>선택(0)</span>|범례 항목의 아이템 별 너비 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { itemWidth: 100 // 범례 항목의 아이템 별 너비 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/itemWidth.html"
          },
          {
            "cid": 103,
            "sid": "labelFormat",
            "name": "labelFormat",
            "label": "labelFormat",
            "data": {
              "body": "> 범례 항목에 표시될 데이터 레이블의 형식을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |labelFormat|`string`|<span class='optional'>선택({name})</span>|범례 항목의 데이터 레이블 형식 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { labelFormat: '{name}시' // 각 범례 항목의 데이터 레이블 형식 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/labelFormat.html"
          },
          {
            "cid": 104,
            "sid": "labelFormatter",
            "name": "labelFormatter",
            "label": "labelFormatter",
            "data": {
              "body": "> 범례 항목에 표시될 데이터 레이블의 형식을 설정합니다. > `return`값이 범례 항목에 표시됩니다. > 키워드 `this`는 계열 개체를 참조하거나, pie 차트의 경우 포인트 개체를 뜻합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |labelFormatter|`function()`|<span class='optional'>선택(undefined)</span>|범례 항목의 데이터 레이블 형식 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { labelFormatter: function () { // 범례 항목의 데이터 레이블 형식 설정 함수 return this.index + this.name; } } series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/labelFormatter.html"
          },
          {
            "cid": 105,
            "sid": "layout",
            "name": "layout",
            "label": "layout",
            "data": {
              "body": "> 범례의 배치 방법을 설정 합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |layout|`string`|<span class='optional'>선택(horizontal)</span>|배치 방법| ### Enum * layout |value|description| |-----|-----------| |horizontal|가로 나열 배치| |vertical|세로 나열 배치| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { layout: \"vertical\", // 범례의 배치 방법 설정(세로 나열) align: \"right\", verticalAlign: \"middle\" }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/layout.html"
          },
          {
            "cid": 106,
            "sid": "padding",
            "name": "padding",
            "label": "padding",
            "data": {
              "body": "> 범례 상자 안의 padding 을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |padding|`number`|<span class='optional'>선택(8)</span>|범례 상자 안의 padding 설정| ### Example ```javascript myChart.setOptions({ legend: { padding: 50 // 범례 상자 안의padding 값 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/padding.html"
          },
          {
            "cid": 107,
            "sid": "reversed",
            "name": "reversed",
            "label": "reversed",
            "data": {
              "body": "> 범례 항목들의 역순 여부를 설정 합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |reversed|`boolean`|<span class='optional'>선택(false)</span>|범례 항목 역순 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { reversed: \"true\" // 범례 항목 역순 여부 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/reversed.html"
          },
          {
            "cid": 108,
            "sid": "rtl",
            "name": "rtl",
            "label": "rtl",
            "data": {
              "body": "> 범례 아이콘이 텍스트 왼쪽이나 오른쪽에 위치하게 설정합니다. > `rtl : true` 로 설정하면 텍스트 오른쪽에 아이콘이 위치합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |rtl|`boolean`|<span class='optional'>선택(false)</span>|범례 아이콘의 위치 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { rtl: true // 범례 아이콘이 텍스트 오른쪽에 위치하게 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/rtl.html"
          },
          {
            "cid": 109,
            "sid": "shadow-3",
            "name": "shadow",
            "label": "shadow",
            "data": {
              "body": "> 범례의 그림자 표시 여부를 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |shadow|`boolean`|<span class='optional'>선택(false)</span>|그림자 표시 여부| ### Example ```javascript myChart.setOptions({ legend: { shadow: \"true\" // 그림자 표시 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/shadow.html"
          },
          {
            "cid": 110,
            "sid": "symbolHeight",
            "name": "symbolHeight",
            "label": "symbolHeight",
            "data": {
              "body": "> 범례 아이콘의 높이를 설정합니다. > symbolHeight 가 선언되지 않은 경우 아이콘의 높이는 범례 항목의 글꼴 크기로 기본 설정됩니다. > 참고 : 범례 아이콘이 line 차트같이 `선`이나 scatter 차트같이 `점`으로 표시되는 경우 symbolHeight 설정이 불가합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |symbolHeight|`number`|<span class='optional'>선택(undefined)</span>|범례 아이콘의 높이| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { symbolHeight: 10 // 범례 아이콘의 높이 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/symbolHeight.html"
          },
          {
            "cid": 111,
            "sid": "symbolPadding",
            "name": "symbolPadding",
            "label": "symbolPadding",
            "data": {
              "body": "> 범례 아이콘과 텍스트 사이의 padding 을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |symbolPadding|`number`|<span class='optional'>선택(5)</span>|범례 아이콘과 텍스트 사이의 padding| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { symbolPadding: 10 // 범례 아이콘과 텍스트 사이의 padding 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/symbolPadding.html"
          },
          {
            "cid": 112,
            "sid": "symbolRadius",
            "name": "symbolRadius",
            "label": "symbolRadius",
            "data": {
              "body": "> 범례 아이콘의 radius 정도를 설정합니다. > column, bar 차트와 같이 범례 아이콘이 직사각형일 경우에만 적용 됩니다. ### Info |name|type|required (default)|description| |---|---|---|---| |symbolRadius|`number`|<span class='optional'>선택(undefined)</span>|범례 아이콘의 radius 정도 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { symbolRadius: 5 // 범례 아이콘의 radius 정도 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/symbolRadius.html"
          },
          {
            "cid": 113,
            "sid": "symbolWidth",
            "name": "symbolWidth",
            "label": "symbolWidth",
            "data": {
              "body": "> 범례 아이콘의 너비를 설정합니다. > 정사각형 아이콘의 너비는 symbolHeight 설정 값이 기본 값입니다. > 그 외 아이콘의 너비는 16 이 기본값입니다. ### Info |name|type|required (default)|description| |---|---|---|---| |borderWidth|`number`|<span class='optional'>선택</span>|border의 너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { symbolWidth: 10 // 범례 아이콘의 너비를 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/symbolWidth.html"
          },
          {
            "cid": 114,
            "sid": "title",
            "name": "title",
            "label": "title",
            "data": {
              "body": "> 범례의 제목 영역에 대한 설정입니다. ### Info |name|type|required (default)|description| |---|---|---|---| |title|`object`|<span class='optional'>선택</span>|제목 속성| |title.text|`object`|<span class='optional'>선택(undefined)</span>|제목 문자열| |title.style|`object`|<span class='optional'>선택</span>|스타일 속성| ### Enum * title.style |value|type|required|description| |-----|----|----|---------------| |color|`color`|<span class='optional'>선택(#000000)</span>|범례 제목의 폰트 색상| |fontSize|`string`|<span class='optional'>선택(12px)</span>|범례 제목의 폰트 크기| |fontWeight|`string`|<span class='optional'>선택(bold)</span>|범례 제목의 폰트 두께| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { title: { // 범례 제목 속성 text: \"지역\", // 범례 제목 문자열 style: { // 범례 제목 스타일 속성 fontWeight: \"bold\" // 범례 제목 스타일 속성의 폰트 두께 } } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/title.html"
          },
          {
            "cid": 115,
            "sid": "verticalAlign-3",
            "name": "verticalAlign",
            "label": "verticalAlign",
            "data": {
              "body": "> 세로 정렬 방법을 설정합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |verticalAlign|`string`|<span class='optional'>선택(bottom)</span>|세로 정렬 방법| ### Enum * verticalAlign |value|description| |-----|-----------| |top|중앙 정렬| |middle|좌측 정렬| |bottom|우측 정렬| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { verticalAlign: \"top\" // 세로 정렬 방법 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/verticalAlign.html"
          },
          {
            "cid": 116,
            "sid": "width",
            "name": "width",
            "label": "width",
            "data": {
              "body": "> 범례 상자의 너비를 설정합니다. > 차트 아래 또는 위에 표시되는 범례는 `전체 차트 너비`가 기본값입니다. > 왼쪽 및 오른쪽에 표시되는 범례는 `차트 너비의 절반`이 기본값입니다. ### Info |name|type|required (default)|description| |---|---|---|---| |borderWidth|`number` or `string`|<span class='optional'>선택</span>|범례 상자 너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { width: \"50%\" // 범례 상자 너비 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/width.html"
          },
          {
            "cid": 117,
            "sid": "x-3",
            "name": "x",
            "label": "x",
            "data": {
              "body": "> 범례의 좌우 포지션 이동값을 설정합니다. > 음수는 왼쪽, 양수는 오른쪽으로 이동합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |x|`number`|<span class='optional'>선택(0)</span>|좌우 포지션 이동 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { align: \"left\", x: 57 // 좌우 포지션 이동 값 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/x.html"
          },
          {
            "cid": 118,
            "sid": "y-3",
            "name": "y",
            "label": "y",
            "data": {
              "body": "> 범례의 상하 포지션 이동값을 설정합니다. > 음수는 왼쪽, 양수는 오른쪽으로 이동합니다. ### Info |name|type|required (default)|description| |---|---|---|---| |y|`number`|<span class='optional'>선택(0)</span>|상하 포지션 이동 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, legend: { align: \"right\", verticalAlign: \"bottom\", layout: \"vertical\", y: -20 // 상하 포지션 이동 값 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/legend/y.html"
          }
        ]
      },
      {
        "gid": 7,
        "name": "props-tooltip",
        "label": "tooltip",
        "children": [
          {
            "cid": 119,
            "sid": "aatooltip",
            "name": "aatooltip",
            "label": "tooltip 속성이란",
            "data": {
              "body": "> 차트의 툴팁에 대한 구성 옵션을 설정합니다. > `setOptions`의 `tooltip` 을 이용하여 정의 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |animation|`boolean`|<span class='optional'>선택(true)</span>|출력시 애니메이션 효과 사용 여부| |backgroundColor|`color`|<span class='optional'>선택</span>|배경색| |borderColor|`color`|<span class='optional'>선택</span>|border 색상| |borderRadius|`number`|<span class='optional'>선택(3)</span>|radius 적용 값| |borderWidth|`number`|<span class='optional'>선택(1)</span>|border의 너비| |distance|`number`|<span class='optional'>선택(16)</span>|툴팁과 포인트 간 거리 설정| |enabled|`boolean`|<span class='optional'>선택(true)</span>|툴팁 사용 여부| |formatter|`function()`|<span class='optional'>선택</span>|툴팁의 텍스트를 포맷하는 콜백| |headerFormat|`string`|<span class='optional'>선택</span>|헤더 출력 포맷| |hideDelay|`number`|<span class='optional'>선택(500)</span>|툴팁 숨기기까지 지연 시간| |padding|`number`|<span class='optional'>선택(8)</span>|툴팁 내부 padding| |pointFormat|`string`|<span class='optional'>선택</span>|포인트 값 출력 포맷| |shadow|`boolean`|<span class='optional'>선택(true)</span>|그림자 표시 여부| |shared|`boolean`|<span class='optional'>선택(false)</span>|모든 시리즈의 값을 묶어서 출력할지 여부| |style|`object`|<span class='optional'>선택</span>|스타일 속성| |useHTML|`boolean`|<span class='optional'>선택(false)</span>|html tag 사용 여부| |valuePrefix|`string`|<span class='optional'>선택</span>|값의 머리 글 문자열| |valueSuffix|`string`|<span class='optional'>선택</span>|값의 꼬리 글 문자열|"
            },
            "url": "docs/props/tooltip/aatooltip.html"
          },
          {
            "cid": 120,
            "sid": "animation-2",
            "name": "animation",
            "label": "animation",
            "data": {
              "body": "> 툴팁 출력 시 애니메이션 효과 사용 여부를 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |animation|`boolean`|<span class='optional'>선택(true)</span>|툴팁 출력 시 애니메이션 효과 사용 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { animation: false // 애니메이션 효과 사용 여부 (사용하지 않음 설정) }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/animation.html"
          },
          {
            "cid": 121,
            "sid": "backgroundColor-3",
            "name": "backgroundColor",
            "label": "backgroundColor",
            "data": {
              "body": "> 툴팁의 배경색을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |backgroundColor|`color`|<span class='optional'>선택(#ffffff)</span>|툴팁의 배경색| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { backgroundColor: \"#D2B48C\" // 툴팁 배경색 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/backgroundColor.html"
          },
          {
            "cid": 122,
            "sid": "borderColor-4",
            "name": "borderColor",
            "label": "borderColor",
            "data": {
              "body": "> 툴팁의 border 색상을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |borderColor|`color`|<span class='optional'>선택</span>|툴팁의 border색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { borderColor: \"#D2B48C\" // 툴팁 border색 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/borderColor.html"
          },
          {
            "cid": 123,
            "sid": "borderRadius-4",
            "name": "borderRadius",
            "label": "borderRadius",
            "data": {
              "body": "> 툴팁 radius 적용 값을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |borderRadius|`number`|<span class='optional'>선택(3)</span>|radius 적용 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { borderRadius: 9 // 툴팁 radius 적용 값 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/borderRadius.html"
          },
          {
            "cid": 124,
            "sid": "borderWidth-4",
            "name": "borderWidth",
            "label": "borderWidth",
            "data": {
              "body": "> 툴팁 border의 너비를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |borderWidth|`number`|<span class='optional'>선택(1)</span>|툴팁 border의 너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { borderWidth: 5 // 툴팁 border의 너비 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/borderWidth.html"
          },
          {
            "cid": 125,
            "sid": "distance",
            "name": "distance",
            "label": "distance",
            "data": {
              "body": "> 툴팁과 포인트 사이의 거리를 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |distance|`number`|<span class='optional'>선택(16)</span>|툴팁과 포인트 간 거리 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { distance: 50 // 툴팁과 포인트 간 거리 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/distance.html"
          },
          {
            "cid": 126,
            "sid": "enabled-2",
            "name": "enabled",
            "label": "enabled",
            "data": {
              "body": "> 툴팁 사용 여부를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |enabled|`boolean`|<span class='optional'>선택(true)</span>|툴팁 사용 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { enabled: false // 툴팁 사용 여부 (사용하지 않음 설정) }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/enabled.html"
          },
          {
            "cid": 127,
            "sid": "formatter",
            "name": "formatter",
            "label": "formatter",
            "data": {
              "body": "> 툴팁의 텍스트를 포맷하는 콜백 기능 속성 입니다. ### Info |name|type|required|description| |---|---|---|---| |formatter|`function()`|<span class='optional'>선택</span>|툴팁의 텍스트를 포맷| ### Enum * formatter |value|description| |---|---| |{this.percentage}|백분율| |{this.point}|포인트 개체 사용 할 수 있음. <span style=\"color:blue;\">Ex) this.point<hi>.name</span>| |{this.series}|시리즈 개체 사용 할 수 있음. <span style=\"color:blue;\">Ex) this.series<hi>.name</span>| |{this.total}|총 가치 x값| |{this.x}|현재 x값| |{this.y}|현재 y값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: {// tooltip 속성 설정 formatter: function (){ return this.series.name + ‘ for <b>’ + this.x + ‘</b> is <b>’ + this.y + ‘</b>’; } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/formatter.html"
          },
          {
            "cid": 128,
            "sid": "headerFormat",
            "name": "headerFormat",
            "label": "headerFormat",
            "data": {
              "body": "> 툴팁의 헤더 출력 포맷을 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |headerFormat|`string`|<span class='optional'>선택</span>|툴팁 헤더 출력 포맷| ### Enum * headerFormat |value|description| |---|-------| |{series.<hi>name}|시리즈명| |{series.color}|시리즈 색상| |{point.x}|x축 값| |{point.y}|y축 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { headerFormat: \"{series.name} \", // 툴팁의 헤더 출력 포맷 pointFormat: \"{point.x}, {point.y}\" }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/headerFormat.html"
          },
          {
            "cid": 129,
            "sid": "hideDelay",
            "name": "hideDelay",
            "label": "hideDelay",
            "data": {
              "body": "> 툴팁이 숨겨지기까지의 지연 시간을 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |hideDelay|`number`|<span class='optional'>선택(500)</span>|툴팁 숨기기 지연 시간 설정 (밀리초)| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { hideDelay : 1000 // 툴팁 숨기기 지연 시간 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/hideDelay.html"
          },
          {
            "cid": 130,
            "sid": "padding-2",
            "name": "padding",
            "label": "padding",
            "data": {
              "body": "> 툴팁 내부 padding 값을 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |padding|`number`|<span class='optional'>선택(8)</span>|툴팁 내부 padding 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { padding : 50 // 툴팁 내부 padding 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/padding.html"
          },
          {
            "cid": 131,
            "sid": "pointFormat",
            "name": "pointFormat",
            "label": "pointFormat",
            "data": {
              "body": "> 툴팁의 포인트 값 출력 포맷을 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |pointFormat|`string`|<span class='optional'>선택</span>|포인트 값 출력 포맷| ### Enum * pointFormat |value|description| |---|-------| |{series<hi>.name}|시리즈명| |{series.color}|시리즈 색상| |{point.x}|x축 값| |{point.y}|y축 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { headerFormat: \"{series.name} \", pointFormat: \"{point.x}, {point.y}\" // 툴팁의 포인트 값 출력 포맷 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/pointFormat.html"
          },
          {
            "cid": 132,
            "sid": "shadow-4",
            "name": "shadow",
            "label": "shadow",
            "data": {
              "body": "> 툴팁의 그림자 표시 여부를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |shadow|`boolean`|<span class='optional'>선택(true)</span>|툴팁의 그림자 표시 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { shadow: false // 툴팁의 그림자 표시 여부 (설정하지 않음) }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/shadow.html"
          },
          {
            "cid": 133,
            "sid": "shared",
            "name": "shared",
            "label": "shared",
            "data": {
              "body": "> 모든 시리즈의 값을 묶어서 출력할지 여부를 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |shared|`boolean`|<span class='optional'>선택(false)</span>|모든 시리즈의 값을 묶어서 출력할지 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { shared: true // 모든 시리즈의 값을 묶어서 출력 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-shared.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/shared.html"
          },
          {
            "cid": 134,
            "sid": "style-4",
            "name": "style",
            "label": "style",
            "data": {
              "body": "> 툴팁의 스타일 속성을 설정 합니다. ### Info |name|type|required|description| |---|---|---|---| |style|`object`|<span class='optional'>선택</span>|툴팁의 스타일 속성| |style.color|`color`|<span class='optional'>선택(#333333)</span>|툴팁의 폰트 색상| |style.fontSize|`string`|<span class='optional'>선택</span>|툴팁의 폰트 크기| |style.fontWeight|`string`|<span class='optional'>선택</span>|툴팁의 폰트 두께| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { style: { // 툴팁의 스타일 속성 fontSize: \"1.3em\", // 툴팁의 폰트 크기 fontWeight: \"bold\" // 툴팁의 폰트 두께 } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/style.html"
          },
          {
            "cid": 135,
            "sid": "useHTML-3",
            "name": "useHTML",
            "label": "useHTML",
            "data": {
              "body": "> 툴팁의 html tag 사용 여부를 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |useHTML|`boolean`|<span class='optional'>선택(false)</span>|html tag 사용 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { headerFormat: \"<span style='color: {series.color}; font-weight: bold'>{series.name}</span> \", pointFormat: \"{point.x}, {point.y}\", useHTML: true // 툴팁의 html tag 사용 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-useHTML.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/useHTML.html"
          },
          {
            "cid": 136,
            "sid": "valuePrefix",
            "name": "valuePrefix",
            "label": "valuePrefix",
            "data": {
              "body": "> 툴팁 값의 머리 글 문자열을 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |valuePrefix|`string`|<span class='optional'>선택</span>|값의 머리 글 문자열| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { valuePrefix: \"연간 \", // 툴팁 머리 글 문자열 설정 valueSuffix: \"만명\" }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-valueprefix.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/valuePrefix.html"
          },
          {
            "cid": 137,
            "sid": "valueSuffix",
            "name": "valueSuffix",
            "label": "valueSuffix",
            "data": {
              "body": "> 툴팁 값의 꼬리 글 문자열을 설정합니다. ### Info |name|type|required|description| |---|---|---|---| |valueSuffix|`string`|<span class='optional'>선택</span>|값의 꼬리 글 문자열| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, tooltip: { valuePrefix: \"연간 \", valueSuffix: \"만명\" // 툴팁 꼬리 글 문자열 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-valueSuffix.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/tooltip/valueSuffix.html"
          }
        ]
      },
      {
        "gid": 8,
        "name": "props-xAxis",
        "label": "xAxis",
        "children": [
          {
            "cid": 138,
            "sid": "aaxAxis",
            "name": "aaxAxis",
            "label": "xAxis 속성이란",
            "data": {
              "body": "> X축에 대한 구성 옵션을 설정하는 속성입니다. > 구성 옵션에 대한 정보는 아래와 같습니다. ### Info |name|type|required(default)|description| |---|---|---|--------| |alternateGridColor|`color`|<span class='optional'>선택</span>|그리드 라인의 교차 색상| |categories|`Array`|<span class='optional'>선택</span>|축레이블 설정| |crosshair|`boolean`|<span class='optional'>선택(false)</span>|포인트에 마우스 hover 시 십자 가이드라인 표시 여부| |endOnTick|`boolean`|<span class='optional'>선택(false)</span>|축의 마지막 점을 강제로 표시할지 여부| |gridLineColor|`color`|<span class='optional'>선택(#262626)</span>|그리드 라인의 색상| |gridLineDashStyle|`string`|<span class='optional'>선택(solid)</span>|그리드 라인의 종류| |gridLineWidth|`number`|<span class='optional'>선택(0)</span>|그리드 라인의 너비| |gridZIndex|`number`|<span class='optional'>선택(1)</span>|그리드 라인의 Z index| |labels|`object`|<span class='optional'>선택</span>|라벨 속성| |lineColor|`color`|<span class='optional'>선택(#ccd6eb)</span>|축 라인의 색상| |lineWidth|`number`|<span class='optional'>선택(1)</span>|축 라인의 너비| |max|`number`|<span class='optional'>선택</span>|축의 최댓값| |min|`number`|<span class='optional'>선택</span>|축의 최솟값| |minorGridLineColor|`color`|<span class='optional'>선택(#f2f2f2)</span>|보조 그리드 라인의 색상| |minorGridLineDashStyle|`string`|<span class='optional'>선택(Solid)</span>|보조 그리드 라인의 종류| |minorGridLineWidth|`number`|<span class='optional'>선택(1)</span>|보조 그리드 라인의 너비| |minorTickColor|`color`|<span class='optional'>선택(#999999)</span>|축에 표시할 보조 점의 색상| |minorTickInterval|`number` or `string`|<span class='optional'>선택</span>|축에 표시할 보조 점의 간격| |minorTickLength|`number`|<span class='optional'>선택(2)</span>|축에 표시할 보조 점의 길이| |minorTickWidth|`number`|<span class='optional'>선택(0)</span>|축에 표시할 보조 점의 너비| |offset|`number`|<span class='optional'>선택(0)</span>|기본 위치 기준으로 표시할 위치 값| |opposite|`boolean`|<span class='optional'>선택(false)</span>|상단에 축 표시 여부| |plotBands|`object`|<span class='optional'>선택</span>|플롯밴드 속성 (특정영역 하이라이팅)| |reversed|`boolean`|<span class='optional'>선택(false)</span>|축 반전 여부| |showFirstLabel|`boolean`|<span class='optional'>선택(true)</span>|첫번째 축 라벨여부 표시| |showLastLabel|`boolean`|<span class='optional'>선택(true)</span>|마지막 축 라벨여부 표시| |startOnTick|`boolean`|<span class='optional'>선택(false)</span>|축의 시작점을 강제로 표시할지 여부| |tickInterval|`number`|<span class='optional'>선택</span>|축에 표시할 눈금 간격| |tickLength|`number`|<span class='optional'>선택(10)</span>|축에 표시할 눈금 길이| |tickPosition|`number`|<span class='optional'>선택(outside)</span>|축에 표시할 눈금 위치| |tickWidth|`number`|<span class='optional'>선택(1)</span>|축에 표시한 눈금 너비| |title|`object`|<span class='optional'>선택</span>|축 제목 속성 (JSON 형식)| |visible|`boolean`|<span class='optional'>선택(true)</span>|축 보임 여부|"
            },
            "url": "docs/props/xAxis/aaxAxis.html"
          },
          {
            "cid": 139,
            "sid": "allowDecimals",
            "name": "allowDecimals",
            "label": "allowDecimals",
            "data": {
              "body": "> x축의 눈금에 소수점을 표시합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |allowDecimals|`boolean`|<span class='optional'>선택(false)</span>|x축에 소수점 표시 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"line\" }, xAxis: { title: { text: \"단위(℃)\", align: \"low\", rotation: 0, style: { color: \"#575757\", fontSize: \"10px\" } }, allowDecimals: true // x축의 소수점 표시 } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/allowDecimals.html"
          },
          {
            "cid": 140,
            "sid": "alternateGridColor",
            "name": "alternateGridColor",
            "label": "alternateGridColor",
            "data": {
              "body": "> 그리드 라인의 교차 색상을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |alternateGridColor|`color`|<span class='optional'>선택</span>|그리드 라인의 교차 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { alternateGridColor: \"#D3D3D3\" // 그리드 라인의 교차 색상 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-alternateGridColor.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/alternateGridColor.html"
          },
          {
            "cid": 141,
            "sid": "categories",
            "name": "categories",
            "label": "categories",
            "data": {
              "body": "> x축 레이블을 설정합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |categories|`Array`|<span class='optional'>선택</span>|x축 레이블 설정| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, xAxis: { categories: [\"A\",\"B\",\"C\"] // x축 레이블 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-categories.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/categories.html"
          },
          {
            "cid": 142,
            "sid": "crosshair",
            "name": "crosshair",
            "label": "crosshair",
            "data": {
              "body": "> 포인트에 마우스 hover 시 십자 가이드라인 표시 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |crosshair|`boolean`|<span class='optional'>선택(false)</span>|포인트에 마우스 hover 시 십자 가이드라인 표시 여부| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, xAxis: { crosshair: true // 십자 가이드라인 표시 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/crosshair.html"
          },
          {
            "cid": 143,
            "sid": "endOnTick",
            "name": "endOnTick",
            "label": "endOnTick",
            "data": {
              "body": "> x축의 마지막점 다음에 강제로 축의 지점을 강제로 표시할지 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |endOnTick|`boolean`|<span class='optional'>선택(false)</span>|x축의 마지막점 강제로 표시할지 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { endOnTick: true // 마지막 점을 강제로 표시 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-endOnTick.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/endOnTick.html"
          },
          {
            "cid": 144,
            "sid": "gridLineColor",
            "name": "gridLineColor",
            "label": "gridLineColor",
            "data": {
              "body": "> 그리드 라인의 색상을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |gridLineColor|`color`|<span class='optional'>선택(#262626)</span>|그리드 라인의 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { gridLineColor: \"#FF8C00\" // 그리드 라인의 색상 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-gridLineColor.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/gridLineColor.html"
          },
          {
            "cid": 145,
            "sid": "gridLineDashStyle",
            "name": "gridLineDashStyle",
            "label": "gridLineDashStyle",
            "data": {
              "body": "> 그리드 라인의 종류를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |gridLineDashStyle|`string`|<span class='optional'>선택(Solid)</span>|그리드 라인의 종류| ### Enum * gridLineDashStyle |value|description| |-----|-----------| |Solid|실선| |ShortDash|짧은 대쉬선| |ShortDot|짧은 점선| |ShortDashDot|짧은 대쉬+점| |ShortDashDotDot|짧은 대쉬+점+점| |Dot|점선| |Dash|대쉬선| |LongDash|긴 대쉬선| |DashDot|대쉬+점| |LongDashDot|긴 대쉬+점| |LongDashDotDot|긴 대쉬+점+점| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { gridLineWidth: 2, gridLineDashStyle: \"dash\" // 그리드 라인의 종류 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-gridLineDashStyle.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/gridLineDashStyle.html"
          },
          {
            "cid": 146,
            "sid": "gridLineWidth",
            "name": "gridLineWidth",
            "label": "gridLineWidth",
            "data": {
              "body": "> 그리드 라인의 너비를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |gridLineWidth|`number`|<span class='optional'>선택(0)</span>|그리드 라인의 너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { gridLineWidth: 2 // 그리드 라인의 너비 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-gridLineWidth.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/gridLineWidth.html"
          },
          {
            "cid": 147,
            "sid": "gridZIndex",
            "name": "gridZIndex",
            "label": "gridZIndex",
            "data": {
              "body": "> 그리드 라인의 Z index를 설정합니다. > `gridZIndex: 4` 부터 차트 위에 렌더링 됩니다. ### Info |name|type|required(default)|description| |---|---|---|---| |gridZIndex|`number`|<span class='optional'>선택(1)</span>|그리드 라인의 Z index| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { gridZIndex: 2, gridZIndex: 5 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-gridZIndex.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/gridZIndex.html"
          },
          {
            "cid": 148,
            "sid": "labels",
            "name": "labels",
            "label": "labels",
            "data": {
              "body": "> x축의 라벨 속성을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |labels|`object`|<span class='optional'>선택</span>|x축의 라벨 속성| |labels.align|`string`|<span class='optional'>선택(center)</span>|x축 라벨 좌우 정렬 방법| |labels.format|`string`|<span class='optional'>선택({value})</span>|x축 라벨 포맷 문자열| |labels.formatter|`function()`|<span class='optional'>선택</span>|x축 라벨의 포맷을 정의하는 callback 함수(값은 {this.value})| |labels.style|`object`|<span class='optional'>선택</span>|x축 라벨 스타일 속성| |labels.useHTML|`boolean`|<span class='optional'>선택(false)</span>|x축 라벨 html tag 사용 여부| |labels.rotation|`number`|<span class='optional'>선택(0)</span>|x축 라벨 기울기 (0~360)| |labels.step|`number`|<span class='optional'>선택</span>|x축 라벨 표시 단계| |labels.enabled|`boolean`|<span class='optional'>선택(true)</span>|x축 라벨 사용 여부| |labels.staggerLines|`number`|<span class='optional'>선택(0)</span>|레이블 다단| |labels.x|`number`|<span class='optional'>선택(0)</span>|좌우 포지션 이동 값| |labels.y|`number`|<span class='optional'>선택(0)</span>|상하 포지션 이동 값| * label.style.Info |name|type|required(default)|description| |---|---|---|---| |color|`color`|<span class='optional'>선택</span>|폰트 색상| |fontSize|`string`|<span class='optional'>선택</span>|폰트 크기| |fontWeight|`string`|<span class='optional'>선택</span>|폰트 두께| ### Enum * labels.align |value|description| |-----|-----------| |center|중앙 정렬| |left|좌측 정렬| |right|우측 정렬| * labels.format |value|description| |-----|-----------| |{value}|x축 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { labels: { style:{ fontWeight: \"bold\" }, rotation: -45 } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/labels.html"
          },
          {
            "cid": 149,
            "sid": "lineColor-2",
            "name": "lineColor",
            "label": "lineColor",
            "data": {
              "body": "> x축 라인의 색상을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |lineColor|`color`|<span class='optional'>선택(#ccd6eb)</span>|x축 라인의 색상| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, xAxis: { lineWidth: 5, lineColor: \"#FF4500\" // x축 라인 색상 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-lineColor.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/lineColor.html"
          },
          {
            "cid": 150,
            "sid": "lineWidth-2",
            "name": "lineWidth",
            "label": "lineWidth",
            "data": {
              "body": "> x축 라인의 너비를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |lineWidth|`number`|<span class='optional'>선택(1)</span>|x축 라인의 너비| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, xAxis: { lineWidth: 5 // x축 라인 너비 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/lineWidth.html"
          },
          {
            "cid": 151,
            "sid": "max",
            "name": "max",
            "label": "max",
            "data": {
              "body": "> x축의 최댓값을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |max|`number`|<span class='optional'>선택</span>|x축의 최댓값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { max: 5 // x축 최댓값 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-max.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/max.html"
          },
          {
            "cid": 152,
            "sid": "min",
            "name": "min",
            "label": "min",
            "data": {
              "body": "> x축의 최솟값을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |min|`number`|<span class='optional'>선택</span>|x축의 최솟값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { min: -5 // x축 최솟값 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-min.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/min.html"
          },
          {
            "cid": 153,
            "sid": "minorGridLineColor",
            "name": "minorGridLineColor",
            "label": "minorGridLineColor",
            "data": {
              "body": "> 보조 그리드 라인의 색상을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorGridLineColor|`color`|<span class='optional'>선택(#f2f2f2)</span>|보조 그리드 라인의 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { minorGridLineColor: '#FF8C00', // 보조 그리드 라인 색상 설정 minorTickInterval: 1 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/minorGridLineColor.html"
          },
          {
            "cid": 154,
            "sid": "minorGridLineDashStyle",
            "name": "minorGridLineDashStyle",
            "label": "minorGridLineDashStyle",
            "data": {
              "body": "> 보조 그리드 라인의 종류 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorGridLineDashStyle|`string`|<span class='optional'>선택(Solid)</span>|보조 그리드 라인의 종류| ### Enum * minorGridLineDashStyle |value|description| |-----|-----------| |Solid|실선| |ShortDash|짧은 대쉬선| |ShortDot|짧은 점선| |ShortDashDot|짧은 대쉬+점| |ShortDashDotDot|짧은 대쉬+점+점| |Dot|점선| |Dash|대쉬선| |LongDash|긴 대쉬선| |DashDot|대쉬+점| |LongDashDot|긴 대쉬+점| |LongDashDotDot|긴 대쉬+점+점| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { minorGridLineDashStyle: \"dash\", // 보조 그리드 라인 종류 설정 minorGridLineColor: '#FF8C00', minorTickInterval: 1 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/minorGridLineDashStyle.html"
          },
          {
            "cid": 155,
            "sid": "minorGridLineWidth",
            "name": "minorGridLineWidth",
            "label": "minorGridLineWidth",
            "data": {
              "body": "> 보조 그리드 라인의 너비를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorGridLineWidth|`number`|<span class='optional'>선택(1)</span>|보조 그리드 라인의 너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { minorGridLineColor: '#FF8C00', minorGridLineWidth: 5, // 보조 그리드 라인의 너비 설정 minorTickInterval: 1 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-minorGridLineWidth.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/minorGridLineWidth.html"
          },
          {
            "cid": 156,
            "sid": "minorTickColor",
            "name": "minorTickColor",
            "label": "minorTickColor",
            "data": {
              "body": "> x축에 표시할 보조 점 색상을 설정합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorTickColor|`string`|<span class='optional'>선택(#999999)</span>|x축에 표시할 보조 점 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { minorGridLineColor: '#c4c4c4', minorTickColor:\"#ff0000\", // x축에 표시할 보조 점의 색상 설정 minorTickInterval: 0.1, minorTickWidth: 1, minorTickLength: 5 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-minorTickColor.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/minorTickColor.html"
          },
          {
            "cid": 157,
            "sid": "minorTickInterval",
            "name": "minorTickInterval",
            "label": "minorTickInterval",
            "data": {
              "body": "> x축에 표시할 보조 점의 간격을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorTickInterval|`number` or `string`|<span class='optional'>선택</span>|x축에 표시할 보조 점의 간격| ### Enum * minorTickInterval |value|description| |-----|-----------| |auto|간격을 자동으로 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { minorTickInterval: 0.1, // x축에 표시할 보조 점의 간격 설정 minorTickWidth: 1, minorTickLength: 5 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/minorTickInterval.html"
          },
          {
            "cid": 158,
            "sid": "minorTickLength",
            "name": "minorTickLength",
            "label": "minorTickLength",
            "data": {
              "body": "> x축에 표시할 보조 점의 길이를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorTickLength|`number`|<span class='optional'>선택(2)</span>|x축에 표시할 보조 점의 길이| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { minorTickInterval: 0.1, minorTickWidth: 1, minorTickLength: 10 // x축에 표시할 보조 점의 길이 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/minorTickLength.html"
          },
          {
            "cid": 159,
            "sid": "minorTickWidth",
            "name": "minorTickWidth",
            "label": "minorTickWidth",
            "data": {
              "body": "> x축에 표시할 보조 점의 너비를 설정 합니다. > 참고 : minorTick 을 사용하기 위해서는 반드시 minorTickWidth 의 값을 설정해야 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorTickWidth|`number`|<span class='optional'>선택(0)</span>|x축에 표시할 보조 점의 너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { minorTickInterval: 0.1, minorTickWidth: 10, // x축에 표시할 보조 점의 너비 설정 minorTickLength: 5 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/minorTickWidth.html"
          },
          {
            "cid": 160,
            "sid": "offset",
            "name": "offset",
            "label": "offset",
            "data": {
              "body": "> 기본 위치 기준으로 x축을 표시할 위치 값을 설정 합니다. > 참고 : xAxis.offset 과 yAxis.offset 를 둘 다 음수로 설정하면 4분면 차트를 만들 수 있습니다. ### Info |name|type|required(default)|description| |---|---|---|---| |offset|`number`|<span class='optional'>선택(0)</span>|기본 위치 기준으로 x축을 표시할 위치 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { offset: 20, // 기본 위치 기준으로 x축을 표시할 위치 값 lineWidth: 5 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-offset.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/offset.html"
          },
          {
            "cid": 161,
            "sid": "opposite",
            "name": "opposite",
            "label": "opposite",
            "data": {
              "body": "> 차트 상단에 x축 표시 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |opposite|`boolean`|<span class='optional'>선택(false)</span>|상단에 x축 표시 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { opposite: true // 상단에 x축 표시 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-opposite.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/opposite.html"
          },
          {
            "cid": 162,
            "sid": "plotBands",
            "name": "plotBands",
            "label": "plotBands",
            "data": {
              "body": "> 플롯밴드 속성 (특정영역 하이라이팅)을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |plotBands|`object`|<span class='optional'>선택</span>|플롯밴드 속성| |plotBands.from|`number`|<span class='required'>필수</span>|시작점| |plotBands.<hi>to|`number`|<span class='required'>필수</span>|종료점| |plotBands.color|`color`|<span class='required'>필수</span>|색상| |plotBands.label|`object`|<span class='optional'>선택</span>|라벨 속성| * plotBands.label Info |name|type|required(default)|description| |---|---|---|---| |text|`string`|<span class='optional'>선택</span>|라벨 문자열| |textAlign|`string`|<span class='optional'>선택</span>|라벨 문자열 정렬 방법| |align|`string`|<span class='optional'>선택(center)</span>|좌우 정렬 방법| |rotation|`number`|<span class='optional'>선택(0)</span>|기울기| |useHTML|`boolean`|<span class='optional'>선택(false)</span>|html tag 사용 여부| |style|`object`|<span class='optional'>선택</span>|스타일 속성| * plotBands.label.style Info |name|type|required(default)|description| |---|---|---|---| |color|`color`|<span class='optional'>선택</span>|폰트 색상| |fontSize|`string`|<span class='optional'>선택</span>|폰트 크기| |fontWeight|`string`|<span class='optional'>선택</span>|폰트 두께| ### Enum * plotBands.label.align / plotBands.label.textAlign |value|description| |-----|-----------| |center|중앙 정렬| |left|좌측 정렬| |right|우측 정렬| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { plotBands: { from : 0.5, to: 1.5, color: \"#FF8C00\", label: { text: \"하이라이트\", style: { color: \"#FFFFFF\", fontWeight: \"bold\", fontSize: \"1.2em\" } } } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-plotBands.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/plotBands.html"
          },
          {
            "cid": 163,
            "sid": "reversed-2",
            "name": "reversed",
            "label": "reversed",
            "data": {
              "body": "> x축 반전 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |reversed|`boolean`|<span class='optional'>선택(false)</span>|x축 반전 여부| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, xAxis: { reversed: true // x축 반전 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/reversed.html"
          },
          {
            "cid": 164,
            "sid": "showFirstLabel",
            "name": "showFirstLabel",
            "label": "showFirstLabel",
            "data": {
              "body": "> 첫번째 x축 라벨 표시 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |showFirstLabel|`boolean`|<span class='optional'>선택(true)</span>|첫번째 x축 라벨 표시 여부| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, xAxis: { showFirstLabel: false // 첫번째 x축 라벨 표시 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-showFirstLabel.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/showFirstLabel.html"
          },
          {
            "cid": 165,
            "sid": "showLastLabel",
            "name": "showLastLabel",
            "label": "showLastLabel",
            "data": {
              "body": "> 마지막 x축 라벨 표시 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |showLastLabel|`boolean`|<span class='optional'>선택(true)</span>|마지막 x축 라벨 표시 여부| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, xAxis: { showLastLabel: false // 마지막 x축 라벨 표시 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-showLastLabel.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/showLastLabel.html"
          },
          {
            "cid": 166,
            "sid": "startOnTick",
            "name": "startOnTick",
            "label": "startOnTick",
            "data": {
              "body": "> x축의 시작점 전에 강제로 축의 지점을 강제로 표시할지 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |startOnTick|`boolean`|<span class='optional'>선택(false)</span>|x축의 시작점 전을 강제로 표시할지 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, xAxis: { startOnTick: true // x축의 시작점 전을 강제로 표시할지 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-startOnTick.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/startOnTick.html"
          },
          {
            "cid": 167,
            "sid": "tickInterval",
            "name": "tickInterval",
            "label": "tickInterval",
            "data": {
              "body": "> x축의 눈금 표시 간격을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |tickInterval|`number`|<span class='optional'>선택</span>|x축의 눈금 표시 간격 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"line\" }, xAxis: { tickInterval: 2 // x축의 눈금 표시 간격 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/tickInterval.html"
          },
          {
            "cid": 168,
            "sid": "tickLength",
            "name": "tickLength",
            "label": "tickLength",
            "data": {
              "body": "> x축의 눈금 길이를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |tickLength|`number`|<span class='optional'>선택(10)</span>|x축의 눈금 길이 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"line\" }, xAxis: { tickLength: 20 // x축의 눈금 길이 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/tickLength.html"
          },
          {
            "cid": 169,
            "sid": "tickPosition",
            "name": "tickPosition",
            "label": "tickPosition",
            "data": {
              "body": "> x축의 눈금 표시 위치를 설정합니다. > 참고 : bar 차트나 column 차트의 경우 `tickPosition : inside` 로 설정하면 막대에 가려 보이지 않을 수도 있습니다. ### Info |name|type|required(default)|description| |---|---|---|---| |tickPosition|`string`|<span class='optional'>선택(outside)</span>|x축의 눈금 표시 위치 설정| ### Enum * tickPosition |value|description| |-----|-----------| |outside|바깥쪽에 표시| |inside|안쪽에 표시| ### Example ```javascript myChart.setOptions({ chart: { type: \"line\" }, xAxis: { tickPosition: \"inside\" // x축의 눈금 표시 위치 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/tickPosition.html"
          },
          {
            "cid": 170,
            "sid": "tickWidth",
            "name": "tickWidth",
            "label": "tickWidth",
            "data": {
              "body": "> x축의 눈금 너비를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |tickWidth|`number`|<span class='optional'>선택(1)</span>|x축의 눈금 너비 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"line\" }, xAxis: { tickWidth: 10 // x축의 눈금 너비 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/tickWidth.html"
          },
          {
            "cid": 171,
            "sid": "title-2",
            "name": "title",
            "label": "title",
            "data": {
              "body": "> x축 제목 속성을 설정합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |title|`object`|<span class='optional'>선택</span>|x축 제목 속성 (JSON 형식)| |title.text|`string`|<span class='optional'>선택</span>|x축 제목 문자열| |title.align|`string`|<span class='optional'>선택(center)</span>|x축 제목 좌우 정렬값| |title.x|`number`|<span class='optional'>선택(0)</span>|x축 제목 좌우 포지션 이동 값| |title.y|`number`|<span class='optional'>선택</span>|x축 제목 상하 포지션 이동 값| |title.style|`object`|<span class='optional'>선택</span>|x축 제목 스타일 설정| |title.style.color|`color`|<span class='optional'>선택</span>|x축 제목 폰트 색상| |title.style.fontSize|`string`|<span class='optional'>선택</span>|x축 제목 폰트 크기| |title.style.fontWeight|`string`|<span class='optional'>선택</span>|x축 제목 폰트 두께| |title.rotation|`number`|<span class='optional'>선택(0)</span>|x축 제목 회전| |title.enabled|`boolean`|<span class='optional'>선택(true)</span>|x축 제목 사용 여부| ### Enum * title.align |value|description| |-----|-----------| |center|중앙 정렬| |left|좌측 정렬| |right|우측 정렬| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, xAxis: { title: { // x축 제목 설정 text: \"X축 타이틀\" } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-xAxis-title.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/title.html"
          },
          {
            "cid": 172,
            "sid": "visible-2",
            "name": "visible",
            "label": "visible",
            "data": {
              "body": "> x축의 보임 여부를 설정합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |visible|`boolean`|<span class='optional'>선택(true)</span>|x축 보임 여부| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, xAxis: { visible: false // x축 보임 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/xAxis/visible.html"
          }
        ]
      },
      {
        "gid": 9,
        "name": "props-yAxis",
        "label": "yAxis",
        "children": [
          {
            "cid": 173,
            "sid": "aayAxis",
            "name": "aayAxis",
            "label": "yAxis 속성이란",
            "data": {
              "body": "> Y축에 대한 구성 옵션을 설정하는 속성입니다. > 구성 옵션에 대한 정보는 아래와 같습니다. ### Info |name|type|required(default)|description| |---|---|---|--------| |alternateGridColor|`color`|<span class='optional'>선택</span>|그리드 라인의 교차 색상| |categories|`Array`|<span class='optional'>선택</span>|축레이블 설정| |crosshair|`boolean`|<span class='optional'>선택(false)</span>|포인트에 마우스 hover 시 십자 가이드라인 표시 여부| |endOnTick|`boolean`|<span class='optional'>선택(true)</span>|축의 마지막이 틱으로 끝날 지 여부| |gridLineColor|`color`|<span class='optional'>선택(#262626)</span>|그리드 라인의 색상| |gridLineDashStyle|`string`|<span class='optional'>선택(dot)</span>|그리드 라인의 종류| |gridLineInterpolation|`string`|<span class='optional'>선택(circle)</span>|그리드 라인의 모양 설정| |gridLineWidth|`number`|<span class='optional'>선택(1)</span>|그리드 라인의 너비| |gridZIndex|`number`|<span class='optional'>선택(1)</span>|그리드 라인의 Z index| |labels|`object`|<span class='optional'>선택</span>|라벨 속성| |lineColor|`color`|<span class='optional'>선택(#ccd6eb)</span>|축 라인의 색상| |lineWidth|`number`|<span class='optional'>선택(1)</span>|축 라인의 너비| |max|`number`|<span class='optional'>선택</span>|축의 최댓값| |min|`number`|<span class='optional'>선택</span>|축의 최솟값| |minorGridLineColor|`color`|<span class='optional'>선택(#e6e6e6)</span>|보조 그리드 라인의 색상| |minorGridLineDashStyle|`string`|<span class='optional'>선택(dot)</span>|보조 그리드 라인의 종류| |minorGridLineWidth|`number`|<span class='optional'>선택(1)</span>|보조 그리드 라인의 너비| |minorTickColor|`color`|<span class='optional'>선택(#999999)</span>|축에 표시할 보조 눈금 색상| |minorTickInterval|`number` or `string`|<span class='optional'>선택</span>|축에 표시할 보조 점의 간격| |minorTickLength|`number`|<span class='optional'>선택(2)</span>|축에 표시할 보조 눈금의 길이| |minorTickPosition|`string`|<span class='optional'>선택(outside)</span>|축에 표시할 보조 눈금의 위치| |minorTickWidth|`number`|<span class='optional'>선택(0)</span>|축에 표시할 보조 눈금의 너비| |offset|`number`|<span class='optional'>선택</span>|기본 위치 기준으로 표시할 위치 값| |opposite|`boolean`|<span class='optional'>선택(false)</span>|우측에 축 표시 여부| |plotBands|`object`|<span class='optional'>선택</span>|플롯밴드 속성 (특정영역 하이라이팅)| |reversed|`boolean`|<span class='optional'>선택(false)</span>|축 반전 여부| |showFirstLabel|`boolean`|<span class='optional'>선택(true)</span>|첫번째 축 라벨여부 표시| |showLastLabel|`boolean`|<span class='optional'>선택(true)</span>|마지막 축 라벨여부 표시| |stackLabels|`object`|<span class='optional'>선택</span>|누적 레이블 사용 여부| |stops|`Array`|<span class='optional'>선택</span>|특정 지점의 색상을 지정| |tickInterval|`number`|<span class='optional'>선택</span>|축에 표시할 점의 간격| |title|`object`|<span class='optional'>선택</span>|축 제목 속성 (JSON 형식)| |visible|`boolean`|<span class='optional'>선택(true)</span>|축 보임 여부|"
            },
            "url": "docs/props/yAxis/aayAxis.html"
          },
          {
            "cid": 174,
            "sid": "allowDecimals-2",
            "name": "allowDecimals",
            "label": "allowDecimals",
            "data": {
              "body": "> y축의 눈금에 소수점을 표시합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |allowDecimals|`boolean`|<span class='optional'>선택(false)</span>|y축에 소수점 표시 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"line\" }, yAxis: { title: { text: \"단위(℃)\", align: \"low\", rotation: 0, style: { color: \"#575757\", fontSize: \"10px\" } }, allowDecimals: true // y축의 소수점 표시 } }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/allowDecimals.html"
          },
          {
            "cid": 175,
            "sid": "alternateGridColor-2",
            "name": "alternateGridColor",
            "label": "alternateGridColor",
            "data": {
              "body": "> 그리드 라인의 교차 색상을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |alternateGridColor|`color`|<span class='optional'>선택</span>|그리드 라인의 교차 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { alternateGridColor: \"#D3D3D3\" // 그리드 라인의 교차 색상 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-alternateGridColor.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/alternateGridColor.html"
          },
          {
            "cid": 176,
            "sid": "categories-2",
            "name": "categories",
            "label": "categories",
            "data": {
              "body": "> y축 레이블을 설정합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |categories|`Array`|<span class='optional'>선택</span>|y축 레이블 설정| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, yAxis: { categories: [\"A\",\"B\",\"C\",\"D\",\"E\",\"F\",\"H\",\"I\",\"J\",\"K\",\"L\",\"N\"] // y축 레이블 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/categories.html"
          },
          {
            "cid": 177,
            "sid": "crosshair-2",
            "name": "crosshair",
            "label": "crosshair",
            "data": {
              "body": "> 포인트에 마우스 hover 시 십자 가이드라인 표시 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |crosshair|`boolean`|<span class='optional'>선택(false)</span>|포인트에 마우스 hover 시 십자 가이드라인 표시 여부| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, yAxis: { crosshair: true // 포인트에 마우스 hover 시 십자 가이드라인 표시 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/crosshair.html"
          },
          {
            "cid": 178,
            "sid": "endOnTick-2",
            "name": "endOnTick",
            "label": "endOnTick",
            "data": {
              "body": "> 축의 마지막이 틱으로 끝날 지 여부를 설정합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |endOnTick|`boolean`|<span class='optional'>선택(true)</span>|축의 마지막이 틱으로 끝날 지 여부| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, yAxis: { endOnTick: false // 축의 마지막이 틱으로 끝날 지 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-endOnTick.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/endOnTick.html"
          },
          {
            "cid": 179,
            "sid": "gridLineColor-2",
            "name": "gridLineColor",
            "label": "gridLineColor",
            "data": {
              "body": "> 그리드 라인의 색상을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |gridLineColor|`color`|<span class='optional'>선택(#262626)</span>|그리드 라인의 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { gridLineColor: \"#FF8C00\" // 그리드 라인의 색상 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-gridLineColor.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/gridLineColor.html"
          },
          {
            "cid": 180,
            "sid": "gridLineDashStyle-2",
            "name": "gridLineDashStyle",
            "label": "gridLineDashStyle",
            "data": {
              "body": "> 그리드 라인의 종류를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |gridLineDashStyle|`string`|<span class='optional'>선택(dot)</span>|그리드 라인의 종류| ### Enum * gridLineDashStyle |value|description| |-----|-----------| |Solid|실선| |ShortDash|짧은 대쉬선| |ShortDot|짧은 점선| |ShortDashDot|짧은 대쉬+점| |ShortDashDotDot|짧은 대쉬+점+점| |Dot|점선| |Dash|대쉬선| |LongDash|긴 대쉬선| |DashDot|대쉬+점| |LongDashDot|긴 대쉬+점| |LongDashDotDot|긴 대쉬+점+점| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { gridLineDashStyle: \"dash\" // 그리드 라인의 종류 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-gridLineDashStyle.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/gridLineDashStyle.html"
          },
          {
            "cid": 181,
            "sid": "gridLineInterpolation",
            "name": "gridLineInterpolation",
            "label": "gridLineInterpolation",
            "data": {
              "body": "> 그리드 라인의 모양을 설정 합니다. > `polar 차트`에서만 사용할 수 있습니다. ### Info |name|type|required(default)|description| |---|---|---|---| |gridLineInterpolation|`string`|<span class='optional'>선택(circle)</span>|그리드 라인의 모양 설정| ### Enum * gridLineInterpolation |value|description| |-----|-----------| |circle|원| |polygon|다각형| ### Example ```javascript myChart.setOptions({ chart: { type: \"line\", polar: true }, yAxis: { gridLineInterpolation: \"polygon\", // 그리드 라인의 모양 설정 gridLineColor: \"#000000\", gridLineWidth: 2 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-gridLineInterpolation.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/gridLineInterpolation.html"
          },
          {
            "cid": 182,
            "sid": "gridLineWidth-2",
            "name": "gridLineWidth",
            "label": "gridLineWidth",
            "data": {
              "body": "> 그리드 라인의 너비를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |gridLineWidth|`number`|<span class='optional'>선택(1)</span>|그리드 라인의 너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { gridLineWidth: 2 // 그리드 라인의 너비 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-gridLineWidth.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/gridLineWidth.html"
          },
          {
            "cid": 183,
            "sid": "gridZIndex-2",
            "name": "gridZIndex",
            "label": "gridZIndex",
            "data": {
              "body": "> 그리드 라인의 Z index를 설정 합니다. > `gridZIndex: 4` 부터 차트 위에 렌더링 됩니다. ### Info |name|type|required(default)|description| |---|---|---|---| |gridZIndex|`number`|<span class='optional'>선택(1)</span>|그리드 라인의 Z index| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { gridZIndex: 5 // 그리드 라인의 너비 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/gridZIndex.html"
          },
          {
            "cid": 184,
            "sid": "labels-2",
            "name": "labels",
            "label": "labels",
            "data": {
              "body": "> y축의 라벨 속성을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |labels|`object`|<span class='optional'>선택</span>|y축의 라벨 속성| |labels.align|`string`|<span class='optional'>선택(center)</span>|y축 라벨 좌우 정렬 방법| |labels.format|`string`|<span class='optional'>선택(value)</span>|y축 라벨 포맷 문자열(값은 {value} 문자열을 이용)| |labels.formatter|`function()`|<span class='optional'>선택</span>|y축 라벨의 포맷을 정의하는 callback 함수(값은 {this.value})| |labels.style|`object`|<span class='optional'>선택</span>|y축 라벨 스타일 속성| |labels.useHTML|`boolean`|<span class='optional'>선택(false)</span>|y축 라벨 html tag 사용 여부| |labels.rotation|`number`|<span class='optional'>선택(0)</span>|y축 라벨 기울기 (0~360)| |labels.step|`number`|<span class='optional'>선택</span>|y축 라벨 표시 단계| |labels.enabled|`boolean`|<span class='optional'>선택(true)</span>|y축 라벨 사용 여부| * label.style.Info |name|type|required(default)|description| |---|---|---|---| |color|`color`|<span class='optional'>선택</span>|폰트 색상| |fontSize|`string`|<span class='optional'>선택</span>|폰트 크기| |fontWeight|`string`|<span class='optional'>선택</span>|폰트 두께| ### Enum * labels.align |value|description| |-----|-----------| |center|중앙 정렬| |left|좌측 정렬| |right|우측 정렬| * labels.format |value|description| |-----|-----------| |{value}|y축 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { labels: { style:{ fontWeight: \"bold\" }, rotation: -45, formatter: function () { //천단위 콤마 찍기 var regexp = /\\B(?=(\\d{3})+(?!\\d))/g; return this.value.toString().replace(regexp, ','); } } }, series: [{ name: \"서울\", data : [60000000,40000000,20000000,80000000] },{ name: \"인천\", data : [30000000,50000000,90000000,70000000] },{ name: \"부산\", data : [40000000,70000000,30000000,60000000] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-labels.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/labels.html"
          },
          {
            "cid": 185,
            "sid": "lineColor-3",
            "name": "lineColor",
            "label": "lineColor",
            "data": {
              "body": "> y축 라인의 색상을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |lineColor|`color`|<span class='optional'>선택(#ccd6eb)</span>|y축 라인의 색상| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, yAxis: { lineWidth: 5, lineColor: \"#FF4500\" // y축 라인의 색상 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-lineColor.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/lineColor.html"
          },
          {
            "cid": 186,
            "sid": "lineWidth-3",
            "name": "lineWidth",
            "label": "lineWidth",
            "data": {
              "body": "> y축 라인의 너비를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |lineWidth|`number`|<span class='optional'>선택(1)</span>|y축 라인의 너비| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, yAxis: { lineWidth: 5 // y축 라인의 너비 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/lineWidth.html"
          },
          {
            "cid": 187,
            "sid": "max-2",
            "name": "max",
            "label": "max",
            "data": {
              "body": "> y축의 최댓값을 설정 합니다. > 참고 : `endOnTick: true` 면 max값이 반올림될 수 있습니다. ### Info |name|type|required(default)|description| |---|---|---|---| |max|`number`|<span class='optional'>선택(false)</span>|y축의 최댓값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { max: 500 // y축의 최댓값 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-max.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/max.html"
          },
          {
            "cid": 188,
            "sid": "min-2",
            "name": "min",
            "label": "min",
            "data": {
              "body": "> y축의 최솟값을 설정 합니다. > 참고 : `startOnTick: true`면 min값이 반내림될 수 있습니다. ### Info |name|type|required(default)|description| |---|---|---|---| |min|`number`|<span class='optional'>선택(false)</span>|y축의 최솟값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { min: -10 // y축의 최솟값 설정 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-min.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/min.html"
          },
          {
            "cid": 189,
            "sid": "minorGridLineColor-2",
            "name": "minorGridLineColor",
            "label": "minorGridLineColor",
            "data": {
              "body": "> 보조 그리드 라인의 색상을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorGridLineColor|`color`|<span class='optional'>선택(#e6e6e6)</span>|보조 그리드 라인의 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { minorGridLineColor: '#FF8C00', // 보조 그리드 라인의 색상 minorTickInterval: 10 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/minorGridLineColor.html"
          },
          {
            "cid": 190,
            "sid": "minorGridLineDashStyle-2",
            "name": "minorGridLineDashStyle",
            "label": "minorGridLineDashStyle",
            "data": {
              "body": "> 보조 그리드 라인의 종류 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorGridLineDashStyle|`string`|<span class='optional'>선택(dot)</span>|보조 그리드 라인의 종류| ### Enum * minorGridLineDashStyle |value|description| |-----|-----------| |Solid|실선| |ShortDash|짧은 대쉬선| |ShortDot|짧은 점선| |ShortDashDot|짧은 대쉬+점| |ShortDashDotDot|짧은 대쉬+점+점| |Dot|점선| |Dash|대쉬선| |LongDash|긴 대쉬선| |DashDot|대쉬+점| |LongDashDot|긴 대쉬+점| |LongDashDotDot|긴 대쉬+점+점| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { minorGridLineDashStyle: \"dash\", // 보조 그리드 라인의 종류 설정 minorGridLineColor: '#FF8C00', minorTickInterval: 10 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/minorGridLineDashStyle.html"
          },
          {
            "cid": 191,
            "sid": "minorGridLineWidth-2",
            "name": "minorGridLineWidth",
            "label": "minorGridLineWidth",
            "data": {
              "body": "> 보조 그리드 라인의 너비를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorGridLineWidth|`number or string`|<span class='optional'>선택(1)</span>|보조 그리드 라인의 너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { minorGridLineDashStyle: \"solid\", minorGridLineColor: '#FF8C00', minorGridLineWidth: 5, // 보조 그리드 라인의 너비 minorTickInterval: 10 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-minorGridLineWidth.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/minorGridLineWidth.html"
          },
          {
            "cid": 192,
            "sid": "minorTickColor-2",
            "name": "minorTickColor",
            "label": "minorTickColor",
            "data": {
              "body": "> y축에 표시할 보조 눈금 색상을 설정합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorTickColor|`string`|<span class='optional'>선택(#999999)</span>|y축에 표시할 보조 눈금 색상| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { minorTickInterval: 10, minorTickColor: \"#ff0000\", // y축에 표시할 보조 눈금의 색상 minorTickWidth: 1, minorTickLength: 5 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/minorTickColor.html"
          },
          {
            "cid": 193,
            "sid": "minorTickInterval-2",
            "name": "minorTickInterval",
            "label": "minorTickInterval",
            "data": {
              "body": "> y축에 표시할 보조 눈금의 간격을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorTickInterval|`number` or `string`|<span class='optional'>선택</span>|y축에 표시할 보조 눈금의 간격| ### Enum * minorTickInterval |value|description| |-----|-----------| |auto|간격을 자동으로 설정| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { minorTickInterval: 10, // y축에 표시할 보조 눈금의 간격 minorTickColor: \"#ff0000\", minorTickWidth: 1, minorTickLength: 5 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-minorTickInterval.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/minorTickInterval.html"
          },
          {
            "cid": 194,
            "sid": "minorTickLength-2",
            "name": "minorTickLength",
            "label": "minorTickLength",
            "data": {
              "body": "> y축에 표시할 보조 눈금의 길이를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorTickLength|`number`|<span class='optional'>선택(2)</span>|y축에 표시할 보조 눈금의 길이| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { minorTickInterval: 10, minorTickColor: \"#ff0000\", minorTickWidth: 1, minorTickLength: 5 // y축에 표시할 보조 눈금의 길이 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/minorTickLength.html"
          },
          {
            "cid": 195,
            "sid": "minorTickPosition",
            "name": "minorTickPosition",
            "label": "minorTickPosition",
            "data": {
              "body": "> y축에 표시할 보조 눈금의 위치를 설정합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorTickPosition|`string`|<span class='optional'>선택(outside)</span>|y축에 표시할 보조 눈금의 위치| ### Enum * minorTickPosition |value|description| |-----|-----------| |outside|바깥쪽에 표시| |inside|안쪽에 표시| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { minorTickInterval: 'auto', minorTickPosition: 'inside', // y축에 표시할 보조 눈금의 위치 minorTickWidth: 1, minorTickLength: 10 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/minorTickPosition.html"
          },
          {
            "cid": 196,
            "sid": "minorTickWidth-2",
            "name": "minorTickWidth",
            "label": "minorTickWidth",
            "data": {
              "body": "> y축에 표시할 보조 눈금의 너비를 설정 합니다. > 참고 : minorTick 을 사용하기 위해서는 반드시 minorTickWidth 의 값을 설정해야 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |minorTickWidth|`number`|<span class='optional'>선택(0)</span>|y축에 표시할 보조 눈금의 너비| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { minorTickInterval: 10, minorTickColor: \"#ff0000\", minorTickWidth: 1, minorTickLength: 5 // y축에 표시할 보조 눈금의 너비 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/minorTickWidth.html"
          },
          {
            "cid": 197,
            "sid": "offset-2",
            "name": "offset",
            "label": "offset",
            "data": {
              "body": "> 기본 위치를 기준으로 표시할 위치 값을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |offset|`number`|<span class='optional'>선택</span>|기본 위치를 기준으로 표시할 위치 값| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { offset: 20, // 기본 위치를 기준으로 표시할 위치 값 lineWidth: 5 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-offset.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/offset.html"
          },
          {
            "cid": 198,
            "sid": "opposite-2",
            "name": "opposite",
            "label": "opposite",
            "data": {
              "body": "> 차트 우측에 y축 표시 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |opposite|`boolean`|<span class='optional'>선택(false)</span>|우측에 y축 표시 여부| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { opposite: true // 우측에 y축 표시 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-opposite.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/opposite.html"
          },
          {
            "cid": 199,
            "sid": "plotBands-2",
            "name": "plotBands",
            "label": "plotBands",
            "data": {
              "body": "> 플롯밴드 속성 (특정영역 하이라이팅)을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |plotBands|`object`|<span class='optional'>선택</span>|플롯밴드 속성| |plotBands.from|`number`|<span class='required'>필수</span>|시작점| |plotBands<hi>.to|`number`|<span class='required'>필수</span>|종료점| |plotBands.color|`color`|<span class='required'>필수</span>|색상| |plotBands.label|`object`|<span class='optional'>선택</span>|라벨 속성| * plotBands.label Info |name|type|required(default)|description| |---|---|---|---| |text|`string`|<span class='optional'>선택</span>|라벨 문자열| |textAlign|`string`|<span class='optional'>선택</span>|라벨 문자열 정렬 방법| |align|`string`|<span class='optional'>선택(center)</span>|좌우 정렬 방법| |rotation|`number`|<span class='optional'>선택(0)</span>|기울기| |useHTML|`boolean`|<span class='optional'>선택(false)</span>|html tag 사용 여부| |style|`object`|<span class='optional'>선택</span>|스타일 속성| * plotBands.label.style Info |name|type|required(default)|description| |---|---|---|---| |color|`color`|<span class='optional'>선택</span>|폰트 색상| |fontSize|`string`|<span class='optional'>선택</span>|폰트 크기| |fontWeight|`string`|<span class='optional'>선택</span>|폰트 두께| ### Enum * plotBands.label.align / plotBands.label.textAlign |value|description| |-----|-----------| |center|중앙 정렬| |left|좌측 정렬| |right|우측 정렬| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { plotBands: { from : 30, to: 50, color: \"#FF8C00\", label: { text: \"하이라이트\", align: \"center\", style: { color: \"#FFFFFF\", fontWeight: \"bold\", fontSize: \"1.2em\" } } } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-plotBands.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/plotBands.html"
          },
          {
            "cid": 200,
            "sid": "reversed-3",
            "name": "reversed",
            "label": "reversed",
            "data": {
              "body": "> y축 반전 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |reversed|`boolean`|<span class='optional'>선택(false)</span>|y축 반전 여부| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, yAxis: { reversed: true // y축 반전 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/reversed.html"
          },
          {
            "cid": 201,
            "sid": "showFirstLabel-2",
            "name": "showFirstLabel",
            "label": "showFirstLabel",
            "data": {
              "body": "> 첫번째 y축 라벨 표시 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |showFirstLabel|`boolean`|<span class='optional'>선택(true)</span>|첫번째 y축 라벨 표시 여부| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, yAxis: { showFirstLabel: false // 첫번째 y축 라벨 표시 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-showFirstLabel.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/showFirstLabel.html"
          },
          {
            "cid": 202,
            "sid": "showLastLabel-2",
            "name": "showLastLabel",
            "label": "showLastLabel",
            "data": {
              "body": "> 마지막 y축 라벨 표시 여부를 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |showLastLabel|`boolean`|<span class='optional'>선택(true)</span>|마지막 y축 라벨 표시 여부| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, yAxis: { showLastLabel: false // 마지막 y축 라벨 표시 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/showLastLabel.html"
          },
          {
            "cid": 203,
            "sid": "stackLabels",
            "name": "stackLabels",
            "label": "stackLabels",
            "data": {
              "body": "> 누적형 레이블 사용여부(합계값 표시)를 표시합니다. > 누적형 차트에서만 사용할 수 있습니다. ### Info |name|type|required(default)|description| |---|---|---|---| |enabled|`boolean`|<span class='optional'>선택(false)</span>|누적형 레이블 사용 여부| |align|`string`|<span class='optional'>선택</span>|누적형 레이블 위치| |format|`string`|<span class='optional'>선택({total})</span>|누적형 레이블 포맷 문자열| |formatter|`function()`|<span class='optional'>선택</span>|누적형 레이블 포맷을 정의하는 callback 함수 (합계값은 this.total 로 표현)| |style|`object`|<span class='optional'>선택</span>|누적형 레이블 스타일 속성| |rotation|`number`|<span class='optional'>선택(0)</span>|누적형 레이블 기울기 (0~360)| |x|`string`|<span class='optional'>선택</span>|x 위치 값 설정| |y|`string`|<span class='optional'>선택</span>|y 위치 값 설정| * stackLabels.style Info |name|type|required(default)|description| |---|---|---|---| |color|`color`|<span class='optional'>선택</span>|폰트 색상| |fontSize|`string`|<span class='optional'>선택</span>|폰트 크기| |fontWeight|`string`|<span class='optional'>선택</span>|폰트 두께| ### Enum * stackLabels.align |value|description| |-----|-----------| |center|중앙 정렬| |left|좌측 정렬| |right|우측 정렬| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { stackLabels: { enabled: true, align: \"left\" } }, plotOptions: { column: { stacking: \"normal\" } } series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/stackLabels.html"
          },
          {
            "cid": 204,
            "sid": "stops",
            "name": "stops",
            "label": "stops",
            "data": {
              "body": "> [solid-gauge](/docs/appx/specialChart/Solidgaugechart) 차트에서 특정 지점의 색상을 지정합니다. > 지정한 지점과 지점 사이는 그라데이션으로 표현됩니다. ### Info |name|type|required(default)|description| |---|---|---|---| |stops|`Array`|<span class='optional'>선택</span>|특정 지점의 색상을 지정 <span style=\"color:blue;\">Ex) stops: [[0.1,\"#ff0000\"], [0.8,\"#00ffff\"]]</span>| ### Example ```javascript myChart.setOptions({ chart:{ type:'solidgauge' }, yAxis: { min:0, max:200, stops: [ [0.1, '#55BF3B'], // ~ 10% 지점의 색상은 #55BF3B [0.5, '#DDDF0D'], // 50% 지점의 색상은 #DDDF0D [0.9, '#DF5353'] // 90% ~ 지점의 색상은 #DF5353 ], }, series: [{ data: [160] }] },{ append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/stops.html"
          },
          {
            "cid": 205,
            "sid": "tickInterval-2",
            "name": "tickInterval",
            "label": "tickInterval",
            "data": {
              "body": "> y축에 표시할 점의 간격을 설정 합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |tickInterval|`number`|<span class='optional'>선택</span>|y축에 표시할 점의 간격| ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { tickInterval: 10 // y축에 표시할 점의 간격 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/tickInterval.html"
          },
          {
            "cid": 206,
            "sid": "title-3",
            "name": "title",
            "label": "title",
            "data": {
              "body": "> y축 제목 속성을 설정합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |title|`object`|<span class='optional'>선택</span>|y축 제목 속성 (JSON 형식)| |title.text|`string`|<span class='optional'>선택</span>|y축 제목 문자열| |title.align|`string`|<span class='optional'>선택(center)</span>|y축 제목 좌우 정렬값| |title.x|`number`|<span class='optional'>선택(0)</span>|y축 제목 좌우 포지션 이동 값| |title.y|`number`|<span class='optional'>선택</span>|y축 제목 상하 포지션 이동 값| |title.style|`object`|<span class='optional'>선택</span>|y축 제목 스타일 설정| |title.style.color|`color`|<span class='optional'>선택</span>|y축 제목 폰트 색상| |title.style.fontSize|`string`|<span class='optional'>선택</span>|y축 제목 폰트 크기| |title.style.fontWeight|`string`|<span class='optional'>선택</span>|y축 제목 폰트 두께| |title.rotation|`number`|<span class='optional'>선택(0)</span>|y축 제목 회전| |title.enabled|`boolean`|<span class='optional'>선택(true)</span>|y축 제목 사용 여부| ### Enum * title.align |value|description| |-----|-----------| |center|중앙 정렬| |left|좌측 정렬| |right|우측 정렬| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, yAxis: { title: { text: \"y축 타이틀\" } }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-yAxis-title.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/title.html"
          },
          {
            "cid": 207,
            "sid": "visible-3",
            "name": "visible",
            "label": "visible",
            "data": {
              "body": "> y축의 보임 여부를 설정합니다. ### Info |name|type|required(default)|description| |---|---|---|---| |visible|`boolean`|<span class='optional'>선택(true)</span>|y축 보임 여부| ### Example ```javascript myChart.setOptions({ chart:{ type: \"column\" }, yAxis: { visible: false // y축 보임 여부 }, series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/props/yAxis/visible.html"
          }
        ]
      }
    ]
  },
  {
    "gid": 4,
    "name": "funcs",
    "label": "Methods",
    "children": [
      {
        "gid": 1,
        "name": "funcs-chartObject",
        "label": "ChartObject",
        "children": [
          {
            "cid": 208,
            "sid": "addSeries",
            "name": "addSeries",
            "label": "addSeries",
            "data": {
              "body": "> 시리즈를 차트에 동적으로 추가 합니다. ### Syntax ```javascript {ibchart}.addSeries(prop, [opt]); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`prop`|`object`|<span class='required'>필수</span>|시리즈 속성 및 데이터| |opt|`object`|<span class='optional'>선택</span>|옵션 속성| |opt.redraw|`boolean`|<span class='optional'>선택</span>|설정 후 다시 그릴지 여부| ### Returns ***none*** ### Example ```javascript myChart.addSeries({ data: [10, 20, 30] // 시리즈의 데이터 설정 }); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/addSeries.html"
          },
          {
            "cid": 209,
            "sid": "doPrint",
            "name": "doPrint",
            "label": "doPrint",
            "data": {
              "body": "> 차트 이미지를 인쇄합니다. > 인쇄 처리는 브라우저의 인쇄 기능을 따르며 이미지를 인쇄하기 위해서는 브라우저의 `페이지 설정`에서 `배경색 및 이미지 인쇄 옵션`을 설정해야 합니다. ### Syntax ```javascript {ibchart}.doPrint(); ``` ### Returns ***none*** ### Example ```javascript //차트 인쇄하기 myChart.doPrint(); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/doPrint.html"
          },
          {
            "cid": 210,
            "sid": "down2Image",
            "name": "down2Image",
            "label": "down2Image",
            "data": {
              "body": "> 차트 데이터를 이미지로 다운로드합니다. > `type` 속성 설정에 따라 다양한 이미지 형식의 파일로 다운로드할 수 있습니다. > `url` 속성은 별도로 제공되는 서버모듈의 Down2Image.jsp 파일의 경로를 설정합니다. `주의` 해당 경로가 올바르지 않으면 이미지를 다운로드 할 수 없습니다. ### Syntax ```javascript {ibchart}.down2Image(opt); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`opt`|`object`|<span class='required'>필수</span>|옵션 속성| |opt.fileName|`string`|<span class='optional'>선택(chart)</span>|파일명| |opt.type|`string`|<span class='optional'>선택</span>|다운로드 형식| |`opt.url`|`string`|<span class='required'>필수</span>|처리할 서버 url 경로| |opt.width|`number`|<span class='optional'>선택</span>|이미지 너비(높이는 너비에 비례하여 자동 설정)(px)| |opt.sourceWidth|`number`|<span class='optional'>선택</span>|변환대상 차트의 너비(px)| |opt.sourceHeight|`number`|<span class='optional'>선택</span>|변환대상 차트의 높이(px)| ### Returns ***none*** ### Example ```javascript // 차트 이미지 다운로드 myChart.down2Image({ fileName: \"ChartImage\", type: \"jpg\", width: 800, url: \"../Chart/Down2Image.jsp\" }); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/down2Image.html"
          },
          {
            "cid": 211,
            "sid": "draw",
            "name": "draw",
            "label": "draw",
            "data": {
              "body": "> 차트의 최신 상태를 반영하기 위해 차트를 다시 그립니다. ### Syntax ```javascript {ibchart}.draw([callback]); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |callback|`function`|<span class='optional'>선택</span>|처리 후 호출할 callback 함수| ### Returns ***none*** ### Example ```javascript // 차트 그리기 myChart.draw(); // 차트 랜더링 이후 callback 함수 호출 myChart.draw(function() { // TODO: 완료 후 처리할 비즈니스 로직 작성 }); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/draw.html"
          },
          {
            "cid": 212,
            "sid": "getAlertText",
            "name": "getAlertText",
            "label": "getAlertText",
            "data": {
              "body": "> 언어설정에 담긴 문자열을 반환합니다. ### Syntax ```javascript {ibchart}.getAlertText(); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`str`|`function`|<span class='required'>필수</span>|IBLANG or 사용자 정의 문자열| ### Returns ***string(문자열)*** ### Example ```javascript // alert or console alert(myChart.getAlertText(\"경고입니다!\")); // \"경고입니다!\" alert(myChart.getAlertText(\"${0}는 ${1}이다.\") .format(\"사과\",\"과일\")); // \"사과는 과일이다.\" alert(myChart.getAlertText(IBLANG[\"ko\"].alert.chartData)); // \"데이터가 잘못되었습니다!\" alert(myChart.getAlertText(IBLANG[\"ko\"].alert.variableEpual) .format(\"front\",\"rear\")); // \"front값은 rear값과 같아야합니다.\" ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/getAlertText.html"
          },
          {
            "cid": 213,
            "sid": "getData",
            "name": "getData",
            "label": "getData",
            "data": {
              "body": "> 차트의 모든 옵션 객체를 반환합니다. ### Syntax ```javascript {ibchart}.getData(); ``` ### Returns ***array<object> , 모든 데이터 정보*** ### Example ```javascript // data object var data = myChart.getData(); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/getData.html"
          },
          {
            "cid": 214,
            "sid": "getId",
            "name": "getId",
            "label": "getId",
            "data": {
              "body": "> 차트의 id를 반환합니다. ### Syntax ```javascript {ibchart}.getId(); ``` ### Returns ***string, 차트 id*** ### Example ```javascript // chart id var data = myChart.getId(); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/getId.html"
          },
          {
            "cid": 215,
            "sid": "getLang",
            "name": "getLang",
            "label": "getLang",
            "data": {
              "body": "> 차트의 언어권을 반환합니다. ### Syntax ```javascript {ibchart}.getLang(); ``` ### Returns ***string, 언어코드*** ### Example ```javascript // chart locale var lang = myChart.getLang(); // \"kr\" ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/getLang.html"
          },
          {
            "cid": 216,
            "sid": "getOptions",
            "name": "getOptions",
            "label": "getOptions",
            "data": {
              "body": "> 차트의 모든 옵션 객체를 반환합니다. ### Syntax ```javascript {ibchart}.getOptions(); ``` ### Returns ***object, 모든 옵션 정보*** ### Example ```javascript // option object var options = myChart.getOptions(); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/getOptions.html"
          },
          {
            "cid": 217,
            "sid": "getSVGString",
            "name": "getSVGString",
            "label": "getSVGString",
            "data": {
              "body": "> 차트의 SVG를 문자열로 반환합니다. ### Syntax ```javascript {ibchart}.getSVGString(); ``` ### Returns ***string, SVG 문자열*** ### Example ```javascript var svg = encodeURIComponent(myChart.getSVGString()); // 서버모듈에 따라 달라질 수 있음 var opt = { \"ExtendParamMethod\":\"Post\", // 기본값이 \"Get\"이므로 \"Post\"로 변경해서 보내야 파라미터가 끊기지 않고 보내 질 수 있다. (Get 방식은 길이제한이 있음) \"ExtendParam\":\"Svg=\"+svg // ExtendParam에 추가 할 수 있는 차트 관련 파라미터 Svg, ImageWidth, ChartName, ChartPos(0:시트 뒤에 붙임, 1:시트앞에 붙임) }; mySheet.Down2Excel(opt); // 시트와 차트를 하나의 엑셀 파일로 다운로드 ``` ### Since |version|desc| |---|---| |7.3.1.0||",
              "since": "|version|desc||---|---||7.3.1.0||"
            },
            "url": "docs/funcs/chartObject/getSVGString.html"
          },
          {
            "cid": 218,
            "sid": "getSeries",
            "name": "getSeries",
            "label": "getSeries",
            "data": {
              "body": "> 차트의 모든 시리즈 객체를 반환합니다. ### Syntax ```javascript {ibchart}.getSeries(); ``` ### Returns ***array<object>, 모든 시리즈 정보*** ### Example ```javascript // series object var series = myChart.getSeries(); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/getSeries.html"
          },
          {
            "cid": 219,
            "sid": "loadSearchData",
            "name": "loadSearchData",
            "label": "loadSearchData",
            "data": {
              "body": "> 인자로 받은 데이터 객체 또는 문자열을 차트에 로드 합니다. ### Syntax ```javascript {ibchart}.loadSearchData (data, [opt]); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`data`|`object or string`|<span class='required'>필수</span>|로드할 데이터 객체 또는 문자열| |opt|`object`|<span class='optional'>선택</span>|옵션 속성| |opt.append|`boolean`|<span class='optional'>선택(false)</span>|데이터 병합 여부| |opt.resetData|`boolean`|<span class='optional'>선택(true)</span>|데이터 병합 여부(속성을 유지하면서 데이터 초기화 여부, opt.append값과 opt.mergeData값이 `false`이면 데이터 초기화)| |opt.mergeData|`boolean`|<span class='optional'>선택(false)</span>|데이터를 기존 데이터에 덮어씌울지 여부(opt.resetData값이 `false`일때만 적용됨)| |opt.deepCopy|`boolean`|<span class='optional'>선택(false)</span>|깊은 복사(데이터량에 따라 시간이 더 필요할 수 있음)| ### Returns ***none*** ### Example ```javascript // 데이터를 차트에 로드 처리 myChart.loadSearchData({ ibchart: { data: [{ series: [1,10,100] },{ series: [2,20,200] },{ series: [3,30,300] }] } }); ``` ### Since |version|desc| |---|---| |7.3.0.0|| |7.3.0.14|resetData, mergeData 옵션 추가|",
              "since": "|version|desc||---|---||7.3.0.0|||7.3.0.14|resetData, mergeData 옵션 추가|"
            },
            "url": "docs/funcs/chartObject/loadSearchData.html"
          },
          {
            "cid": 220,
            "sid": "parseText",
            "name": "parseText",
            "label": "parseText",
            "data": {
              "body": "> 문장에서 단어를 추출하고 단어의 빈도수를 계산합니다. (빈도수 기준 `내림차순` 정렬) ### Syntax ```javascript {ibchart}.parseText(text, ignore, max); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`type`|`string`|<span class='required'>필수</span>|분석할 문장| |ignore|`string or array<string>`|<span class='optional'>선택</span>|입력된 문장에서 단어의 빈도수 계산에서 제외할 단어 (RegExpress Style String)| |max|`number`|<span class='optional'>선택(false)</span>|입력된 문장에서 상위 n번째까지의 기준| ### Returns ***object, 입력된 문장에서 추출된 단어와 단어의 빈도수를 내림차순으로 반환*** ### Example ```javascript // 차트를 다시 그리기 myChart.setOptions({ title: { text: \"윤동주 <별 헤는 밤,1946>\" }, series: [{ name:\"단어 사용 빈도\", // 윤동주 <별 헤는 밤,1946> 발췌 data:myChart.parseText(\"계절이 지나가는 하늘에는 가을로 가득 차 있습니다. 나는 아무 걱정도 없이 가을 속의 별들을 다 헬 듯합니다. 가슴속에 하나 둘 새겨지는 별을 이제 다 못 헤는 것은 쉬이 아침이 오는 까닭이요, 내일 밤이 남은 까닭이요, 아직 나의 청춘이 다하지 않은 까닭입니다. 별 하나에 추억과 별 하나에 사랑과 별 하나에 쓸쓸함과 별 하나에 동경과 별 하나에 시와 별 하나에 어머니, 어머니, 어머님, 나는 별 하나에 아름다운 말 한마디씩 불러 봅니다. 소학교 때 책상을 같이 했던 아이들의 이름과, 패, 경, 옥, 이런 이국 소녀들의 이름과, 벌써 아기 어머니 된 계집애들의 이름과, 가난한 이웃 사람들의 이름과, 비둘기, 강아지, 토끼, 노새, 노루, '프랑시스 잠', '라이너 마리아 릴케' 이런 시인의 이름을 불러 봅니다. 이네들은 너무나 멀리 있습니다. 별이 아스라이 멀듯이. 어머님, 그리고 당신은 멀리 북간도에 계십니다. 나는 무엇인지 그리워 이 많은 별빛이 내린 언덕 위에 내 이름자를 써 보고 흙으로 덮어 버리었습니다. 딴은 밤을 새워 우는 벌레는 부끄러운 이름을 슬퍼하는 까닭입니다. 그러나 겨울이 지나고 나의 별에도 봄이 오면 무덤 위에 파란 잔디가 피어나듯이 내 이름자 묻힌 언덕 위에도 자랑처럼 풀이 무성할 게외다.\",[\"이런\",\"다\",\"하나\",\"둘\",\"하나에\"],20) }] }, { append: true, // 이미 설정된 차트 속성은 유지 resetData: true, // 이미 설정된 데이터는 지운다. redraw: true // 차트를 다시 그린다. }); // myChart.draw(); // 차트를 다시 그린다.(메소드 별도 호출) ``` ### Since |version|desc| |---|---| |7.3.1.0||",
              "since": "|version|desc||---|---||7.3.1.0||"
            },
            "url": "docs/funcs/chartObject/parseText.html"
          },
          {
            "cid": 221,
            "sid": "removeAll",
            "name": "removeAll",
            "label": "removeAll",
            "data": {
              "body": "> 차트에 표시된 모든 속성 및 데이터를 초기화합니다. ### Syntax ```javascript {ibchart}.removeAll(); ``` ### Returns ***boolean, 성공 여부*** ### Example ```javascript // 차트 초기화 처리 var res = myChart.removeAll(); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/removeAll.html"
          },
          {
            "cid": 222,
            "sid": "removeSeries",
            "name": "removeSeries",
            "label": "removeSeries",
            "data": {
              "body": "> 특정 시리즈를 제거합니다. ### Syntax ```javascript {ibchart}.removeSeries(index); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`index`|`number`|<span class='required'>필수</span>|시리즈 인덱스| ### Returns ***boolean, 성공 여부*** ### Example ```javascript // 첫번째 시리즈(index가 0) 제거 myChart.removeSeries(0); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/removeSeries.html"
          },
          {
            "cid": 223,
            "sid": "series",
            "name": "series",
            "label": "series",
            "data": {
              "body": "> 특정 시리즈의 객체를 반환합니다. ### Syntax ```javascript {ibchart}.series(index); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`index`|`number`|<span class='required'>필수</span>|시리즈 인덱스| ### Returns ***boolean, 성공 여부*** ### Example ```javascript // 첫번째 시리즈에 포인트 추가 하기 var series = myChart.series(0); series.addPoint({ x: 10, y: 200 }); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/series.html"
          },
          {
            "cid": 224,
            "sid": "setEventListener",
            "name": "setEventListener",
            "label": "setEventListener",
            "data": {
              "body": "> 특정 이벤트를 추가합니다. ### Syntax ```javascript {ibchart}.setEventListener(eventType, func); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`eventType`|`string`|<span class='required'>필수</span>|이벤트 종류| |`func`|`function`|<span class='required'>필수</span>|이벤트 핸들러| ### Returns ***none*** ### Enum * eventType |Value|Description| |----|------------| |searchEnd|조회 완료 이벤트| |addSeries|시리즈 추가 완료 이벤트| |afterPrint|프린트 직후 이벤트| |beforePrint|프린트 직전 이벤트| |click|차트 영역 클릭 이벤트| |drilldown|드릴다운 이벤트| |drillup|드릴업 이벤트| |drillupAll|최상단 드릴업 이벤트| |redraw|redraw 이벤트| |selection|선택 이벤트| |seriesAfterAnimate|시리즈 애니메이션 직후 이벤트| |seriesCheckBoxClick|시리즈 체크박스 클릭 이벤트| |seriesClick|시리즈 클릭 이벤트| |seriesHide|시리즈 숨김 이벤트| |seriesLegendItemClick|시리즈 범례 클릭 이벤트| |seriesMouseOut|시리즈 마우스 아웃 이벤트| |seriesMouseOver|시리즈 마우스 오버 이벤트| |seriesShow|시리즈 보임 이벤트| |pointClick|포인트 클릭 이벤트| |pointMouseOut|포인트 마우스 아웃 이벤트| |pointMouseOver|포인트 마우스 오버 이벤트| |pointRemove|포인트 선택 이벤트| |pointSelect|포인트 선택 이벤트| |pointUnselect|포인트 선택 해제 이벤트| |pointUpdate|포인트 업데이트 이벤트| ### Example ```javascript // 조회 완료 이벤트 등록 myChart.setEventListener(\"searchend\",function(event){ if(event.code === -1 || event.msg !== \"OK\") { return -1; } console.log(\"데이터 \" + event.type + \" 완료!\"); }); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/setEventListener.html"
          },
          {
            "cid": 225,
            "sid": "setEvents",
            "name": "setEvents",
            "label": "setEvents",
            "data": {
              "body": "> 차트에서 사용할 이벤트들을 추가합니다. ### Syntax ```javascript {ibchart}.setEvents(opt); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`opt`|`array<object>`|<span class='required'>필수</span>|이벤트 종류와 핸들러로 구성된 객체| ### Returns ***none*** ### Enum * eventType |Value|Description| |----|------------| |addSeries|시리즈 추가 완료 이벤트| |afterPrint|프린트 직후 이벤트| |beforePrint|프린트 직전 이벤트| |click|차트 영역 클릭 이벤트| |drilldown|드릴다운 이벤트| |drillup|드릴업 이벤트| |drillupAll|최상단 드릴업 이벤트| |load|차트 완성 이벤트| |pointClick|포인트 클릭 이벤트| |pointMouseOut|포인트 마우스 아웃 이벤트| |pointMouseOver|포인트 마우스 오버 이벤트| |pointRemove|포인트 선택 이벤트| |pointSelect|포인트 선택 이벤트| |pointUnselect|포인트 선택 해제 이벤트| |pointUpdate|포인트 업데이트 이벤트| |redraw|redraw 이벤트| |searchEnd|조회 완료 이벤트| |selection|선택 이벤트| |seriesAfterAnimate|시리즈 애니메이션 직후 이벤트| |seriesCheckBoxClick|시리즈 체크박스 클릭 이벤트| |seriesClick|시리즈 클릭 이벤트| |seriesHide|시리즈 숨김 이벤트| |seriesLegendItemClick|시리즈 범례 클릭 이벤트| |seriesMouseOut|시리즈 마우스 아웃 이벤트| |seriesMouseOver|시리즈 마우스 오버 이벤트| |seriesShow|시리즈 보임 이벤트| ### Example ```javascript // 조회 완료 이벤트 등록 myChart.setEventListener(\"searchend\",function(event){ if(event.code === -1 || event.msg !== \"OK\") { return -1; } console.log(\"데이터 \" + event.type + \" 완료!\"); }); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/setEvents.html"
          },
          {
            "cid": 226,
            "sid": "setLang",
            "name": "setLang",
            "label": "setLang",
            "data": {
              "body": "> 차트의 언어권을 설정합니다. (한국어, 영어 지원) `ibchartinfo.js > IBLANG` 에 언어 설정 기본 제공 > 그 외 다른 언어는 사용자가 언어 설정에서 추가해야 사용가능합니다. ### Syntax ```javascript {ibchart}.setLang(locale); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`locale`|`string`|<span class='required'>필수</span>|언어코드| ### Returns ***none*** ### Example ```javascript // 한국어 myChart.setLang(\"kr\"); // 영어 myChart.setLang(\"en\"); // 일본어 myChart.setLang(\"jp\"); // 중국어 myChart.setLang(\"cn\"); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/chartObject/setLang.html"
          },
          {
            "cid": 227,
            "sid": "setOptions",
            "name": "setOptions",
            "label": "setOptions",
            "data": {
              "body": "> 차트의 모든 속성을 설정합니다. > 아래 예제와 같이 setOptions 안에 `chart, legend, plotOptions, colors, xAxis, yAxis, pane, subtitle, title, tooltip, credits`와 같이 적고 아래에 해당하는 속성을 설정합니다. > 각 속성의 세부 속성은 `Properties`를 참고 바랍니다. ### Syntax ```javascript {ibchart}.setOptions(prop, [opt]); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`prop`|`object`|<span class='required'>필수</span>|속성 정보| |prop.chart|`object`|<span class='optional'>선택</span>|기본 속성| |prop.title|`object`|<span class='optional'>선택</span>|제목 속성| |prop.subtitle|`object`|<span class='optional'>선택</span>|부제목 속성| |prop.colors|`array`|<span class='optional'>선택</span>|시리즈별 적용할 색상 배열 집합| |prop.xAxis|`object`|<span class='optional'>선택</span>|X축 속성| |prop.yAxis|`object`|<span class='optional'>선택</span>|Y축 속성| |prop.plotOptions|`object`|<span class='optional'>선택</span>|구성 옵션 속성| |prop.tooltip|`object`|<span class='optional'>선택</span>|툴팁 속성| |prop.pane|`object`|<span class='optional'>선택</span>|pane 속성(gauge, polar only)| |prop.legend|`object`|<span class='optional'>선택</span>|범례 속성| |opt|`object`|<span class='optional'>선택</span>|옵션 속성| |opt.append|`object`|<span class='optional'>선택</span>|이전 설정과의 병합 처리 여부| |opt.redraw|`object`|<span class='optional'>선택</span>|설정 적용 후 다시 그리기 여부| |opt.resetData|`object`|<span class='optional'>선택</span>|데이터 병합 여부(속성을 유지하면서 데이터 초기화 여부, opt.append값과 opt.mergeData값이 `false`이면 데이터 초기화)| |opt.mergeData|`object`|<span class='optional'>선택</span>|데이터를 기존 데이터에 덮어씌울지 여부(opt.resetData값이 `false`일때만 적용)| |opt.mergeColors|`object`|<span class='optional'>선택</span>|시리즈 색상값(colors) 병합 여부(속성을 유지하면서 데이터 초기화 여부, ※opt.append값과 opt.mergeColors값이 `false`이면 데이터 초기화)| |opt.resetColors|`object`|<span class='optional'>선택</span>|시리즈 색상값(colors)을 기존 시리즈 색상값에 덮어씌울지 여부(opt.resetColors값이 `false`일때만 적용)| |opt.deepCopy|`object`|<span class='optional'>선택</span>|깊은 복사(데이터량에 따라 시간이 더 소요될 수 있음)| ### Returns ***none*** ### Example ```javascript myChart.setOptions({ chart : { backgroundColor : \"#EDEDED\", type : \"column\", style : { fontSize : \"20px\" } }, legend : { layout : \"vertical\", align : \"right\", verticalAlign : \"top\" }, plotOptions : { series : { shadow : false, dataLabels : { enabled : true, align : \"center\" } }, column : { pointPadding : 0.02 } }, xAxis : { tickInterval : 1, labels : { enabled : true } }, yAxis : { tickInterval : 100, title : { text : \"\" } } }); ``` ### Since |version|desc| |---|---| |7.3.0.0|| |7.3.0.4|resetData, mergeData 옵션 추가| |7.3.0.12|resetColors, mergeColors 옵션 추가|",
              "since": "|version|desc||---|---||7.3.0.0|||7.3.0.4|resetData, mergeData 옵션 추가||7.3.0.12|resetColors, mergeColors 옵션 추가|"
            },
            "url": "docs/funcs/chartObject/setOptions.html"
          },
          {
            "cid": 228,
            "sid": "setSize",
            "name": "setSize",
            "label": "setSize",
            "data": {
              "body": "> 차트의 너비 및 높이를 동적으로 변경합니다. ### Syntax ```javascript {ibchart}.setSize(width, height); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`width`|`number`|<span class='required'>필수</span>|차트의 너비(px)| |`height`|`number`|<span class='required'>필수</span>|차트의 높이(px)| ### Returns ***none*** ### Example ```javascript // 너비 500px, 높이 300px로 차트의 크기를 변경한다. myChart.setSize(500, 300); ``` ### Since |version|desc| |---|---| |7.3.0.10|setSize 메소드 추가|",
              "since": "|version|desc||---|---||7.3.0.10|setSize 메소드 추가|"
            },
            "url": "docs/funcs/chartObject/setSize.html"
          },
          {
            "cid": 229,
            "sid": "updateWords",
            "name": "updateWords",
            "label": "updateWords",
            "data": {
              "body": "> wordcloud에 사용되는 단어를 업데이트합니다. ### Syntax ```javascript {ibchart}.updateWords(); ``` ### Returns ***none*** ### Example ```javascript myChart.setOptions({ plotOptions: { wordcloud: { rotation: [-45,90], // default : [0,90] orientation: 3, // default : 1 colorIterate: false, // default : true colorSort: \"rank\", // \"rank\", \"none\" default: \"none\" scaleType: \"log\", // \"log\", \"sqrt\", \"linear\" default: \"none\" placeType: \"random\", // \"random\", \"linear\" default: \"linear\" spiralType: \"rectangular\", // \"rectangular\", \"archimedean\" default : \"archimedean\" valueRange: \"responsive\", // \"responsive\", [#,#] default: [15,60] style: { fontFamily: \"나눔고딕\", // default: \"Lucida Grande\" fontWeight: \"bold\", // default: \"bold\" fontPadding: 0.2 // default: 1 } } } }, { append: true // 이미 설정된 차트 속성은 유지 }); myChart.updateWords(); // plotOptions와 series(단어 데이터)만 업데이트 ``` ### Since |version|desc| |---|---| |7.3.1.0|setSize 메소드 추가|",
              "since": "|version|desc||---|---||7.3.1.0|setSize 메소드 추가|"
            },
            "url": "docs/funcs/chartObject/updateWords.html"
          },
          {
            "cid": 230,
            "sid": "version",
            "name": "version",
            "label": "version",
            "data": {
              "body": "> 제품의 버전을 반환합니다. ### Syntax ```javascript {ibchart}.version(); ``` ### Returns ***string, IBChart의 버전*** ### Example ```javascript // 차트의 버전 확인 console.log(myChart.version()); ``` ### Since |version|desc| |---|---| |7.3.0.10|setSize 메소드 추가|",
              "since": "|version|desc||---|---||7.3.0.10|setSize 메소드 추가|"
            },
            "url": "docs/funcs/chartObject/version.html"
          }
        ]
      },
      {
        "gid": 2,
        "name": "funcs-series",
        "label": "Series",
        "children": [
          {
            "cid": 231,
            "sid": "addPoint",
            "name": "addPoint",
            "label": "addPoint",
            "data": {
              "body": "> 동적으로 시리즈의 포인트를 추가합니다. > 추가 후 바로 화면에 표시 하지 않을 경우, redraw 인자를 `false`로 설정합니다. > redraw 인자를 `false`로 설정하여 추가된 포인트는 `draw` 메소드를 통해 표시할 수 있습니다. > shift 인자를 `true`로 설정하는 경우, 포인트가 추가되는 시점에 가장 좌측의 포인트는 사라지면서 왼쪽으로부터 오른쪽으로 흐름을 표현할 때 사용 합니다. ### Syntax ```javascript {ibchart.series}.addPoint(prop, [opt]); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`prop`|`number or array or object`|<span class='required'>필수</span>|데이터 포인트 속성(Y값,X,Y(,Z)의 배열, point 객체)| |opt|`object`|<span class='optional'>선택</span>|옵션 속성| |opt.redraw|`boolean`|<span class='optional'>선택(true)</span>|추가 후 다시 그릴지 여부| |opt.shift|`boolean`|<span class='optional'>선택(false)</span>|포인트에 대한 시프트 처리 여부| ### Returns ***none*** ### Example ```javascript // 동적으로 포인트를 추가하여 표현 myChart.series(0).addPoint({ name: \"A\", x: 2, y: 3 }); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/series/addPoint.html"
          },
          {
            "cid": 232,
            "sid": "getData-2",
            "name": "getData",
            "label": "getData",
            "data": {
              "body": "> 대상 시리즈의 데이터를 가져옵니다. ### Syntax ```javascript {ibchart.series}.getData(); ``` ### Returns ***array, 시리즈 데이터의 배열 집합*** ### Example ```javascript // 첫번째 시리즈의 데이터를 가져옵니다. var series = myChart.series(0).getData(); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/series/getData.html"
          },
          {
            "cid": 233,
            "sid": "hide",
            "name": "hide",
            "label": "hide",
            "data": {
              "body": "> 보이는 시리즈를 감춥니다. ### Syntax ```javascript {ibchart.series}.hide(); ``` ### Returns ***none*** ### Example ```javascript // 첫번째 시리즈를 감춤. myChart.series(0).hide(); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/series/hide.html"
          },
          {
            "cid": 234,
            "sid": "remove",
            "name": "remove",
            "label": "remove",
            "data": {
              "body": "> 대상 시리즈를 삭제합니다. ### Syntax ```javascript {ibchart.series}.remove(); ``` ### Returns ***none*** ### Example ```javascript // 첫번째 시리즈를 삭제처리 myChart.series(0).remove(); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/series/remove.html"
          },
          {
            "cid": 235,
            "sid": "removePoint",
            "name": "removePoint",
            "label": "removePoint",
            "data": {
              "body": "> 시리즈의 특정 포인트를 삭제 합니다. ### Syntax ```javascript {ibchart.series}.removePoint(index, redraw); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`index`|`number`|<span class='required'>필수</span>|포인트의 index| |redraw|`boolean`|<span class='optional'>선택(false)</span>|다시 그릴지 여부| ### Returns ***none*** ### Example ```javascript // 첫번째 시리즈의 첫번째 포인트 제거하고 다시 그림 myChart.series(0).removePoint(0, true); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/series/removePoint.html"
          },
          {
            "cid": 236,
            "sid": "setData",
            "name": "setData",
            "label": "setData",
            "data": {
              "body": "> 특정 시리즈의 데이터를 설정합니다. ### Syntax ```javascript {ibchart.series}.setData(prop, [opt]); ``` ### Parameters |Name|Type|Required|Description| |----------|-----|---|----| |`data`|`object`|<span class='required'>필수</span>|데이터 객체| |opt|`object`|<span class='optional'>선택</span>|옵션 속성| |opt.append|`boolean`|<span class='optional'>선택(false)</span>|기존 데이터에 append 처리 여부| |opt.redraw|`boolean`|<span class='optional'>선택(true)</span>|데이터 적용 후 다시 그릴지 여부| |opt.animation|`boolean`|<span class='optional'>선택(true)</span>|애니메이션 효과 여부| ### Returns ***none*** ### Example ```javascript // 첫번째 시리즈의 데이터 재설정 하기 var series = myChart.series(0); series.setData([20,30,50,80,90,100,20]); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/series/setData.html"
          },
          {
            "cid": 237,
            "sid": "setOptions-2",
            "name": "setOptions",
            "label": "setOptions",
            "data": {
              "body": "> 대상 시리즈의 속성을 설정합니다. ### Syntax ```javascript {ibchart.series}.setOptions(prop, [opt]); ``` ### Info |Name|Type|Required|Description| |----------|-----|---|----| |`prop`|`object`|<span class='required'>필수</span>|시리즈의 구성 옵션 속성| |opt|`boolean`|<span class='optional'>선택</span>|옵션 속성| |opt.append|`boolean`|<span class='optional'>선택(false)</span>|이전 설정과의 병합 처리 여부| |opt.redraw|`boolean`|<span class='optional'>선택(false)</span>|설정 적용 후 다시 그리기 여부| ### Enum * prop |Name|Type|Description| |----|----|-----------| |data|`object`|Series의 데이터 설정(JSON Object)| |legendIndex|`number`|Series의 legend 표시되는 index 설정| |name|`string`|Series의 name 설정| |stack|`string`|stack 옵션 설정| |type|`string`|Series의 타입 설정| |xAxis|`number`|X축을 두개로 사용할 때 축 번호를 설정| |yAxis|`number`|Y축을 두개로 사용할 때 축 번호를 설정| |zindex|`number`|Series의 zindex 설정| ### Returns ***none*** ### Example ```javascript myChart.series(0).setOptions({ yAxis : 1 // 두번째 y축에 맞춰서 표시 },{ append: true }); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/series/setOptions.html"
          },
          {
            "cid": 238,
            "sid": "show",
            "name": "show",
            "label": "show",
            "data": {
              "body": "> 대상 시리즈를 보이게 설정 합니다. ### Syntax ```javascript {ibchart.series}.show(); ``` ### Returns ***none*** ### Example ```javascript // 첫번째 시리즈를 보임 처리. myChart.series(0).show(); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/funcs/series/show.html"
          }
        ]
      }
    ]
  },
  {
    "gid": 5,
    "name": "static",
    "label": "Static",
    "children": [
      {
        "cid": 239,
        "sid": "iblang",
        "name": "iblang",
        "label": "IBLANG",
        "data": {
          "body": "> 사용자가 언어 설정을 할 수 있도록 언어 설정 상수를 제공합니다. </br> > 한국어(언어코드 `kr`)를 기본으로 제공하고 다른 언어는 제공되는 언어 설정을 기준으로 번역하여 추가해서 사용할 수 있습니다. </br> ### Info |Properties|Type|Description| |----------|-----|----| |IBLANG.언어코드.chart|`object`|차트 표현에 사용되는 언어 설정| |IBLANG.언어코드.alert|`object`|데이터 오류나 사용자에게 경고 표시를 위한 언어 설정| |IBLANG.언어코드.text|`object`|chart, alert 외에 자유롭게 사용하는 문자열을 위한 언어 설정| ## chart * 차트 표현에 사용되는 언어설정입니다. * 속성명과 데이터 타입을 유지한 수정은 자유롭게 할 수 있습니다. |Properties|Type|Description| |----------|-----|----| |thousandsSep|string|천단위(1000) 구분자| |contextButtonTitle|string|보조메뉴| |decimalPoint|string|정수 구분자| |downloadJPEG|string|JPEG 다운로드| |downloadPDF|string|PDF 다운로드| |downloadPNG|string|PNG 다운로드| |downloadSVG|string|SVG 다운로드| |drillUpText|string|한 단계 위로| |invalidDate|string|인식불가 데이터| |loading|string|조회중| |noData|string|데이터 없음| |numericSymbols|string|숫자 축약| |printChart|string|프린트| |resetZoom|string|줌 아웃| |months|string|월| |shortMonths|string|짧은 월| |weekdays|string|주| |shortWeekdays|string|짧은 주| ## alert * 데이터 오류나 사용자에게 경고를 알리는 언어 설정입니다. * 속성명과 데이터 타입, ${숫자} 인자를 유지한 수정은 자유롭게 할 수 있습니다. * `단, 속성이 하나라도 누락되면 오류가 발생 할 수 있습니다.` |Properties|Type|Description| |----------|-----|----| |createIBChartId|string|차트 아이디 오류| |chartProperties|string|차트 속성 오류| |chartNoData|string|차트 데이터 없음| |chartData|string|차트 데이터 오류| |plugin|string|플러그인 오류| |pluginLoading|string|플러그인 로드 오류| |series|string|시리즈 오류| |noSeries|string|시리즈 인덱스 오류| |eventListenerType|string|이벤트 종류 오류| |eventListenerFunc|string|이벤트 핸들러 오류| |chartNoIndex|string|빈 차트 시리즈 인덱스 오류| |chartIndex|string|차트 시리즈 인덱스 오류| |variableRequired|string|필수값 오류| |variableInteger|string|정수 오류| |variableFloat|string|실수 오류| |variableString|string|문자열 오류| |variableLessThen|string|A가 B보다 클 때| |variableGreaterThen|string|A가 B보다 작을 때| |variableEpual|string|A와 B가 같지 않을 때| |noMessage|string|빈 메시지 오류| ## text * chart, alert 이외의 자유롭게 사용하는 문자열을 위한 언어 설정입니다. * 자유롭게 수정이 가능하며 `getAlertText()` 함수를 이용하면 ${숫자} 인자를 쉽게 적용 할 수 있습니다. |Properties|Type|Description| |----------|-----|----| |legend|string|sheet2chart에서 사용될 legendTitle 기본값| |productName|string|getAlertText() 함수의 알림 머리말| |referenceSite|string|getAlertText() 함수의 알림 꼬리말|"
        },
        "url": "docs/static/iblang.html"
      }
    ]
  },
  {
    "gid": 6,
    "name": "appx",
    "label": "Appendix",
    "children": [
      {
        "gid": 1,
        "name": "appx-specialChart",
        "label": "specialChart",
        "children": [
          {
            "cid": 240,
            "sid": "Bubblechart",
            "name": "Bubblechart",
            "label": "Bubble chart",
            "data": {
              "body": "> Bubble 차트를 표현합니다. `highcharts-more.js 필요` ### Example ```javascript myChart.setOptions({ chart:{ type:'bubble' }, series: [{ data: [[94,74,60], [2,75,59], [20,12,4], [68,76,58], [11,54,8],[6,76,91], [64,87,56], [86,55,93], [38,30,60], [68,27,73]] },{ data: [[9,81,13], [98,5,39], [51,50,23], [41,22,-36], [58,24,-30],[78, 37, -16], [55, 56, 3], [18, 45, 20], [42, 44, -22], [3, 52, 9]] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-bubble.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/Bubblechart.html"
          },
          {
            "cid": 241,
            "sid": "ColumnRangechart",
            "name": "ColumnRangechart",
            "label": "ColumnRange chart",
            "data": {
              "body": "> ColumnRange 차트를 표현합니다. `highcharts-more.js 필요` ### Example ```javascript myChart.setOptions({ chart:{ type:'columnrange', inverted:true // 축 반전 }, series: [{ name: 'Temperatures', data: [ [-19.7, 9.4], [-12.7, 16.5], [-30.5, -9.4], [-1.4, 19.9], [5.0, 22.6], [2.9, 29.5], [19.2, 30.7], [-7.3, 6.5] ] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-columnrange.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/ColumnRangechart.html"
          },
          {
            "cid": 242,
            "sid": "DependencyWheelchart",
            "name": "DependencyWheelchart",
            "label": "Dependency wheel chart",
            "data": {
              "body": "> Dependency wheel 차트를 표현합니다. `modules/sankey.js 필요` `modules/dependency-wheel.js 필요` ### Example ```javascript myChart.setOptions({ chart: { type: 'dependencywheel', }, plotOptions: { series: { dataLabels: { color: '#000000', textPath: { enabled: true, // 마커의 모양을 따라서 데이터 라벨 표시 attributes: { dy: 5 // textPath 의 y축 조절 } }, distance: 10 // 중심 기준으로 떨어질 정도 }, size: '95%' // 시리즈가 화면에 꽉차서 데이터 라벨이 잘리는 것을 방지 } }, series: [{ // from 에서 to 까지 weight 만큼 'keys': ['from','to','weight'], // Dependency wheel 에서 해당 코드 선언 필수 'data': [ ['한국','중국',6225], ['한국','홍콩',5287], ['한국','베트남',1628], ['한국','대만',1084], ['한국','인도',301], ['한국','말레이시아',170], ['한국','일본',95], ['한국','미국',62], ['한국','싱가포르',38], ['미국','대만',477], ['미국','싱가포르',342], ['미국','홍콩',189], ['미국','베트남',54], ['미국','말레이시아',64], ['미국','중국',41], ['미국','한국',15], ['미국','일본',14], ['미국','인도',11], ['싱가포르','홍콩',438], ['싱가포르','대만',216], ['싱가포르','한국',119], ['싱가포르','중국',110], ['싱가포르','미국',44], ['싱가포르','일본',30], ['싱가포르','베트남',22], ['싱가포르','인도',13], ['홍콩','대만',2969], ['홍콩','인도',2230], ['홍콩','한국',894], ['홍콩','베트남',555], ['홍콩','싱가포르',171], ['홍콩','미국',111], ['홍콩','말레이시아',26], ['홍콩','일본',46], ['대만','싱가포르',594], ['대만','중국',575], ['대만','홍콩',264], ['대만','일본',104], ['대만','미국',22], ['대만','말레이시아',79], ['대만','한국',11], ['대만','베트남',12], ['일본','대만',1487], ['일본','중국',847], ['일본','홍콩',46], ['일본','말레이시아',195], ['일본','싱가포르',22], ['일본','베트남',19], ['일본','미국',15], ['베트남','한국',36], ['베트남','인도',26], ['베트남','싱가포르',23], ['말레이시아','싱가포르',151], ['말레이시아','대만',79], ['말레이시아','중국',43], ['말레이시아','미국',27], ['말레이시아','홍콩',18], ['중국','홍콩',5207], ['중국','한국',4521], ['중국','인도',399], ['중국','대만',2572], ['중국','베트남',1607], ['중국','말레이시아',996], ['중국','싱가포르',158], ['중국','미국',92], ['인도','베트남',16], ['인도','홍콩',12] ]}] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-dependencywheel.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/DependencyWheelchart.html"
          },
          {
            "cid": 243,
            "sid": "ErrorBarchart",
            "name": "ErrorBarchart",
            "label": "ErrorBar chart",
            "data": {
              "body": "> ErrorBar 차트를 표현합니다. `highcharts-more.js 필요` ### Example ```javascript myChart.setOptions({ chart:{ type:'errorbar' }, series: [{ name: 'Temperatures', data: [[6, 8], [5.9, 7.6], [9.4, 10.4], [14.1, 15.9], [18.0, 20.1], [21.0, 24.0]] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-errorbar.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/ErrorBarchart.html"
          },
          {
            "cid": 244,
            "sid": "Funnelchart",
            "name": "Funnelchart",
            "label": "Funnel chart",
            "data": {
              "body": "> Funnel 차트를 표현합니다. `modules/funnel.js 필요` ### Example ```javascript myChart.setOptions({ chart:{ type:'funnel' }, series: [{ name: 'Unique users', data: [ ['Website visits', 15654], ['Downloads', 4064], ['Requested price list', 1987], ['Invoice sent', 976], ['Finalized', 846] ] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-funnel.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/Funnelchart.html"
          },
          {
            "cid": 245,
            "sid": "HeatMapchart",
            "name": "HeatMapchart",
            "label": "HeatMap chart",
            "data": {
              "body": "> HeatMap 차트를 표현합니다. `modules/heatmap.js 필요` ### Example ```javascript myChart.setOptions({ chart:{ type:'heatmap', marginTop: 40, marginBottom: 40 }, xAxis: { categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], lineWidth: 0 }, yAxis: { categories: ['a', 'b', 'c', 'd', 'e', 'f'], lineWidth: 0, title: \"\" }, colorAxis: { // 최솟값 색 ~ 최댓값 색까지 그라데이션으로 표시됨 min: 0, // 최솟값 minColor: '#FFFFFF', // 최솟값의 색 maxColor: '#ff0000' // 최댓값의 색 }, legend: { align: 'right', layout: 'vertical', // 범례 세로 정렬 margin: 0, verticalAlign: 'top', y: 25, symbolHeight: 320 // 범례 높이 }, series: [{ data: [[0,0,17], [0,1,17], [0,2,29], [0,3,54], [0,4,63], [0,5,68], [1,0,92], [1,1,165], [1,2,287], [1,3,517], [1,4,873], [1,5,1140], [2,0,1], [2,1,4], [2,2,3], [2,3,4], [2,4,4], [2,5,2], [3,0,4], [3,1,8], [3,2,19], [3,3,39], [3,4,89], [3,5,101], [4,0,1], [4,1,5], [4,2,10], [4,3,15], [4,4,22], [4,5,17], [5,0,6], [5,1,13], [5,2,19], [5,3,26], [5,4,40], [5,5,51], [6,0,50], [6,1,83], [6,2,108], [6,3,218], [6,4,278], [6,5,352], [7,0,2], [7,1,5], [7,2,10], [7,3,19], [7,4,35], [7,5,84], [8,0,10], [8,1,26], [8,2,84], [8,3,130], [8,4,206], [8,5,169], [9,0,0], [9,1,0], [9,2,0], [9,3,0], [9,4,1], [9,5,1]] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-heatmap.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/HeatMapchart.html"
          },
          {
            "cid": 246,
            "sid": "Networkgraphchart",
            "name": "Networkgraphchart",
            "label": "Networkgraph chart",
            "data": {
              "body": "> Networkgraph 차트를 표현합니다. `modules/networkgraph.js 필요` ### Example ```javascript myChart.setOptions({ chart: { type: 'networkgraph', }, plotOptions: { sankey: { 'keys': ['from','to'], // Networkgraph 에서 해당 코드 선언 필수 } }, series: [{ // from 에서 to 로 'data': [ ['A', 'B'], ['A', 'C'], ['A', 'D'], ['A', 'E'], ['A', 'F'], ['A', 'G'], ['A', 'H'], ['A', 'I'], ['H', 'J'], ['H', 'K'], ['H', 'L'], ['L', 'M'], ['M', 'N'], ['K', 'O'], ['E', 'P'], ['E', 'Q'], ['Q', 'R'], ['D', 'S'], ['D', 'T'] ] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-networkgraph.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/Networkgraphchart.html"
          },
          {
            "cid": 247,
            "sid": "PackedBubblechart",
            "name": "PackedBubblechart",
            "label": "Packed Bubble chart",
            "data": {
              "body": "> Packed Bubble 차트를 표현합니다. `highcharts-more.js 필요` ### Example ```javascript myChart.setOptions({ chart: { type: \"packedbubble\" }, plotOptions: { packedbubble: { minSize: \"20%\", // 버블 최소 사이즈 크기 maxSize: \"120%\", // 버블 최대 사이즈 크기 zMin: 0, // 버블 최소 사이즈 값 zMax: 10000 // 버블 최대 사이즈 값 } }, series: [{ name: \"서울특별시\", data: [ [\"종로구\",1475], [\"중구\",1252], [\"용산구\",2192], [\"성동구\",2821], [\"광진구\",3465], [\"동대문구\",3507], [\"중랑구\",3791], [\"성북구\",4361], [\"강북구\",2877], [\"도봉구\",3041], [\"노원구\",4964], [\"은평구\",4546], [\"서대문구\",3183], [\"마포구\",3624], [\"양천구\",4269], [\"강서구\",5559], [\"구로구\",4240], [\"금천구\",2471], [\"영등포구\",4018], [\"동작구\",3866], [\"관악구\",4967], [\"서초구\",3831], [\"강남구\",5001], [\"송파구\",6357], [\"강동구\",4486] ]}, { name: \"부산광역시\", data: [ [\"중구\",411], [\"서구\",1048], [\"동구\",\"859\"], [\"영도구\",1098], [\"부산진구\",3504], [\"동래구\",2672], [\"남구\",2580], [\"북구\",2755], [\"해운대구\",3771], [\"사하구\",3030], [\"금정구\",2274], [\"강서구\",1437], [\"연제구\",1997], [\"수영구\",1700], [\"사상구\",2069], [\"기장군\",1745] ]}, { name: \"인천광역시\", data: [ [\"중구\",1507], [\"동구\",580], [\"연수구\",4004], [\"남동구\",5113], [\"부평구\",4982], [\"계양구\",2881], [\"서구\",5810], [\"미추홀구\",4151], [\"강화군\",664], [\"옹진군\",193] ]}] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-packedbubble.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/PackedBubblechart.html"
          },
          {
            "cid": 248,
            "sid": "Polarchart",
            "name": "Polarchart",
            "label": "Polar chart",
            "data": {
              "body": "> 방사형 차트를 표현합니다. `highcharts-more.js 필요` ### Example ```javascript myChart.setOptions({ chart: { type: 'line', polar: true // 방사형 차트 구현 }, xAxis: { categories: [ '언어력', '수리력', '추리력', '공간지각력', '사물지각력', '상황판단력' ] }, yAxis: { gridLineInterpolation: 'polygon', // 내부 보조선을 다각형 모양으로 표시 gridLineDashStyle: 'longdash', // 내부 보조선의 선 형태 gridLineWidth: 1 // 내부 보조선 선 굵기 }, series: [{ name: '영희', data: [430, 190, 600, 350, 170, 100] }, { name: '철수', data: [500, 390, 420, 310, 260, 140] }] },{ append: true, redraw: true }); ``` <!-- 이미 사진이 다른게 있어서 이름을 바꾸든가 해야할듯 --> ![s](/assets/imgs/ibchart-polar2.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/Polarchart.html"
          },
          {
            "cid": 249,
            "sid": "Prymidchart",
            "name": "Prymidchart",
            "label": "Prymid chart",
            "data": {
              "body": "> Prymid 차트를 표현합니다. `highcharts-more.js 필요` ### Example ```javascript myChart.setOptions({ chart:{ type:'pyramid' }, series: [{ name: 'Unique users', data: [ ['Website visits', 1565], ['Downloads', 4064], ['Requested price list', 1987], ['Invoice sent', 976], ['Finalized', 846] ] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-pyramid.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/Prymidchart.html"
          },
          {
            "cid": 250,
            "sid": "Sankeychart",
            "name": "Sankeychart",
            "label": "Sankey chart",
            "data": {
              "body": "> Sankey 차트를 표현합니다. `modules/sankey.js 필요` ### Example ```javascript myChart.setOptions({ chart: { type: 'sankey', }, plotOptions: { sankey: { 'keys': ['from','to','weight'], // sankey 에서 해당 코드 선언 필수 } }, series: [{ // from 에서 to 까지 weight 만큼 'data': [ [\"A\",\"B\",10], [\"A\",\"C\",2], [\"B\",\"D\",5], [\"B\",\"F\",3], [\"B\",\"G\",2], [\"C\",\"D\",1], [\"C\",\"F\",1] ] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-sankey.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/Sankeychart.html"
          },
          {
            "cid": 251,
            "sid": "Solidgaugechart",
            "name": "Solidgaugechart",
            "label": "Solid gauge chart",
            "data": {
              "body": "> Solid gauge 차트를 표현합니다. `highcharts-more.js 필요` `modules/solid-gauge.js 필요` ### Example ```javascript // 시작 데이터 var orgVal = 80; myChart.setOptions({ chart:{ type:'solidgauge' }, pane: { startAngle: -90, // 게이지 바 시작 각도 endAngle: 90, // 게이지 바 종료 각도 }, yAxis: { min: 0, // 게이지 바 시작 값 max: 200, // 게이지 바 종료 값 }, series: [{ data: [orgVal] }] },{ append: true, redraw: true }); // 1.5초마다 동적으로 랜덤 데이터 삽입하는 구문 var series = myChart.series(0); this.refreshInterval = setInterval( (function() { let newVal, inc; inc = Math.round((Math.random() - 0.5) * 100); newVal = orgVal + inc; if (newVal < 0 || newVal > 200) { newVal = orgVal - inc; } if (series != -1) series.setData([newVal], {append:false, redraw:true}); }).bind(this), 1500 ); ``` ![s](/assets/imgs/ibchart-solidgauge.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/Solidgaugechart.html"
          },
          {
            "cid": 252,
            "sid": "Spline-Update",
            "name": "Spline-Update",
            "label": "Spline Update",
            "data": {
              "body": "> Spline차트에서 데이터를 실시간으로 업데이트합니다. ### Example ```javascript var options = { chart: { type: 'spline', } } myChart.setOptions(options, {append : true, redraw:true}); var series = myChart.series(0); // 최대 표현 갯수 지정 var maxDataPoints = 20; // interval을 활용하여 데이터를 업데이트 this.refreshInterval = setInterval(function () { var x = (new Date()).getTime(), // 현재시간 y = Math.random(); //랜덤 데이터 var isRedraw = series.getData().length >= maxDataPoints; if (series != -1) series.addPoint([x, y], {append:true, redraw:isRedraw}); if (series.getData().length > maxDataPoints) { // 최대 갯수를 넘어가면 첫번째 데이터 삭제 series.getData()[0].remove(); } }, 1000); /** Highcharts에서는 addPoint 이벤트에서 데이터 업데이트 후 pulse효과를 주고있음. * 그러나 현재 IBChart에서는 addPoint 이벤트가 존재하지 않음. * addPoint 이벤트가 추가 되기 전까지는 Highchart의 addPoint를 활용. **/ Highcharts.addEvent(Highcharts.Series, 'addPoint', e => { const point = e.point, series = e.target; if (!series.pulse) { series.pulse = series.chart.renderer.circle() .add(series.markerGroup); } setTimeout(() => { series.pulse .attr({ x: series.xAxis.toPixels(point.x, true), y: series.yAxis.toPixels(point.y, true), r: series.options.marker.radius, opacity: 1, fill: series.color }) .animate({ r: 20, opacity: 0 }, { duration: 1000 }); }, 1); }); ``` ![s](/assets/imgs/ibchart-spline-update.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/Spline-Update.html"
          },
          {
            "cid": 253,
            "sid": "TileMapchart",
            "name": "TileMapchart",
            "label": "TileMap chart",
            "data": {
              "body": "> TileMap 차트를 표현합니다. `modules/heatmap.js 필요` `modules/tilemap.js 필요` > `※` 반드시 heatmap.js, tilemap.js 순으로 import 해야 합니다. ### Example ```javascript myChart.setOptions({ chart: { type: 'tilemap', }, plotOptions: { tilemap: { layoutAlgorithm: 'hexagon', // 타일의 모양을 육각형으로 설정 }, }, series: [{ data: [ [3, 3, 'name1'], [4, 3, 'name2'], [5, 4, 'name3'], [6, 3, 'name4'], [7, 3, 'name5'], [6, 2, 'name6'], [5, 2, 'name7'], [4, 2, 'name8'] ] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-tilemap.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/TileMapchart.html"
          },
          {
            "cid": 254,
            "sid": "Waterfallchart",
            "name": "Waterfallchart",
            "label": "Waterfall chart",
            "data": {
              "body": "> Waterfall 차트를 표현합니다. `highcharts-more.js 필요` ### Example ```javascript myChart.setOptions({ chart:{ type:'waterfall' }, series: [{ upColor: '#FF6666', //증가 시 표시되는 색 Color: '#448EF6', // 감소 시 표시되는 색 data: [120, 569, -131, 231, -342, 233, 231, -42, 103, -131, -255, 98] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-waterfall.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/Waterfallchart.html"
          },
          {
            "cid": 255,
            "sid": "Wordcloudchart",
            "name": "Wordcloudchart",
            "label": "Wordcloud  chart",
            "data": {
              "body": "> WordCloud 차트는 가중치(값)에 따라 단어의 크기, 위치, 색을 지정하고 단어를 시각적으로 표현하는 차트입니다. > 단일 시리즈이며 그 한 개의 시리즈에 단어와 가중치 데이터로 구성되어 있습니다. > `제약사항` 차트를 생성할때, `opt.plugin`값을 `d3`로 설정하고 사용해야 하고 `opt.width`와 `opt.height`값은 `300px`이상으로만 설정해야 합니다.(※너무 작을경우 차트가 표현될 수 없음) > `%`로 설정되었을때 부모의 `너비` / `높이`가 `300px` 보다 작게 값을 설정하지 않도록 해야 합니다. ### Example ```javascript //wordcloud 차트 생성 createIBChart(chart,\"myChart\", { width: \"500px\", height: \"500px\", plugin: \"d3\" }); //wordcloud 차트 설정 myChart.setOptions({ chart: { type: \"wordcloud\" } }, { append: false }); //wordcloud 데이터 로드 myChart.loadSearchData({ \"ibchart\": { \"data\": [{ \"series\": [{ \"seriesName\": \"WordCloud\", \"pointName\": \"IBLeaders\", \"value\": 50 }] }, { \"series\": [{ \"pointName\": \"javascript\", \"value\": 40 }] }, { \"series\": [{ \"pointName\": \"D3.js\", \"value\": 15 }] }, { \"series\": [{ \"pointName\": \"웹표준\", \"value\": 30 }] }, { \"series\": [{ \"pointName\": \"CrossBrowsing\", \"value\": 30 }] }, { \"series\": [{ \"pointName\": \"Front-end\", \"value\": 30 }] }, { \"series\": [{ \"pointName\": \"Back-end\", \"value\": 30 }] }, { \"series\": [{ \"pointName\": \"ECMAScript\", \"value\": 20 }] }, { \"series\": [{ \"pointName\": \"Web\", \"value\": 15 }] }, { \"series\": [{ \"pointName\": \"C++\", \"value\": 20 }] }, { \"series\": [{ \"pointName\": \"C#\", \"value\": 25 }] }, { \"series\": [{ \"pointName\": \"JAVA\", \"value\": 38 }] }, { \"series\": [{ \"pointName\": \"HTML\", \"value\": 40 }] }, { \"series\": [{ \"pointName\": \"AngularJS\", \"value\": 30 }] }, { \"series\": [{ \"pointName\": \"jQuery\", \"value\": 35 }] }, { \"series\": [{ \"pointName\": \"CSS\", \"value\": 32 }] }, { \"series\": [{ \"pointName\": \"솔루션\", \"value\": 45 }] }, { \"series\": [{ \"pointName\": \"Solution\", \"value\": 45 }] }, { \"series\": [{ \"pointName\": \"Language\", \"value\": 15 }] }, { \"series\": [{ \"pointName\": \"Support\", \"value\": 15 }] }, { \"series\": [{ \"pointName\": \"IBSheet 7\", \"value\": 25 }] }, { \"series\": [{ \"pointName\": \"IBSheet(H) 7\", \"value\": 24 }] }, { \"series\": [{ \"pointName\": \"IBChart(H) 7\", \"value\": 20 }] }, { \"series\": [{ \"pointName\": \"IBMultiCombo(H) 7\", \"value\": 17 }] }, { \"series\": [{ \"pointName\": \"IBUpload(H) 7\", \"value\": 17 }] }, { \"series\": [{ \"pointName\": \"IBMDITab(H) 7\", \"value\": 17 }] }, { \"series\": [{ \"pointName\": \"IBMaskEdit(H) 7\", \"value\": 17 }] }] } }, { append: true }); ``` ![s](/assets/imgs/ibchart-wordcloud.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/Wordcloudchart.html"
          },
          {
            "cid": 256,
            "sid": "angulargauges",
            "name": "angulargauges",
            "label": "Angular gauges chart",
            "data": {
              "body": "> gague 차트를 표현합니다. `highcharts-more.js 필요` ### Example ```javascript myChart.setOptions({ chart: { type: \"gauge\" }, pane: { startAngle: -90, // 게이지 바 시작 각도 endAngle: 90, // 게이지 바 종료 각도 }, yAxis: { min: 0, // 게이지 바 시작 값 max: 200, // 게이지 바 종료 값 tickInterval : 10 // 10마다 눈금 표시 }, series: [{ data : [60] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-angular.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/specialChart/angulargauges.html"
          }
        ]
      },
      {
        "gid": 2,
        "name": "appx-chartSkill",
        "label": "chartSkill",
        "children": [
          {
            "cid": 257,
            "sid": "allowedDrillToNode",
            "name": "allowedDrillToNode",
            "label": "treemap 차트 탐색하기",
            "data": {
              "body": "> `allowedDrillToNode` 속성으로 차트 탐색 가능 여부를 설정합니다. > 활성화 시킬 경우 사용자는 상위 포인트를 클릭하고 해당 하위 포인트를 확대할 수 있습니다. > 해당 속성은 `series 배열` 안에서 정의되어야 합니다. ### Info |name|type|required|description| |---|---|---|---| |allowedDrillToNode|`boolean`|<span class='optional'>선택(false)</span>|차트 탐색 가능 여부 설정| ### Example ```javascript myChart.setOptions({ chart: { type: 'treemap' }, series: [{ allowDrillToNode: true, // 차트 탐색 가능 여부 설정 data: [ { \"id\": \"1.0\", \"name\": \"상위 포인트1\", \"value\": 1234 }, { \"id\": \"1.1\", \"parent\": \"1.0\", \"name\": \"하위 포인트1-1\", \"value\": 700, }, { \"id\": \"1.2\", \"parent\": \"1.0\", \"name\": \"하위 포인트1-2\", \"value\": 234, },{ \"id\": \"1.3\", \"parent\": \"1.0\", \"name\": \"하위 포인트1-3\", \"value\": 300, }, { \"id\": \"2.0\", \"name\": \"상위 포인트2\", \"value\": 500 }, { \"id\": \"2.1\", \"parent\": \"2.0\", \"name\": \"하위 포인트2-1\", \"value\": 300 },{ \"id\": \"2.2\", \"parent\": \"2.0\", \"name\": \"하위 포인트2-2\", \"value\": 200 }, ] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-allowedDrillToNode.png) ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/allowedDrillToNode.html"
          },
          {
            "cid": 258,
            "sid": "chartsize",
            "name": "chartsize",
            "label": "차트 크기 동적 변경기능",
            "data": {
              "body": "> 차트 크기를 동적으로 변경 할 수 있습니다. ### Example ```javascript myChart.setOptions({ colors: ['#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263'], chart:{ type:'column' }, yAxis: { title:{ text: \"Y축 타이틀\" }, xAxis: { categories: [\"서울\",\"대전\",\"대구\"] }, series: [{ name : \"축구\", data : [10,32,15], },{ name : \"농구\", data : [15,40,30], },{ name : \"야구\", data : [30,25,40], }] },{ append: true, redraw: true }); myChart.setSize(300,300); ``` ![s](/assets/imgs/ibchart-chartsize.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/chartsize.html"
          },
          {
            "cid": 259,
            "sid": "colors",
            "name": "colors",
            "label": "colors 기능",
            "data": {
              "body": "> 차트 별로 color를 지정 할 수 있습니다. ### Example ```javascript myChart.setOptions({ colors: ['#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263'], chart:{ type:'column' }, yAxis: { title:{ text: \"Y축 타이틀\" } }, xAxis: { categories: [\"서울\",\"대전\",\"대구\"] }, series: [{ name : \"축구\", data : [10,32,15], },{ name : \"농구\", data : [15,40,30], },{ name : \"야구\", data : [30,25,40], }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-colors.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/colors.html"
          },
          {
            "cid": 260,
            "sid": "data",
            "name": "data",
            "label": "데이터 표시",
            "data": {
              "body": "> 1000 개 이상 데이터 표시 방법입니다. > 1000개부터 렌더링하기 위해서는 `turboThreshold`를 설정 해주어야 합니다. ### Info |name|type|required|description| |---|----|-----|-------| |turboThreshold|`number`|<span class='optional'>선택(1000)</span>|0일 경우 사용하지 않음| ### Example ```javascript myChart.setOptions({ chart:{ type:'line' }, plotOptions: { series: { turboThreshold: 2001 //default: 1000 }, }, series: [{ data : [...] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-data.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/data.html"
          },
          {
            "cid": 261,
            "sid": "donutTitle",
            "name": "donutTitle",
            "label": "도넛 안에 타이틀 넣는 기능",
            "data": {
              "body": "> 도넛형 차트 내 타이틀을 넣을 수 있습니다. ### Example ```javascript myChart.setOptions({ colors: ['#DDDF00','#24CBE5','#64E572','#FF9655','#FFF263'] chart:{ type:'pie' }, title:{ text: \"title\", align: \"center\", verticalAlign: \"middle\" }, plotOptions: { pie:{ dataLabels: { enabled: true, distance: -50, } } }, series: [{ innerSize: \"50%\", data : [ [\"축구\", 44] [\"농구\", 26], [\"배구\", 20], [\"야구\", 3], ] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-donutTitle.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/donutTitle.html"
          },
          {
            "cid": 262,
            "sid": "label",
            "name": "label",
            "label": "lable, title에 html 사용여부 기능",
            "data": {
              "body": "> Html 사용여부 기능입니다. > `useHTML: true`일 경우 사용 가능합니다. ### Example ```javascript myChart.setOptions({ title: { text: \"html적용x\" }, subtitle: { text: \"<span style=’font-size: 32px; font-weight: bold; color:red; background:yellow;’>html 적용</span>\", useHTML: true //true 일 경우 html 코드 사용 가능. } }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-label1.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/label.html"
          },
          {
            "cid": 263,
            "sid": "legend",
            "name": "legend",
            "label": "legend 관련 이벤트",
            "data": {
              "body": "> legend 관련 이벤트 기능입니다. `seriesLegendItemClick()` ### Example ```javascript myChart.setOptions({ chart:{ type:'column' }, series: [{ name: \"서울\", data: [60, 40, 20, 80] }, { name: \"인천\", data: [30, 50, 90, 70] }, { name: \"부산\", data: [40, 70, 30, 60] }], events: { seriesLegendItemClick: function() { alert(\"seriesLegendItemClick함수발생\"); } } },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-legend.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/legend.html"
          },
          {
            "cid": 264,
            "sid": "multichart",
            "name": "multichart",
            "label": "멀티 차트 표현 기능",
            "data": {
              "body": "> 여러가지의 형태를 한 차트에 표현 할 수 있습니다. ### Example ```javascript myChart.setOptions({ chart:{ type:'column' }, xAxis: { categories:[\"서울\",\"대전\",\"대구\",\"부산\",\"광주\",\"인천\"] }, series: [{ type: \"line\", zIndex: 3, // z-layer index name : \"축구\", data : [10,32,15,53,18,22] },{ type: \"spline\", zIndex: 4, name : \"농구\", data : [15,40,30,60,10,8] },{ type: \"column\", zIndex: 2, name : \"야구\", data : [30,25,40,10,21,89] },{ type: \"area\", zIndex: 1, name : \"배구\", data : [28,10,70,40,60,89] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-multichart.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/multichart.html"
          },
          {
            "cid": 265,
            "sid": "piechart",
            "name": "piechart",
            "label": "파이 차트 크기 고정",
            "data": {
              "body": "> 파이 차트 크기 고정기능입니다. `plotOptions.pie.size` ### Example ```javascript myChart.setOptions({ chart:{ type:'pie' }, plotOptions: { pie: { dataLabels: { enabled: true, distance: -50 }, size: \"100%\" } }, series: [{ data : [ [\"축구\", 20], [\"농구\", 40], [\"배구\", 30], [\"야구\", 45] ] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-pie.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/piechart.html"
          },
          {
            "cid": 266,
            "sid": "plotLine",
            "name": "plotLine",
            "label": "plotLine 기능",
            "data": {
              "body": "> 차트 중간에 선을 표현 할 수 있습니다. ### Example ```javascript myChart.setOptions({ chart:{ type:'column' }, yAxis: { title:{ text: \"Y축 타이틀\" }, plotLines : [{ color: '#FF0000', value:25, width:2, label:{ text:\"성장률평균\", align:\"right\" }, zIndex:10 },{ color: '#00FF00', value:481.5, width:2, label:{ text:\"판매량평균\", align:\"center\" }, zIndex:10 }] }, series: [{ name : \"성장률\", zIndex:3, data : [10,32,15,53,18,22], dataLabels:{ enabled:true } },{ name : \"판매량\", zIndex:1, data : [580,100,700,400,600,509], dataLabels:{ enabled:true } }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-plotLine.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/plotLine.html"
          },
          {
            "cid": 267,
            "sid": "pointClick",
            "name": "pointClick",
            "label": "포인트 클릭 이벤트",
            "data": {
              "body": "> 포인트 클릭 이벤트 기능을 구현 할 수 있습니다. ### Example ```javascript myChart.setOptions({ chart:{ type:'column' }, series: [{ name: \"서울\", data: [60, 40, 20, 80] }, { name: \"인천\", data: [30, 50, 90, 70] }, { name: \"부산\", data: [40, 70, 30, 60] }], events: { pointClick: function() { alert(\"pointClick: \"+ this.series.name); } } },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-pointClick.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/pointClick.html"
          },
          {
            "cid": 268,
            "sid": "secondary",
            "name": "secondary",
            "label": "Secondary Y축 사용",
            "data": {
              "body": "> 두개의 Y축을 사용합니다. ### Example ```javascript myChart.setOptions({ chart:{ type:'column' }, yAxis: [{ title:{ text: \"Y축 타이틀\" } },{ title:{ text: \"Y축 타이틀\" }, opposite: true }], series: [{ name : \"성장률\", type:\"line\", zIndex:3, data : [10,32,15,53,18,22], dataLabels:{ enabled:true } },{ name : \"판매량\", zIndex:1, data : [580,100,700,400,600,509], dataLabels:{ enabled:true }, yAxis:1 }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-secondary.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/secondary.html"
          },
          {
            "cid": 269,
            "sid": "series1",
            "name": "series1",
            "label": "시리즈 관련기능 1",
            "data": {
              "body": "> 시리즈 관련기능 `pointPadding, pointWidth` 을 구현 할 수 있습니다. ### Example ```javascript myChart.setOptions({ chart:{ type:'column' }, yAxis: { title:{ text: \"Y축 타이틀\" }, xAxis: { categories: [\"서울\",\"대전\",\"대구\"] }, plotOptions: { series: { pointWidth: 15, //포인트의 너비를 설정한다. pointPadding: 0.3 //포인트 간 padding 적용 값을 설정한다. } } series: [{ name : \"축구\", data : [10,32,15], },{ name : \"농구\", data : [15,40,30], },{ name : \"야구\", data : [30,25,40], }] }},{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-series1.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/series1.html"
          },
          {
            "cid": 270,
            "sid": "series2",
            "name": "series2",
            "label": "시리즈 관련기능 2",
            "data": {
              "body": "> 시리즈 관련기능 `pointColor` 을 구현 할 수 있습니다. ### Example ```javascript var data = { ibchart: { data: [{ axisLabel: \"1/4분기\", series: [{ seriesType: \"line\", seriesName: \"중국\", pointName: \"하나\", pointColor: \"red\", value: 220 },{ seriesType: \"column\", seriesName: \"호주\", pointName: \"둘\", pointColor: \"yellow\", value: 120 }] },{ axisLabel: \"2/4분기\", series: [{ pointColor: \"green\", value: 300 },{ pointColor: \"pink\", value: 250 }] }] } }; myChart.loadSearchData(data, { append: true }); ``` ![s](/assets/imgs/ibchart-series2.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/series2.html"
          },
          {
            "cid": 271,
            "sid": "series3",
            "name": "series3",
            "label": "시리즈 관련기능 3",
            "data": {
              "body": "> 시리즈 관련기능 `막대 그라데이션` 을 구현 할 수 있습니다. ### Example ```javascript var LightenColor = function (color, percent) { var num = parseInt(color.replace(\"#\",\"\"), 16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, B = (num >> 8 & 0x00FF) + amt, G = (num & 0x0000FF) + amt; return \"#\" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 +) (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1); }; var defaultColors = myChart.getOptions().colors; //기본 컬러 값 var gradientColors = []; for(var i =0; i < defaultColors.length; i++){ gradientColors[i] = { radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 }, // 그라데이션 단계 stop: [ [0, defaultColors[i]], [1, LightenColor(defaultColors[i], 30)] //brighton ] } myChart.setOptions({ colors: gradientColors, chart: { type: 'column', plotBorderColor: '#346691', plotBorderWidth: 2 }, xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec'] }, series: [{ data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4] }] }, { append: true, redraw: true } ); ``` ![s](/assets/imgs/ibchart-series3.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/series3.html"
          },
          {
            "cid": 272,
            "sid": "series4",
            "name": "series4",
            "label": "시리즈 관련기능 4",
            "data": {
              "body": "> 시리즈 관련기능 `slicedOffset` 을 구현 할 수 있습니다. `pie 이격 거리` ### Example ```javascript myChart.setOptions({ chart:{ type:'pie' }, plotOptions: { series: { //series 대신 pie를 넣어도 상관없음. slicedOffset: 20 } }, series: [{ data : [{ name: \"축구\", y: 44.2, selected: true, sliced: true }, [\"농구\",26.6], [\"배구\",20], [\"야구\",3.1], ] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-series4.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/series4.html"
          },
          {
            "cid": 273,
            "sid": "small",
            "name": "small",
            "label": "시리즈 합쳐서 표시",
            "data": {
              "body": "> 작은 비율을 갖는 시리즈를 합쳐서 표시하는 방법입니다. > `searchEnd` 이벤트를 이용하여 구현합니다. ### Example ```javascript var data = { ibchart: { data: [{ axisLabel: \"축구\", series: [{ seriesType: \"pie\", value: 100 }] }, { axisLabel: \"야구\", series: [{ value: 50 }] }, { axisLabel: \"농구\", series: [{ value: 10 }] }, { axisLabel: \"배구\", series: [{ value: 10 }] }, { series: [{ value: 5 }] }, { series: [{ value: 6 }] }, { series: [{ value: 8 }] }] } }; myChart.setEvents({ searchEnd: function(event){ var minsum = 0; //작은 비율을 합칠 변수 for(var i=0; i < data.ibchart.data.length; i++){ if(data.ibchart.data[i].series[0].value < 10){// 값이 10 미만 minsum += data.ibchart.data[i].series[0].value; } } myChat.setOptions({ series: [{ data: [ [\"축구\", 100], [\"야구\", 50], [\"농구\", 20], [\"배구\", 10], [\"기타\", minsum] ] }] }, { append: true, redraw: true }); } }); myChart.loadSearchData(data, { append: true }); ``` ![s](/assets/imgs/ibchart-small.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/small.html"
          },
          {
            "cid": 274,
            "sid": "stackGroup",
            "name": "stackGroup",
            "label": "stack의 그룹 기능",
            "data": {
              "body": "> `Stacking` 기능을 이용하면서 그룹을 지어 그룹별로 Stacking 기능을 이용 할 수 있습니다. ### Example ```javascript myChart.setOptions({ chart:{ type:'column' }, xAxis: { categories:[\"서울\",\"대전\",\"대구\",\"부산\",\"광주\",\"인천\"] }, plotOptions:{ column: { stacking: \"normal\" } }, series: [{ name : \"축구\", stack:\"summer\", //staking 기능에서 stack 이름을 주어 그룹을 형성 data : [10,32,15,53,18,22] },{ name : \"농구\", stack:\"winter\", data : [15,40,30,60,10,8] },{ name : \"야구\", stack:\"summer\", data : [30,25,40,10,21,89] },{ name : \"배구\", stack:\"winter\", data : [28,10,70,40,60,89] }] },{ append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-stacking.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/stackGroup.html"
          },
          {
            "cid": 275,
            "sid": "stackingsum",
            "name": "stackingsum",
            "label": "stacking에 대한 sum값 표시기능",
            "data": {
              "body": "> 누적형 레이블 사용여부(합계값 표시)를 표시합니다. ### Example ```javascript myChart.setOptions({ chart: { type: \"column\" }, yAxis: { stackLabels: { enabled: true, align: \"left\" } }, plotOptions: { column: { stacking: \"normal\" } } series: [{ name: \"서울\", data : [60,40,20,80] },{ name: \"인천\", data : [30,50,90,70] },{ name: \"부산\", data : [40,70,30,60] }] }, { append: true, redraw: true }); ``` ![s](/assets/imgs/ibchart-stackingsum.png) ### Since |version|desc| |---|---| |7.3.0.0||",
              "since": "|version|desc||---|---||7.3.0.0||"
            },
            "url": "docs/appx/chartSkill/stackingsum.html"
          }
        ]
      }
    ]
  },
  {
    "gid": 7,
    "name": "event",
    "label": "Events",
    "children": [
      {
        "cid": 284,
        "sid": "event",
        "name": "event",
        "label": "event 사용법 기초",
        "data": {
          "body": "> IBChart에서는 다양한 비즈니스 로직 구성을 위한 이벤트를 제공합니다. > 이벤트 추가는 `setEventListener`와 `setEvents`, `setOptions` method를 통해 추가할 수 있습니다. ### Info |name|type|required|description| |---|---|---|---| |`event`|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |`type`|`function`|<span class='optional'>선택</span>|이벤트 타입| ### Example ```javascript //예시1 myChart.setEvents({ addSeries: function(event) { console.log(\"addSeries\"); } }); //예시2 myChart.setEventListener(\"addSeries\", function(event){ console.log(\"addSeries\"); }); //예시3 myChart.setOptions({ events : { addSeries: function(event) { console.log(\"addSeries\"); } } }) ``` ### 제공 버전 |version|desc| |---|---| |7.3.0.0||"
        },
        "url": "docs/event/event.html"
      },
      {
        "cid": 276,
        "sid": "addPoint-2",
        "name": "addPoint",
        "label": "addPoint",
        "data": {
          "body": "> 포인트 추가 완료 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택</span>|이벤트 타입| ### Example ```javascript myChart.setEvents({ addPoint : function(event) { console.log(\"addPoint\"); return true; } }); myChart.setEventListener(\"addPoint \", function(event){ console.log(\"addPoint\"); return true; }); myChart.setOptions({ events : { addPoint : function(event) { console.log(\"addPoint\"); return true; } } }); ``` ### Since |version|desc| |---|---| |7.3.1.18| 기능추가 |",
          "since": "|version|desc||---|---||7.3.1.18| 기능추가 |"
        },
        "url": "docs/event/addPoint.html"
      },
      {
        "cid": 277,
        "sid": "addSeries-2",
        "name": "addSeries",
        "label": "addSeries",
        "data": {
          "body": "> 시리즈 추가 완료 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required(default)|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`object`|<span class='optional'>선택(add)</span>|이벤트 타입| ### Example ```javascript myChart.setEvents({ addContents: function(event) { console.log(\"addSeries\"); return true; } }); myChart.setEventListener(\"addSeries\", function(event){ console.log(\"addSeries\"); return true; }); myChart.setOptions({ events : { addContents: function(event) { console.log(\"addSeries\"); return true; } } }); ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/addSeries.html"
      },
      {
        "cid": 278,
        "sid": "afterPrint",
        "name": "afterPrint",
        "label": "afterPrint",
        "data": {
          "body": "> doPrint() 호출 시 프린트 직후 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(print)</span>|이벤트 타입| ### Example ```javascript myChart.setEvents({ afterPrint: function(event) { console.log(\"afterPrint\"); } }); myChart.setEventListener(\"afterPrint\", function(event){ console.log(\"afterPrint\"); }); myChart.setOptions({ events : { afterPrint: function(event) { console.log(\"afterPrint\"); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/afterPrint.html"
      },
      {
        "cid": 279,
        "sid": "beforePrint",
        "name": "beforePrint",
        "label": "beforePrint",
        "data": {
          "body": "> doPrint() 호출 시 프린트 직전에 발생하는 이벤트입니다 ### Info |Name|Type|Required|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(print)</span>|이벤트 타입| ### Example ```javascript myChart.setEvents({ beforePrint: function(event) { console.log(\"beforePrint\"); } }); myChart.setEventListener(\"beforePrint\", function(event){ console.log(\"beforePrint\"); }); myChart.setOptions({ events : { beforePrint: function(event) { console.log(\"beforePrint\"); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/beforePrint.html"
      },
      {
        "cid": 280,
        "sid": "click",
        "name": "click",
        "label": "click",
        "data": {
          "body": "> 차트 영역을 클릭하는 시점에 발생하는 이벤트 입니다. ### Info |Name|Type|Required|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(click)</span>|이벤트 타입| |x|`number`|<span class='optional'>선택</span>|클릭 지점의 x좌표 (컨테이너 기준)| |y|`number`|<span class='optional'>선택</span>|클릭 지점의 y좌표 (컨테이너 기준)| ### Example ```javascript myChart.setEvents({ addSeries: function(event) { console.log(\"click \" + event.x + \" \" + event.y); } }); myChart.setEventListener(\"click\", function(event){ console.log(\"click \" + event.x + \" \" + event.y); }); myChart.setOptions({ events : { click: function(event) { console.log(\"click \" + event.x + \" \" + event.y); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/click.html"
      },
      {
        "cid": 281,
        "sid": "drilldown",
        "name": "drilldown",
        "label": "drilldown",
        "data": {
          "body": "> 드릴 다운 시점에 발생하는 이벤트 입니다. ### Info |Name|Type|Required|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(drilldown)</span>|이벤트 타입| |x|`number`|<span class='optional'>선택</span>|클릭 지점의 x좌표 (컨테이너 기준)| |y|`number`|<span class='optional'>선택</span>|클릭 지점의 y좌표 (컨테이너 기준)| ### Context Info |Name|Type|Required|Description| |----------|-----|---|----| |this|`object`|<span class='optional'>선택</span>|포인트 속성| |this.category|`string or number`|<span class='optional'>선택</span>|지점의 카테코리(axislabel)| |this.x|`number`|<span class='optional'>선택(x값)</span>|지점의 x값| |this.y|`number`|<span class='optional'>선택(y값)</span>|지점의 y값| ### Example ```javascript myChart.setEvents({ drilldown: function(event) { console.log(\"drilldown: \" + this.category); } }); myChart.setEventListener(\"drilldown\", function(event){ console.log(\"drilldown: \" + this.category); }); myChart.setOptions({ events : { drilldown: function(event) { console.log(\"drilldown: \" + this.category); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/drilldown.html"
      },
      {
        "cid": 282,
        "sid": "drillup",
        "name": "drillup",
        "label": "drillup",
        "data": {
          "body": "> 드릴 업 시점에 발생하는 이벤트 입니다. ### Info |Name|Type|Required|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(drillup)</span>|이벤트 타입| ### Example ```javascript myChart.setEvents({ drillup: function(event) { console.log(\"drillup\"); } }); myChart.setEventListener(\"drillup\", function(event){ console.log(\"drillup\"); }); myChart.setOptions({ events : { drillup: function(event) { console.log(\"drillup); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/drillup.html"
      },
      {
        "cid": 283,
        "sid": "drillupAll",
        "name": "drillupAll",
        "label": "drillupAll",
        "data": {
          "body": "> 최상단의 드릴 업 시점에 발생하는 이벤트 입니다. ### Info |Name|Type|Required|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(drillupAll)</span>|이벤트 타입| ### Example ```javascript myChart.setEvents({ drillupAll: function(event) { console.log(\"drillupAll\"); } }); myChart.setEventListener(\"drillupAll\", function(event){ console.log(\"drillupAll\"); }); myChart.setOptions({ events : { drillupAll: function(event) { console.log(\"drillupAll\"); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/drillupAll.html"
      },
      {
        "cid": 285,
        "sid": "pointClick-2",
        "name": "pointClick",
        "label": "pointClick",
        "data": {
          "body": "> 시리즈의 포인트 클릭 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(click)</span>|이벤트 타입| |x|`number`|<span class='optional'>선택</span>|클릭 지점의 x좌표 (컨테이너 기준)| |y|`number`|<span class='optional'>선택</span>|클릭 지점의 y좌표 (컨테이너 기준)| |point|`object`|<span class='optional'>선택</span>|포인트 정보| |point.x|`number`|<span class='optional'>선택</span>|클릭 지점의 x좌표 (x축 기준)| |point.y|`number`|<span class='optional'>선택</span>|클릭 지점의 y좌표 (y축 기준)| |point.<hi>name|`string`|<span class='optional'>선택(axislabel값)</span>|클릭 지점 이름 ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|포인트 속성| |this.category|`string or number`|<span class='optional'>선택(axislabel값)</span>|지점의 카테코리(axislabel)| |this.x|`number`|<span class='optional'>선택</span>|지점의 x값| |this.y|`number`|<span class='optional'>선택</span>|지점의 y값| ### Example ```javascript myChart.setEvents({ pointClick: function(event) { console.log(\"pointClick: \" + this.category); } }); myChart.setEventListener(\"pointClick\", function(event){ console.log(\"pointClick: \" + this.category); }); myChart.setOptions({ events : { pointClick: function(event) { console.log(\"pointClick: \" + this.category); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/pointClick.html"
      },
      {
        "cid": 286,
        "sid": "pointMouseOut",
        "name": "pointMouseOut",
        "label": "pointMouseOut",
        "data": {
          "body": "> 시리즈의 포인트에서 마우스 커서가 out 되는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(mouseout)</span>|이벤트 타입| ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|포인트 속성| |this.category|`string or number`|<span class='optional'>선택(axislabel값)</span>|지점의 카테코리(axislabel)| |this.x|`number`|<span class='optional'>선택</span>|지점의 x값| |this.y|`number`|<span class='optional'>선택</span>|지점의 y값| ### Example ```javascript myChart.setEvents({ pointMouseOut: function(event) { console.log(\"pointMouseOut: \" + this.category); } }); myChart.setEventListener(\"pointMouseOut\", function(event){ console.log(\"pointMouseOut: \" + this.category); }); myChart.setOptions({ events : { pointMouseOut: function(event) { console.log(\"pointMouseOut: \" + this.category); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/pointMouseOut.html"
      },
      {
        "cid": 287,
        "sid": "pointMouseOver",
        "name": "pointMouseOver",
        "label": "pointMouseOver",
        "data": {
          "body": "> 시리즈의 포인트에서 마우스 커서가 over 되는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(mouseover)</span>|이벤트 타입| ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|포인트 속성| |this.category|`string or number`|<span class='optional'>선택(axislabel값)</span>|지점의 카테코리(axislabel)| |this.x|`number`|<span class='optional'>선택</span>|지점의 x값| |this.y|`number`|<span class='optional'>선택</span>|지점의 y값| ### Example ```javascript myChart.setEvents({ pointMouseOver: function(event) { console.log(\"pointMouseOver: \" + this.category); } }); myChart.setEventListener(\"pointMouseOver\", function(event){ console.log(\"pointMouseOver: \" + this.category); }); myChart.setOptions({ events : { pointMouseOver: function(event) { console.log(\"pointMouseOver: \" + this.category); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/pointMouseOver.html"
      },
      {
        "cid": 288,
        "sid": "pointSelect",
        "name": "pointSelect",
        "label": "pointSelect",
        "data": {
          "body": "> 시리즈의 포인트를 선택하는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(select)</span>|이벤트 타입| |x|`number`|<span class='optional'>선택</span>|클릭 지점의 x좌표 (컨테이너 기준)| |y|`number`|<span class='optional'>선택</span>|클릭 지점의 y좌표 (컨테이너 기준)| |point|`object`|<span class='optional'>선택</span>|포인트 정보| |point.x|`number`|<span class='optional'>선택</span>|클릭 지점의 x좌표 (x축 기준)| |point.y|`number`|<span class='optional'>선택</span>|클릭 지점의 y좌표 (y축 기준)| |point.<hi>name|`string`|<span class='optional'>선택(axislabel값)</span>|클릭 지점 이름 ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|포인트 속성| |this.category|`string or number`|<span class='optional'>선택(axislabel값)</span>|지점의 카테코리(axislabel)| |this.x|`number`|<span class='optional'>선택</span>|지점의 x값| |this.y|`number`|<span class='optional'>선택</span>|지점의 y값| ### Example ```javascript myChart.setEvents({ pointSelect: function(event) { console.log(\"pointSelect: \" + this.category); } }); myChart.setEventListener(\"pointSelect\", function(event){ console.log(\"pointSelect: \" + this.category); }); myChart.setOptions({ events : { pointSelect: function(event) { console.log(\"pointSelect: \" + this.category); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/pointSelect.html"
      },
      {
        "cid": 289,
        "sid": "pointUnselect",
        "name": "pointUnselect",
        "label": "pointUnSelect",
        "data": {
          "body": "> 시리즈의 포인트를 선택 해제하는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(unselect)</span>|이벤트 타입| |x|`number`|<span class='optional'>선택</span>|클릭 지점의 x좌표 (컨테이너 기준)| |y|`number`|<span class='optional'>선택</span>|클릭 지점의 y좌표 (컨테이너 기준)| |point|`object`|<span class='optional'>선택</span>|포인트 정보| |point.x|`number`|<span class='optional'>선택</span>|클릭 지점의 x좌표 (x축 기준)| |point.y|`number`|<span class='optional'>선택</span>|클릭 지점의 y좌표 (y축 기준)| |point.<hi>name|`string`|<span class='optional'>선택(axislabel값)</span>|클릭 지점 이름 ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|포인트 속성| |this.category|`string or number`|<span class='optional'>선택(axislabel값)</span>|지점의 카테코리(axislabel)| |this.x|`number`|<span class='optional'>선택</span>|지점의 x값| |this.y|`number`|<span class='optional'>선택</span>|지점의 y값| ### Example ```javascript myChart.setEvents({ pointUnselect: function(event) { console.log(\"pointUnselect: \" + this.category); } }); myChart.setEventListener(\"pointUnselect\", function(event){ console.log(\"pointUnselect: \" + this.category); }); myChart.setOptions({ events : { pointUnselect: function(event) { console.log(\"pointUnselect: \" + this.category); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/pointUnselect.html"
      },
      {
        "cid": 290,
        "sid": "pointUpdate",
        "name": "pointUpdate",
        "label": "pointUpdate",
        "data": {
          "body": "> 시리즈의 포인트가 갱신되는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(update)</span>|이벤트 타입| ### Example ```javascript myChart.setEvents({ pointUpdate: function(event) { console.log(\"pointUpdate\"); } }); myChart.setEventListener(\"pointUpdate\", function(event){ console.log(\"pointUpdate\"); }); myChart.setOptions({ events : { pointUpdate: function(event) { console.log(\"pointUpdate); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/pointUpdate.html"
      },
      {
        "cid": 291,
        "sid": "redraw",
        "name": "redraw",
        "label": "redraw",
        "data": {
          "body": "> 차트가 redraw 되는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(redraw)</span>|이벤트 타입| ### Example ```javascript myChart.setEvents({ redraw: function(event) { console.log(\"redraw\"); } }); myChart.setEventListener(\"redraw\", function(event){ console.log(\"redraw\"); }); myChart.setOptions({ events : { redraw: function(event) { console.log(\"redraw); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/redraw.html"
      },
      {
        "cid": 292,
        "sid": "searchEnd",
        "name": "searchEnd",
        "label": "searchEnd",
        "data": {
          "body": "> 차트에서 데이터가 조회 완료되는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(redraw)</span>|이벤트 타입| ### Example ```javascript myChart.setEvents({ searchEnd: function(event) { console.log(\"searchEnd\"); } }); myChart.setEventListener(\"searchEnd\", function(event){ console.log(\"searchEnd\"); }); myChart.setOptions({ events : { searchEnd: function(event) { console.log(\"searchEnd); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/searchEnd.html"
      },
      {
        "cid": 293,
        "sid": "selection",
        "name": "selection",
        "label": "selection",
        "data": {
          "body": "> 차트에서 마우스 드래그로 영역을 선택하는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택</span>|이벤트 타입| ### Example ```javascript myChart.setEvents({ selection: function(event) { console.log(\"selection\"); } }); myChart.setEventListener(\"selection\", function(event){ console.log(\"selection\"); }); myChart.setOptions({ events : { selection: function(event) { console.log(\"selection); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/selection.html"
      },
      {
        "cid": 294,
        "sid": "seriesAfterAnimate",
        "name": "seriesAfterAnimate",
        "label": "seriesAfterAnimate",
        "data": {
          "body": "> 시리즈의 애니메이션 이후 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |----------|-----|---|----| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택</span>|이벤트 타입| ### Example ```javascript myChart.setEvents({ seriesAfterAnimate: function(event) { console.log(\"seriesAfterAnimate\"); } }); myChart.setEventListener(\"seriesAfterAnimate\", function(event){ console.log(\"seriesAfterAnimate\"); }); myChart.setOptions({ events : { seriesAfterAnimate: function(event) { console.log(\"seriesAfterAnimate); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/seriesAfterAnimate.html"
      },
      {
        "cid": 295,
        "sid": "seriesCheckBoxClick",
        "name": "seriesCheckBoxClick",
        "label": "seriesCheckBoxClick",
        "data": {
          "body": "> 시리즈의 체크박스를 클릭 하는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(click)</span>|이벤트 타입| ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|시리즈 속성| |this.<hi>name|`string`|<span class='optional'>선택</span>|시리즈명| |this.index|`number`|<span class='optional'>선택</span>|시리즈 인덱스| |this.data|`array`|<span class='optional'>선택</span>|시리즈의 데이터| |this.xData|`array`|<span class='optional'>선택</span>|시리즈의 x축 데이터| |this.yData|`array`|<span class='optional'>선택</span>|시리즈의 y축 데이터| |this.dataMax|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최대 값| |this.dataMin|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최소 값| ### Example ```javascript myChart.setEvents({ seriesCheckBoxClick: function(event) { console.log(\"seriesCheckBoxClick\"); } }); myChart.setEventListener(\"seriesCheckBoxClick\", function(event){ console.log(\"seriesCheckBoxClick\"); }); myChart.setOptions({ events : { seriesCheckBoxClick: function(event) { console.log(\"seriesCheckBoxClick\"); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/seriesCheckBoxClick.html"
      },
      {
        "cid": 296,
        "sid": "seriesClick",
        "name": "seriesClick",
        "label": "seriesClick",
        "data": {
          "body": "> 시리즈를 클릭하는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(click)</span>|이벤트 타입| ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|시리즈 속성| |this.<hi>name|`string`|<span class='optional'>선택</span>|시리즈명| |this.index|`number`|<span class='optional'>선택</span>|시리즈 인덱스| |this.data|`array`|<span class='optional'>선택</span>|시리즈의 데이터| |this.xData|`array`|<span class='optional'>선택</span>|시리즈의 x축 데이터| |this.yData|`array`|<span class='optional'>선택</span>|시리즈의 y축 데이터| |this.dataMax|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최대 값| |this.dataMin|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최소 값| ### Example ```javascript myChart.setEvents({ seriesClick: function(event) { console.log(\"seriesClick\"); } }); myChart.setEventListener(\"seriesClick\", function(event){ console.log(\"seriesClick\"); }); myChart.setOptions({ events : { seriesClick: function(event) { console.log(\"seriesClick\"); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/seriesClick.html"
      },
      {
        "cid": 297,
        "sid": "seriesHide",
        "name": "seriesHide",
        "label": "seriesHide",
        "data": {
          "body": "> 시리즈가 숨김 처리 되는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(hide)</span>|이벤트 타입| ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|시리즈 속성| |this.<hi>name|`string`|<span class='optional'>선택</span>|시리즈명| |this.index|`number`|<span class='optional'>선택</span>|시리즈 인덱스| |this.data|`array`|<span class='optional'>선택</span>|시리즈의 데이터| |this.xData|`array`|<span class='optional'>선택</span>|시리즈의 x축 데이터| |this.yData|`array`|<span class='optional'>선택</span>|시리즈의 y축 데이터| |this.dataMax|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최대 값| |this.dataMin|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최소 값| ### Example ```javascript myChart.setEvents({ seriesHide: function(event) { console.log(\"seriesHide\"); } }); myChart.setEventListener(\"seriesHide\", function(event){ console.log(\"seriesHide\"); }); myChart.setOptions({ events : { seriesHide: function(event) { console.log(\"seriesHide\"); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/seriesHide.html"
      },
      {
        "cid": 298,
        "sid": "seriesLegendItemClick",
        "name": "seriesLegendItemClick",
        "label": "seriesLegendItemClick",
        "data": {
          "body": "> 시리즈를 범례를 클릭하는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(click)</span>|이벤트 타입| ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|시리즈 속성| |this.<hi>name|`string`|<span class='optional'>선택</span>|시리즈명| |this.index|`number`|<span class='optional'>선택</span>|시리즈 인덱스| |this.data|`array`|<span class='optional'>선택</span>|시리즈의 데이터| |this.xData|`array`|<span class='optional'>선택</span>|시리즈의 x축 데이터| |this.yData|`array`|<span class='optional'>선택</span>|시리즈의 y축 데이터| |this.dataMax|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최대 값| |this.dataMin|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최소 값| ### Example ```javascript myChart.setEvents({ seriesLegendItemClick: function(event) { console.log(\"seriesLegendItemClick\"); } }); myChart.setEventListener(\"seriesLegendItemClick\", function(event){ console.log(\"seriesLegendItemClick\"); }); myChart.setOptions({ events : { seriesLegendItemClick: function(event) { console.log(\"seriesLegendItemClick\"); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/seriesLegendItemClick.html"
      },
      {
        "cid": 299,
        "sid": "seriesMouseOut",
        "name": "seriesMouseOut",
        "label": "seriesMouseOut",
        "data": {
          "body": "> 시리즈에서 마우스 커서가 out 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(mouseout)</span>|이벤트 타입| ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|시리즈 속성| |this.<hi>name|`string`|<span class='optional'>선택</span>|시리즈명| |this.index|`number`|<span class='optional'>선택</span>|시리즈 인덱스| |this.data|`array`|<span class='optional'>선택</span>|시리즈의 데이터| |this.xData|`array`|<span class='optional'>선택</span>|시리즈의 x축 데이터| |this.yData|`array`|<span class='optional'>선택</span>|시리즈의 y축 데이터| |this.dataMax|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최대 값| |this.dataMin|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최소 값| ### Example ```javascript myChart.setEvents({ seriesMouseOut: function(event) { console.log(\"seriesMouseOut\"); } }); myChart.setEventListener(\"seriesMouseOut\", function(event){ console.log(\"seriesMouseOut\"); }); myChart.setOptions({ events : { seriesMouseOut: function(event) { console.log(\"seriesMouseOut\"); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/seriesMouseOut.html"
      },
      {
        "cid": 300,
        "sid": "seriesMouseOver",
        "name": "seriesMouseOver",
        "label": "seriesMouseOver",
        "data": {
          "body": "> 시리즈에서 마우스 커서가 over 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(mouseover)</span>|이벤트 타입| ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|시리즈 속성| |this.<hi>name|`string`|<span class='optional'>선택</span>|시리즈명| |this.index|`number`|<span class='optional'>선택</span>|시리즈 인덱스| |this.data|`array`|<span class='optional'>선택</span>|시리즈의 데이터| |this.xData|`array`|<span class='optional'>선택</span>|시리즈의 x축 데이터| |this.yData|`array`|<span class='optional'>선택</span>|시리즈의 y축 데이터| |this.dataMax|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최대 값| |this.dataMin|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최소 값| ### Example ```javascript myChart.setEvents({ seriesMouseOver: function(event) { console.log(\"seriesMouseOver\"); } }); myChart.setEventListener(\"seriesMouseOver\", function(event){ console.log(\"seriesMouseOver\"); }); myChart.setOptions({ events : { seriesMouseOver: function(event) { console.log(\"seriesMouseOver\"); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/seriesMouseOver.html"
      },
      {
        "cid": 301,
        "sid": "seriesShow",
        "name": "seriesShow",
        "label": "seriesShow",
        "data": {
          "body": "> 시리즈에서 숨김에서 보임으로 변경되는 시점에 발생하는 이벤트입니다. ### Info |Name|Type|Required|Description| |---|-----|---|-------------| |event|`object`|<span class='optional'>선택</span>|이벤트 인자 객체| |type|`string`|<span class='optional'>선택(show)</span>|이벤트 타입| ### Context Info |Name|Type|Required|Description| |---|-----|---|-------------| |this|`object`|<span class='optional'>선택</span>|시리즈 속성| |this.<hi>name|`string`|<span class='optional'>선택</span>|시리즈명| |this.index|`number`|<span class='optional'>선택</span>|시리즈 인덱스| |this.data|`array`|<span class='optional'>선택</span>|시리즈의 데이터| |this.xData|`array`|<span class='optional'>선택</span>|시리즈의 x축 데이터| |this.yData|`array`|<span class='optional'>선택</span>|시리즈의 y축 데이터| |this.dataMax|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최대 값| |this.dataMin|`number`|<span class='optional'>선택</span>|시리즈의 데이터에서 최소 값| ### Example ```javascript myChart.setEvents({ seriesShow: function(event) { console.log(\"seriesShow\"); } }); myChart.setEventListener(\"seriesShow\", function(event){ console.log(\"seriesShow\"); }); myChart.setOptions({ events : { seriesShow: function(event) { console.log(\"seriesShow\"); } } }) ``` ### Since |version|desc| |---|---| |7.3.0.0||",
          "since": "|version|desc||---|---||7.3.0.0||"
        },
        "url": "docs/event/seriesShow.html"
      }
    ]
  }
];
