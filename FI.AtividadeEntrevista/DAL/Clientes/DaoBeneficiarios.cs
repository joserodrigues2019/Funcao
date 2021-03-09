using System.Collections.Generic;
using System.Data;

namespace FI.AtividadeEntrevista.DAL
{
    internal class DaoBeneficiarios: AcessoDados
    {
        internal void IncluirBeneficiario(DML.ClienteBeneficiario beneficiario)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", beneficiario.CPF));
            parametros.Add(new System.Data.SqlClient.SqlParameter("Nome", beneficiario.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", beneficiario.IdCliente));

            base.Executar("FI_SP_IncClienteBeneficiario", parametros);

        }

        internal void AlterarBeneficiario(DML.ClienteBeneficiario registro)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("CPF", registro.CPF));
            parametros.Add(new System.Data.SqlClient.SqlParameter("Nome", registro.Nome));
            parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", registro.IdCliente));

            base.Executar("FI_SP_AltClienteBeneficiario", parametros);

        }

        internal List<DML.ClienteBeneficiario> PesquisaClienteBeneficiario(long IdCliente)
        {
            List<System.Data.SqlClient.SqlParameter> parametros = new List<System.Data.SqlClient.SqlParameter>();

            parametros.Add(new System.Data.SqlClient.SqlParameter("IDCLIENTE", IdCliente));

            DataSet ds = base.Consultar("FI_SP_PesquisaClienteBeneficiario", parametros);
            List<DML.ClienteBeneficiario> cli = ConverterResult(ds);

            return cli;
        }

        private List<DML.ClienteBeneficiario> ConverterResult(DataSet ds)
        {
            List<DML.ClienteBeneficiario> lista = new List<DML.ClienteBeneficiario>();
            if (ds != null && ds.Tables != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in ds.Tables[0].Rows)
                {
                    DML.ClienteBeneficiario cliBeneficiario = new DML.ClienteBeneficiario();
                    cliBeneficiario.Id = row.Field<long>("Id");
                    cliBeneficiario.CPF = row.Field<string>("CPF");
                    cliBeneficiario.Nome = row.Field<string>("Nome");
                    cliBeneficiario.IdCliente = row.Field<long>("IdCliente");

                    lista.Add(cliBeneficiario);
                }
            }

            return lista;
        }
    }
}
