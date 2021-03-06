$(document).ready(function () {
    $("#vechilemodelyear").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years"
    });

    $("#loan-form").validate({
        highlight: function (element) {
            $(element).closest('.elVal').addClass("form-field text-error");
        },
        unhighlight: function (element) {
            $(element).closest('.elVal').removeClass("form-field text-error");
        }, errorElement: 'span',
        rules: {
            fk_customer_id: {
                required: true
            },
            vechilenumber: {
                required: true
            },
            vechilename: {
                required: true
            },
            vechilemodelyear: {
                required: true,
                digits: true,
            },
            vechilercno: {
                required: true
            },
            rcdocument: {
                required: true,
                imagefilecheck: true
            },
            originalloanamount: {
                required: true
            },
            loanperiod: {
                required: true,
            },
            loanperiodfrequency: {
                required: true
            },
            loanintrestrate: {
                required: true
            },
            security1name: {
                required: true
            },
            security1aadhar: {
                required: true,
                digits: true
            },
            security1mobileno: {
                required: true,
                digits: true
            },
            security2aadhar: {
                required: false,
                digits: true
            },
            security2mobileno: {
                required: false,
                digits: true
            },

        },
        messages: {
            fk_customer_id: {
                required: "Please choose the customer"
            },
            vechilenumber: {
                required: "Please enter the vehicle number"
            },
            vechilename: {
                required: "Please enter the vehicle name"
            },
            vechilemodelyear: {
                required: "Please enter the vehicle model year"
            },
            vechilercno: {
                required: "Please enter the vehicle RC No"
            },
            rcdocument: {
                required: "Please choose the RC Document"
            },
            originalloanamount: {
                required: "Please enter the loan amount"
            },
            loanperiod: {
                required: "Please enter the loan period"
            },
            loanperiodfrequency: {
                required: "Please choose the loan period frequency"
            },
            loanintrestrate: {
                required: "Please enter the loan interest rate"
            },
            security1name: {
                required: "Please enter the security1 Name"
            },
            security1aadhar: {
                required: "Please enter the security1 Aadhar"
            },
            security1mobileno: {
                required: "Please enter the security1 Mobile No"
            },

        },
        errorPlacement: function (error, element) {
            error.appendTo(element.closest(".elVal"));
        },
        submitHandler: function (form) {
            var formData = new FormData($('#loan-form')[0]);
            formData.append('rcdocument', $('input[type=file]')[0].files[0]);
            var $form = $("#loan-form");
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json'
            }).done(function (response) {

                if (response.status)
                {
                    window.location = baseurl + 'loan';
                } else
                {
                    openDanger(response.msg);
                }
            });
            return false; // required to block normal submit since you used ajax
        }
    });
    $.validator.addMethod("imagefilecheck", function (value, element) {
        var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
        if ($.inArray(value.split('.').pop().toLowerCase(), fileExtension) == -1) {
            return false;
        } else
        {
            return true;
        }
    }, "Please choose format type .jpg, .jpeg, .png, .gif, .bmp");

    $("#payment-form").validate({
        highlight: function (element) {
            $(element).closest('.elVal').addClass("form-field text-error");
        },
        unhighlight: function (element) {
            $(element).closest('.elVal').removeClass("form-field text-error");
        }, errorElement: 'span',
        rules: {
            subamount: {
                required: true
            },
            fineintrest: {
                required:'#fineintrestcheck:checked'
            },
            fineamount: {
                required:'#fineintrestcheck:checked'
            },
        },
        messages: {
            subamount: {
                required: "Please enter the EMI amount"
            },
            fineintrest: {
                required: "Please enter the Fine intrest"
            },
            fineamount: {
                required: "Please enter the Fine amount"
            },
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.closest(".elVal"));
        },
        submitHandler: function (form) {
            var formData = new FormData($('#payment-form')[0]);
            var $form = $("#payment-form");
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                dataType: 'json'
            }).done(function (response) {

                if (response.status)
                {
                    window.location = baseurl + 'loan';
                } else
                {
                    openDanger(response.msg);
                }
            });
            return false; // required to block normal submit since you used ajax
        }
    });
});
$(document).on('click', '#close-preview', function () {
    $('.image-preview').popover('hide');
    // Hover befor close the preview
    $('.image-preview').hover(
            function () {
                $('.image-preview').popover('show');
            },
            function () {
                $('.image-preview').popover('hide');
            }
    );
});

$(function () {
    // Create the close button
    var closebtn = $('<button/>', {
        type: "button",
        text: 'x',
        id: 'close-preview',
        style: 'font-size: initial;',
    });
    closebtn.attr("class", "close pull-right");
    // Set the popover default content
    $('.image-preview').popover({
        trigger: 'manual',
        html: true,
        title: "<strong>Preview</strong>" + $(closebtn)[0].outerHTML,
        content: "There's no image",
        placement: 'bottom'
    });
    // Clear event
    $('.image-preview-clear').click(function () {
        $('.image-preview').attr("data-content", "").popover('hide');
        $('.image-preview-filename').val("");
        $('.image-preview-clear').hide();
        $('.image-preview-input input:file').val("");
        $(".image-preview-input-title").text("Browse");
    });
    // Create the preview image
    $(".image-preview-input input:file").change(function () {
        var img = $('<img/>', {
            id: 'dynamic',
            width: 250,
            height: 200
        });
        var file = this.files[0];
        var reader = new FileReader();
        // Set preview image into the popover data-content
        reader.onload = function (e) {
            $(".image-preview-input-title").text("Change");
            $(".image-preview-clear").show();
            $(".image-preview-filename").val(file.name);
            img.attr('src', e.target.result);
            $(".image-preview").attr("data-content", $(img)[0].outerHTML).popover("show");
        }
        reader.readAsDataURL(file);
    });
});

