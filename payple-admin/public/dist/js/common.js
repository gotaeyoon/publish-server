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
    let openAsideBtn = $('._btn_open_depths')
    openAsideBtn.on('click', function () {
        $(this).parent('.aside').toggleClass('on')
        $('.footer').toggleClass('on')
    })
}

//selectBox
function selectBox() {
    let selectBox = $('._select_box')
    selectBox.on('click', function () {
        $(this).toggleClass('active');
    })

    selectBox.find('.option').on('click', function () {
        let text = $(this).text();
        let value = $(this).val();
        let selectBoxValue =  $(this).closest('._select_box')

        selectBoxValue.find('.select_value').attr('value', value);
        selectBoxValue.find('.value_text').text(text).css({'color': '#1F1F1F'});
    });

    $(document).on('click', function (e) {
        let target = $(e.target);
        selectBox.each(function () {
            if (!target.is(this) && !target.closest(this).length) {
                $(this).removeClass('active');
            }
        });
    });

}


// dataPickerRange
function dataRangePicker() {
    const modalDataPicker = $('#modalDataPicker');
    let dateRangePicker = $('input[name=modalDataPickerBtn]');
    dateRangePicker.daterangepicker(
        {
            linkedCalendars: true,
            autoApply: true,
            "locale": {
                "format": "YYYY-MM-DD",
                "separator": " ~ ",
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
            "parentEl": modalDataPicker,
        },
        function (start, end, label) {
            console.log('선택된 날짜: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        });
    dateRangePicker.on('show.daterangepicker', function (ev, picker) {
        $('#myModal').modal('show')
    });
    dateRangePicker.on('hide.daterangepicker', function (ev, picker) {
        $('#myModal').modal('hide')
    });

    // Last Month 버튼 클릭 시 지난달 범위 선택
    $('#lastMonthBtn').on('click', function () {
        var startDate = moment().subtract(1, 'month').startOf('month');
        var endDate = moment().subtract(1, 'month').endOf('month');
        dateRangePicker.data('daterangepicker').setStartDate(startDate);
        dateRangePicker.data('daterangepicker').setEndDate(endDate);
    });

    // This Month 버튼 클릭 시 이번달 범위 선택
    $('#thisMonthBtn').click(function () {
        var startDate = moment().startOf('month');
        var endDate = moment().endOf('month');
        dateRangePicker.data('daterangepicker').setStartDate(startDate);
        dateRangePicker.data('daterangepicker').setEndDate(endDate);
    });

    // Yesterday 버튼 클릭 시 어제 범위 선택
    $('#yesterdayBtn').click(function () {
        var startDate = moment().subtract(1, 'day');
        var endDate = moment().subtract(1, 'day');
        dateRangePicker.data('daterangepicker').setStartDate(startDate);
        dateRangePicker.data('daterangepicker').setEndDate(endDate);
    });

    // Today 버튼 클릭 시 오늘 범위 선택
    $('#todayBtn').click(function () {
        var startDate = moment();
        var endDate = moment();
        dateRangePicker.data('daterangepicker').setStartDate(startDate);
        dateRangePicker.data('daterangepicker').setEndDate(endDate);
    });
}


//slideModal
function openSlideModal(){
    $('._open_slide_modal').on('click',function(){
        $('.slide_modal_backdrop').addClass('on');
    })
}
function closeSlideModal(){
    $('._close_slide_modal').on('click',function(){
        $('._slide_modal_backdrop').removeClass('on');
    })
}

//Aside ToolTip
function asideTooltip(){
    let links =$('.link');
    links.mouseover(function() {
        var hoverTitle = $(this).find('a');
        var top = hoverTitle[0].getBoundingClientRect().top;
        var arrow = $(this).find('.arrow_box');
        arrow.css('top', top + 10 + 'px');
    });
}

//mobile Aside Btn
function asideMobileBtn(){
    $('._aside_button').on('click',function(){
        $(this).toggleClass('active');
        if( $(this).hasClass('active')  ){
            $('.aside').css({'left' : 0})
        }else{
            $('.aside').css({'left' : -100 + '%'})
        }
    })
}



//달력
// function calender(){
//     const parentElement = $('#datepickerParent');
//     let dateRangePicker = $('input[name=dateRangePicker]');
//     dateRangePicker.daterangepicker(
//       ,
//
//         function (start, end, label) {
//         console.log('선택된 날짜: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
//     });
//     dateRangePicker.on('hide.daterangepicker', function (ev, picker) {
//         let modals = $('.modal')
//         modals.removeClass('fade')
//         setTimeout(function () {
//             modals.removeClass('show')
//         }, 200)
//     });
//
//     dateRangePicker.on('showCalendar.daterangepicker', function (ev, picker) {
//         const trList = $('.daterangepicker').find("tr");
//         trList.each(function() {
//             var offEndsAvailableCount = $(this).find(".off.ends.available").length;
//             if (offEndsAvailableCount === 7) {
//                 $(this).hide();
//             }
//         });
//     });
//
// }


$(document).ready(function () {
    dataRangePicker();
    asideSlideBtn();
    openAsideBtn();
    selectBox();
    openSlideModal();
    closeSlideModal();
    asideTooltip();
    asideMobileBtn();
})