//Aside UI
function asideSlideBtn() {
    let title = $('._title');
    let slide = $('._slide');
    title.on('click', function () {
        $(this).next(slide).stop().slideToggle(300);
        $(this).toggleClass('active').parent().siblings().find(title).removeClass('active');
        $(this).parent().siblings().find(slide).slideUp(300);
    })
}

//Aside open UI
function openAsideBtn() {
    let openAsideBtn = $('._btn-open-depths')
    openAsideBtn.on('click', function () {
        $(this).parent('.aside').toggleClass('on')
        $('.footer').toggleClass('on')
    })
}

//selectBox
function selectBox() {
    let selectBox = $('._select-box')
    // selectBox on/off
    selectBox.on('click', function () {
        $(this).toggleClass('active');
    })
    // 셀렉트 박스 클릭 시 문구 및 데이터 수정
    $(document).on('click','.option' ,function() {
        const text = $(this).text();
        const value = $(this).attr("value");
        $(this).closest('._select-box').find('._value-text').text(text).css('color', '#1F1F1F');
        $(this).closest('._select-box').find('._select-value').attr('value', value);
    });
    //disabled 처리
    if ($("._select-value").is(':disabled')) {
        const disableSelectBox = $("._select-value:disabled")
        disableSelectBox.parent('._select-box').css({
            "background": "#e9ecef",
            "border": "1px solid #CED4DA",
            "cursor": "auto"
        })
        disableSelectBox.parent('._select-box').off('click');
    }
    //외부클릭시 종료
    $(document).on('click', function (e) {
        let target = $(e.target);
        selectBox.each(function () {
            if (!target.is(this) && !target.closest(this).length) {
                $(this).removeClass('active');
            }
        });
    });
}

/*필터 상세보기 버튼*/
function showDetailBtn(){
    const moreSearchBtn = $('._more-search-btn')
    let count = 0;
    moreSearchBtn.on('click',function(){
        $('._detail-search').toggleClass('d-block')
        count++;
        if(count % 2 === 0){
            moreSearchBtn.text('More Search');
        }else{
            moreSearchBtn.text('Close Search');
        }
    })
}

// 달력 모달 생성
function showRangeDateModal() {
    const modalRangeDate = $('._modalRangeDate');
    const inputRangeDate = $('._inputRangeDate');
    inputRangeDate.daterangepicker(
        {
            linkedCalendars: true,
            autoApply: true,
            "locale": {
                "format": "YYYY-MM-DD",
                "separator": "~",
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
            "parentEl": modalRangeDate,
        },
    );
    inputRangeDate.on('hide.daterangepicker', function (ev, picker) {
        $('._modal-calendar').modal('hide')
    });

    // three Month 버튼 클릭 시 지난달 범위 선택
    $('#threeMonthAgoBtn').on('click', function () {
        const startDate = moment().subtract(3, 'month');
        const endDate = moment();
        inputRangeDate.data('daterangepicker').setStartDate(startDate);
        inputRangeDate.data('daterangepicker').setEndDate(endDate);
    });
    // Last Month 버튼 클릭 시 지난달 범위 선택
    $('#lastMonthBtn').on('click', function () {
        const startDate = moment().subtract(1, 'month');
        const endDate = moment();
        inputRangeDate.data('daterangepicker').setStartDate(startDate);
        inputRangeDate.data('daterangepicker').setEndDate(endDate);
    });

    // This Month 버튼 클릭 시 이번달 범위 선택
    $('#thisMonthBtn').click(function () {
        const startDate = moment().startOf('month');
        const endDate = moment();
        inputRangeDate.data('daterangepicker').setStartDate(startDate);
        inputRangeDate.data('daterangepicker').setEndDate(endDate);
    });

    // Yesterday 버튼 클릭 시 어제 범위 선택
    $('#yesterdayBtn').click(function () {
        const startDate = moment().subtract(1, 'day');
        const endDate = moment().subtract(1, 'day');
        inputRangeDate.data('daterangepicker').setStartDate(startDate);
        inputRangeDate.data('daterangepicker').setEndDate(endDate);
    });

    // Today 버튼 클릭 시 오늘 범위 선택
    $('#todayBtn').click(function () {
        var startDate = moment();
        var endDate = moment();
        inputRangeDate.data('daterangepicker').setStartDate(startDate);
        inputRangeDate.data('daterangepicker').setEndDate(endDate);
    });
}



function showSingleDateModal(){
    const modalSingleDate = $('._modalSingleDate');
    const inputSingleDate = $('._inputSingleDate');
    inputSingleDate.daterangepicker(
        {
            singleDatePicker: true,
            linkedCalendars: true,
            autoApply: true,
            "locale": {
                "format": "YYYY-MM-DD",
                "separator": "~",
                "weekLabel": "주",
                "daysOfWeek": ["일", "월", "화", "수", "목", "금", "토"],
                "monthNames": ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            },
        },
    );

}

/*검색시 데이터가 없는 경우*/
function checkNoData() {
    let emptyData =  $('._empty-data')
   if($('tr').hasClass('_empty-data') === true){
       emptyData.closest('table').removeClass('table-fixed')
       emptyData.closest('table').find($('colgroup')).empty()
       emptyData.closest('table').find($('thead')).empty()
   }
}

//slideModal
function openSlideModal(modalName, i) {
    $("." + modalName + i).addClass('show');
}
function closeSlideModal() {
    $('._close-slide-modal-btn').on('click', function () {
        $('._slide-modal-wrap').removeClass('show');
    })
}

/*Aside 메뉴 호버 시 툴팁 호출*/
function showAsideTooltip() {
    let links = $('.link');
    links.mouseover(function () {
        const hoverTitle = $(this).find('a');
        const top = hoverTitle[0].getBoundingClientRect().top;
        const arrow = $(this).find('.arrow-box');
        arrow.css('top', top + 10 + 'px');
    });
}

/*Aside 모바일에서 버튼 생성*/
function showAsideMobileBtn() {
    $('._aside_button').on('click', function () {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.aside').css({'left': 0})
        } else {
            $('.aside').css({'left': -100 + '%'})
        }
    })
}

/*input 숫자만 입력*/
function checkInputNumber(){
    $('._only-number').on('input',function(){
        this.value =  this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    })
}

/*전체 실행*/
$(document).ready(function () {
    showRangeDateModal();
    asideSlideBtn();
    openAsideBtn();
    selectBox();
    closeSlideModal();
    showAsideTooltip();
    showAsideMobileBtn();

    showDetailBtn();
    checkNoData();
    checkInputNumber();
    showSingleDateModal();
})