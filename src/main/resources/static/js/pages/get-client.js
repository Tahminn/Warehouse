$(function () {


    //LoadCustomerKreditInfo();

    var contractId = $("#contractId").val();
    var validators = document.getElementById('vError').value;
    if (contractId > 0) {
        $('#userContent').html(LoaginIcon);
        $("#userContent").load('/ClientUser/UserInfo?Id=' + contractId, function () { });
        LoadOperInfo(contractId);
    }

    LoadCustomerKreditInfo('C', '#credit-categories', null);

});

function LoadOperInfo(contractId) {
    var tehlil = $('#paymentId');
    tehlil.html(LoaginIcon);
    tehlil.load('/Odenishler/Operations?clientId=' + contractId, function () {
        if (contractId == 0) { $("#tehlilinfo").find(':input').prop('readonly', true); }
    });
}

//function returnLicsch(contractId, tip) {
//    var returnData = $('#returnLicsch');
//    returnData.html(LoaginIcon);
//    returnData.load('/Odenishler/GetOrerlist?clientId=' + contractId + '&tip=' + tip, function () { });

//}

//function returnClosed(tip) {


//}
//function CreditPayment() {
//    $('#paymentId').load('/Odenishler/Operations?clientId=' + contractId, function () {
//        if (contractId == 0) { $("#tehlilinfo").find(':input').prop('readonly', true); }
//    });
//}

function LoadCustomerKreditInfo(tip, parentToAppendDataToElement, closed) {
    const parentToAppendDataTo = $(parentToAppendDataToElement);
    if (parentToAppendDataTo.children().length == 0) {
        const clientId = $('#clientId').val();
        const orderType = $('#orderType').val();
        //const clientId = $('#clientId');

        parentToAppendDataTo.html(LoaginIcon);
        //returnData.load('/Odenishler/GetOrerlist?clientId=' + clientId + '&tip=' + tip + '&closed=1', function () { });

        //if (clientId && orderType) {
        $.ajax({
            url: '/Odenishler/GetOrerlist',
            type: 'GET',
            data: { clientId: clientId, orderType: orderType, tip: tip, closed: closed },
            dataType: 'html',
            success: function (data) {
                parentToAppendDataTo.html(data);
            },
            error: function () {
                parentToAppendDataTo.html('Error loading content.');
            }
        });
    }
    //}
}
