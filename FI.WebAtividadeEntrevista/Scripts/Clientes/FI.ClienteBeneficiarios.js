$(document).ready(function () {
    //Formatar mascara para o campo CPF Beneficiario
    $("#CPFBeneficiario").inputmask("mask", { "mask": "999.999.999-99" }, { reverse: true });

    AjustarTabela();

    $('#modalCadastroBeneficiarios').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPostBen,
            method: "POST",
            data: {
                "CPF": $(this).find("#CPFBeneficiario").val(),
                "NOME": $(this).find("#NomeBeneficiario").val()
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
                    $("#modalCadastroBeneficiarios")[0].reset();
                    //alert("Beneficiário Inserido na Lista");
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

//< !--JQuery para a table dinamica dos Beneficiarios-- >
    //<script>
    function Adicionar() {

        $("#tblBeneficiarios tbody").append(
            "<tr>" +
            "<td>" + $("#CPFBeneficiario").val() + "</td>" +
            "<td>" + $("#NomeBeneficiario").val() + "</td>" +
            "<td><input type='submit' value='Editar' class='btnEditar'/><input type='submit' value='Excluir' class='btnExcluir'/></td>" +
            "</tr>");

    Salvar();
};

function Salvar() {

    var par = $(this).parent().parent();

    var tdCPF = par.children("td:nth-child(1)");
    var tdNome = par.children("td:nth-child(2)");
    var tdBotoes = par.children("td:nth-child(3)");

    tdCPF.html(tdCPF.children("input[type=text]").val());
    tdNome.html(tdNome.children("input[type=text]").val());
    tdBotoes.html("<input type='submit' value='Editar' class='btnEditar' /><input type='submit' value='Excluir' class='btnExcluir' />");

    $(".btnEditar").bind("click", Editar);
    $(".btnExcluir").bind("click", Excluir);

};

function Editar() {
    var par = $(this).parent().parent();
    var tdCPF = par.children("td:nth-child(1)");
    var tdNome = par.children("td:nth-child(2)");
    var tdBotoes = par.children("td:nth-child(3)");

    tdBotoes.html("<input type='submit' value='Salvar' class='btnSalvar' />");

    tdCPF.html("<input type='text' id='txtCPF' value='" + tdCPF.html() + "' />");
    tdNome.html("<input type='text' id='txtNome' value='" + tdNome.html() + "' />");

    $(".btnSalvar").bind("click", Salvar);
    $(".btnExcluir").bind("click", Excluir);
};

function Excluir() {
    var par = $(this).parent().parent();
    par.remove();
};

function InserirTable() {

    var qtItens = $('#tblBeneficiarios tbody tr').length;
    var cont = 0;
    //var vetor = new Array();

    //  verificar se já existe itens na table para pesquisar Beneficiario
    if (qtItens >= 1) {

        // Validar CPF Beneficiario Inserido na table
        var cpfBeneficiario = $('#CPFBeneficiario').val();

        $('#tblBeneficiarios tbody').find('tr').each(function () {
            var vCPF = $(this).find('td:first').text();
            var bEncontrou = vCPF.indexOf(cpfBeneficiario) >= 0;

            cont = cont + 1;
            //alert(bEncontrou);

            if (bEncontrou == true) {
                //alert("Encontrou CPF Beneficiario [já informado]");
                ModalDialog("Cadastrar Beneficiarios", "Encontrou CPF Beneficiario [já informado]");
            } else {
                if (vCPF == cpfBeneficiario) {
                    //alert("CPF Beneficiario [já informado]");
                    ModalDialog("Cadastrar Beneficiarios", "CPF Beneficiario [já informado]");

                } else
                    //alert("CPF Beneficiario [Novo]");
                    if (cont == qtItens) {
                        //vetor.push(cpfBeneficiario, nomeBeneficiario);
                        Adicionar();
                    }
            }
        });
    } else {
        //vetor.push(cpfBeneficiario, nomeBeneficiario);
        Adicionar();
    }
}

function AjustarTabela() {

    var linhas = document.querySelectorAll("#tblBeneficiarios tr td");

    $("#tblBeneficiarios td").remove();

    for (i = 0; i < linhas.length; i++) {
        //alert(linhas[i].innerHTML);
        //alert(linhas[i+1].innerHTML);

        $("#tblBeneficiarios tbody").append(
            "<tr>" +
            "<td>" + linhas[i].innerHTML + "</td>" +
            "<td>" + linhas[i + 1].innerHTML + "</td>" +
            "<td><input type='submit' value='Editar' class='btnEditar'/><input type='submit' value='Excluir' class='btnExcluir'/></td>" +
            "</tr>");

        i++;

        Salvar();

    }

    //$("#tblBeneficiarios tbody").empty();
    //$("#tblBeneficiarios tbody").append(cols);
}

//</script>