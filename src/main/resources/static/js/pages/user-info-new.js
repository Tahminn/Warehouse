"use strict";

$(function () {
    //$("form").removeData("validator")
    //         .removeData("unobtrusiveValidation");
    //$.validator.unobtrusive.parse(document);
    //$("#kt_profil form").valid();
    //$("#kt_profil form").validate();
    //$('form').validate();
    //$('form').valid();


    //ReConfigureProfileInputValidations();

    const clientId = document.getElementById("Id");
    const finCode = document.getElementById("FinCode");
    const owner = document.getElementById("ClientType");

    //if (clientId && owner) {
    //    if (owner.value === "H") {
    //        fetchFatcaComponent("Yurik", finCode);
    //    }
    //    else {
    //        fetchFatcaComponent("Fizik", finCode);
    //    }
    //}

    ConfigureGetClientNotes();

    //if (finCode && owner) {
    //    if (owner.value === "H") {
    //        fetchAMLComponent("Juridical", finCode);
    //    }
    //    else {
    //        fetchAMLComponent("Physical", finCode);
    //    }
    //}

    //if (finCode && owner) {
    //    //if (owner.value === "H") {
    //    //    fetchAMLComponent("Juridical");
    //    //}
    //    //else {
    //    GetAMLClientRepresentatives("Physical", finCode);
    //    GetAMLClientRelatedPeople("Physical", finCode);
    //    //}
    //}

    function getAllTabs() {
        return Promise.all([fetchAMLComponent(owner.value, clientId.value),
        fetchFatcaComponent(owner.value),
        GetAMLClientRepresentatives("Physical", clientId),
        GetAMLClientRelatedPeople("Physical", clientId)])
    }

    if (finCode && owner) {
        getAllTabs()
            .then(() => {
                //$("[data-control='select2']").select2()
                //$("[data-control='select2']").prepend('<option selected class="placeholdered" value="">Select</option>');

                $("[data-control='select2']").select2({
                    closeOnSelect: false
                });
                $("[data-control='select2-tags']").select2({
                    //closeOnSelect: false,
                    tags: true
                });

                //$("[data-control='select2'] option").removeAttr('selected');
                let userInfoForm = $("#user-info-form")
                userInfoForm.removeData("validator")
                    .removeData("unobtrusiveValidation");
                $.validator.unobtrusive.parse(userInfoForm);
                userInfoForm.data("validator").settings.ignore = "";

                userInfoForm.each(function () {
                    $(this).find(':input').each(function () {
                        try {
                            $(this).valid();
                            //$(this).on("input", function () {
                            //    $(this).valid()
                            //});
                        } catch (e) {
                            console.log(e)
                        }
                    });
                });

                ConfigureUserInfoSumbitButton();
                GetRelatedPersonDetailsById();
                UpdateRelatedPerson();
            })
    }

    //var CurrentAccountDatatable = function () {
    //    // Shared variables
    //    var table;
    //    var dt;
    //    var filterPayment;

    //    // Private functions
    //    var initDatatable = function () {
    //        dt = $("#kt_datatable_example_1").DataTable({
    //            searchDelay: 500,
    //            processing: true,
    //            serverSide: true,
    //            order: [[5, 'desc']],
    //            stateSave: true,
    //            select: {
    //                style: 'multi',
    //                selector: 'td:first-child input[type="checkbox"]',
    //                className: 'row-selected'
    //            },
    //            ajax: {
    //                url: "/CurrentAccounts/GetAll",
    //            },
    //            columns: [
    //                { data: 'RecordID' },
    //                { data: 'Name' },
    //                { data: 'Email' },
    //                { data: 'Company' },
    //                { data: 'CreditCardNumber' },
    //                { data: 'Datetime' },
    //                { data: null },
    //            ],
    //            columnDefs: [
    //                {
    //                    targets: 0,
    //                    orderable: false,
    //                    render: function (data) {
    //                        return `
    //                                                <div class="form-check form-check-sm form-check-custom form-check-solid">
    //                                                    <input class="form-check-input" type="checkbox" value="${data}" />
    //                                                </div>`;
    //                    }
    //                },
    //                {
    //                    targets: 4,
    //                    render: function (data, type, row) {
    //                        return `<img src="${hostUrl}media/svg/card-logos/${row.CreditCardType}.svg" class="w-35px me-3" alt="${row.CreditCardType}">` + data;
    //                    }
    //                },
    //                {
    //                    targets: -1,
    //                    data: null,
    //                    orderable: false,
    //                    className: 'text-end',
    //                    render: function (data, type, row) {
    //                        return `
    //                                                <a href="#" class="btn btn-light btn-active-light-primary btn-sm" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
    //                                                    Actions
    //                                                    <span class="svg-icon fs-5 m-0">
    //                                                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
    //                                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    //                                                                <polygon points="0 0 24 0 24 24 0 24"></polygon>
    //                                                                <path d="M6.70710678,15.7071068 C6.31658249,16.0976311 5.68341751,16.0976311 5.29289322,15.7071068 C4.90236893,15.3165825 4.90236893,14.6834175 5.29289322,14.2928932 L11.2928932,8.29289322 C11.6714722,7.91431428 12.2810586,7.90106866 12.6757246,8.26284586 L18.6757246,13.7628459 C19.0828436,14.1360383 19.1103465,14.7686056 18.7371541,15.1757246 C18.3639617,15.5828436 17.7313944,15.6103465 17.3242754,15.2371541 L12.0300757,10.3841378 L6.70710678,15.7071068 Z" fill="currentColor" fill-rule="nonzero" transform="translate(12.000003, 11.999999) rotate(-180.000000) translate(-12.000003, -11.999999)"></path>
    //                                                            </g>
    //                                                        </svg>
    //                                                    </span>
    //                                                </a>
    //                                                <!--begin::Menu-->
    //                                                <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
    //                                                    <!--begin::Menu item-->
    //                                                    <div class="menu-item px-3">
    //                                                        <a href="#" class="menu-link px-3" data-kt-docs-table-filter="edit_row">
    //                                                            Edit
    //                                                        </a>
    //                                                    </div>
    //                                                    <!--end::Menu item-->

    //                                                    <!--begin::Menu item-->
    //                                                    <div class="menu-item px-3">
    //                                                        <a href="#" class="menu-link px-3" data-kt-docs-table-filter="delete_row">
    //                                                            Delete
    //                                                        </a>
    //                                                    </div>
    //                                                    <!--end::Menu item-->
    //                                                </div>
    //                                                <!--end::Menu-->
    //                                            `;
    //                    },
    //                },
    //            ],
    //            // Add data-filter attribute
    //            createdRow: function (row, data, dataIndex) {
    //                $(row).find('td:eq(4)').attr('data-filter', data.CreditCardType);
    //            }
    //        });

    //        table = dt.$;

    //        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
    //        dt.on('draw', function () {
    //            initToggleToolbar();
    //            toggleToolbars();
    //            handleDeleteRows();
    //            KTMenu.createInstances();
    //        });
    //    }

    //    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    //    var handleSearchDatatable = function () {
    //        const filterSearch = document.querySelector('[data-kt-docs-table-filter="search"]');
    //        filterSearch.addEventListener('keyup', function (e) {
    //            dt.search(e.target.value).draw();
    //        });
    //    }

    //    // Filter Datatable
    //    var handleFilterDatatable = () => {
    //        // Select filter options
    //        filterPayment = document.querySelectorAll('[data-kt-docs-table-filter="payment_type"] [name="payment_type"]');
    //        const filterButton = document.querySelector('[data-kt-docs-table-filter="filter"]');

    //        // Filter datatable on submit
    //        filterButton.addEventListener('click', function () {
    //            // Get filter values
    //            let paymentValue = '';

    //            // Get payment value
    //            filterPayment.forEach(r => {
    //                if (r.checked) {
    //                    paymentValue = r.value;
    //                }

    //                // Reset payment value if "All" is selected
    //                if (paymentValue === 'all') {
    //                    paymentValue = '';
    //                }
    //            });

    //            // Filter datatable --- official docs reference: https://datatables.net/reference/api/search()
    //            dt.search(paymentValue).draw();
    //        });
    //    }

    //    // Delete customer
    //    var handleDeleteRows = () => {
    //        // Select all delete buttons
    //        const deleteButtons = document.querySelectorAll('[data-kt-docs-table-filter="delete_row"]');

    //        deleteButtons.forEach(d => {
    //            // Delete button on click
    //            d.addEventListener('click', function (e) {
    //                e.preventDefault();

    //                // Select parent row
    //                const parent = e.target.closest('tr');

    //                // Get customer name
    //                const customerName = parent.querySelectorAll('td')[1].innerText;

    //                // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
    //                Swal.fire({
    //                    text: "Are you sure you want to delete " + customerName + "?",
    //                    icon: "warning",
    //                    showCancelButton: true,
    //                    buttonsStyling: false,
    //                    confirmButtonText: "Yes, delete!",
    //                    cancelButtonText: "No, cancel",
    //                    customClass: {
    //                        confirmButton: "btn fw-bold btn-danger",
    //                        cancelButton: "btn fw-bold btn-active-light-primary"
    //                    }
    //                }).then(function (result) {
    //                    if (result.value) {
    //                        // Simulate delete request -- for demo purpose only
    //                        Swal.fire({
    //                            text: "Deleting " + customerName,
    //                            icon: "info",
    //                            buttonsStyling: false,
    //                            showConfirmButton: false,
    //                            timer: 2000
    //                        }).then(function () {
    //                            Swal.fire({
    //                                text: "You have deleted " + customerName + "!.",
    //                                icon: "success",
    //                                buttonsStyling: false,
    //                                confirmButtonText: "Ok, got it!",
    //                                customClass: {
    //                                    confirmButton: "btn fw-bold btn-primary",
    //                                }
    //                            }).then(function () {
    //                                // delete row data from server and re-draw datatable
    //                                dt.draw();
    //                            });
    //                        });
    //                    } else if (result.dismiss === 'cancel') {
    //                        Swal.fire({
    //                            text: customerName + " was not deleted.",
    //                            icon: "error",
    //                            buttonsStyling: false,
    //                            confirmButtonText: "Ok, got it!",
    //                            customClass: {
    //                                confirmButton: "btn fw-bold btn-primary",
    //                            }
    //                        });
    //                    }
    //                });
    //            })
    //        });
    //    }

    //    // Reset Filter
    //    var handleResetForm = () => {
    //        // Select reset button
    //        const resetButton = document.querySelector('[data-kt-docs-table-filter="reset"]');

    //        // Reset datatable
    //        resetButton.addEventListener('click', function () {
    //            // Reset payment type
    //            filterPayment[0].checked = true;

    //            // Reset datatable --- official docs reference: https://datatables.net/reference/api/search()
    //            dt.search('').draw();
    //        });
    //    }

    //    // Init toggle toolbar
    //    var initToggleToolbar = function () {
    //        // Toggle selected action toolbar
    //        // Select all checkboxes
    //        const container = document.querySelector('#kt_datatable_example_1');
    //        const checkboxes = container.querySelectorAll('[type="checkbox"]');

    //        // Select elements
    //        const deleteSelected = document.querySelector('[data-kt-docs-table-select="delete_selected"]');

    //        // Toggle delete selected toolbar
    //        checkboxes.forEach(c => {
    //            // Checkbox on click event
    //            c.addEventListener('click', function () {
    //                setTimeout(function () {
    //                    toggleToolbars();
    //                }, 50);
    //            });
    //        });

    //        // Deleted selected rows
    //        deleteSelected.addEventListener('click', function () {
    //            // SweetAlert2 pop up --- official docs reference: https://sweetalert2.github.io/
    //            Swal.fire({
    //                text: "Are you sure you want to delete selected customers?",
    //                icon: "warning",
    //                showCancelButton: true,
    //                buttonsStyling: false,
    //                showLoaderOnConfirm: true,
    //                confirmButtonText: "Yes, delete!",
    //                cancelButtonText: "No, cancel",
    //                customClass: {
    //                    confirmButton: "btn fw-bold btn-danger",
    //                    cancelButton: "btn fw-bold btn-active-light-primary"
    //                },
    //            }).then(function (result) {
    //                if (result.value) {
    //                    // Simulate delete request -- for demo purpose only
    //                    Swal.fire({
    //                        text: "Deleting selected customers",
    //                        icon: "info",
    //                        buttonsStyling: false,
    //                        showConfirmButton: false,
    //                        timer: 2000
    //                    }).then(function () {
    //                        Swal.fire({
    //                            text: "You have deleted all selected customers!.",
    //                            icon: "success",
    //                            buttonsStyling: false,
    //                            confirmButtonText: "Ok, got it!",
    //                            customClass: {
    //                                confirmButton: "btn fw-bold btn-primary",
    //                            }
    //                        }).then(function () {
    //                            // delete row data from server and re-draw datatable
    //                            dt.draw();
    //                        });

    //                        // Remove header checked box
    //                        const headerCheckbox = container.querySelectorAll('[type="checkbox"]')[0];
    //                        headerCheckbox.checked = false;
    //                    });
    //                } else if (result.dismiss === 'cancel') {
    //                    Swal.fire({
    //                        text: "Selected customers was not deleted.",
    //                        icon: "error",
    //                        buttonsStyling: false,
    //                        confirmButtonText: "Ok, got it!",
    //                        customClass: {
    //                            confirmButton: "btn fw-bold btn-primary",
    //                        }
    //                    });
    //                }
    //            });
    //        });
    //    }

    //    // Toggle toolbars
    //    var toggleToolbars = function () {
    //        // Define variables
    //        const container = document.querySelector('#kt_datatable_example_1');
    //        const toolbarBase = document.querySelector('[data-kt-docs-table-toolbar="base"]');
    //        const toolbarSelected = document.querySelector('[data-kt-docs-table-toolbar="selected"]');
    //        const selectedCount = document.querySelector('[data-kt-docs-table-select="selected_count"]');

    //        // Select refreshed checkbox DOM elements
    //        const allCheckboxes = container.querySelectorAll('tbody [type="checkbox"]');

    //        // Detect checkboxes state & count
    //        let checkedState = false;
    //        let count = 0;

    //        // Count checked boxes
    //        allCheckboxes.forEach(c => {
    //            if (c.checked) {
    //                checkedState = true;
    //                count++;
    //            }
    //        });

    //        // Toggle toolbars
    //        if (checkedState) {
    //            selectedCount.innerHTML = count;
    //            toolbarBase.classList.add('d-none');
    //            toolbarSelected.classList.remove('d-none');
    //        } else {
    //            toolbarBase.classList.remove('d-none');
    //            toolbarSelected.classList.add('d-none');
    //        }
    //    }

    //    // Public methods
    //    return {
    //        init: function () {
    //            initDatatable();
    //            handleSearchDatatable();
    //            initToggleToolbar();
    //            handleFilterDatatable();
    //            handleDeleteRows();
    //            handleResetForm();
    //        }
    //    }
    //}();


    //CurrentAccountDatatable.init();



    // Class definition

    ///////////////////////////////////
    var showCat = $("#showCat").val();
    const contractId = $('#Id').val() == '' ? 0 : parseInt($('#Id').val());
    const v_regnom = $('#REGNOM').val() == '' ? 0 : parseInt($('#REGNOM').val());
    const validators = document.getElementById('vError');
    if (validators) {
        OnSuccessUser(validators.value, showCat);
    }
    LoadCari();
    LoadCard();
    CheckAllCredit(contractId, v_regnom);
    LoadOperInfo(contractId, showCat);

    var intervalID; // Variable to store the interval ID
    $('#activate-SMS').on('hidden.bs.modal', function () {
        document.getElementById("counter").innerHTML = "";
        document.getElementById("line-container").style.width = "0";
        clearTimeout(intervalID); // Clear the timeout
    });


    const surname = document.querySelector(".client-surname");
    const fatherName = document.querySelector(".client-father-name");
    const clientVoen = document.querySelector(".client-voen");
    const clientFincode = document.querySelector(".client-fincode")
    const finOrVoen = document.getElementById("finOrVoen")
    const ownerModel = document.getElementById('ClientType');
    if (ownerModel) {
        if (ownerModel.value == "H") {
            surname.style.display = "none";
            fatherName.style.display = "none";
            clientVoen.style.display = "flex";
            clientFincode.style.display = "none";
            finOrVoen.innerHTML = "Vöen"
        }
        else if (ownerModel.value == "S") {
            surname.style.display = "flex";
            //fatherName.style.display = "flex";
            clientVoen.style.display = "flex";
            clientFincode.style.display = "flex";
            finOrVoen.innerHTML = "Vöen  / Fin kod"
        }
        else if (ownerModel.value = "F") {
            surname.style.display = "flex";
            fatherName.style.display = "flex";
            clientVoen.style.display = "none";
            clientFincode.style.display = "flex";
            finOrVoen.innerHTML = "Fin kod"
        }
        else {
            surname.style.display = "flex";
            fatherName.style.display = "flex";
            clientVoen.style.display = "flex";
            clientFincode.style.display = "flex";
            finOrVoen.innerHTML = "Vöen  / Fin kod"
        }
    }

    ConfigureKreditStatusChangeEvent();
    ConfigureAsanFinanceRequestEvent();
})

