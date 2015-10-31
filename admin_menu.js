(function($) {
  /**
   * Overrides Drupal.admin.behaviors.hover().
   */
  Drupal.admin.behaviors.hover = function (context, settings, $adminMenu) {

    // Clicks open and close menu sections.
    $('li.expandable span', $adminMenu).on('click', function(event) {
      var $uls = $('~ ul', this);
      if ($uls[0].style.display == 'block') {
        $uls.css({display: 'none'}).parent().removeClass('open');
      } else {
        $(this).parent().addClass('open');
        $uls.css({display: 'block'});
        // Hide nephew lists.
        $uls.parent().siblings('li').children('ul')
        // Hide child lists.
        .add($uls.find('ul').css({display: 'none'}))
        // Hide other top level menus and their decedents.
        .add($uls.parents('ul', $adminMenu).siblings('ul').find('ul'))
        .css({display: 'none'}).parent().removeClass('open');
      }
    });

    // Delayed mouseout.
    $('li.expandable', $adminMenu).hover(
      function (event) {
        if ($(window).width() >= 1024) {
          // Stop the timer.
          clearTimeout(this.sfTimer);
          $(this).addClass('open');
          // Display child lists.
          $('> ul', this).css({display: 'block'})
          // Immediately hide nephew lists.
            .parent().siblings('li').children('ul').css({display: 'none'}).parent().removeClass('open');
        }
      },
      function (event) {
        if ($(window).width() >= 1024) {
          var $uls = $('> ul', this);
          this.sfTimer = setTimeout(function () {
            $uls.css({display: 'none'}).parent().removeClass('open');
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
