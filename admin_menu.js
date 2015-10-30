(function($) {
  /**
   * Overrides Drupal.admin.behaviors.hover().
   */
  Drupal.admin.behaviors.hover = function (context, settings, $adminMenu) {
    var isAttached = false; // only attach document listener once

    // // Touch events, if applicable, are triggered before mouseenter and mouseleave.
    // $('li.expandable', $adminMenu).on('touchstart', function(event) {
    //   var uls = $('> ul', this);
    //   // event.preventDefault(); event.stopPropagation();

    //   // if (event.target.nodeName == 'A') {
    //   //   event.target.click(); // Essentially Fastclick
    //   if (uls[0].style.display == 'block') {
    //     uls.css({display: 'none'});
    //   } else {
    //     // Display child lists.
    //     uls.css({display: 'block'});
    //     // Immediately hide nephew lists.
    //     uls.parent().siblings('li').children('ul').css({display: 'none'});
    //     // Hide child lists
    //     uls.find('ul').css({display: 'none'});
    //     // Close other top level menus and their decedents
    //     uls.parents('ul', $adminMenu).siblings('ul').find('ul').css({display: 'none'});

    //     // If the user touches an element outside of the admin menu then collapse the menu.
    //     if (isAttached === false) {
    //       $(document, context).one('touchstart',function(event){
    //         if (($adminMenu.has(event.target).length === 0)) {
    //           $('ul ul', $adminMenu).css({display: 'none'});
    //           isAttached = false;
    //         }
    //       });
    //       isAttached = true;
    //     }
    //   }
    // });
    var allowClick = true;

    $('li.expandable .handle', $adminMenu).on('click', function(event) {
      if (allowClick === true) {
        var uls = $('~ ul', this);
        if (uls[0].style.display == 'block') {
          // uls.parent().trigger('mouseleave');
        if (allowClick === true) {
          uls.css({display: 'none'});
        }
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
          // return false;
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
