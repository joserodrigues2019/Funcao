$(document).ready(function () {

    //Formatar mascara para o campo CPF
    $("#CPF").inputmask("mask", { "mask": "999.999.999-99" }, { reverse: true });

    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);

        // dados dos Beneficiarios
        LoadTabelaBeneficiarios();
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val(),
                "LISTABENEFICIARIOS": CarregarBeneficiarios()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

// dados dos Beneficiarios
function LoadTabelaBeneficiarios() {

    var cols = "";
    var lista = obj.ListaBeneficiarios;

    for (var i = 0; i < lista.length; i++) {
        cols += "<tr>";
        cols += "<td>" + lista[i].CPF + "</td>";
        cols += "<td>" + lista[i].Nome + "</td>";
        cols += "</tr>";
    }

    $("#tblBeneficiarios tbody").empty();
    $("#tblBeneficiarios tbody").append(cols);
}

function CarregarBeneficiarios() {

    var valores = document.querySelectorAll("#tblBeneficiarios tr td");
    var strBeneficiarios = "";

    for (i = 0; i < valores.length; i++) {

        if (valores[i].innerHTML.length < 50) {
            if (i == 0) {
                strBeneficiarios = valores[i].innerHTML;
            } else {
                strBeneficiarios = strBeneficiarios + ";" + valores[i].innerHTML;
            }
            //alert(valores[i].innerHTML);
            //console.log(valores[i].innerHTML);
        }
    }
    //alert(strBeneficiarios);

    // Tratar beneficiarios
    var listaBeneficiarios = [];

    var vetorStr = strBeneficiarios.split(';')

    for (var p = 0; p < vetorStr.length; p++) {

        listaBeneficiarios.push({
            cpf: vetorStr[p],
            nome: vetorStr[p + 1]
        });
        p++;
    }

    // Verificar os beneficiarios
    //for (var key in listaBeneficiarios) {
    //    alert(listaBeneficiarios[key].cpfBeneficiario + "--" + listaBeneficiarios[key].nomeBeneficiario);
    //}

    return listaBeneficiarios;
}