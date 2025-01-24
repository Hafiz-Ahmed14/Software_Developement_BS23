using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System.IO;
using System.ComponentModel;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Serve static files for the Pages directory
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "Pages")),
    RequestPath = "/Pages"
});


// Use Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapControllers();
app.UseHttpsRedirection();
app.UseCors();

// Map routes for serving HTML files
app.MapGet("/cv", () => "CV Website Successfully Run!!");

app.MapGet("/cv/home", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/home.html");
});

app.MapGet("/cv/login", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/Login.html");
});

app.MapGet("/cv/register", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/Register.html");
});

app.MapGet("/cv/contactus", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/ContactUs.html");
});

app.MapGet("/cv/faq", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/FAQ.html");
});

app.MapGet("/cv/generatecv", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/CustomCV.html");
});

app.MapGet("/cv/Template1Home", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/Template1Home.html");
});

app.MapGet("/cv/Template4Home", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/Template4Home.html");
});

app.Run();
