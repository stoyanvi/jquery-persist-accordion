var addHTMLelement;

(function($) {

    /*** Accordion Toggle Panels ***/

    $.togglePanels = function(element, options) {

        var defaults = {

            user: '#user01',
            titleElement: 'h3',
            panelElement: '.panel',
            userClass: 'user',
            userPanelClass: 'user-panel',
            toggleIconClass: 'toggle-icon',
            toggleIconOpenText: '+',
            toggleIconCloseText: '-',
            toggleButtonClass: 'toggle-panels-button',
            toggleButtonOpenText: 'Open All Panels',
            toggleButtonCloseText: 'Close All Panels',
            expandedClass: 'expanded',
            accordionSpeed: 200
        }

        var base = this;

        base.settings = {}

        var $element = $(element),
             element = element,
             toggleButton,
             toggleIcon,
             $toggleTitle,
             $allPanels;

        base.init = function() {

            base.settings = $.extend({}, defaults, options);

            toggleIcon = '<span class="' + base.settings.toggleIconClass + '">+</span>';

            toggleButton = '<a href="#" class="' + base.settings.toggleButtonClass + '">' + base.settings.toggleButtonOpenText + '</a>';

            $element.before($(toggleButton));

            $element.addClass('processed');

            $toggleTitle = $element.find(base.settings.titleElement);

            $toggleTitle.not($(base.settings.user + ' ' + base.settings.titleElement)).after($(toggleIcon));

            $(base.settings.user).prependTo($element);
            $(base.settings.user).addClass(base.settings.userClass);
            $(base.settings.user + ' ' + base.settings.panelElement).addClass(base.settings.userPanelClass).show();

            $allPanels = $element.find(base.settings.panelElement);

            $toggleTitle.add($('.' + base.settings.toggleIconClass)).click(function() {
 
                var $panel = $(this).parent().children(base.settings.panelElement);

                togglePanels($panel);
            });

            $('.' + base.settings.toggleButtonClass).click(function(e) {

                e.preventDefault();

                togglePanels($allPanels);
            });
        }

        var togglePanels = function(el) {

            if (el.is(':hidden')) {

                el.parent().addClass(base.settings.expandedClass);

                el.slideDown(base.settings.accordionSpeed, function() {

                    $(this).parent().children('.' + base.settings.toggleIconClass).addClass(base.settings.expandedClass).html(base.settings.toggleIconCloseText);
                    checkPanels();
                });

            } else {

                el.not($('.' + base.settings.userPanelClass)).slideUp(base.settings.accordionSpeed, function() {

                    el.parent().removeClass(base.settings.expandedClass);
                    $(this).parent().children('.' + base.settings.toggleIconClass).removeClass(base.settings.expandedClass).html(base.settings.toggleIconOpenText);
                    checkPanels();
                });
            }
        }

        var checkPanels = function() {

            var total = $element.find(base.settings.panelElement).length;
            var totalVisible = $element.find(base.settings.panelElement + ':visible').length;

            if (totalVisible > 1 && totalVisible < total) {

                $('.' + base.settings.toggleButtonClass).removeClass(base.settings.expandedClass).html(base.settings.toggleButtonOpenText);

            } else if (totalVisible === total) {

                $('.' + base.settings.toggleButtonClass).addClass(base.settings.expandedClass).html(base.settings.toggleButtonCloseText);
            }
        }

        base.init();
    }

    $.fn.togglePanels = function(options) {

        return this.each(function() {

            if (undefined == $(this).data('togglePanels')) {

                var togglePanels = new $.togglePanels(this, options);
                $(this).data('togglePanels', togglePanels);
            }
        });
    }

    /*** / Accordion Toggle Panels ***/

})(jQuery);