function UpdateRelatedPerson() {
    $("#update-related-people-form").on("submit", function (e) {
        e.preventDefault();
        var form = $(this);
        console.log(form.serialize());
        var actionUrl = form.attr('action');

        $.ajax({
            type: "post",
            url: actionUrl,
            data: form.serialize(),
            success: function (data) {
                alert(data);
            }
        });
    });
}

function GetRelatedPersonDetailsById() {
    $(".client-related-people-row").on("click", function (e) {
        e.preventDefault();
        var relatedPersonId = $(this).data("id");
        $.ajax({
            type: "GET",
            url: "/reporting/aml/GetAMLClientRelatedPersonById?relatedPersonId=" + relatedPersonId,
            dataType: "html",
            success: function (data) {
                $(".related-people-details").remove();
                $("#related-people-content").append(data);

                let RelatePeopleForm = $("#update-related-people-form");

                RelatePeopleForm.find("[data-control='select2']").select2({
                    closeOnSelect: false
                })

                RelatePeopleForm.removeData("validator")
                    .removeData("unobtrusiveValidation");
                $.validator.unobtrusive.parse(RelatePeopleForm);
                RelatePeopleForm.data("validator").settings.ignore = "";

                RelatePeopleForm.each(function () {
                    $(this).find(':input').each(function () {
                        try {
                            $(this).valid();
                            //$(this).on("input", function () {
                            //    $(this).valid()
                            //});
                        } catch (e) {
                            console.log(e)
                        }
                    });
                });
            },
            error: function () {
                console.error("Failed to fetch data from the GetAMLClientRelatedPersonById service.");
            }
        });
    });
}

