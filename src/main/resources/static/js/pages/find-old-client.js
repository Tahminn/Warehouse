$(function () {
    $('#ClearSearch').on("click", function () {
        $('#Filtered').val(0);
        $('#HesabSahibi').val(0);
        $('#FinVoen').val('');
        $('#Regnom').val('');
        $('#AdSoyad').val('');
        $('#Telefon').val('');
        $('#Resident').val('');
        $('#Hesab').val('');
        $('#Owner').val(0);
        $('#Filial').val(0);
        $('#SearchData').html('');
        $('#LicschList').html('');
    });

    $('#FindOldUserForm').on('submit', function (e) {
        e.preventDefault();
        $("#SearchData").html(LoaginIcon);
        var formData = $(this).serialize();
        $.ajax({
            url: $(this).attr('action'),
            type: 'POST',
            data: formData,
            beforeSend: function () {
            },
            success: function (data) {
                $('#SearchData').html(data);
                $("#client-filtered-data").DataTable({
                    "fixedHeader": {
                        "header": true
                    },
                    responsive: true,
                    select: true,
                    searching: true
                });
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });
});

function OldUser() {
    $("#modalContent").html(LoaginIcon);
    $("#oldUser").load('/Credit/Analysis/OldUser', function () {
        // Bu funksiya yeni sehife acilnaldan sonra orda olanlari yeniden initialitation elemek ucundur

        $("#modalContent").html("");

        $("input").focus(function () {
            $(this).select();
        });

        $('#Reload').on("click", function () {
            $("#SearchData").html(LoaginIcon);
        });

    });
}
function OnSuccessSearch(data) {
    var validators = document.getElementById('ValidationError');
    if (validators != null) {
        var ErrorValue = $.trim(validators.value);
        if (ErrorValue != '') {
            $("#AlertContent").html(ErrorValue);
            $('#myAlert').modal('toggle');
        }
    }
    if (data.indexOf("field-validation-error") > -1) return;
    if (data.indexOf("input-validation-error") > -1) return;
    var filtered = $('#VFiltered').val() == '' ? 0 : parseInt($('#VFiltered').val());
    var allCount = ($('#VCountAll').val() == '') ? 0 : parseInt($('#VCountAll').val());
    $('#Filtered').val(filtered);
    $('#AllCount').val(allCount);
}
function findlicsch(v_regnom, v_branch) {
    $("#LicschList").html(LoaginIcon);
    $("#LicschList").load('/Credit/Analysis/ReturnLicsch?regnom=' + v_regnom + '&filialNumber=' + v_branch, function () {
        var pRegnom = document.getElementById('RegnomData_Regnom');
        var pFilial = document.getElementById('RegnomData_Filialnumber');
        if (pRegnom != null && pFilial != null) {
            $("#OldUserInfo").html(
                '<input name="regnom" type="hidden" value="' + pRegnom.value + '">' +
                '<input name="filialNumber" type="hidden" value="' + pFilial.value + '">'
            )
        }
    });
}