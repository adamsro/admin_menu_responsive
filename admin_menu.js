(function($) {
  /**
   * Overrides Drupal.admin.behaviors.hover().
   */
  Drupal.admin.behaviors.hover = function (context, settings, $adminMenu) {

    // Clicks open and close menu sections.
    $('li.expandable span', $adminMenu).on('click', function(event) {
      var uls = $('~ ul', this);
      if (uls[0].style.display == 'block') {
        uls.css({display: 'none'});
      } else {
        uls.css({left: 'auto', display: 'block'});
        // Immediately hide nephew lists.
        uls.parent().siblings('li').children('ul').css({display: 'none'});
        // Sometimes child lists arent hidden correctly.
        uls.find('ul').css({display: 'none'});
        // Close other top level menus and their decedents
        uls.parents('ul', $adminMenu).siblings('ul').find('ul').css({display: 'none'});
      }
    });

    // Delayed mouseout.
    $('li.expandable', $adminMenu).hover(
      function (event) {
        if ($(window).width() >= 1024) {
          // Stop the timer.
          clearTimeout(this.sfTimer);
          // Display child lists.
          var uls = $('> ul', this);
          uls.css({left: 'auto', display: 'block'});
          // Immediately hide nephew lists.
          uls.parent().siblings('li').children('ul').css({display: 'none'});
        }
      },
      function (event) {
        if ($(window).width() >= 1024) {
          var uls = $('> ul', this);
          this.sfTimer = setTimeout(function () {
            uls.css({display: 'none'});
          }, 400);
        }
      }
    );

  };

/**
 * Apply 'position: fixed' as a class which will only take effect on larger screens.
 */
Drupal.admin.behaviors.positionFixed = function (context, settings, $adminMenu) {
  if (settings.admin_menu.position_fixed) {
    $adminMenu.addClass('admin-menu-position-fixed');
  }
};
})(jQuery);
