using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    public class ClienteBeneficiarios
    {
        // PK
        public long Id { get; set; }

        /// <summary>
        /// CPF Beneficiário
        /// </summary>
        [StringLength(14, MinimumLength = 14, ErrorMessage = "Formato CPF [999.999.999-99]")]
        [CustomValidationCPF(ErrorMessage = "CPF inválido")]
        public string CPF { get; set; }

        /// <summary>
        /// Nome Beneficiário
        /// </summary>
        public string Nome { get; set; }

        // FK tabela Clientes
        [Required]
        public long IdCliente { get; set; }

    }
}