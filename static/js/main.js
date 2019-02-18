$(function () {
    $('textarea').froalaEditor();
});

$('#fontTypeMenu').on('change', function () {
    $(".fr-view").css({ 'font-family': 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif !important' });
});


$('#fontSizeMenu').on('change', function () {
    $(".fr-view").css({ 'font-size': this.value });
});


$("#btnPrimary").click(function () {
    printPage();
});




function clickBtn(e) {
    var page = e.attributes["data-number"].value;
    var pagina = e.attributes["data-page"].value;
    var modal = $('#modalPrint');
    var parrafos = modal.find(`[data-number="${page}"]`);
    var p = parrafos[0].children[1].childNodes;
    renderContentPrint(p, pagina);
    printPage();
}

function renderContentPrint(p, pagina) {
    var parrafo = '';
    $('#containerPrint').empty();
    for (var i = 0; i < p.length - 3; i++) {
        parrafo += `<p class="${pagina + i}">${p[i].innerText}</p>`;
    }
    $('#containerPrint').append(p);
}

function setlistener() { }

function renderaddCard(content, page, pagenumber) {
    var card = `<div class="card" data-number="${pagenumber}" data-page="${page}">` +
        `<h5 class="card-header">Pagina:${page}</h5>` +
        `<div class="card-body">${content}
                        <a href="#" class="btn btn-primary" data-page="${page}" data-number="${pagenumber}" onclick="clickBtn(this);">imprimir</a>
                    </div>`+
        `</div>`
    $('.modal-body').append(card);
    this.setlistener();
}


function addContent(p) {
    var contenido = $('.fr-view');
    contenido.append(p);
}

function setPrint() {
    var contenido = $('.fr-view');
    var parrafos = contenido[0].children;
    var longitud = $('.fr-view')[0].children.length;

    var p = '';
    for (var index = 0; index < longitud; index++) {
        p += '<p class="contentJustify">' + parrafos[index].innerHTML + '</p>'
    }
}

function printPage() {

    settingsPageLine();
    settingsPaginado();
    $(".fr-view").print({
        globalStyles: false,
        mediaPrint: false,
        stylesheet: "css/print.css",
        noPrintSelector: ".no-print",
        iframe: true,
        append: null,
        prepend: null,
        manuallyCopyFormValues: true,
        deferred: $.Deferred(),
        timeout: 750,
        title: null,
        doctype: '<!doctype html>'
    });

    $(".fr-view").css({ "margin-top": "0mm" });
    $(".fr-view").css({ "margin-left": "0mm" });
}

function settingsPaginado() {
    var paginado = $('#Paginado')[0].value;
    if (paginado == 'A') {
        $(".fr-view").css({ "margin-left": "66px", "padding-right": "18px" });
    } else {
        //Set lado B
        $(".fr-view").css({ "margin-left": "66px", "padding-right": "18px" });
    }
}

function settingsPageLine() {
    var line = $('#linea')[0].value;
    var marginTop = '';
    switch (line) {
        case "1":
            marginTop = "36mm";
            break;
        case "2":
            marginTop = "46mm";
            break;
        case "3":
            marginTop = "56mm";
            break;
        case "4":
            marginTop = "66mm";
            break;
        case "5":
            marginTop = "76mm";
            break;
        case "6":
            marginTop = "86mm";
            break;
        case "7":
            marginTop = "96mm";
            break;
        case "8":
            marginTop = "106mm";
            break;
        case "9":
            marginTop = "116mm";
            break;
        case "10":
            marginTop = "126mm";
            break;
        case "11":
            marginTop = "136mm";
            break;
        case "12":
            marginTop = "146mm";
            break;
        case "13":
            marginTop = "156mm";
            break;
        case "14":
            marginTop = "166mm";
            break;
        case "15":
            marginTop = "176mm";
            break;
        case "16":
            marginTop = "186mm";
            break;
        case "17":
            marginTop = "196mm";
            break;
        case "18":
            marginTop = "206mm";
            break;
        case "19":
            marginTop = "216mm";
            break;
        case "20":
            marginTop = "226mm";
            break;
        case "21":
            marginTop = "236mm";
            break;
        case "22":
            marginTop = "246mm";
            break;
        case "23":
            marginTop = "256mm";
            break;
        case "24":
            marginTop = "266mm";
            break;
        case "25":
            marginTop = "276mm";
            break;
        case "26":
            marginTop = "286mm";
            break;
        case "27":
            marginTop = "296mm";
            break;
        case "28":
            marginTop = "306mm";
            break;
        case "29":
            marginTop = "316mm";
            break;
        case "30":
            marginTop = "326mm";
            break;
    }

    $(".fr-view").css("margin-top", marginTop);

}

function loadFile(url, callback) {
    JSZipUtils.getBinaryContent(url, callback);
}
function generate() {
    loadFile("https://docxtemplater.com/tag-example.docx", function (error, content) {
        var zip = new JSZip(content);
        var doc = new window.docxtemplater().loadZip(zip)
        doc.setData({
            first_name: 'John',
            last_name: 'Doe',
            phone: '0652455478',
            description: 'New Website'
        });
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
        }
        catch (error) {
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties,
            }
            console.log(JSON.stringify({ error: e }));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }
        var out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }) //Output the document using Data-URI
        saveAs(out, "output.docx")
    })
}


