(function($) {
  /**
   * Overrides Drupal.admin.behaviors.hover().
   */
  Drupal.admin.behaviors.hover = function (context, settings, $adminMenu) {
    var allowClick = true;

    // Clicks open and close sections as well as hover.
    $('li.expandable span', $adminMenu).on('click', function(event) {
      if (allowClick === true) {
        var uls = $('~ ul', this);
        if (uls[0].style.display == 'block') {
          uls.css({display: 'none'});
        } else {
          uls.parent().trigger('mouseenter');
        }
      }
    });

    // Delayed mouseout.
    $('li.expandable', $adminMenu).hover(
      function (event) {
        if (allowClick === true) {
          // Stop the timer.
          clearTimeout(this.sfTimer);
          // Display child lists.
          var uls = $('> ul', this);
          uls.css({left: 'auto', display: 'block'});
          // Immediately hide nephew lists.
          uls.parent().siblings('li').children('ul').css({display: 'none'});
         // Sometimes child lists arent hidden correctly.
          uls.find('ul').css({display: 'none'});
          // Close other top level menus and their decedents
          // uls.parents('ul', $adminMenu).siblings('ul').find('ul').css({display: 'none'});
          // Hide child lists
          uls.find('ul').css({display: 'none'});

          allowClick = false;
          setTimeout(function() {
            allowClick = true;
          }, 0);
        }
      },
      function (event) {
        // Start the timer.
        if (allowClick === true) {
        var uls = $('> ul', this);
          uls.css({display: 'none'});
        }
        // this.sfTimer = setTimeout(function () {
        //   uls.css({display: 'none'});
        // }, 400);
        // return false;
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
