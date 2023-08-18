//open Modal
function openModal(modalname) {
    $("." + modalname).addClass('show')
    setTimeout(function () {
        $("." + modalname).addClass('fade')
    }, 200);
}
// close Modal
function closeModal() {
    let modals = $('.modal')
    let closeBtn = $('._modal_close_btn')
    closeBtn.on('click', function () {
        modals.removeClass('fade')
        setTimeout(function () {
            modals.removeClass('show')
        }, 200);
    })
}
// close dim
function dimModal() {
    let modals = $('.modal')
    modals.on('click', function (e) {
        if (e.target == this) {
            modals.removeClass('fade')
            setTimeout(function () {
                modals.removeClass('show')
            }, 200)
        }
    })
}


//전화번호 hyphen
function formatPhoneNumber() {
    $('._input_phone').on('input', function () {
        this.value = this.value
            .replace(/[^0-9]/g, '')
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    })
}


// header 버튼
function toggleAccountInfo() {
    let accountInfo = $('._header__account_info');
    let accountBtn = $('._ico_account_btn');
    accountBtn.on('click', function (e) {
        e.stopPropagation();
        accountInfo.toggleClass('show');
    });
    $(document).on('click', function (event) {
        let target = $(event.target);
        if (!target.is(accountInfo) && !target.is(accountBtn)) {
            accountInfo.removeClass('show');
        }
    });
}

//selectBox 공통
function selectBox() {
    let selectBox = $('._select_box')
    selectBox.on('click', function () {
        $(this).toggleClass('active');
    })
    selectBox.each(function(){
        let selectBox = $(this);
        selectBox.find('.option').on('click', function () {
            let text = $(this).text();
            let value = $(this).val();
            $(this).parent().parent().find('.select_value').text(text).css({'color': '#1F1F1F'}).attr('value', value);
        });
    })

    $(document).on('click', function (event) {
        let target = $(event.target);
        selectBox.each(function() {
            if (!target.is(this) && !target.closest(this).length) {
                $(this).removeClass('active');
            }
        });
    });


}


//입점불가 텍스트
function HoverTextnotAllow(){
    $('._result').on('mouseenter',function(){
        $(this).parent().siblings('._hover_text_not_allowed').css({'display':'block'})
    })
    $('._result').on('mouseleave',function(){
        $(this).parent().siblings('._hover_text_not_allowed').css({'display':'none'})
    })
}

//서비스 작성중 텍스트
function HoverTextService(){
    $('._service').on('mouseenter',function(){
        $(this).parent().siblings('._hover_text_service').css({'display':'block'})
    })
    $('._service').on('mouseleave',function(){
        $(this).parent().siblings('._hover_text_service').css({'display':'none'})
    })
}

//서비스 정지
function HoverStopService(){
    $('._stop').on('mouseenter',function(){
        $(this).parent().siblings('._hover_stop_service').css({'display':'block'})
    })
    $('._stop').on('mouseleave',function(){
        $(this).parent().siblings('._hover_stop_service').css({'display':'none'})
    })
}


function checkAll() {
    $('._check_all').on('click',function(){
        console.log('hello')
        // if($("#cbx_chkAll").is(":checked")) $("input[name=chk]").prop("checked", true);
        // else $("input[name=chk]").prop("checked", false);
        if($("._check_all").is(":checked")){
            $("input[name=chk]").prop("checked", true);
        }else{
            $("input[name=chk]").prop("checked", false);
        }

    })
    $("input[name=chk]").click(function() {
        let total = $("input[name=chk]").length;
        let checked = $("input[name=chk]:checked").length;

        if(total != checked) $("#cbx_chkAll").prop("checked", false);
        else $("._check_all").prop("checked", true);
    });
}

//테이블 데이터가 없을경우
function emptyTableData(){
    $('.empty_data').parents('._scroll_table').css('tableLayout' , 'auto');
}


// 파일명 커스텀
function inputFile(){
    $("._file_input").on('change',function(){
        var fileName = $(this).val().split('/').pop().split('\\').pop();
        console.log(fileName);
        $("._file_name").text(fileName);
    });
}


// ip 입력시 클릭안됨
function getValidateIp(){
    $('._input_ip').on('keypress', function(event) {
        var inputValue = event.which;
        if (inputValue != 46 && (inputValue < 48 || inputValue > 57)) {
            event.preventDefault();
        }
    });
}


// header 테블릿 버튼
function asideButton(){
    $('._aside_button').on('click',function(){
        $('.aside').toggleClass('show')
        $(this).toggleClass('active')
    })
}

//달력
function modalCalender(){
    const parentElement = $('#datepickerParent');
    let dateRangePicker = $('input[name=dateRangePicker]');
    dateRangePicker.daterangepicker({
        linkedCalendars: true,
        autoApply : true,
        "locale": {
            "format": "YYYY-MM-DD",
            "separator": " ~ ",
            "applyLabel": "확인",
            "cancelLabel": "취소",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "weekLabel": "주",
            "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
            "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        },
        "startDate": new Date(),
        "endDate": new Date(),
        "buttonClasses": "data_range_btn",
        "applyButtonClasses": "apply_range_btn",
        "cancelButtonClasses": "cancel_range_btn",
        "showCustomRangeLabelranges": false,
        "parentEl": parentElement,
    }, function (start, end, label) {
        console.log('선택된 날짜: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
    dateRangePicker.on('hide.daterangepicker', function (ev, picker) {
        let modals = $('.modal')
        modals.removeClass('fade')
        setTimeout(function () {
            modals.removeClass('show')
        }, 200)
    });

    dateRangePicker.on('showCalendar.daterangepicker', function (ev, picker) {
        const trList = $('.daterangepicker').find("tr");
        trList.each(function() {
            var offEndsAvailableCount = $(this).find(".off.ends.available").length;
            if (offEndsAvailableCount === 7) {
                $(this).hide();
            }
        });
    });

}


// 실행
$(document).ready(function () {
    formatPhoneNumber();
    toggleAccountInfo();
    closeModal();
    dimModal();
    selectBox();
    HoverTextnotAllow();
    HoverTextService();
    HoverStopService();
    checkAll();
    emptyTableData();
    inputFile();
    getValidateIp();
    asideButton();
    modalCalender();
})