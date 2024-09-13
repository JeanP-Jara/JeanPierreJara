﻿namespace Entity
{
    public class Personal
    {
        public int idPersonal { get; set; }
        public String tipoDoc { get; set; }
        public String numeroDoc { get; set; }
        public String apPaterno { get; set; }
        public String apMaterno { get; set; }
        public String nombre1 { get; set; }
        public String? nombre2 { get; set; }
        public String nombreCompleto { get; set; }
        public DateTime fechaNac { get; set; }
        public DateTime fechaIngreso { get; set; }
    }
}
