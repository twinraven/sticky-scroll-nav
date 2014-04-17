(function($) {
    var dom = {
            $window:    $(window),
            $html:      $('html'),
            $body:      $('body'),
            $nav:       $('.navbar--main')
        },
        scrollPos = 0,
        scrollDirection = undefined,
        lastDirection = undefined,
        isNavAnimating = false,
        navFadeTimeout,
        navHideTimeout,
        noAnim;

    function initNavigation() {
        $('#js-nav-open').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (dom.$html.hasClass('is-nav-open')) {

                dom.$html.removeClass('is-nav-open');

            } else {
                dom.$html.addClass('is-nav-open is-nav-visible');
            }
        });

        // when the sidenav is open, close it when the user clicks back on the page
        $('.content').on('click.openNav', function () {
            clearTimeout(navHideTimeout);

            if (dom.$html.hasClass('is-nav-visible')) {
                navHideTimeout = setTimeout(function () {
                    dom.$html.removeClass('is-nav-visible');
                }, 250);

                if (dom.$html.hasClass('is-nav-open')) {
                    dom.$html.removeClass('is-nav-open');
                }
            }
        });

        dom.$nav.addClass('is-down is-fixed');

        dom.$window.on('scroll.nav', $.throttle(16, function () {

            var lastPos = scrollPos,
                winScrollTop = dom.$window.scrollTop();

            // small fix for mac over-scrolling behaviour, which breaks the nav
            scrollPos = winScrollTop < 0 ? 0 : winScrollTop;

            clearTimeout(navFadeTimeout);

            if (winScrollTop === 0) {
                navFadeTimeout = setTimeout(function () { dom.$nav.addClass('is-at-top'); }, 250);
            }
            if (winScrollTop > dom.$nav.height() / 2) {
                dom.$nav.removeClass('is-at-top no-trans');
            }

            if (lastPos > scrollPos) {
                scrollDirection = -1;
            } else if (lastPos < scrollPos) {
                scrollDirection = 1;
            } else {
                scrollDirection = 0;
            }

            if (!isNavAnimating) {
                if (scrollDirection === -1 && !dom.$nav.hasClass('is-down')) {
                    isNavAnimating = true;
                    noAnim = false;

                    if (dom.$nav.offset().top > dom.$window.scrollTop()) {
                        dom.$nav.css('top', 0);
                        noAnim = true;
                        isNavAnimating = false;
                        dom.$nav.addClass('is-down is-fixed');
                    }

                    if (!noAnim) {
                        dom.$nav
                            .css({ 'top': (dom.$nav.offset().top < (dom.$window.scrollTop() - dom.$nav.height()) ? -dom.$nav.height() : -(dom.$window.scrollTop() - dom.$nav.offset().top)) })
                            .addClass('is-fixed')
                            .animate({'top': 0}, 250, 'easeOutQuad', function () {

                                isNavAnimating = false;
                                dom.$nav.addClass('is-down');
                            });
                    }
                }

                if (scrollDirection === 1 && dom.$nav.hasClass('is-down')) {
                    dom.$nav
                        .removeClass('is-down is-fixed')
                        .css({ 'top': dom.$window.scrollTop() - 2 });

                }
            }
        }));
    };

    $(function() {
        initNavigation();
    });
}(jQuery));