using Entity;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Entity;


namespace Data
{
    public class HijoData
    {
        private readonly string conexion;
        public HijoData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("CadenaSQL")!;
        }

        public async Task<List<Hijo>> Listar()
        {
            List<Hijo> lista = new List<Hijo>();
            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();

                SqlCommand cmd = new SqlCommand("SELECT * FROM HIJOS", con);
                cmd.CommandType = CommandType.Text;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        lista.Add(new Hijo
                        {
                            idHijo = Convert.ToInt32(reader["idHijo"]),
                            idPersonal = Convert.ToInt32(reader["idPersonal"]),
                            tipoDoc = reader["tipoDoc"].ToString()!,
                            numeroDoc = reader["numeroDoc"].ToString()!,
                            apPaterno = reader["apPaterno"].ToString()!,
                            apMaterno = reader["apMaterno"].ToString()!,
                            nombre1 = reader["nombre1"].ToString()!,
                            nombre2 = reader["nombre2"].ToString(),
                            nombreCompleto = reader["nombreCompleto"].ToString()!,
                            fechaNac = Convert.ToDateTime(reader["fechaNac"])
                        });
                    }
                }
            }
            return lista;
        }

        public async Task<List<Hijo>> Obtener(int idPersonal)
        {
            List<Hijo> lista = new List<Hijo>();
            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();

                SqlCommand cmd = new SqlCommand("SELECT * FROM HIJOS WHERE idPersonal = @idPersonal", con);
                cmd.Parameters.AddWithValue("@idPersonal", idPersonal);

                cmd.CommandType = CommandType.Text;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        lista.Add( new Hijo
                        {
                            idHijo = Convert.ToInt32(reader["idHijo"]),
                            idPersonal = Convert.ToInt32(reader["idPersonal"]),
                            tipoDoc = reader["tipoDoc"].ToString()!,
                            numeroDoc = reader["numeroDoc"].ToString()!,
                            apPaterno = reader["apPaterno"].ToString()!,
                            apMaterno = reader["apMaterno"].ToString()!,
                            nombre1 = reader["nombre1"].ToString()!,
                            nombre2 = reader["nombre2"].ToString(),
                            nombreCompleto = reader["nombreCompleto"].ToString()!,
                            fechaNac = Convert.ToDateTime(reader["fechaNac"]),
                        });
                    }
                }
            }
            return lista;
        }

        public async Task<bool> Crear(Hijo hijo)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {


                SqlCommand cmd = new SqlCommand(
                    "INSERT INTO HIJOS (idPersonal, tipoDoc, numeroDoc, apPaterno, apMaterno, nombre1, nombre2, nombreCompleto, fechaNac) \r\n" +
                    "VALUES (@idPersonal, @tipoDoc, @numeroDoc, @apPaterno, @apMaterno, @nombre1, @nombre2, @nombreCompleto, @fechaNac)",
                    con
                    );
                cmd.Parameters.AddWithValue("@idPersonal", hijo.idPersonal);
                cmd.Parameters.AddWithValue("@tipoDoc", hijo.tipoDoc);
                cmd.Parameters.AddWithValue("@numeroDoc", hijo.numeroDoc);
                cmd.Parameters.AddWithValue("@apPaterno", hijo.apPaterno);
                cmd.Parameters.AddWithValue("@apMaterno", hijo.apMaterno);
                cmd.Parameters.AddWithValue("@nombre1", hijo.nombre1);
                cmd.Parameters.AddWithValue("@nombre2", (object)hijo.nombre2 ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@nombreCompleto", hijo.nombreCompleto);
                cmd.Parameters.AddWithValue("@fechaNac", hijo.fechaNac);

                cmd.CommandType = CommandType.Text;

                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch (Exception ex)
                {
                    respuesta = false;
                }


            }
            return respuesta;
        }

        public async Task<bool> Editar(Hijo hijo)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {


                SqlCommand cmd = new SqlCommand(
                    "UPDATE HIJOS SET tipoDoc = @tipoDoc, numeroDoc = @numeroDoc, apPaterno = @apPaterno, apMaterno = @apMaterno, \r\n" +
                    "nombre1 = @nombre1, nombre2 = @nombre2, nombreCompleto = @nombreCompleto, fechaNac = @fechaNac \r\n" +
                    "WHERE idHijo = @idHijo",
                    con
                    );

                cmd.Parameters.AddWithValue("@tipoDoc", hijo.tipoDoc);
                cmd.Parameters.AddWithValue("@numeroDoc", hijo.numeroDoc);
                cmd.Parameters.AddWithValue("@apPaterno", hijo.apPaterno);
                cmd.Parameters.AddWithValue("@apMaterno", hijo.apMaterno);
                cmd.Parameters.AddWithValue("@nombre1", hijo.nombre1);
                cmd.Parameters.AddWithValue("@nombre2", (object)hijo.nombre2 ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@nombreCompleto", hijo.nombreCompleto);
                cmd.Parameters.AddWithValue("@fechaNac", hijo.fechaNac);

                cmd.Parameters.AddWithValue("@idHijo", hijo.idHijo);

                cmd.CommandType = CommandType.Text;

                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch (Exception ex)
                {
                    respuesta = false;
                }


            }
            return respuesta;
        }

        public async Task<bool> Elimnar(int idHijo)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new SqlCommand("DELETE FROM HIJOS WHERE idHijo = @idHijo", con);

                cmd.Parameters.AddWithValue("@idHijo", idHijo);

                cmd.CommandType = CommandType.Text;

                try
                {
                    await con.OpenAsync();
                    respuesta = await cmd.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch (Exception ex)
                {
                    respuesta = false;
                }
            }
            return respuesta;
        }
    }
}