function RemoveImage()
{
    $("#profile_image").hide();
    $("#profile_image_content").show();
}

$(document).on('click', '.loanview', function () {
    var loanid = $(this).attr('data-id');
    if (loanid)
    {
        $.ajax({
            url: baseurl + 'loan/view',
            type: 'POST',
            data: {loanid: loanid},
            dataType: 'json',
            async: false,
            beforeSend: function () {
                $('#loading-image').css('display', 'block');
                $('body').addClass('loading');
            },
            complete: function () {
                $('#loading-image').css('display', 'none');
                $("body").removeClass("loading");
            },
            success: function (response) {
                if (response.status)
                {
                    $("#popupshow").html(response.viewhtml);
                    $("#loanviewModal").css({"display": "block"});
                } else
                {
                    openDanger(response.msg);
                }
            }
        });
    }
});

$(document).on("click", ".close, .closebtn", function () {
    $("#loanviewModal").css({"display": "none"});
    $("#paymentviewModal").css({"display": "none"});
    $("#deleteLoanmodal").css({"display": "none"});
});

$(document).on("keypress keyup blur", ".allownumericwithdecimal", function (event) {
    $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

$(document).on('click', '.switchstatus', function () {
    var loanid = $(this).attr('data-id');
    var status = $(this).attr('data-status');
    if (loanid)
    {
        $.ajax({
            url: baseurl + 'loan/changestatus',
            type: 'POST',
            data: {loanid: loanid, status: status},
            dataType: 'json',
            async: false,
            beforeSend: function () {
                $("#status_" + loanid).addClass('switchdisable');
            },
            complete: function () {
                $("#status_" + loanid).removeClass('switchdisable');
            },
            success: function (response) {
                if (response.status)
                {
                    if (status == 1)
                    {
                        $("#status_" + loanid).attr('data-status', 0);
                        $("#status_" + loanid).prop('checked', false);

                    } else
                    {
                        $("#status_" + loanid).attr('data-status', 1);
                        $("#status_" + loanid).prop('checked', true);

                    }
                    openSuccess(response.msg);
                } else
                {
                    openDanger(response.msg);
                }
            }
        });
    }
});

$(document).on('click', '.loandelete', function () {
    var loanid = $(this).attr('data-id');
    if (loanid)
    {
        $.ajax({
            url: baseurl + 'loan/deletepopup',
            type: 'POST',
            data: {loanid: loanid},
            dataType: 'json',
            async: false,
            beforeSend: function () {
                $('#loading-image').css('display', 'block');
                $('body').addClass('loading');
            },
            complete: function () {
                $('#loading-image').css('display', 'none');
                $("body").removeClass("loading");
            },
            success: function (response) {
                if (response.status)
                {
                    $("#popupshow").html(response.viewhtml);
                    $("#deleteLoanmodal").css({"display": "block"});
                } else
                {
                    openDanger(response.msg);
                }
            }
        });
    }
});
$(document).on('click', '.approveloan', function () {
    var loanid = $(this).attr('data-id');
    if (loanid)
    {
        $.ajax({
            url: baseurl + 'loan/approve',
            type: 'POST',
            data: {loanid: loanid},
            dataType: 'json',
            async: false,
            beforeSend: function () {
                $('#loading-image').css('display', 'block');
                $('body').addClass('loading');
            },
            complete: function () {
                $('#loading-image').css('display', 'none');
                $("body").removeClass("loading");
            },
            success: function (response) {
                if (response.status)
                {
                    window.location = baseurl + 'loan';
                } else
                {
                    openDanger(response.msg);
                }
            }
        });
    }
});
$(document).on('click', '.makepayment', function () {
    var loanid = $(this).attr('data-id');
    if (loanid)
    {
        $.ajax({
            url: baseurl + 'loan/paymenthistory',
            type: 'POST',
            data: {loanid: loanid},
            dataType: 'json',
            async: false,
            beforeSend: function () {
                $('#loading-image').css('display', 'block');
                $('body').addClass('loading');
            },
            complete: function () {
                $('#loading-image').css('display', 'none');
                $("body").removeClass("loading");
            },
            success: function (response) {
                if (response.status)
                {
                    $("#popupshow").html(response.viewhtml);
                    $("#paymentviewModal").css({"display": "block"});
                } else
                {
                    openDanger(response.msg);
                }
            }
        });
    }
});
$(document).on('click', '.downloadexport', function () {
    $.ajax({
        url: baseurl + 'loan/downloadexcel',
        type: 'POST',
        dataType: 'json',
        async: false,
        beforeSend: function () {
            $('#loading-image').css('display', 'block');
            $('body').addClass('loading');
        },
        complete: function () {
            $('#loading-image').css('display', 'none');
            $("body").removeClass("loading");
        },
        success: function (response) {
            if (response.status)
            {
                window.location = response.filename;
                deleteexportfile(response.filename);
            } else
            {
                openDanger(response.msg);
            }
        }
    });

});