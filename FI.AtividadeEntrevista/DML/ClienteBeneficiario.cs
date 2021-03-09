using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.DML
{
    public class ClienteBeneficiario
    {
        // PK
        public long Id { get; set; }

        /// <summary>
        /// CPF Beneficiário
        /// </summary>
        public string CPF { get; set; }

        /// <summary>
        /// Nome Beneficiário
        /// </summary>
        public string Nome { get; set; }

        // FK tabela Clientes
        public long IdCliente { get; set; }

    }
}
