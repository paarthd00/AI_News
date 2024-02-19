using Microsoft.EntityFrameworkCore;
using AINews.Models;
using Microsoft.AspNetCore.SignalR;
using AINews.Hubs;
var builder = WebApplication.CreateBuilder(args);
DotNetEnv.Env.Load();

var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING");
var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));

builder.Services.AddDbContext<DatabaseContext>(
    opt =>
    {
      opt
      .UseMySql(connectionString, serverVersion);
    }
);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSignalR();



var app = builder.Build();


app.MapHub<PostHub>("/api/posthub");


if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}



app.MapControllers();

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToFile("index.html");

app.Run();