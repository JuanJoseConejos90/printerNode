$(function () {
    $('textarea').froalaEditor();
});

$('#fontTypeMenu').on('change', function () {
    $(".fr-view").css({ 'font-family': 'Impact, Haettenschweiler, Arial Narrow Bold, sans-serif' });
});


$('#fontSizeMenu').on('change', function () {
    $(".fr-view").css({ 'font-size': this.value });
});


$("#btnPrimary").click(function () {

    generate();
});

$('#exampleFormControlFile1').on('change', function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {

        var zip = new JSZip(event.target.result);
        var doc=new window.docxtemplater().loadZip(zip);
        var text=doc.getFullText();
        console.log(text);
        const file = event.target.result;
        const allLines = file.split(/\r\n|\n/);
        var limit = 30;
        var i = 1;
        var p = '';
        var page = ["A", "B"];
        var index = 0;
        var pagenumber = 1;
        $('.modal-body').empty();
        allLines.forEach((line) => {
            if (i <= limit) {
                p += `<p class="${page[index] + i}">${line}</p>`
                i++;
            } else {
                renderaddCard(p, page[index], pagenumber);
                addContent(p)
                i = 0;
                p = '';
                index = (index == 0) ? 1 : 0;
                pagenumber++;

            }
        });
    };

    reader.onerror = (event) => {
        alert(event.target.error.name);
    };

    reader.readAsText(file, "UTF-8");
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


function setlistener() {


}

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
    $("#containerPrint").print({
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
}


function loadFile(url,callback){
    JSZipUtils.getBinaryContent(url,callback);
}
function generate() {
    loadFile("https://docxtemplater.com/tag-example.docx",function(error,content){
        var zip = new JSZip(content);
        var doc=new window.docxtemplater().loadZip(zip)
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
            console.log(JSON.stringify({error: e}));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
        }
        var out=doc.getZip().generate({
            type:"blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }) //Output the document using Data-URI
        saveAs(out,"output.docx")
    })
}


