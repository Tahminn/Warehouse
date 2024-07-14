toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "6000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

$('[data-mask]').inputmask();

var LoaginIcon = '<div class="overlay-layer card-rounded bg-dark bg-opacity-5 justify-content-center d-flex item-center"><div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div></div>';

//const links = document.querySelectorAll(".menu-link");

//links.forEach(link => link.addEventListener("click", function () {
//    console.log("link clicked in site.js");
//    const loadingEl = document.createElement("div");
//    document.body.prepend(loadingEl);
//    loadingEl.classList.add("page-loader");
//    loadingEl.classList.add("flex-column");
//    loadingEl.classList.add("bg-dark");
//    loadingEl.classList.add("bg-opacity-25");
//    loadingEl.innerHTML = `<span class="spinner-border text-primary" role="status"></span>
//                           <span class="text-gray-800 fs-6 fw-semibold mt-5">Loading...</span>`;

//    KTApp.showPageLoading();
//     setTimeout(function() {
//         KTApp.hidePageLoading();
//         loadingEl.remove();
//     }, 5000);
//}));



$(document).ready(function () {
    $("#LoadingBody").hide();
    $("#myFilInput").on("keyup", function () {
        var input, filter, ul, li, a, i;
        filter = $(this).val().toUpperCase();
        div = document.getElementById("Fililas");
        a = div.getElementsByTagName("option");
        for (i = 0; i < a.length; i++) {
            txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
            } else {
                a[i].style.display = "none";
            }
        }
    });
});

window.onbeforeunload = function () {
    $("#LoadingBody").show();
};


//#region Users
//$(function () {

//    var _$estatesTable = $('#users-table');
//    async function getUsers(pageIndex, cursor, next, skip) {
//        let formData = new FormData($('#estate-filter')[0]);
//        let take = $("#estates-take").val()
//        formData.append("skip", skip);
//        formData.append("cursor", cursor);
//        formData.append("next", next);
//        formData.append("take", take);
//        await $.ajax({
//            type: 'POST',
//            url: '/users/getUsersByPage',
//            processData: false,
//            contentType: false,
//            data: formData,
//            beforeSend: function () {
//                $("#previous").prop("disabled", true);
//                $("#next").prop("disabled", true);
//                enablePaging = false;
//                _$estatesTable.html("")
//                for (var i = 0; i < take; i++) {
//                    _$estatesTable.append(`<div class="bg-white p-4 rounded shadow col-estate estate-box border border-1">
//                                                 <div class="animate-pulse">
//                                                   <div class="h-44 bg-gray-200 rounded mb-4"></div>
//                                                   <div class="h-4 bg-gray-200 rounded mb-2"></div>
//                                                   <div class="h-4 bg-gray-200 rounded"></div>
//                                                 </div>
//                                               </div>`);
//                }
//            },
//            success: function (result) {
//                if (result.length > 0) {
//                    _$estatesTable.html("")
//                    $.each(result, function (index, value) {
//                        _$estatesTable.append(`<div class="col-estate estate-box border border-1">
//                                                           <div class="top">`
//                            +
//                            `<a class="estate-details" target="_blank" href="/Estates/Details/${value.id}">DETALLI BAXIŞ</a>`
//                            +
//                            (value.EstateType != "undefined" ? `<div class="estate-type">${value.estateType}</div>` : "")
//                            +
//                            (value.announcementType != null ? `<div class="announcement-type">${value.announcementType}</div>` : "")
//                            +
//                            `<div  style="height: 16.9rem;display: flex;"><div class="loader-img"></div>`
//                            +
//                            (value.mainImage != null ? `<img src="${value.mainImage}" loading="lazy" class="lazy-loading-image" alt="${value.mainImage}" style="width: 100%;object-fit: cover;"/>` : "")
//                            +
//                            `</div>
//                                     <div class="heart-like-button" value="${value.id}" check-data="${(value.announcementType != null ? true : false)}"  onclick="addToFavButton(this)"></div>
//                                     </div>
//                                     <div class="bottom">
//                                     <h3 style="height: 35px;overflow-x: auto;">${value.title}</h3>
//                                     <div class="advants">
//                                     <div>
//                                     <span>Otaq sayı</span>
//                                     <div>`
//                            +
//                            (value.rooms != null ? `<i class="fas fa-th-large"></i><span>${value.rooms}</span>` : "(bilinmir)")
//                            +
//                            `</div></div>
//                                                               <div>
//                                                               <span>Sahə</span>
//                                                               <div>`
//                            +
//                            (value.homeSize != null ? `<i class="fas fa-vector-square">
//                                                               </i><span>${value.homeSize}<span>m<sup style="vertical-align: super !important;">2</sup></span></span>
//                                                                ` : "(bilinmir)")
//                            +
//                            `</div>
//                                                                </div>
//                                                                </div>
//                                                                <div class="price d-flex justify-content-between">`
//                            +
//                            (value.creationTime != null ? `<span>${value.creationTime}</span>` : "")
//                            +
//                            (value.price != null ? `<span>₼ ${value.price}</span>` : "(bilinmir)")
//                            +
//                            `</div>
//                                                             </div>
//                                                          </div>`)
//                    })

