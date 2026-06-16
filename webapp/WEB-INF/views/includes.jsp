<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<%
	final long time = System.currentTimeMillis();
%>
<script src="${pageContext.request.contextPath}/resources/plugins/jquery/jquery.min.js"></script>
<%-- [plugins] --%>
<%-- micromodal --%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/plugins/micromodal/0.4.10/micromodal.css">
<script src="${pageContext.request.contextPath}/resources/plugins/micromodal/0.4.10/micromodal.min.js"></script>
<%-- sortable --%>
<script src="${pageContext.request.contextPath}/resources/plugins/sortable/1.15.2/Sortable.min.js"></script>
<%-- sweetalert2 --%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/plugins/sweetalert2/11.11.0/sweetalert2.min.css">
<script src="${pageContext.request.contextPath}/resources/plugins/sweetalert2/11.11.0/sweetalert2.min.js"></script>
<%-- swiper --%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/plugins/swiper/11.1.1/swiper-bundle.min.css">
<script src="${pageContext.request.contextPath}/resources/plugins/swiper/11.1.1/swiper-bundle.min.js"></script>
<%-- tippy --%>
<script src="${pageContext.request.contextPath}/resources/plugins/popper.js/2.11.8/umd/popper.min.js"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/popper.js/2.11.8/umd/tippy-bundle.umd.min.js"></script>
<%-- toastr --%>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/plugins/toastr/2.1.4/toastr.min.css">
<script src="${pageContext.request.contextPath}/resources/plugins/toastr/2.1.4/toastr.min.js"></script>
<%-- jquery-ui --%>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/plugins/jquery-ui/jquery-ui.css">
<script src="${pageContext.request.contextPath}/resources/plugins/jquery-ui/jquery-ui.min.js"></script>

<%-- dropzone --%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/plugins/dropzone/5.9.3/dropzone.min.css">
<script src="${pageContext.request.contextPath}/resources/plugins/dropzone/5.9.3/dropzone.min.js"></script>
<%-- highlight --%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/plugins/highlight.js/11.9.0/styles/vs2015.min.css">
<script src="${pageContext.request.contextPath}/resources/plugins/highlight.js/11.9.0/highlight.min.js"></script>

<%-- pinch-zoom --%>
<script src="${pageContext.request.contextPath}/resources/plugins/pinch-zoom/pinch-zoom.umd.js"></script>
<%-- //[plugins] --%>
<script src="${pageContext.request.contextPath}/resources/plugins/aos/3.0.0-beta.6/aos.js"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/jquery-ui-monthpicker-master/monthpicker.js"></script>
<script src="${pageContext.request.contextPath}/resources/plugins/jquery.touchswipe/1.6.19/jquery.touchSwipe.min.js"></script>

<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/ui-fonts.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/ui-variable.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/ui-default.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/ui-layout.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/ui-style.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/ui-content.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/ui-bscard.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/ui-plugins.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/ui-skeletone.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/ui-mediaquery.css">
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/plugins/aos/3.0.0-beta.6/aos.css">

<script src="${pageContext.request.contextPath}/resources/js/ui-script.js"></script>
<%--
<script src="${pageContext.request.contextPath}/resources/js/ui-temp.js"></script>
--%>

<%-- //ui source --%>
<script src="${pageContext.request.contextPath}/resources/ext/axios.js?time=<%=time%>"></script>
<script src="${pageContext.request.contextPath}/resources/ext/lodash.js?time=<%=time%>"></script>
<script src="${pageContext.request.contextPath}/resources/ext/eruda.js?time=<%=time%>"></script>
<script src="${pageContext.request.contextPath}/resources/ext/dayjs.min.js?time=<%=time%>"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/ApiUtils.js?time=<%=time%>"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/CmmUtils.js?time=<%=time%>"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/EnvUtils.js?time=<%=time%>"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/NativeUtils.js?time=<%=time%>" type="module"></script>
<script src="${pageContext.request.contextPath}/resources/js/common/Log.js?time=<%=time%>"></script>
<script src="${pageContext.request.contextPath}/resources/js/const/Const.js?time=<%=time%>"></script>
<%--
<script type="module" src="${pageContext.request.contextPath}/resources/ext/page.mjs?time=<%=time%>"></script>
--%>
<script type="module" src="${pageContext.request.contextPath}/resources/js/app.js?time=<%=time%>"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common.css?time=<%=time%>">
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/loading_tmp.css?time=<%=time%>">

<%-- ibChart --%>
<script src="${pageContext.request.contextPath}/resources/ext/highcharts/highcharts.js"></script>
<script src="${pageContext.request.contextPath}/resources/ext/ibleaders.js?time=<%=time%>"></script>
<script src="${pageContext.request.contextPath}/resources/ext/ibchartinfo.js"></script>
<script src="${pageContext.request.contextPath}/resources/ext/ibchart.js"></script>
<%--  //ibChart --%>

<%--  pdfJs type="module" --%>
<script src="${pageContext.request.contextPath}/resources/js/pdfJs/build/pdf.js?time=<%=time%>" type="module"></script>
<%--  //pdfJs --%>
<%-- <script type='text/javascript' src='${pageContext.request.contextPath}/resources/js/pdfviewer/rsc/build/jquery-3.4.1.min.js'></script> --%>
<script type='text/javascript' src='${pageContext.request.contextPath}/resources/js/pdfviewer/rsc/build/puser.js'></script>

<script src="${pageContext.request.contextPath}/resources/js/common/html2canvas.js"></script>

<link rel="icon" href="data:'base64,=">