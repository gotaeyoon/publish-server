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

// 셀렉트박스 공통
function selectBox() {
    let selectBox = $('._select_box')

    // 셀렉트 박스 option창 호출
    selectBox.on('click', function () {
        $(this).toggleClass('active');
    })
    // 외부 클릭시 셀렉트박스 종료
    $(document).on('click', function (event) {
        let target = $(event.target);
        selectBox.each(function() {
            if (!target.is(this) && !target.closest(this).length) {
                $(this).removeClass('active');
            }
        });
    });

    selectBox.each(function() {
        const selectBox = $(this);
        const innerInputElement = selectBox.find('input.select_value');

        if (innerInputElement.val() !== '') {
            const selectedValue = selectBox.find('.option[value="' + innerInputElement.val() + '"]');

            if (selectedValue.length === 1) {
                const selectedText = selectedValue.text();
                innerInputElement.closest('._select_box').find('.select_value').text(selectedText);
            }
        }
    });

    $(document).on('click','.option' ,function() {
        const text = $(this).text();
        const value = $(this).attr("value");

        $(this).closest('._select_box').find('.select_value').text(text).css('color', '#1F1F1F').attr('value', value);
        $(this).closest('._select_box').find('._select_value').attr('value', value);

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
function HoverSpeechBubble(){
    $('._speech_bubble').on('mouseenter',function(){
        $(this).parent().siblings('._hover_speech_bubble').css({'display':'block'})
    })
    $('._speech_bubble').on('mouseleave',function(){
        $(this).parent().siblings('._hover_speech_bubble').css({'display':'none'})
    })
}

//내 권한
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
        if($("._check_all").is(":checked")){
            $("input[name=chk]").prop("checked", true);
        }else{
            $("input[name=chk]").prop("checked", false);
        }

    })
    $("input[name=chk]").click(function() {
        let total = $("input[name=chk]").length;
        let checked = $("input[name=chk]:checked").length;

        if(total != checked) $("._check_all").prop("checked", false);
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
        $("._file_name").text(fileName).css({'color' : '#212529'});
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
    let twoCalender = $('._twoCalender');
    let OneCalender = $('._oneCalender');


    // 두개 보이는 달력
    twoCalender.daterangepicker({
        linkedCalendars: true,
        autoApply : true,
        "locale": {
            "format": "YYYY-MM-DD",
            "separator": "~",
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
        // "minDate": new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        // "maxDate": new Date(),
        "buttonClasses": "data_range_btn",
        "applyButtonClasses": "apply_range_btn",
        "cancelButtonClasses": "cancel_range_btn",
        "showCustomRangeLabelranges": false,
        "parentEl": parentElement,
    }, function (start, end, label) {
        console.log('선택된 날짜: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
    twoCalender.on('hide.daterangepicker', function (ev, picker) {
        let modals = $('.modal')
        modals.removeClass('fade')
    });
    twoCalender.on('showCalendar.daterangepicker', function (ev, picker) {
        const trList = $('.daterangepicker').find("tr");
        trList.each(function() {
            var offEndsAvailableCount = $(this).find(".off.ends.available").length;
            if (offEndsAvailableCount === 7) {
                $(this).hide();
            }
        });

    });


    //한개보이는 달력
    OneCalender.daterangepicker({
        linkedCalendars: true,
        autoApply : true,
        "locale": {
            "format": "YYYY-MM-DD",
            "separator": "~",
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
        // "minDate": new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        "maxDate": new Date(),
        "buttonClasses": "data_range_btn",
        "applyButtonClasses": "apply_range_btn",
        "cancelButtonClasses": "cancel_range_btn",
        "showCustomRangeLabelranges": false,
        "parentEl": parentElement,
    }, function (start, end, label) {
        console.log('선택된 날짜: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
    OneCalender.on('hide.daterangepicker', function (ev, picker) {
        let modals = $('.modal')
        modals.removeClass('fade')
    });
    OneCalender.on('showCalendar.daterangepicker', function (ev, picker) {
        const trList = $('.daterangepicker').find("tr");
        trList.each(function() {
            var offEndsAvailableCount = $(this).find(".off.ends.available").length;
            if (offEndsAvailableCount === 7) {
                $(this).hide();
            }
        });
    });
    OneCalender.on('showCalendar.daterangepicker', function (ev, picker) {
        if (picker.endDate.month() > picker.startDate.month()) {
            // call send
            alert('한 달 단위로 선택 가능하십니다.');
            picker.startDate = moment();
            picker.endDate = moment();
        }

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
    HoverSpeechBubble();
})