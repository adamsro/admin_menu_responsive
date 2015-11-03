(function($) {
  /**
   * Overrides Drupal.admin.behaviors.hover().
   */
  Drupal.admin.behaviors.hover = function(context, settings, $adminMenu) {
    var alreadyOpened = false;

    // Clicks open and close menu sections.
    $('li.expandable span', $adminMenu).on('click', function(event) {
      if ($(window).width() < 768) {
        var $uls = $(this).parent().siblings('ul');
        if ($uls.css('display') == 'block') {
          $uls.css({display: 'none'}).closest('li').removeClass('open');
        } else {
          $(this).closest('li').addClass('open');
          $uls.css({ display: 'block' });
          // Hide nephew lists.
          $uls.closest('li').siblings('li').children('ul')
            // Hide child lists.
            .add($uls.find('ul'))
            // Hide other top level menus and their decedents.
            .add($uls.parents('ul', $adminMenu).siblings('ul').find('ul'))
            .css({ display: 'none' }).closest('li').removeClass('open');
        }
      }
    });

    // Delayed mouseout.
    $('li.expandable', $adminMenu).hover(
      function(event) {
        if ($(window).width() >= 768) {
          // Stop the timer.
          clearTimeout(this.sfTimer);
          $(this).addClass('open');
          // Display child lists.
          $uls = $('> ul', this).css({
              display: 'block'
            })
            // Immediately hide nephew lists.
            .parent().siblings('li').children('ul')
            .css({ display: 'none' }).parent().removeClass('open');

        }
      },
      function(event) {
        if ($(window).width() >= 768) {
          var $uls = $('> ul', this);
          this.sfTimer = setTimeout(function() {
            $uls.css({display: 'none'}).parent().removeClass('open');
          }, 400);
        }
      }
    );

  };

  /**
   * Apply 'position: fixed' as a class which will only take effect on larger screens.
   */
  Drupal.admin.behaviors.positionFixed = function(context, settings, $adminMenu) {
    if (settings.admin_menu.position_fixed) {
      $adminMenu.addClass('admin-menu-fixed');
    }
  };
})(jQuery);
