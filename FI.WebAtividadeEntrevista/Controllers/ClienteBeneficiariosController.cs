using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class ClienteBeneficiariosController : Controller
    {
        // GET: ClienteBeneficiarios
        public ActionResult Index()
        {
            return View();
        }

        // GET: ClienteBeneficiarios/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: ClienteBeneficiarios/Create
        public ActionResult ValidarBeneficiario()
        {
            return View();
        }

        // POST: ClienteBeneficiarios/Create
        [HttpPost]
        public JsonResult ValidarBeneficiario(ClienteBeneficiarios model)
        {
            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                return Json("Beneficiário Validado");
            }
        }


        // GET: ClienteBeneficiarios/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ClienteBeneficiarios/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: ClienteBeneficiarios/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ClienteBeneficiarios/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