function ConfigureUserInfoSumbitButton() {
    $("#submit-user-info-form").on("click", function () {


        $("#user-info-form").validate();
        if ($('#user-info-form').valid()) {
            $("#user-info-form").trigger("submit");
        }
        else {
            $(".nav-link").removeClass("invalid-form")
            $(".tab-pane").each(function (i, obj) {
                //console.log($(this).has(".input-validation-error"))
                //$(`[href="#${id}"]`).addClass(".invalid-form");
                //console.log($(this).has(".input-validation-error").length)
                if ($(this).has(".input-validation-error").length) {
                    let id = $(this).attr("id");
                    $(`[href="#${id}"]`).addClass("invalid-form");
                    console.log($(`[href="#${id}"]`))
                }
            });
        }
    })
}

function ConfigureGetClientNotes(finCode) {
    if (finCode) {
        $.ajax({
            type: "POST",
            url: "/api/client-notes/get-all-by",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ "fin": finCode.value }),
            success: function (notes) {
                notes.forEach(function (note) {
                    appendNoteToTimeline(note);
                });
            },
            error: function () {
                console.error("Failed to fetch data from the gRPC service.");
            }
        });

        function appendNoteToTimeline(note) {
            var $timelineItem = $("<div class='timeline-item'></div>");
            var $timelineLine = $("<div class='timeline-line w-40px'></div>");
            var $timelineIcon = $("<div class='timeline-icon symbol symbol-circle symbol-40px'>" +
                "<div class='symbol-label bg-light'>" +
                "<i class='ki-duotone ki-sms fs-2 text-gray-500'>" +
                "<span class='path1'></span>" +
                "<span class='path2'></span>" +
                "</i></div></div>");
            var $timelineContent = $("<div class='timeline-content mb-10 mt-n1'></div>");

            // Populate the content with note data
            var $title = $("<div class='pe-3 mb-5'>" +
                "<div class='m-0'>" +
                "<div class='d-flex align-items-center collapsible py-3 toggle mb-0 collapsed' data-bs-toggle='collapse' data-bs-target='#kt_note" + note.id + "' aria-expanded='true'>" +
                "<div class='btn btn-sm btn-icon mw-20px btn-active-color-primary me-5'>" +
                "<i class='ki-duotone ki-minus-square toggle-on text-primary fs-1'><span class='path1'></span><span class='path2'></span></i>" +
                "<i class='ki-duotone ki-plus-square toggle-off fs-1'><span class='path1'></span><span class='path2'></span><span class='path3'></span></i>" +
                "</div>" +
                "<h4 class='text-gray-700 fw-bold cursor-pointer mb-0'>" + note.title + "</h4>" +
                "</div>" +
                "<div id='kt_note" + note.id + "' class='fs-6 ms-1 collapse' style=''>" +
                "<div class='mb-4 text-gray-600 fw-semibold fs-6 ps-10'>" + note.note + "</div>" +
                "</div>" +
                "<div class='separator separator-dashed'></div>" +
                "</div>" +
                "<div class='overflow-auto pb-5'>" +
                "<div class='d-flex align-items-center mt-1 fs-6'>" +
                "<div class='text-muted me-2 fs-7'>Added at " + note.addedAt + " by</div>" +
                "<a href='#' class='text-primary fw-bold me-1'>" + note.addedBy + "</a></div></div></div>");

            ;

            $timelineContent.append($title);
            $timelineItem.append($timelineLine, $timelineIcon, $timelineContent);

            // Append the timeline item to your timeline container
            $(".timeline").prepend($timelineItem);
        }

        $('#add-client-note').on("submit", function (event) {
            event.preventDefault();
            $("#add-client-note-spinner").removeClass("d-none");
            var formData = $(this).serialize();
            formData += `&ClientFin=${finCode.value}`;
            $.ajax({
                url: '/api/client-notes/add',
                type: 'POST',
                data: formData,
                success: function (data) {
                    appendNoteToTimeline(data);
                    $("#add-client-note-spinner").addClass("d-none");
                    $('#add-client-note')[0].reset();
                },
                error: function (error) {
                    console.error('Error:', error);
                    $("#add-client-note-spinner").addClass("d-none");
                }
            });
        });
    }
}

