using Data;
using Entity;

namespace Business
{
    public class HijoBusiness
    {
        private readonly HijoData _hijoData;

        public HijoBusiness(HijoData hijoData)
        {
            _hijoData = hijoData;
        }

        public async Task<List<Hijo>> ListarHijos()
        {
            return await _hijoData.Listar();
        }

        public async Task<List<Hijo>> ObtenerHijo(int id)
        {
            return await _hijoData.Obtener(id);
        }

        public async Task<bool> EditarHijo(Hijo hijo)
        {
            return await _hijoData.Editar(hijo);
        }

        public async Task<bool> CrearHijo(Hijo hijo)
        {
            return await _hijoData.Crear(hijo);
        }

        public async Task<bool> EliminarHijo(int id)
        {
            return await _hijoData.Elimnar(id);
        }
    }
}
