App.Cliente.Agendamentos.cancelarAgendamento = function() {
	$("#cancelar-agendamento-js").click(function(ev){
		if(!confirm("Tem certeza que quer cancelar?")) {
			ev.preventDefault();
		}
	});
}