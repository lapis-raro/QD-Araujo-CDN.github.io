<form action="includes/sendmail.php" method="post">
    <div class="form-group">
        <label for="identificacao">
            Selecione sua identificação
        </label>
        <select name="identificacao" id="identificacao" class="form-control">
            <option value=""></option>
            <option>Paciente</option>
            <option>Familiar/Representante</option>
            <option>Advogado</option>
        </select>
    </div>
    <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" name="nome" id="nome" class="form-control">
    </div>
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label for="telefone">Telefone</label>
                <input type="tel" name="telefone" id="telefone" class="form-control">
            </div>
        </div>
        <div class="col-md-8">
            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" name="email" id="telefone" class="form-control">
            </div>
        </div>
    </div>

    <div class="form-group form-paciente">
        <label for="paciente">Paciente</label>
        <input type="text" name="paciente" id="paciente" class="form-control">
    </div>

    <div class="form-group ">
        <label for="nome-medicamento" class="">Nome / Dosagem do medicamento</label>
        <input type="text" name="nome-medicamento" class="form-control">
    </div>

    <div class="row">
        <div class="col-md-3">
            <label for="quantidade">
                Quantidade
            </label>
            <input type="number" name="qtd" class="form-control">
        </div>
        <div class="col-md-9">
            <label for="arquivo">Anexar receita</label>
            <input type="file" name="arquivo" class="form-control">
            <small>Arquivos no tamanho máximo X e formatos JPG, PNG ou PDF.</small>
        </div>
    </div>

    <div class="form-check form-check-inline">
        <input class="form-check-input" name="aceite" type="checkbox" id="inlineCheckbox1" value="Autorizo que entrem em contato comigo por telefone, Whatsapp ou por E-mail.">
        <label class="form-check-label" for="inlineCheckbox1">
            Autorizo que entrem em contato comigo por telefone, Whatsapp ou por E-mail.
        </label>
    </div>

    <div class="form-submit">
        <button class="btn-orcamento">Solicitar orçamento</button>
    </div>

</form>