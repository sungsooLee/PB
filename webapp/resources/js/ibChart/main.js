/* globals MARKDOWN_TOC_DATA, IBTocManager */
(function () {
    var tocManager;

    // ========== 리스트 컨트롤 ==========
    function getListCtrlBtnRole(bool) {
        var prefix = bool ? 'show' : 'hide';
        return prefix + 'ListNumber';
    }

    var $liCtrlBtns = $('.btn-group.li-type button');

    function updateListCtrlBtns(bool) {
        if (_.isNil(bool)) {
            bool = tocManager.listNumber;
        }
        var role = getListCtrlBtnRole(bool);
        var $activatedBtn = $liCtrlBtns.filter('.active');
        var prevRole;
        if ($activatedBtn.length) {
            prevRole = $activatedBtn.attr('data-role');
        }
        if (role === prevRole) {
            return false;
        }
        if ($activatedBtn.length) {
            $activatedBtn.removeClass('active');
        }
        $liCtrlBtns.filter('[data-role="' + role + '"]').addClass('active');
        return true;
    }

    // ========== 트리 컨트롤 ==========
    var $treeBtns = $('.btn-group.tree button');

    function updateTreeCtrlBtns(status) {
        if (_.isNil(status)) {
            status = tocManager.groupStatus;
        }
        $treeBtns.filter('.active').removeClass('active');
        if (status !== 'custom') {
            $treeBtns.filter('[data-role="' + status + '"]').addClass('active');
        }
        return status;
    }

    function setGroupStatus(status) {
        var prevStatus = tocManager.groupStatus;

        if (prevStatus === 'autoCollapse' && status === 'autoCollapse') {
            status = 'custom';
        }

        tocManager.groupStatus = status;
        return status;
    }

    var $tocBtns = $('.btn-group button');
    $tocBtns.each(function (ndx, el) {
        $(el).on('click', function (evt) {
            evt.preventDefault();
            var $btn = $(evt.target);
            var role = $btn.attr('data-role');

            // eslint-disable-next-line default-case
            switch (role) {
                case 'default':
                case 'expandAll':
                case 'collapseAll':
                case 'autoCollapse':
                setGroupStatus(role);
                return;
                case 'hideListNumber':
                case 'showListNumber':
                tocManager.listNumber = (role === 'showListNumber');
            }
        });
    });

    // ========== INPUT_GROUP ==========
    var filterOptions = {};

    var $inputGroup = $('.controls-wrapper .input-group');
    $inputGroup.find('input').on('change', function (evt) {
        var value = _.trim(evt.target.value);
        var $group = $(evt.target).parents('.input-group');
        var role = $group.attr('data-role');
        filterOptions[role] = value;
        tocManager.filter(filterOptions);

        if (value.length) {
            $group.addClass('active');
        } else {
            $group.removeClass('active');
        }
        var findItem = document.querySelector('mark');
        if (findItem) {
            var url = findItem.parentElement.parentElement.parentElement.getAttribute('data-url');
        }
    });
    $inputGroup.find('button.cancel').on('click', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var $group = $(evt.target).parents('.input-group');
        var role = $group.attr('data-role');
        var $input = $group.find('input');
        if (_.has(filterOptions, role)) {
            delete filterOptions[role];
        }
        $input.val('');
        tocManager.filter(filterOptions);
        $group.removeClass('active');
    });


    // ========== SEND MESSAGE ==========
    var postIframeMessage = function (msg) {
        var iframe = document.getElementById('contentFrame');
        if (!_.isNil(iframe)) {
            // console.log('send message:', msg);
            iframe.contentWindow.postMessage(msg, '*');
        }
    };

    $(document).ready(function () {
        $('#contentFrame').on('load', function () {
            var msg = $inputGroup.find('#bodyInput').val();
            if (msg.length) {
                postIframeMessage(msg);
            }
            // 20190826 shkim - 포커스를 항상 input에 둠
            document.getElementById('titleInput').focus();

            // 20200810 허예진 - [#27] 브라우저의 너비가 작을 때 콘텐츠가 줄바꿈 되지 않는 문제 수정
            var CONTENT_TITLE = $('#contentFrame').contents().find('.markdown-body>h1');
            CONTENT_TITLE.wrapInner("<span class='titleWrap'></span>").closest();
            CONTENT_TITLE.append($('<span/>',{class: 'titleTip', text: CONTENT_TITLE[0].innerText}));

            var TEXT_WRAP = $('#contentFrame').contents().find('.markdown-body .titleWrap');
            $(TEXT_WRAP).on('mouseover', function (evt) {
                CONTENT_TITLE.find('.titleTip').css({
                    left: evt.pageX,
                    top: evt.pageY,
                });
            });
        });
    });


    // ========== TOC MANAGER ==========
    var LABEL_TEXT = '>.label>.text-wrap>.text';
    tocManager = new IBTocManager({
        data: MARKDOWN_TOC_DATA,
        elementId: 'toc-wrapper',
        groupCountBadge: true,
        groupNumber: false,
        listNumber: true,
        // default, autoCollapse, expandAll, collapseAll
        groupStatus: 'default',
        contentFrame: {
            id: 'contentFrame',
            name: 'contentFrame',
        },
    }).create()
        .on('created', function (evt) {
            updateListCtrlBtns();
            updateTreeCtrlBtns();
        })
        .on('changeListNumber', function (evt) {
            updateListCtrlBtns(evt.value);
        })
        .on('changeGroupStatus', function (evt) {
            updateTreeCtrlBtns(evt.value);
        })
        .on('filterMatchedTitle', function (evt) {
            var $elem = evt.target.$element;
            var keyword = evt.options.title;
            $elem.find(LABEL_TEXT).mark(keyword);
        })
        .on('clearFilter', function (evt) {
            _.forEach(evt.data, function (item) {
                item.$element.find(LABEL_TEXT + '>mark')
                .parent().unmark();
            });
            postIframeMessage(null);
        })
        .on('filtered', function (evt) {
            var opts = evt.data.options;

            // 20190826 shkim - 첫번째 찾은 아이템으로 이동
            if (evt.data.items.length) {
                var url = evt.data.items[0].$element.children().attr('data-url');
                var cframe = document.getElementById('contentFrame').contentWindow || document.getElementById('contentFrame').contentDocument;
                cframe.gotoByURL(url);
            }

            if (_.has(opts, 'body')) {
                postIframeMessage(opts.body);
            }
        });

    // [#13] sidebar의 글자에 tooltip 설정
    $(document).ready(function () {
        $('.link-item').on('mouseover', function (evt) {
            $('.tooltiptext').css({
                left: evt.pageX,
                top: evt.pageY
            });
            $('.tooltiptext').unmark();
        });
    });

    // [#13] $sidebar show/hide 토글형 버튼 추가
    var $sidebar = $('#sidebarWrapper'),
        $contents = $('#contents'),
        $dragbar = $('#dragbar'),
        $toggle = $('.toggle');
    var contentWidth = '';

    $toggle.on('click', function () {
        $('body').toggleClass('menu-folded');
        var sideWidth = $sidebar.css('width');

        if ($('body').hasClass('menu-folded')) {
            $sidebar.css({
                'margin-left': parseInt(sideWidth, 10) * (-1) + 'px',
                visibility: 'hidden'
            });
            $contents.css('width', '');
            $dragbar.css('left', '');
            $toggle.css('left', '');
        } else {
            $sidebar.css({
                'margin-left': '',
                visibility: ''
            });
            $contents.css('width', contentWidth);
            $dragbar.css('left', parseInt(sideWidth, 10) + 2 + 'px');
            $toggle.css('left', parseInt(sideWidth, 10) + 6 + 'px');
        }
    });

    // [#13] 너비조정 바 생성
    var folded = false;

    $dragbar.on('mousedown', function (evt) {
        evt.preventDefault();

        if (parseInt($sidebar.css('margin-left'), 10) < 0) folded = true;

        $(document).on('mousemove', function (evtParams) {
            $dragbar.css('left', evtParams.pageX + 'px');
            $contents.css('pointer-events', 'none');
        });
    });

    $dragbar.on('mouseup', function (evt) {
        evt.preventDefault();

        if (folded) {
            $('body').toggleClass('menu-folded');
            folded = false;
        }

        $(document).off('mousemove');

        var sidebarWidth = evt.pageX < 100 ? 100 : evt.pageX;
        if ((window.innerWidth - sidebarWidth) < 200) {
            contentWidth = 200;
            sidebarWidth = window.innerWidth - contentWidth - 10;
        } else {
            contentWidth = window.innerWidth - sidebarWidth - 10;
        }

        $sidebar.css({
            width: sidebarWidth + 'px',
            visibility: '',
            'margin-left': ''
        });
        $contents.css({
            width: contentWidth + 'px',
            'pointer-events': ''
        });
        $dragbar.css('left', sidebarWidth + 'px');
        $toggle.css('left', (sidebarWidth + 6) + 'px');
    });
}());