function ConfigureKreditStatusChangeEvent() {
    $('#KreditStatus').on("change", function (e) {
        $('#LoadingcreditInfo').show();
        let p_status = 'false';
        var vcontractId = $('#Id').val() == '' ? 0 : parseInt($('#Id').val());
        if (this.checked) {
            document.getElementById('forKreditStatus').innerHTML = "Bağlı kreditlər";
            p_status = 'true';
        } else {
            document.getElementById('forKreditStatus').innerHTML = "Aktiv kreditlər";
            p_status = 'false';
        }
        $('#creditList').html(LoaginIcon);
        $.getJSON('/Kredit/GetAllCreditsStatus?v_contractId=' + vcontractId + '&v_status=' + p_status, function (data) {
            if (data.data.length == 0) {
                var items = '<option >Tapılmayıb</option>';
            } else {
                $.each(data.data, function (i, state) {
                    items += "<option value='" + state.Id + "'>" + state.Tipkre + "-" + state.Subschkre + " " + state.CreditAmount + " " + state.Valyuta + "</option>";
                });
            }
            $('#creditList').html(items);
            $('#LoadingcreditInfo').hide();
        });

    })
}
function fetchFatcaComponent(owner, finCode) {

    //if (owner.value === "H") {
    //    fetchFatcaComponent("Yurik", finCode);
    //}
    //else {
    //    fetchFatcaComponent("Fizik", finCode);
    //}

    return fetch(`/Reporting/CRS/GetFatca${owner == 'H' ? "Yurik" : "Fizik"}?fin=${finCode}`)
        .then(response => response.text())
        .then(data => {

            const ktFatkaCrs = document.getElementById("kt_fatka_crs");
            ktFatkaCrs.innerHTML = data;

            //var forms = ktFatkaCrs.getElementsByTagName("form");
            //var newForm = forms[forms.length - 1];
            //$.validator.unobtrusive.parse(newForm);


            const fatkaSpinner = document.getElementById("fatka-spinner");
            if (fatkaSpinner) {
                fatkaSpinner.remove();
            }

            //const fatcaClientId = document.getElementById("ClientId");
            //if (fatcaClientId.value == 0) {

            //}


            //add event to form to update
            //document.getElementById("update-fatca-btn").addEventListener("click", function (e) {
            //    e.preventDefault();
            //    var fatcaForm = $("#update-fatca-form");
            //    //fatcaForm.validate();
            //    if (fatcaForm.valid()) {
            //        const formData = new FormData(document.getElementById("update-fatca-form"));

            //        fetch(`/Reporting/CRS/UpdateFatca${owner}`, {
            //            method: "POST",
            //            body: formData,
            //        })
            //            .then(response => response.json())
            //            .then(response => {
            //                if (!response.success) {
            //                    toastr.success("Fatca Id updated successfully!");
            //                    document.getElementById("kt_fatka_crs_nav_link").classList.remove("text-danger");
            //                }
            //                else {
            //                    console.error("An error occurred while updating the Fatca Id.");
            //                    toastr.error("An error occurred while updating the Fatca Id.");
            //                }
            //            })
            //            .catch(error => {
            //                console.error("An error occurred while updating the Fatca Id:" + error);
            //                toastr.error("An error occurred while updating the Fatca Id.");
            //            });

            //    } else {
            //        toastr.error("Xahiş olunur lazımi xanaları doldurun.");
            //        return false;
            //    }
            //});


            //bind the visibility of w8 elements to w8 checkbox input.
            //const w8Elements = document.querySelectorAll(".w8-elements");
            //if (w8Elements) {
            //    w8Elements.forEach(w8Element => {
            //        w8Element.style.display = "none";
            //    });
            //}
            //else {
            //    console.info("w8Elements couldn't be found.")
            //}
            //const w8Checkbox = document.getElementById("W8");
            //if (w8Checkbox) {
            //    w8Checkbox.addEventListener("click", function () {
            //        if (this.checked) {
            //            w8Elements.forEach(w8Element => {
            //                w8Element.style.display = "block";
            //                w8Element.style.transition = "display 0.3s";
            //            });
            //        } else {
            //            w8Elements.forEach(w8Element => {
            //                w8Element.style.display = "none";
            //                w8Element.style.transition = "display 0.2s";
            //            });
            //        }
            //    });
            //}
            //else {
            //    console.info("w8Checkbox couldn't be found.")
            //}

            //get input values from profile to fatka
            //const adSoyad = document.getElementById("AdSoyad");
            //if (adSoyad.value.length === 0) {
            //    adSoyad.value = document.getElementById("FirstName").value + " " + document.getElementById("LastName").value;
            //}
            //const address = document.getElementById("Address");
            //if (address.value.length === 0) {
            //    address.value = document.getElementById("RegistrationAddress").value;
            //}
            //const grajdanstvo = document.getElementById("Grajdanstvo");
            //if (grajdanstvo && grajdanstvo.value.length === 0) {
            //    const countryCode = document.getElementById("CountryCode");
            //    grajdanstvo.value = countryCode.options[countryCode.selectedIndex].text;
            //}
            //const birthday = document.getElementById("DataRojdenie");
            //if (birthday && birthday.value.length === 0) {
            //    birthday.value = document.getElementById("BirthDate").value;
            //}
            //const city = document.getElementById("City");
            //if (city.value.length === 0) {
            //    city.value = document.getElementById("City").value;
            //}
            //const birthplace = document.getElementById("MestoRojdeniya");
            //if (birthplace && birthplace.value.length === 0) {
            //    birthplace.value = document.getElementById("BirthPlace").value;
            //}
            //const zipCode = document.getElementById("Zipcod");
            //if (zipCode.value.length === 0) {
            //    zipCode.value = document.getElementById("POCHT_INDEX").value;
            //}
        })
    //.catch(error => {
    //    console.error("Failed to load data:", error);
    //});
}