//                    $('.col-estate.estate-box .top').each(function (index) {
//                        if (index < 25) {
//                            $(this).css('background-image', 'url(../estate-replace-images/image-replace-' + index + '.jpeg)');
//                        }
//                        else {
//                            $(this).css('background-image', 'url(../estate-replace-images/image-replace-' + index - 25 + '.jpeg)');
//                        }
//                    });


//                    // Loop through each lazy-load image
//                    $('.lazy-loading-image').each(function () {
//                        var image = $(this);
//                        var loader = image.prev('.loader-img');

//                        loader.show();

//                        image.on('load', function () {
//                            loader.hide();
//                        });
//                    });

//                    var filteredCount = $("#estate-filtered-count").val();
//                    if (!filteredCount) {
//                        $("#estates-count-info").html(`<span class="text-danger">==></span> ${take * pageIndex - take + 1}-dən ${take * pageIndex}-dək göstərilir |`);
//                    }
//                    else {
//                        let lastPage = filteredCount / take;
//                        let estatePagination = $("#estate-pagination")
//                        let cursor = result[0].id;

//                        estatePagination.html("");
//                        $("#estates-count-info").html(`<span class="text-danger">==></span> '${filteredCount}' elandan ${take * pageIndex - take + 1}-dən ${take * pageIndex}-dək göstərilir |`);
//                        for (let i = Math.max(pageIndex - 3, 1); i <= Math.min(pageIndex + 3, Math.ceil(lastPage)); i++) {
//                            let skip = Math.abs((pageIndex - i) * take);
//                            let next = i > pageIndex ? true : false;
//                            if (!next) skip = skip - take;
//                            let li = $(`<li class="${pageIndex == i ? 'active ' : ''}paginate_button page-item"><button class="page-link">${i}</button></li>`);
//                            estatePagination.append(li);
//                            li.click(function (e) {
//                                e.preventDefault()
//                                getUsers(i, cursor, next, skip)
//                            })
//                        }
//                        let prev = $(`<li class="paginate_button page-item prev ${pageIndex == 1 ? 'disabled' : ''}"><button class="page-link" title="First"><i class="fa fa-angle-double-left"></i></button></li>`);
//                        estatePagination.prepend(prev);
//                        prev.click(function (e) {
//                            e.preventDefault()
//                            getUsers(pageIndex - 1, cursor, false, 0)
//                        })
//                        let next = $(`<li class="paginate_button page-item next ${pageIndex == lastPage ? 'disabled' : ''}"><button class="page-link" title="Last"><i class="fa fa-angle-double-right"></i></button></li>`);
//                        estatePagination.append(next);
//                        next.click(function (e) {
//                            e.preventDefault()
//                            getUsers(pageIndex + 1, cursor, true, 20)
//                        })
//                        $('html, body').animate({
//                            scrollTop: $("#EstatesTable").offset().top - 110
//                        }, 500);
//                    }
//                }
//                else {
//                    _$estatesTable.html("<div style='text-align: center;height: 60px;'>Göstəriləcək məlumat yoxdur.</div>")
//                }
//            },
//        });
//    }
//    async function getUsersCount() {
//        let formData = new FormData($('#estate-filter')[0]);
//        await $.ajax({
//            type: 'POST',
//            url: '/Users/UsersCount',
//            processData: false,
//            contentType: false,
//            data: formData,
//            success: function (result) {
//                $("#estate-filtered-count").val(result);
//            },
//        }).always(function () {
//            setTimeout(getUsersCount, 60000);
//        });
//    }
//    //async function processEstateRequests() {
//    //    try {
//    //        await getUsersCount();
//    //    }
//    //    catch (error) {
//    //        console.error(error);
//    //    }
//    //    try {
//    //        await getUsers(1);
//    //    }
//    //    catch (e) {
//    //        console.log(e)
//    //    }
//    //}


//    //Promise.resolve(processEstateRequests());
//    //processEstateRequests()
//    $('#getUsersButton').click(function (e) {
//        e.preventDefault();
//        getUsers(1);
//    });
//});
//#endregion
