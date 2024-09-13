using Business;
using Entity;
using Microsoft.AspNetCore.Mvc;

namespace JeanPierreJara.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HijoController : ControllerBase
    {

        private readonly HijoBusiness _hijoBusiness;

        public HijoController(HijoBusiness hijoBusiness)
        {
            _hijoBusiness = hijoBusiness;
        }

        [HttpGet]
        public async Task<IActionResult> ListarHijos()
        {
            List<Hijo> personalList = await _hijoBusiness.ListarHijos();
            return StatusCode(StatusCodes.Status200OK, personalList);
        }

        //ID PERSONAL
        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerHijos(int id)
        {
            List<Hijo> hijos = await _hijoBusiness.ObtenerHijo(id);
            return StatusCode(StatusCodes.Status200OK, hijos);
        }

        [HttpPost]
        public async Task<IActionResult> CrearHijo([FromBody] Hijo hijo)
        {
            bool result = await _hijoBusiness.CrearHijo(hijo);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = result });
        }

        [HttpPut]
        public async Task<IActionResult> EditarHijo([FromBody] Hijo hijo)
        {
            bool result = await _hijoBusiness.EditarHijo(hijo);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = result });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarHijo(int id)
        {
            bool result = await _hijoBusiness.EliminarHijo(id);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = result });
        }
    }
}
