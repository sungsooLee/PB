var IBLANG = {
    "kr" : {
        "chart" : {
            "thousandsSep" : ",",
            "contextButtonTitle": "보조메뉴",
            "decimalPoint": ".",
            "downloadJPEG": "JPEG 이미지로 다운받기",
            "downloadPDF": "PDF 문서로 다운받기",
            "downloadPNG": "PNG 이미지로 다운받기",
            "downloadSVG": "SVG vector 이미지로 다운받기",
            "drillUpText": "{series.name}로 돌아가기",
            "invalidDate": "",
            "loading": "조회중...",
            "months": [ "1월" , "2월" , "3월" , "4월" , "5월" , "6월" , "7월" , "8월" , "9월" , "10월" , "11월" , "12월"],
            "noData": "표시할 데이터가 없습니다.",
            "numericSymbols": [ "k" , "M" , "G" , "T" , "P" , "E"],
            "printChart": "프린터로 출력",
            "resetZoom": "확대 초기화",
            "resetZoomTitle": "1:1 크기로 돌아가기",
            "shortMonths": [ "1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9" , "10" , "11" , "12"],
            "shortWeekdays": ["일", "월", "화", "수", "목", "금", "토"],
            "weekdays": ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
        },
        "alert" : {
            "createIBChartId" : "차트 id 값이 잘못되었습니다!",
            "chartProperties" : "속성(옵션) 값이 잘못되었습니다!",
            "chartNoData" : "데이터를 입력해주세요!",
            "chartData" : "데이터가 잘못되었습니다!",
            "chartNoLoad" : "${0} 차트가 로드 되지않았습니다!",
            "plugin" : "현재 객체의 플러그인을 확인 해주세요.",
            "pluginLoading" : "${0} 파일을 추가 해주세요.",
            "eventListenerType": "이벤트 종류를 확인해주세요.",
            "eventListenerFunc": "이벤트 함수를 확인해주세요.",
            "chartNoIndex" : "인덱스를 입력해주세요!",
            "chartIndex" : "인덱스가 잘못되었습니다!",
            "series" : "${0} 시리즈가 잘못 되었습니다!",
            "noSeries" : "${0} 시리즈가 없습니다!",
            "variableRequired" : "${0} 값은 필수 입니다.",
            "variableInteger" : "${0} 값은 정수여야 합니다.",
            "variableFloat" : "${0} 값은 실수여야 합니다.",
            "variableString" : "${0} 값은 문자열이어야 합니다.",
            "variableLessThen" : "${0}값은 ${1}값보다 작아야합니다.",
            "variableGreaterThen" : "${0}값은 ${1}값보다 커야합니다.",
            "variableEpual" : "${0}값은 ${1}값과 같아야합니다.",
            "noMessage" : "알림 메시지를 입력해주세요!"
        },
        "text" : {
            "productName" : "[IBChart]",
            "referenceSite" : "\n참고 사이트 : http://www.ibsheet.com/ibchart/",
            "legend" : "범례"
        }
    },
    "en" : {
        "chart" : {
            "thousandsSep" : ",",
            "contextButtonTitle": "Chart context menu",
            "decimalPoint": ".",
            "downloadJPEG": "Download JPEG image",
            "downloadPDF": "Download PDF document",
            "downloadPNG": "Download PNG image",
            "downloadSVG": "Download SVG vector image",
            "drillUpText": "Back to {series.name}",
            "invalidDate": "",
            "loading": "Loading...",
            "months": [ "January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"],
            "noData": "No data to display",
            "numericSymbols": [ "k" , "M" , "G" , "T" , "P" , "E"],
            "printChart": "Print chart",
            "resetZoom": "Reset zoom",
            "resetZoomTitle": "Reset zoom level 1:1",
            "shortMonths": [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
            "shortWeekdays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "weekdays": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        },
        "alert" : {
            "createIBChartId" : "Chart id value is wrong!",
            "chartProperties" : "Properties(options) is wrong!",
            "chartNoData" : "Please enter data!",
            "chartData" : "Data is wrong!",
            "chartNoLoad" : "${0} chart not loaded!",
            "plugin" : "Please check the plugin of this object.",
            "pluginLoading" : "Please import ${0} file.",
            "eventListenerType": "Please check the event type.",
            "eventListenerFunc": "Please check the event function.",
            "chartNoIndex" : "Please enter index value!",
            "chartIndex" : "Index is wrong!",
            "series" : "${0} Series is worng!",
            "noSeries" : "No data series(${0})!",
            "variableRequired" : "${0} value is required.",
            "variableInteger" : "${0} value must be integer.",
            "variableFloat" : "${0} value must be float.",
            "variableString" : "${0} value must be string.",
            "variableLessThen" : "${0} value must be less than the ${1} value.",
            "variableGreaterThen" : "${0} value must be greater than the ${1} value.",
            "variableEpual" : "${0} value shall be equal to ${1} value.",
            "noMessage" : "Please enter alert message!"
        },
        "text" : {
            "productName" : "[IBChart]",
            "referenceSite" : "\nreference site : http://www.ibsheet.com/ibchart/",
            "legend" : "legend"
        }
    }
};

function createIBChart(cont, id, opt) {
    var obj = {};

    if(typeof opt !== "undefined" && typeof opt === "object") {
        obj = opt;
    }

    obj["cont"] = cont;
    obj["id"] = id;

    window[obj["id"]] = IBChart(obj);
}




/*
    sheet2chart()  함수   : 시트8의 내용을 차트로 만들어 줌. (공통js 에 넣어 사용 할 것.)
    params 내부 변수
    datadirection : 데이터를 만들기 위해 시트의 내용을 읽어들이는 방향(vertical/horizontal 중 선택, default : vertical  )
    labeldirection : x축 레이블을 읽어 들이는 방향(vertical/horizontal 중 선택, default : vertical  )
    datarowcol : 데이터를 읽어들일 컬럼 혹은 로우,읽어들이는 방향이 vertical인 경우에는 col
                        ,horizontal인 경우에는 row를 배열형식으로 넣는다.(필수)
    labelrowcol : x축 레이블이 될 행이나 열. 하나만 선택 한다.
    startdatarowcol : 데이터가 될 시작 행 객체 혹은 열 이름(default : 첫번째 행/열)
    enddatarowcol : 데이터가 될 마지막 행 객체 혹은 열 이름(default : 마지막 행/열)
    startlabelrowcol : x축 레이블이 될 첫번째 행 객체나 열 이름
    endlabelrowcol : x축 레이블이 될 마지막 행 객체이나 열 이름
    legendtitle : 범례 타이틀 (default:범례)
    legendseriesname : 범례에 나올 시리즈별 이름 (배열형식] datarowcol 의 개수와 동일해야 함.)
    주의 : startlabelrowcol,endlabelrowcol,labelrowcol 중에 하나만 없어도 x축 레이블은 안만들어 진다.
*/
function SHEET2CHART(sheet, chart, params){
    
    function parseChartDataFromSheet(sheet, chart, params, proPivot) {
        var datadirection       = "vertical",
            labeldirection      = "vertical",
            datarowcol,
            labelrowcol,
            startdatarowcol,
            enddatarowcol,
            startlabelrowcol,
            endlabelrowcol,
            legendtitle         = "범례",
            legendseriesname,
            seriestype          = [];
    
        function arrayPivot(arr) {
            var res = [],
                c,
                r,
                clen,
                rlen;
        
            for(c = 0, clen = arr[0].length; c < clen; c++) {
                var temp = "";
            
                for(r = 0, rlen = arr.length; r < rlen; r++) {
                    temp += arr[r][c]+"‡";
                }
            
                temp = temp.substring(0, temp.length - 1);
                res.push(temp.split("‡"));
            }
    
            return res;
        }
    
        //각 변수들 초기화 및 필수 요소 검사
            
        //기본값 확인
        if (params.datadirection == "vertical" || params.datadirection == "horizontal") {
            datadirection = params.datadirection;
        }
    
        if (params.labeldirection == "vertical" || params.labeldirection == "horizontal") {
            labeldirection = params.labeldirection;
        }
    
        if (typeof params.datarowcol == "undefined") {
            alert("datarowcol 변수는 필수 입니다");
            return;
        } else {
            datarowcol = params.datarowcol;
        }
    
        if (typeof params.startdatarowcol =="undefined") {
            if (datadirection == "vertical") {
                startdatarowcol = sheet.getFirstRow();
            } else {
                startdatarowcol = sheet.getFirstCol();
            }
        } else {
            startdatarowcol = params.startdatarowcol;  
            if (startdatarowcol.tagName != "I" && !(sheet.getCols().indexOf(startdatarowcol)>-1)) {
                alert("startdatarowcol 변수의 값은 시트의 행 객체이거나 열 이름 이어야 합니다.");
                return;
            }
        }
        
        if(typeof params.enddatarowcol == "undefined") {
            if (datadirection == "vertical") {
                enddatarowcol = sheet.getLastRow();
            } else {
                enddatarowcol = sheet.getLastCol();
            }
        } else {
            enddatarowcol = params.enddatarowcol;  
            
            if (startdatarowcol.tagName != "I" && !(sheet.getCols().indexOf(startdatarowcol)>-1)) {
                alert("enddatarowcol 변수의 값은 시트의 행 객체이거나 열 이름 이어야 합니다.");
                return;
            }
        }
    
        if (typeof params.legendtitle != "undefined") {
            legendtitle = params.legendtitle;
        }
    
        var useSeriesName = false;
        if (typeof params.legendseriesname != "undefined") {
            legendseriesname = params.legendseriesname;
        
            if (legendseriesname.length == datarowcol.length) {
                useSeriesName = true;
            } else {
                alert("시리즈의 개수와 범례 타이틀의 개수가 일치하지 않습니다.\ndatarowcol변수와 legendseriesname변수의 값을 확인해 주세요.");
            }
        }
    
        var seriestypestart = 0,
            seriestypeloop  = 0,
            useXlabel = false,
            i;
    
        if (typeof params.seriestype != "undefined") {
            seriestype = params.seriestype;
            seriestypestart = params.seriestype.length;
        
            if (params.seriestype.length < datarowcol.length) {
                seriestypeloop = datarowcol.length;
            }
    
            for (i = seriestypestart; i < seriestypeloop; i++) {
                seriestype[i] = "line";
            }
        }
    
        labelrowcol = params.labelrowcol;
        startlabelrowcol = params.startlabelrowcol;
        endlabelrowcol = params.endlabelrowcol;
    
        if (typeof labelrowcol != "undefined" && typeof startlabelrowcol != "undefined" &&
                typeof endlabelrowcol != "undefined") {
            useXlabel  = true;
        }
        //각 변수들 초기화 및 필수 요소 검사  끝
            
        //sheet로부터 필요한 xml 생성
        var data            = [],
            seriesname      = null,
            xaxislabel      = null,
            datarowcolArr   = datarowcol,
            rowcol          = 0,
            len             = datarowcolArr.length;
    
        for (rowcol = 0; rowcol < len; rowcol++) {
            if (datadirection == "vertical") {
                //세로로 열을 읽어들여 2차원 배열 생성
                var tempData = GetRangeText8(sheet, startdatarowcol,datarowcolArr[rowcol],enddatarowcol,datarowcolArr[rowcol]);
    
                tempData = tempData.split(",").join("");
                data.push(tempData.split("^"));    
            } else {
                //가로로 행을 읽어들여 2차원 배열 생성
                var tempData = GetRangeText8(sheet, datarowcolArr[rowcol],startdatarowcol,datarowcolArr[rowcol],enddatarowcol);
    
                tempData = tempData.split(",").join("");
                data.push(tempData.split("|"));
            }
        }
    
        seriesname = legendseriesname;
        if (useXlabel) {
            if (labeldirection == "vertical") {
                xaxislabel = GetRangeText8(sheet,startlabelrowcol,labelrowcol,endlabelrowcol,labelrowcol).split("^");
            } else {
                xaxislabel = GetRangeText8(sheet,labelrowcol,startlabelrowcol,labelrowcol,endlabelrowcol).split("|");
            }
        }
    
        return [useXlabel, xaxislabel, useSeriesName, seriesname, seriestype, (!proPivot)?arrayPivot(data):data];
    }
    
    var pdata           = parseChartDataFromSheet(sheet, chart, params),
        i               = 0,
        x               = 0,
        alen            = 0,
        dlen            = 0,
        useXlabel,
        xaxislabel,
        useSeriesName,
        seriesname,
        seriestype,
        data,
        loadData        = {
            IBChart : {
                Data : []
            }
        };
   
    if (typeof pdata === "undefined") {
        return;
    }
 
//  PrintArray(data);
 
    useXlabel     = pdata[0];
    xaxislabel    = pdata[1];
    useSeriesName = pdata[2];
    seriesname    = pdata[3];
    seriestype    = pdata[4];
    data          = pdata[5];
 
    for (i = 0, dlen = data.length; i < dlen; i++) {
        var rowData = {};
 
        if (useXlabel) {
            rowData.AxisLabel = xaxislabel[i];
        }
 
        rowData.Series = [];
 
        for (x = 0, alen = data[i].length; x < alen; x++){
            var sdata = {};
 
            if (useSeriesName) {
                if (i == 0) {
                    sdata.SeriesName = seriesname[x];
 
                    if (typeof seriestype[x] !== "undefined") {
                        sdata.SeriesType = seriestype[x];
                    }
                }
            }
 
            sdata.PointName = xaxislabel[i];
            sdata.Value = data[i][x];
 
            rowData.Series.push(sdata);
        }
 
        loadData.IBChart.Data.push(rowData);
    }
 
    // alert(JSON.stringify(loadData));
       
    // chart에 xml을 로딩
    chart.loadSearchData(loadData,{append:true});   
}
 
 
function GetRangeText8(sheetobj, srow, scol, erow, ecol, coldeli, rowdeli) {
    var rtnStr = "",
        r,
        c;
 
    // if (isNaN(srow)) {
    //     alert("srow인자는 정수여야 합니다.");
    //     return;
    // }
 
    // if (isNaN(erow)) {
    //     alert("erow인자는 정수여야 합니다.");
    //     return;
    // }
 
    // if (isNaN(scol)) {
    //     alert("scol인자는 정수여야 합니다.");
    //     return;
    // }
 
    // if (isNaN(ecol)) {
    //     alert("ecol인자는 정수여야 합니다.");
    //     return;
    // }
 
    // if (srow > erow) {
    //     alert("srow값은 erow 값보다 작아야 합니다.");
    //     return;
    // }
 
    // if (scol > ecol) {
    //     alert("scol값은 ecol 값보다 작아야 합니다.");
    //     return;
    // }
   
    if (coldeli == "" || typeof coldeli == "undefined" || coldeli == null) {
        coldeli = "|";
    }
 
    if(rowdeli == "" || typeof rowdeli == "undefined" || rowdeli == null) {
        rowdeli = "^";
    }
    r = srow;
    do{
        var cols = sheetobj.getCols();
        var scidx = cols.indexOf(scol);
        var colcnt = cols.indexOf(ecol) - scidx;
        cols = cols.splice(scidx,colcnt+1);
        for (var c=0;c<cols.length;c++) {
            rtnStr += sheetobj.getValue(r,cols[c]) + coldeli;
           
            if (cols[c] == ecol) {
                rtnStr = rtnStr.substring(0, rtnStr.length - 1);
            }
        }
 
        rtnStr += rowdeli;
 
       if (r == erow) {
            rtnStr = rtnStr.substring(0, rtnStr.length - 1);
            break;
        }else{
            r = sheetobj.getNextRow(r);
        }
        
        if(!r || r == sheetobj.getLastRow() ){
            rtnStr = rtnStr.substring(0, rtnStr.length - 1);
            break;
        }

    }while(1);


 
    return rtnStr;
}

//<script type="text/javascript" src="https://unpkg.com/canvg@3.0.4/lib/umd.js"></script> 필요
function downChart2Image(chart,fn){
    //svg를 감싸고있는 container가져옴.
    var svgText = chart.getSVGString();

    //캠버스를 만들자
    var can = document.createElement("canvas");
    can.id = "canvas";
    document.body.appendChild(can);

    fn = (fn.length - fn.toLowerCase().lastIndexOf(".png"))==4?fn:fn+".png";
    
    var myCanvas = document.getElementById("canvas");

    //캠버스의 크기를 svg와 동일하게 하자.
    myCanvas.width = $("#container").width();
    myCanvas.height = $("#container").height();


    var opt = {
        "renderCallback": function () {

            if (myCanvas.msToBlob) { //for IE
                var blob = myCanvas.msToBlob();
                window.navigator.msSaveBlob(blob, fn);

            } else {
                //a tag를 생성해서 다운로드 하자
                var aa = document.createElement("a");
                aa.id = "btnDownload";
                document.body.appendChild(aa);
                document.getElementById("btnDownload").href = document.getElementById('canvas')
                    .toDataURL();
                document.getElementById("btnDownload").download = fn;
                document.getElementById("btnDownload").click();
                document.body.removeChild(aa);
            }


            //캠버스 지우자.
            document.body.removeChild(can);
        },
        "ignoreMouse": true,
        "ignoreAnimation": true
    };
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    v = canvg.Canvg.fromString(ctx, svgText);

    // Start SVG rendering with animations and mouse handling.
    v.start();
    //        //load a svg snippet in the canvas with id = 'drawingArea'
    //      canvg("canvas", svgText  ,opt);


    if (myCanvas.msToBlob) { //for IE
        var blob = myCanvas.msToBlob();
        window.navigator.msSaveBlob(blob, fn);

    } else {
        //a tag를 생성해서 다운로드 하자
        var aa = document.createElement("a");
        aa.id = "btnDownload";


        document.body.appendChild(aa);



        document.getElementById("btnDownload").href = document.getElementById('canvas').toDataURL();
        document.getElementById("btnDownload").download = fn;
        document.getElementById("btnDownload").click();
        document.body.removeChild(aa);
    }


    //캠버스 지우자.
    document.body.removeChild(can);


}