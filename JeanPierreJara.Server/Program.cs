using Business;
using Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<PersonalData>();
builder.Services.AddSingleton<HijoData>();
builder.Services.AddSingleton<PersonalBusiness>();
builder.Services.AddSingleton<HijoBusiness>();

builder.Services.AddTransient<PersonalData>();
builder.Services.AddTransient<HijoData>();
builder.Services.AddTransient<PersonalBusiness>();
builder.Services.AddTransient<HijoBusiness>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("NuevasPoliticas", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("NuevasPoliticas");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
