// /* animated */
function autoscroll(e) {
    var top = $('#' + e).offset().top;
    $('html, body').animate({ scrollTop: top }, 800, 'swing')
}
// /* animated */