function fetchAMLComponent(owner, clientId) {
    //if (owner === "H") {
    //    fetchAMLComponent("Juridical", finCode);
    //}
    //else {
    //    fetchAMLComponent("Physical", finCode);
    //}

    return fetch(`/Reporting/AML/GetAML${owner == 'H' ? "Juridical" : "Physical"}?clientId=${clientId}`)
        .then(response => response.text())
        .then(data => {
            const kt_aml = document.getElementById("kt_aml");
            kt_aml.innerHTML = data;

            //var forms = kt_aml.getElementsByTagName("form");
            //var newForm = forms[forms.length - 1];



            const amlSpinner = document.getElementById("aml-spinner");
            if (amlSpinner) {
                amlSpinner.remove();
            }

            //const fatcaClientId = document.getElementById("ClientId");
            //if (fatcaClientId.value == 0) {
            //    document.getElementById("kt_aml_nav_link").classList.add("text-danger");
            //}

            //add event to form to update
            //document.getElementById("update-aml-btn").addEventListener("click", function (e) {
            //    e.preventDefault();
            //    var fatcaForm = $("#update-aml-form");
            //    //fatcaForm.validate();
            //    if (fatcaForm.valid()) {
            //        const formData = new FormData(document.getElementById("update-aml-form"));

            //        fetch(`/ClientUser/UpdateAML${owner}`, {
            //            method: "POST",
            //            body: formData,
            //        })
            //            .then(response => response.json())
            //            .then(response => {
            //                if (!response.success) {
            //                    toastr.success("AML Id updated successfully!");
            //                    document.getElementById("kt_fatka_crs_nav_link").classList.remove("text-danger");
            //                }
            //                else {
            //                    console.error("An error occurred while updating the Fatca Id.");
            //                    toastr.error("An error occurred while updating the Fatca Id.");
            //                }
            //            })
            //            .catch(error => {
            //                console.error("An error occurred while updating the Fatca Id:" + error);
            //                toastr.error("An error occurred while updating the Fatca Id.");
            //            });

            //    } else {
            //        toastr.error("Xahiş olunur lazımi xanaları doldurun.");
            //        return false;
            //    }
            //});


            //bind the visibility of w8 elements to w8 checkbox input.
            //const w8Elements = document.querySelectorAll(".w8-elements");
            //if (w8Elements) {
            //    w8Elements.forEach(w8Element => {
            //        w8Element.style.display = "none";
            //    });
            //}
            //else {
            //    console.info("w8Elements couldn't be found.")
            //}
            //const w8Checkbox = document.getElementById("W8");
            //if (w8Checkbox) {
            //    w8Checkbox.addEventListener("click", function () {
            //        if (this.checked) {
            //            w8Elements.forEach(w8Element => {
            //                w8Element.style.display = "block";
            //                w8Element.style.transition = "display 0.3s";
            //            });
            //        } else {
            //            w8Elements.forEach(w8Element => {
            //                w8Element.style.display = "none";
            //                w8Element.style.transition = "display 0.2s";
            //            });
            //        }
            //    });
            //}
            //else {
            //    console.info("w8Checkbox couldn't be found.")
            //}

            //get input values from profile to fatka
            //const name = document.getElementById("FirstName-aml");
            //if (name.value.length === 0) {
            //    name.value = document.getElementById("FirstName").value;
            //}
            //const surname = document.getElementById("LastName-aml");
            //if (surname.value.length === 0) {
            //    surname.value = document.getElementById("LastName").value;
            //}
            //const fatherName = document.getElementById("FatherName-aml");
            //if (fatherName.value.length === 0) {
            //    fatherName.value = document.getElementById("FatherName").value;
            //}
            //const fin = document.getElementById("Fin");
            //if (fin.value.length === 0) {
            //    fin.value = document.getElementById("FinCode").value;
            //}
            //const address = document.getElementById("Address");
            //if (address.value.length === 0) {
            //    address.value = document.getElementById("RegistrationAddress").value;
            //}
            //const grajdanstvo = document.getElementById("Grajdanstvo");
            //if (grajdanstvo && grajdanstvo.value.length === 0) {
            //    const countryCode = document.getElementById("CountryCode");
            //    grajdanstvo.value = countryCode.options[countryCode.selectedIndex].text;
            //}
            //const birthday = document.getElementById("DataRojdenie");
            //if (birthday && birthday.value.length === 0) {
            //    birthday.value = document.getElementById("BirthDate").value;
            //}
            //const city = document.getElementById("City");
            //if (city.value.length === 0) {
            //    city.value = document.getElementById("City").value;
            //}
            //const birthplace = document.getElementById("MestoRojdeniya");
            //if (birthplace && birthplace.value.length === 0) {
            //    birthplace.value = document.getElementById("BirthPlace").value;
            //}
            //const zipCode = document.getElementById("Zipcod");
            //if (zipCode.value.length === 0) {
            //    zipCode.value = document.getElementById("POCHT_INDEX").value;
            //}
        })
    //.catch(error => {
    //    console.error("Failed to load data:", error);
    //});
}
function GetAMLClientRepresentatives(owner, clientId) {

    return fetch(`/Reporting/AML/GetAMLClientRepresentatives?clientId=${clientId.value}`)
        .then(response => response.text())
        .then(data => {
            const ktRepresentatives = document.getElementById("kt_representatives");
            ktRepresentatives.innerHTML = data;

            //var forms = ktRepresentatives.getElementsByTagName("form");
            //var newForm = forms[forms.length - 1];
            //$.validator.unobtrusive.parse(newForm);


            const representativesSpinner = document.getElementById("representatives-spinner");
            if (representativesSpinner) {
                representativesSpinner.remove();
            }
            $("#aml-client-representatives").DataTable({
                "fixedHeader": {
                    "header": true
                },
                responsive: true,
                select: true,
                searching: true,
            });
            //document.getElementById("update-aml-btn").addEventListener("click", function (e) {
            //    e.preventDefault();
            //    var fatcaForm = $("#update-aml-form");
            //    fatcaForm.validate();
            //    if (fatcaForm.valid()) {
            //        const formData = new FormData(document.getElementById("update-aml-form"));

            //        fetch(`/ClientUser/UpdateAML${owner}`, {
            //            method: "POST",
            //            body: formData,
            //        })
            //            .then(response => response.json())
            //            .then(response => {
            //                if (!response.success) {
            //                    toastr.success("AML Id updated successfully!");
            //                    document.getElementById("kt_fatka_crs_nav_link").classList.remove("text-danger");
            //                }
            //                else {
            //                    console.error("An error occurred while updating the Fatca Id.");
            //                    toastr.error("An error occurred while updating the Fatca Id.");
            //                }
            //            })
            //            .catch(error => {
            //                console.error("An error occurred while updating the Fatca Id:" + error);
            //                toastr.error("An error occurred while updating the Fatca Id.");
            //            });

            //    } else {
            //        toastr.error("Xahiş olunur lazımi xanaları doldurun.");
            //        return false;
            //    }
            //});
        })
        .catch(error => {
            console.error("Failed to load data:", error);
        });
}

