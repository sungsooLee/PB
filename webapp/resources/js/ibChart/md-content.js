function gotoByURL(url) {
    var parent = window.parent;
    if (!parent && !parent.toc) {
        return;
    }
    parent.toc.setContentByURL(url);
    }

    function setHashByURL(url) {
    var parent = window.parent;
    if (!parent && !parent.toc) {
        return;
    }
    parent.toc.setHashByURL(url);
    }

    $(document).ready(function () {
    var $body = $(document.body);
    window.addEventListener('message', function (evt) {
        var msg = evt.data;
        if (msg != null && msg.length) {
            $body.mark(msg);
        } else {
            $body.unmark(msg);
        }
    });

    // 뒤로가기가 제대로 적용 안되는 현상 수정
    var href = window.location.href;
    var aSrc = href.split('/docs');
    if (aSrc.length < 2) {
        return;
    }
    var url = 'docs' + aSrc.pop();
    // url = url.replace("#","");
    // gotoByURL(url);

    // 뒤로가기 시 스크롤이 제대로 유지 안되는 현상 수정
    setHashByURL(url);
});
