(function($) {
  /**
   * Overrides Drupal.admin.behaviors.hover().
   */
  Drupal.admin.behaviors.hover = function (context, settings, $adminMenu) {

    // Touch events, if applicable, are triggered before mouseenter and mouseleave.
    $('li.expandable', $adminMenu).on('touchstart', function(event) {
      var uls = $('> ul', this);
      event.preventDefault(); event.stopPropagation();

      if (event.target.nodeName == 'A') {
        event.target.click(); // Essentially Fastclick
      } else if (event.target.nodeName == "SPAN" && uls[0].style.display == 'block') {
        uls.css({display: 'none'});
        $(this).removeClass('active');
      } else if (event.target.nodeName == "SPAN") {
        // Display child lists.
        uls.css({display: 'block'});
        $(this).addClass('active');
        // Immediately hide nephew lists.
        uls.parent().siblings('li').children('ul').css({display: 'none'});
        // Hide child lists
        uls.find('ul').css({display: 'none'});
        // Close other top level menus and their decedents
        uls.parents('ul', $adminMenu).siblings('ul').find('ul').css({display: 'none'});
      }
    });

    // If the user touches an element outside of the admin menu then collapse the menu.
    // $(document).on('touchstart.admin-menu',function(event){
    //   if (($adminMenu.children().has(event.target).length === 0)) {
    //     $('ul ul', $adminMenu).css({display: 'none'});
    //   };
    // });

    // Delayed mouseout.
    $('li.expandable', $adminMenu).hover(
      function (event) {
        // Stop the timer.
        clearTimeout(this.sfTimer);
        // Display child lists.
        $('> ul', this)
          .css({left: 'auto', display: 'block'})
          // Immediately hide nephew lists.
          .parent().siblings('li').children('ul').css({display: 'none'});
        $(this).addClass('active');
      },
      function () {
        // Start the timer.
        var uls = $('> ul', this);
        this.sfTimer = setTimeout(function () {
          uls.css({display: 'none'});
          $(this).removeClass('active');
        }, 400);
      }
    );

  };
})(jQuery);
