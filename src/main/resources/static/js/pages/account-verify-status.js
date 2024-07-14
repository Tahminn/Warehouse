$(function () {
    function format(api, rowIdx, columns) {
        var data = $.map(columns, function (col, i) {
            return col.hidden ?
                '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                '<td><b>' + col.title + '</b></td> ' +
                '<td>' + col.data + '</td>' +
                '</tr>' :
                '';
        }).join('');
        return data ? '<div class="slider"><table>' + data + '</table></div>' : undefined;
    }

    let oTable = $('#client-accounts-ver-status').DataTable({
        select: true,
        searching: true,
        responsive: {
            details: {
                type: "column",
                target: -1,
                renderer: function (api, rowIdx, columns) {
                    var data = format(api, rowIdx, columns);
                    return data ?
                        data :
                        false;
                },
                display: function (row, update, render) {
                    if (update) {
                        if ($(row.node()).hasClass('parent')) {
                            row.child(render(), 'child').show();
                            $('div.slider', row.child()).slideDown(0);
                            return true;
                        }
                    } else {
                        if (!row.child.isShown()) {
                            row.child(render(), 'child').show();
                            $(row.node()).addClass('parent shown');
                            $('div.slider', row.child()).slideDown();

                            return true;
                        } else {
                            $('div.slider', row.child()).slideUp(function () {
                                row.child(false);
                                $(row.node()).removeClass('parent shown');
                            });

                            return false;
                        }
                    }

                }
            }
        },
        columnDefs: [
            {
                className: "dtr-control dtr-control-last",
                orderable: false,
                targets: -1
            }
        ]
    })

    oTable.on('click', 'tbody tr', (e) => {
        let classList = e.currentTarget.classList;

        if (classList.contains('selected')) {
            classList.remove('selected');
            $("#verify-card-account").hide();
        }
        else {
            oTable.rows('.selected').nodes().each((row) => row.classList.remove('selected'));
            classList.add('selected');
            $("#verify-card-account").show();
        }
    });

    document.getElementById('verify-card-account').addEventListener('click', function () {
        let selectedRow = oTable.rows('.selected').nodes();
        let uniqueId = $(selectedRow).data('id');
        if (!uniqueId) {
            toastr.info("Yalnız təsdiqlənməmiş hesabları təsdiqləyə bilərsiniz", 'Zəhmət olmasa təsdiqlənməmiş hesab seçin');
        }
        else {
            Swal.fire({
                text: "Hesabı təsdiqləmək istədiyinizə əminsinizmi?",
                icon: "info",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Təsdiqlə",
                cancelButtonText: "Ləğv et",
                customClass: {
                    confirmButton: "btn fw-bold btn-success",
                    cancelButton: "btn fw-bold btn-active-light-primary"
                }
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        type: 'POST',
                        url: '/ClientCards/VerifyAccount',
                        // data: 'accountId=' + uniqueId,
                        data: { accountId: uniqueId },
                        success: function (response) {
                            console.log(response);
                            Swal.fire({
                                text: "Hesab təsdiqləndi",
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "OK",
                                customClass: {
                                    confirmButton: "btn fw-bold btn-primary",
                                }
                            }).then(function () {
                                $(selectedRow).find('td:first-child').html('<span class="ms-2 badge badge-light-primary fw-bold">Təsdiqlənib</span>');
                                dt.draw();
                            });
                        },
                        error: function (error) {
                            console.error(error);
                        }
                    });
                    //Swal.fire({
                    //    text: "Təsdiqlənir...",
                    //    icon: "info",
                    //    buttonsStyling: false,
                    //    showConfirmButton: false,
                    //    timer: 1000
                    //}).then(function () {
                        
                    //});
                } else if (result.dismiss === 'cancel') {
                    Swal.fire({
                        text: customerName + " was not deleted.",
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary",
                        }
                    });
                }
            });
        }
    });
})
