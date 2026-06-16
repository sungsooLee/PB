<%@page contentType="text/html; character=UTF-8" pageEncoding="UTF-8"%>
<%
	final long time = System.currentTimeMillis();
%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>🥇자산관리 영업지원 App🥇</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<jsp:include page="./includes.jsp" />
	<script>
		console.log('init : ', "<%= request.getAttribute("activeProfile") %>");

		window.APP_ENV = {
			profile : "<%= request.getAttribute("activeProfile") %>"
		};

		ibleaders.license = ( window.APP_ENV.profile === 'dev'
				   			|| window.APP_ENV.profile === 'local')? Const.CHART_LISENCE.DEV : Const.CHART_LISENCE.PRD;
	</script>
</head>
<body>
    <jsp:include page="./layout/layout.jsp" />
	<jsp:include page="./modal.jsp" />
</body>
</html>