function GetAMLClientRelatedPeople(owner, clientId) {

    return fetch(`/Reporting/AML/GetAMLClientRelatedPeople?clientId=${clientId.value}`)
        .then(response => response.text())
        .then(data => {
            const ktRepresentatives = document.getElementById("kt_relatedpeople");
            ktRepresentatives.innerHTML = data;

            //var forms = ktRepresentatives.getElementsByTagName("form");
            //var newForm = forms[forms.length - 1];
            //$.validator.unobtrusive.parse(newForm);


            const representativesSpinner = document.getElementById("relatedpeople-spinner");
            if (representativesSpinner) {
                representativesSpinner.remove();
            }

            $("#aml-client-related-people").DataTable({
                "fixedHeader": {
                    "header": true
                },
                responsive: true,
                select: true,
                searching: true,
            });
            //document.getElementById("update-aml-btn").addEventListener("click", function (e) {
            //    e.preventDefault();
            //    var fatcaForm = $("#update-aml-form");
            //    fatcaForm.validate();
            //    if (fatcaForm.valid()) {
            //        const formData = new FormData(document.getElementById("update-aml-form"));

            //        fetch(`/ClientUser/UpdateAML${owner}`, {
            //            method: "POST",
            //            body: formData,
            //        })
            //            .then(response => response.json())
            //            .then(response => {
            //                if (!response.success) {
            //                    toastr.success("AML Id updated successfully!");
            //                    document.getElementById("kt_fatka_crs_nav_link").classList.remove("text-danger");
            //                }
            //                else {
            //                    console.error("An error occurred while updating the Fatca Id.");
            //                    toastr.error("An error occurred while updating the Fatca Id.");
            //                }
            //            })
            //            .catch(error => {
            //                console.error("An error occurred while updating the Fatca Id:" + error);
            //                toastr.error("An error occurred while updating the Fatca Id.");
            //            });

            //    } else {
            //        toastr.error("Xahiş olunur lazımi xanaları doldurun.");
            //        return false;
            //    }
            //});
        })
        .catch(error => {
            console.error("Failed to load data:", error);
        });
}
function ConfigureAsanFinanceRequestEvent() {
    $("#asan-finance").on("click", function (e) {
        e.preventDefault();
        /* var contractId = $('#Id').val() == '' ? 0 : parseInt($('#Id').val());*/
        const owner = document.getElementById("ClientType").value;
        const Voen = document.getElementById("Voen").value;
        const FinCode = document.getElementById("FinCode").value;
        //console.log("owner");
        //console.log(owner);
        //console.log("VOEN");
        //console.log(Voen);
        //console.log("FINKOD");
        //console.log(FinCode);
        //if (owner == "F") {
        //    window.location = `?finorvoen=${FinCode}`;
        //} else {
        //    window.location = `?finorvoen=${Voen}`;
        //}
        if (Voen) {
            window.location = `?finorvoen=${Voen}`;
        } else {
            window.location = `?finorvoen=${FinCode}`;
        }
        //$.ajax({
        //    url: '?finorvoen=${finkod}',
        //    datatype: "json",
        //    type: "get",
        //    contenttype: 'application/json; charset=utf-8',
        //    cache: false,
        //    //data: { finorvoen: "dsdsd"},
        //    success: function (data) {
        //
        //    },
        //    error: function (xhr) {
        //        window.location = '?finorvoen=${finkod}';
        //    }
        //});
    })
}

//function ReConfigureProfileInputValidations() {
//    $('#kt_profil input').each(function () {
//        try {
//            $(this).valid();
//            $(this).on("input", function () {
//                $(this).valid()
//            });
//        } catch (e) {
//            console.log(e)
//        }
//    });
//}
// SMS and OTP//
function phoneOw(pthis) {
    $(pthis).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: '/ClientUser/GetPhoneOwner',
                type: "POST",
                dataType: "json",
                data: { searchstr: request.term },
                success: function (data) {
                    response($.map(data.data, function (item) {
                        return { label: item.Name, value: item.Name };
                    }))
                }
            })
        }
    });
    // alert(pthis.value);
}

function startCounter() {
    var seconds = 120;
    var maxWidth = $("#SmsBody").width(); // Maximum width of the line container
    var incrementWidth = maxWidth / (seconds - 1); // Width to increase every second
    var lineWidth = 0;
    var lineContainer = document.getElementById("line-container");
    lineContainer.style.width = lineWidth + "px";

    function tick() {
        var counter = document.getElementById("counter");
        seconds--;
        var minute = parseInt(seconds / 60, 10);
        var ms = parseInt(seconds % 60, 10);
        counter.innerHTML = "0" + minute + ":" + (ms < 10 ? "0" : "") + String(ms);
        if (seconds > 0) {
            lineWidth += incrementWidth;
            lineContainer.style.width = lineWidth + "px";
            intervalID = setTimeout(tick, 1000);
        } else {
            $("#activate-SMS").modal("hide");
        }
    }
    tick();
}

