var VOTING_LABELS = [
  'Terrible',
  'Bad',
  'Below Average',
  'Average',
  'Above Average',
  'Good',
  'Incredible'
];

function format_vote (song, vote, is_my_song) {
  var out = song + ' / ';

  if (is_my_song) {
    return out + 'my song';
  }

  var hundreds = Math.round(vote / 100);
  var offset = '+' + ((vote - (hundreds * 100)) / 100).toFixed(2);
  var label = VOTING_LABELS[hundreds].toLowerCase();

  return out + label + ' ' + offset.replace('+-', '-');
}

function update_votes () {
  var votes = '';

  $('.voting-slider').each(function () {
    var $el = $(this);

    var song = $el.data('song');
    var vote = $el.data('ionRangeSlider').result.from;

    var $checkbox = $('input[data-id="' + $el.data('id') + '"]');
    var is_my_song = $checkbox.prop('checked');

    votes += format_vote(song, vote, is_my_song) + '\n';
  });

  $('#voting-result').val(votes.trim());
}

function update_empty_votes () {
  var votes = '';

  $('.voting-slider').each(function () {
    votes += format_vote($(this).data('song'), 300) + '\n';
  });

  $('#voting-result').val(votes.trim());
}

function make_voting () {
  update_empty_votes();

  $('.voting-slider').ionRangeSlider({
    min: 0,
    max: 600,
    from: 300,
    grid: true,
    grid_snap: true,
    hide_min_max: true,
    hide_from_to: true,

    prettify: function (num) {
      return num / 100;
    },

    prettify_labels: function (num) {
      return num % 100 === 0 ? VOTING_LABELS[num / 100] : num;
    },

    grid_line_visible: function (num) {
      return num % 100 === 0;
    },

    additional_grid_line_class: function (num) {
      return 'small';
    },

    onFinish: function (data) {
      update_votes();
    }
  });

  $('input[type="checkbox"]').change(function (e) {
    var $el = $(e.target);
    var $sliders = $('.irs-with-grid');
    var $slider = $sliders.eq($el.data('id'));

    // $('input[type="checkbox"]').not($el).prop('checked', false);

    // $sliders.not($slider).removeClass('irs-disabled');

    update_votes();

    $slider[$el.prop('checked') ? 'addClass' : 'removeClass']('irs-disabled');
  });
}
