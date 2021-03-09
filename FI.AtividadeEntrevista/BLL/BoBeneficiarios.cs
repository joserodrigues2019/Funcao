using System.Collections.Generic;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiarios
    {
        public void IncluirBeneficiario(DML.ClienteBeneficiario clienteBeneficiario)
        {
            new DAL.DaoBeneficiarios().IncluirBeneficiario(clienteBeneficiario);
        }

        public void AlterarBeneficiario(DML.ClienteBeneficiario registro)
        {
            new DAL.DaoBeneficiarios().AlterarBeneficiario(registro);
        }

        public List<DML.ClienteBeneficiario> PesquisaClienteBeneficiario(long IdCliente)
        {
            return new DAL.DaoBeneficiarios().PesquisaClienteBeneficiario(IdCliente);
        }
    }
}