function ActivateMobile() {
    var mobileNum = $('#MobileNumber').val().replace(/[^0-9]/g, '');
    var contractId = $('#Id').val() == '' ? 0 : parseInt($('#Id').val());
    $('#otpCode').val("");
    if (mobileNum.length != 12) {
        callError('Xəta xahiş olunur telfon nömrəsini yenidən qeyd edib Aktiv edilməni yoxlayasınız !!!');
    } else {
        $('#smsOverlay').show();
        $('#activate-SMS').modal({ backdrop: 'static', keyboard: false }).show();
        $.ajax({
            type: "POST",
            url: '/ClientUser/SendSMS',
            data: { mobNum: mobileNum, contactId: contractId },
            success: function (data) {
                var ErrorValue = $.trim(data.errorStr);
                if (data.v_status == 0) {
                    $('#smsOverlay').hide();
                    setTimeout(startCounter, 0);
                    toastr.info(ErrorValue, 'SMS-Kod uğurla göndərildi');
                } else if (data.v_status == 2) {
                    if (ErrorValue != '') {
                        toastr.options.positionClass = 'toast-top-center';
                        toastr.error(ErrorValue, 'Xəta');
                        $('#activate-SMS').modal('hide');
                        callError('Xəta Qeyd Edilmiş nömrə aşağıda qeyd edilən müştərilərdə əsas nömrə kimi qeyd olunub  - ' + ErrorValue);
                    }
                } else {
                    if (ErrorValue != '') {
                        toastr.options.positionClass = 'toast-top-center';
                        toastr.error(ErrorValue, 'Xəta');
                        $('#activate-SMS').modal('hide');
                        callError('Xəta  - ' + ErrorValue);
                    }
                }
            },
            error: function () {
                //$("#commentList").append($("#name").val() + "<br/>" + $("#body").val());
                toastr.info(ErrorValue, 'əməliyyatda xəta');
            }
        });
    }
    //$("#SmsBody").load('@Url.Action("SendSMS", "ClientUser", null, Context.Request.Scheme)?mobNum=' + mobileNum + '&contactId=' + contractId, function () { });
}
function chkOtp() {
    var otp = $('#otpCode').val();
    var mobilNum = $('#MobileNumber').val().replace(/[^0-9]/g, '');
    var contractId = $('#Id').val() == '' ? 0 : parseInt($('#Id').val());
    $('#smsOverlay').show();
    $.ajax({
        type: "POST",
        url: '/ClientUser/chekOtp',
        data: { mobNum: mobilNum, contactId: contractId, otpCode: otp },
        success: function (data) {
            var ErrorValue = $.trim(data.errorStr);
            $('#smsOverlay').hide();
            if (data.v_status == 0) {
                toastr.info(ErrorValue, 'Nömrə uğurla aktiv edildi!!');
                $('#activate-SMS').modal('hide');
                $('#ApprovedMobile').val('True');
                var btnfront = document.getElementById('MobileNumber_btn');
                var btnActive = document.getElementById('MobileNumber_btnactive');
                btnfront.style.display = "block";
                btnActive.style.display = "none";
            } else {
                if (ErrorValue != '') {
                    toastr.options.positionClass = 'toast-top-center';
                    toastr.error(ErrorValue, 'Xəta');
                    callError('Xəta  - ' + ErrorValue);
                }
            }
        }
    });

    //$("#SmsBody").load('@Url.Action("SendSMS", "ClientUser", null, Context.Request.Scheme)?mobNum=' + mobileNum + '&contactId=' + contractId, function () { });
}
// Webcam//
function showWebcam() {
    var contractId = $('#Id').val() == '' ? 0 : parseInt($('#Id').val());
    $('#modal-webcam').modal({ backdrop: 'static', keyboard: false }).show();
    $(function () {
        Webcam.set({
            width: 445,
            height: 260,
            image_format: 'jpeg',
            jpeg_quality: 90
        });
        Webcam.attach('#webcam');
        $("#btnCapture").click(function () {
            $("#demo").show();
            $("#imgCapture").hide();
            $("#uploadImage").prop('disabled', false);

            var d = new Date();
            var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            var date = d.getDate() + " " + month[d.getMonth()] + ", " + d.getFullYear();
            var time = d.toLocaleTimeString().toLowerCase();

            Webcam.snap(function (data_uri) {
                var img = new Image(),
                    watermark = date + " saat " + time,
                    canvas = document.getElementById("demo"),
                    ctx = canvas.getContext("2d");

                // (C) ADD WATERMARK (WHEN IMAGE IS FULLY LOADED)
                img.onload = () => {
                    // (C1) SET IMAGE
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

                    // (C2) ADD WATERMARK
                    ctx.font = "bold 24px Arial";
                    ctx.fillStyle = "rgba(255, 25, 3, 1)";
                    ctx.fillText(watermark, 10, 30);

                }
                img.src = data_uri;
                //$("#imgCapture")[0].src = data_uri;
                //UploadClientImage();
                $("#btnUpload").removeAttr("disabled");
            });
        });
        $("#uploadImage").click(function () {
            let contractId = $('#Id').val() == '' ? 0 : parseInt($('#Id').val());
            let type = 'jpg';
            let canvas = document.getElementById("demo");
            let anchor = document.createElement("a");
            anchor.download = "download." + type;
            anchor.href = canvas.toDataURL("image/" + type);
            $.ajax({
                type: "POST",
                url: '/ClientUser/UploadClientImage',
                data: "{id:" + contractId + ",upload: '" + anchor.href + "'}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    var ErrorValue = $.trim(data.v_data);
                    if (data.v_status == 0) {
                        toastr.info(ErrorValue, 'Şəkil uğurla əlavə edildi !!');
                    } else {
                        callError('Xəta  - ' + ErrorValue);
                    }
                }

            });
        });


        $("#CloseWebcam").click(function () {
            $('#modal-webcam').modal('hide');
            Webcam.reset('#webcam');
        });



    });

    //$("#showWebcam").load('@Url.Action("ShowWebcam", "ClientUser", null, Context.Request.Scheme)?contactId=' + contractId);
}
function LoadKreditInfo(krInfo) {
    var krId = krInfo.value;
    var contractId = $('#Id').val() == '' ? 0 : parseInt($('#Id').val());
    $('#KreditShert').html(LoaginIcon);
    $('#oldKredit').modal('show');
    $("#KreditShert").load('/Credit/Kredit/GetKreditDebts?id=' + krId, function () { });
}
function assa(mmnt) {
    var ll = document.getElementById('CONTRACT_ID').value;
    alert(ll);
}
function HideScrenn(thisElement) {
    thisElement.type = 'text';
}
function ShowScrenn(thisElement) {
    thisElement.type = 'password';
}
function addPhoneDiv() {
    var counter = $('#PhoneCountId').val();
    if (counter == null) {
        counter = 0;
    }
    var phonId = counter;
    var getIt = "phone('SalePhones[" + phonId + "].PhoneNumber')"
    counter++;
    $('#PhoneCountId').val(counter);
    $("#phoneNum").append("<div class='input-group' id='phone" + counter + "'></div>");
    $("#phone" + counter).html("<label class='col col-form-label'> @Translations.key_Phone_Number " + counter + "</label>" +
        "<div class='col-sm-9 row'>" +
        "<div class='col-sm-6 input-group'>" +
        "<div class='input-group-prepend'>" +
        "<span class='input-group-text'><i class='ki-duotone ki-phone fs-2x'><span class='path1'></span><span class='path2'></span></i></span></div>" +
        "<input type='text' class=\"form-control\" data-inputmask='\"mask\": \"(+999 99) 999-99-99\"' data-mask  name='CLIENT_PHONES[" + phonId + "].PHONENUMBER' id='CLIENT_PHONES[" + phonId + "].PHONENUMBER' /></div>" +
        "<div class='col-sm-6'>" +
        "<input onfocus='phoneOw(this)' class='form-control text-box single-line' name='CLIENT_PHONES[" + phonId + "].PHONEOWNER' placeholder='Mobil Nömrə və ya Qohum' type='text'  ></div> </div>" +
        "<div class= \"col-1 text-md text-danger\" onclick=\" RemovePhone('phone" + counter + "')\" > <i class=\"fas fa-minus-circle\"></i></div > ");
    $('[data-mask]').inputmask();
}
function GetAsanFinance() {
    var fincode = $('#finorvoen').val();
}
function RemovePhone(phnId) {
    var phnDiv = document.getElementById(phnId);
    phnDiv.remove();
}
function RemovePhonenum(phnId) {
    var phnDiv = document.getElementById(phnId);
    var phnfront = document.getElementById(phnId + '_front');
    phnfront.style.display = "none";
    phnDiv.style.display = "block";
    phnDiv.value = "";
}
function RemoveMainPhonenum(phnId) {

    var phnfront = document.getElementById(phnId);
    var phnActive = document.getElementById(phnId + '_active');
    var btnfront = document.getElementById(phnId + '_btn');
    var btnActive = document.getElementById(phnId + '_btnactive');
    btnfront.style.display = "none";
    btnActive.style.display = "block";
    phnActive.style.display = "none";
    phnfront.style.display = "block";
    phnfront.value = "";
    $('#ApprovedMobile').val('False');
}
function OnSuccessUser(validators, showCat) {
    //const parser = new DOMParser();
    //const doc = parser.parseFromString(data, "text/html");
    //ViewBag.Error
    if (validators != null) {
        var ErrorValue = validators;
        if (ErrorValue != 'Ok') {
            //toastr.error(ErrorValue, 'Xəta');
            //toastr.optionsOverride = 'positionclass = "toast-head-full-width"';
            toastr.options.positionClass = 'toast-top-center';
            toastr.options.fadeOut = 10000;
            //show when the button is clicked
            showCat = "false"
            toastr.error(ErrorValue, 'Xəta');
        }
    } else if (data.v_status == 0) {
        toastr.info(ErrorValue, 'Uğurlu əməliyyat');
        $('#Id').val(data.v_ContId);

    }
}
function CheckAllCredit(vcontractId, vregnom) {
    $('#LoadingcreditInfo').show();
    var items = '<option >Yüklənir</option>';
    $('#creditList').html(items);
    $.getJSON('/Admin/Kredit/GetAllCreditsInfo?v_contractId=' + vcontractId + '&v_regnom=' + vregnom, function (data) {

        if (data.data.length == 0) {
            var items = '<option >Tapılmayıb</option>';
        } else {
            $.each(data.data, function (i, state) {
                //items += "<option value='" + state.Id + "'>" + state.Tipkre + " (" + state.Datebegin + ")  Kredit-" + state.CreditAmount + state.Valyuta + " Cari borc " + state.Ayliqodeme + state.Valyuta + "</option>";
                items += "<option value='" + state.Id + "'>" + state.Tipkre + "-" + state.Subschkre + " (" + state.Datebegin + ") " + state.CreditAmount + " " + state.Valyuta + "</option>";
            });
        }
        $('#creditList').html(items);
        $('#LoadingcreditInfo').hide();
    });
}

