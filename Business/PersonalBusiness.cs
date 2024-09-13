using Data;
using Entity;
namespace Business
{
    public class PersonalBusiness
    {
        private readonly PersonalData _personalData;

        public PersonalBusiness(PersonalData personalData)
        {
            _personalData = personalData;
        }

        public async Task<List<Personal>> ListarPersonal()
        {
            return await _personalData.Listar();
        }

        public async Task<Personal> ObtenerPersonal(int id)
        {
            return await _personalData.Obtener(id);
        }

        public async Task<bool> EditarPersonal(Personal personal)
        {
            return await _personalData.Editar(personal);
        }

        public async Task<bool> CrearPersonal(Personal personal)
        {
            return await _personalData.Crear(personal);
        }

        public async Task<bool> EliminarPersonal(int id)
        {
            return await _personalData.Elimnar(id);
        }
    }
}
