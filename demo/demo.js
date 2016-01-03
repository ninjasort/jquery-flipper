$(function () {
  
  var $el = $('#myFlipper');

  $el.flipper({
    rotationType: 'left'
  });

  $('select[name=type]').on('change', function () {
    var type = $(this).val();
    $el.flipper('option', 'rotationType', type);
  });

  $('input[name="depth"]').on('change', function () {
    var num = $(this).val();
    $('#depth-amount').html(num);
    $el.flipper('option', 'depth', num);
  });

  $('input[name="speed"]').on('change', function () {
    var speed = $(this).val();
    $('#speed-amount').html(speed);
    $el.flipper('option', 'speed', speed);
  });

  $('select[name="event"]').on('change', function () {
    if ($(this).val() == 'keydown') {
      $('body').trigger('keydown-helper');
      $('select[name="keydown"]').show();
      $el.flipper('option', 'event', {
        'type': 'keydown',
        'keyCode': $('select[name="keydown"]').val() === 'space' ? 32 : 13
      });
      $('select[name="keydown"]').on('change', function () {
        $el.flipper('option', 'event', {
          'type': 'keydown',
          'keyCode': $(this).val() === 'space' ? 32 : 13
        });
        $(this).blur();
      });
    } else {
      $('select[name="keydown"]').hide();
      $el.flipper('option', 'event', $(this).val());
    }
  });

});