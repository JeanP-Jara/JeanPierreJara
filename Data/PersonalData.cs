using System.Data;
using Entity;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace Data
{
    public class PersonalData
    {
        private readonly string conexion;
        public PersonalData(IConfiguration configuration)
        {
            conexion = configuration.GetConnectionString("CadenaSQL")!;
        }

        public async Task<List<Personal>> Listar()
        {
            List<Personal> lista = new List<Personal>();
            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();

                SqlCommand cmd = new SqlCommand("SELECT * FROM PERSONAL", con);
                cmd.CommandType = CommandType.Text;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        lista.Add(new Personal
                        {
                            idPersonal = Convert.ToInt32(reader["idPersonal"]),
                            tipoDoc = reader["tipoDoc"].ToString()!,
                            numeroDoc = reader["numeroDoc"].ToString()!,
                            apPaterno = reader["apPaterno"].ToString()!,
                            apMaterno = reader["apMaterno"].ToString()!,
                            nombre1 = reader["nombre1"].ToString()!,
                            nombre2 = reader["nombre2"].ToString(),
                            nombreCompleto = reader["nombreCompleto"].ToString()!,
                            fechaNac = Convert.ToDateTime(reader["fechaNac"]),
                            fechaIngreso = Convert.ToDateTime(reader["fechaIngreso"]),
                        });
                    }
                }
            }
            return lista;
        }

        public async Task<Personal> Obtener(int idPersonal)
        {
            Personal mPersonal = new Personal();
            using (var con = new SqlConnection(conexion))
            {
                await con.OpenAsync();

                SqlCommand cmd = new SqlCommand("SELECT * FROM PERSONAL WHERE idPersonal = @idPersonal", con);
                cmd.Parameters.AddWithValue("@idPersonal", idPersonal);
                
                cmd.CommandType = CommandType.Text;

                using (var reader = await cmd.ExecuteReaderAsync())
                {
                    while (reader.Read())
                    {
                        mPersonal = new Personal
                        {
                            idPersonal = Convert.ToInt32(reader["idPersonal"]),
                            tipoDoc = reader["tipoDoc"].ToString()!,
                            numeroDoc = reader["numeroDoc"].ToString()!,
                            apPaterno = reader["apPaterno"].ToString()!,
                            apMaterno = reader["apMaterno"].ToString()!,
                            nombre1 = reader["nombre1"].ToString()!,
                            nombre2 = reader["nombre2"].ToString(),
                            nombreCompleto = reader["nombreCompleto"].ToString()!,
                            fechaNac = Convert.ToDateTime(reader["fechaNac"]),
                            fechaIngreso = Convert.ToDateTime(reader["fechaIngreso"]),
                        };
                    }
                }
            }
            return mPersonal;
        }

        public async Task<bool> Crear(Personal personal)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {
                

                SqlCommand cmd = new SqlCommand(
                    "INSERT INTO PERSONAL (tipoDoc, numeroDoc, apPaterno, apMaterno, nombre1, nombre2, nombreCompleto, fechaNac, fechaIngreso) \r\n" +
                    "VALUES (@tipoDoc, @numeroDoc, @apPaterno, @apMaterno, @nombre1, @nombre2, @nombreCompleto, @fechaNac, @fechaIngreso)", 
                    con
                    );

                cmd.Parameters.AddWithValue("@tipoDoc", personal.tipoDoc);
                cmd.Parameters.AddWithValue("@numeroDoc", personal.numeroDoc);
                cmd.Parameters.AddWithValue("@apPaterno", personal.apPaterno);
                cmd.Parameters.AddWithValue("@apMaterno", personal.apMaterno);
                cmd.Parameters.AddWithValue("@nombre1", personal.nombre1);
                cmd.Parameters.AddWithValue("@nombre2", (object)personal.nombre2 ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@nombreCompleto", personal.nombreCompleto);
                cmd.Parameters.AddWithValue("@fechaNac", personal.fechaNac);
                cmd.Parameters.AddWithValue("@fechaIngreso", personal.fechaIngreso);

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

        public async Task<bool> Editar(Personal personal)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {


                SqlCommand cmd = new SqlCommand(
                    "UPDATE PERSONAL SET tipoDoc = @tipoDoc, numeroDoc = @numeroDoc, apPaterno = @apPaterno, apMaterno = @apMaterno, \r\n" +
                    "nombre1 = @nombre1, nombre2 = @nombre2, nombreCompleto = @nombreCompleto, fechaNac = @fechaNac, fechaIngreso = @fechaIngreso \r\n" +
                    "WHERE idPersonal = @idPersonal",
                    con
                    );

                cmd.Parameters.AddWithValue("@tipoDoc", personal.tipoDoc);
                cmd.Parameters.AddWithValue("@numeroDoc", personal.numeroDoc);
                cmd.Parameters.AddWithValue("@apPaterno", personal.apPaterno);
                cmd.Parameters.AddWithValue("@apMaterno", personal.apMaterno);
                cmd.Parameters.AddWithValue("@nombre1", personal.nombre1);
                cmd.Parameters.AddWithValue("@nombre2", (object)personal.nombre2 ?? DBNull.Value);
                cmd.Parameters.AddWithValue("@nombreCompleto", personal.nombreCompleto);
                cmd.Parameters.AddWithValue("@fechaNac", personal.fechaNac);
                cmd.Parameters.AddWithValue("@fechaIngreso", personal.fechaIngreso);

                cmd.Parameters.AddWithValue("@idPersonal", personal.idPersonal);

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

        public async Task<bool> Elimnar(int idPersonal)
        {
            bool respuesta = true;

            using (var con = new SqlConnection(conexion))
            {
                SqlCommand cmd = new SqlCommand("DELETE FROM PERSONAL WHERE idPersonal = @idPersonal",con);

                cmd.Parameters.AddWithValue("@idPersonal", idPersonal);

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
