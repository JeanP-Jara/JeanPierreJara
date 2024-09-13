using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Business;
using Entity;

namespace JeanPierreJara.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalController : ControllerBase
    {
        private readonly PersonalBusiness _personalBusiness;

        public PersonalController(PersonalBusiness personalBusiness)
        {
            _personalBusiness = personalBusiness;
        }

        [HttpGet]
        public async Task<IActionResult> ListarPersonal()
        {
            List<Personal> personalList = await _personalBusiness.ListarPersonal();
            return StatusCode(StatusCodes.Status200OK, personalList);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObtenerPersonal(int id)
        {
            Personal personal = await _personalBusiness.ObtenerPersonal(id);
            return StatusCode(StatusCodes.Status200OK, personal);
        }

        [HttpPost]
        public async Task<IActionResult> CrearPersonal([FromBody] Personal personal)
        {
            bool result = await _personalBusiness.CrearPersonal(personal);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = result});
        }

        [HttpPut]
        public async Task<IActionResult> EditarPersonal([FromBody] Personal personal)
        {
            bool result = await _personalBusiness.EditarPersonal(personal);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = result });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarPersonal(int id)
        {
            bool result = await _personalBusiness.EliminarPersonal(id);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = result });
        }

    }
}
