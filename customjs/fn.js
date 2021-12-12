function onlynumber(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
function RemoveUnicode(str) {
    var text = $(str).val();
    var text_create = text.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a").replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A")
        .replace(/đ/g, "d").replace(/Đ/g, "D")
        .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y").replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y")
        .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u").replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U")
        .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ.+/g, "o").replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ.+/g, "O")
        .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ.+/g, "e").replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ.+/g, "E").replace(/ /g, "").replace(".", "")
        .replace(/Ì|Í|Ị|Ỉ|Ĩ.+/g, "I").replace(/ì|í|ị|ỉ|ĩ/g, "i");
    $(str).val(text_create);
}
// Handles the go to top button at the footer
function handleButton(bodyclass) {
    var offset = 100;
    var duration = 500;

    if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {  // ios supported
        $("." + bodyclass).bind("touchend touchcancel touchleave", function (e) {
            if ($(this).scrollTop() > offset) {
                $('.button-add-down').fadeIn(duration);
            } else {
                $('.button-add-down').fadeOut(duration);
            }
        });
    } else {  // general 
        $("." + bodyclass).scroll(function () {
            if ($(this).scrollTop() > offset) {
                $('.button-add-down').fadeIn(duration);
            } else {
                $('.button-add-down').fadeOut(duration);
            }
        });
    }
};