//Kart Data//
function LoadCard() {
    var contractId = $('#Id').val() == '' ? 0 : parseInt($('#Id').val());
    var cardData = $('#kt_client_cards');
    cardData.html(LoaginIcon);
    cardData.load('/Client/ClientCards/Index?id=' + contractId, function () {
        $("#Loading").hide();
        let oTable = $('#client-cards-data-table').DataTable({
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
        });
        $('#search-card-iban').keyup(function () {
            oTable.search($(this).val()).draw();
        })

        //$("#createCard").submit(function (e) {
        //    e.preventDefault();
        //    $("#Loading").show();
        //    var createdata = $('#createCard').serialize();
        //    $.ajax({
        //        url: '/MakeOrder/GetCardLicsch',
        //        type: "POST",
        //        dataType: "json",
        //        data: createdata,
        //        success: function (data) {

        //            var orderStatus = data.Status
        //            if (orderStatus == '1') {
        //                callError(data.data);
        //                $("#Loading").hide();

        //            } else if (orderStatus == '0') {
        //                toastr.info('OK', 'Uğurlu əməliyyat');
        //                callMessage(data.data);
        //                $("#CardHesab").html(data.Licsch)
        //                $("#Loading").hide();
        //                LoadCard();
        //            }
        //            $("#LoadingModal").hide();
        //        }
        //    })
        //});

        $("#submitNewCard").on("click", function () {
            //console.log("clicked");
            $(this).prop("disabled", true);

            $(".indicator-label").hide();
            $(".indicator-progress").show();

            var formData = $("#kt_modal_add_card_form").serialize();

            $.ajax({
                type: "POST",
                url: "/Client/ClientCards/CreateUnverified",
                data: formData,
                success: function () {
                    console.log("Success");
                },
                error: function () {
                    console.log("Error");
                },
                complete: function () {
                    $("#submitNewCard").prop("disabled", false);
                    $(".indicator-label").show();
                    $(".indicator-progress").hide();
                }
            });
        });
    });
}

// Cari Data//
function LoadCari() {
    var contractId = $('#Id').val() == '' ? 0 : parseInt($('#Id').val());
    var cariData = $('#kt_cari_data');
    cariData.html(LoaginIcon);
    cariData.load('/Client/CurrentAccounts/Index?id=' + contractId, function () {
        $("#Loading").hide();
        let oTable = $('#current-account-data-table').DataTable({
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
        });
        $('#search-current-account-iban').keyup(function () {
            oTable.search($(this).val()).draw();
        })

        $("#createCari").submit(function (e) {
            e.preventDefault();
            $("#Loading").show();
            var createdata = $('#createCari').serialize();
            $.ajax({
                url: '/MakeOrder/GetCariLicsch',
                type: "POST",
                dataType: "json",
                data: createdata,
                success: function (data) {

                    var orderStatus = data.Status
                    if (orderStatus == '1') {
                        callError(data.data);
                        $("#Loading").hide();

                    } else if (orderStatus == '0') {
                        toastr.info('OK', 'Uğurlu əməliyyat');
                        callMessage(data.data);
                        $("#CariHesab").html(data.Licsch)
                        $("#Loading").hide();
                        LoadCari();
                    }
                    $("#LoadingModal").hide();

                }
            })
        });
    });
}
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

function CariDetails(Id) {
    $.get('/CurrentAccounts/Details/' + Id, function (data) {
        $("#detailsContent").html(data);
        $("#LoadingModal").hide();
    });
}

// Cari//
function LoadOperInfo(contractId, showCat) {
    var tehlil = $('#clientOperInfo');

    tehlil.html(LoaginIcon);
    /**/
    tehlil.load('/Home/Operations?v_contractId=' + contractId + '&show_cat=' + showCat, function () {
        /**/
        if (contractId == 0) {
            $("#tehlilinfo").find(':input').prop('readonly', true);
        }
    });

}


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
function changeSpec(val) {

    if (val == "H") {
        surname.style.display = "none";
        fatherName.style.display = "none";
        clientVoen.style.display = "flex";
        clientFincode.style.display = "none";
        finOrVoen.innerHTML = "Vöen"
    }
    else if (val == "S") {
        surname.style.display = "flex";
        fatherName.style.display = "flex";
        clientVoen.style.display = "flex";
        clientFincode.style.display = "flex";
        finOrVoen.innerHTML = "Vöen  / Fin kod"
    }
    else if (val == "F") {
        surname.style.display = "flex";
        fatherName.style.display = "flex";
        clientVoen.style.display = "none";
        clientFincode.style.display = "flex";
        finOrVoen.innerHTML = "Fin kod"
    }
    else {
        surname.style.display = "flex";
        fatherName.style.display = "flex";
        clientVoen.style.display = "flex";
        clientFincode.style.display = "flex";
        finOrVoen.innerHTML = "Vöen  / Fin kod"
    }
}
