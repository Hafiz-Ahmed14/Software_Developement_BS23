using System.IO;
using System.Net;
using System.Net.Mail;
using CV_Generator.Data;
using System.ComponentModel;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.DependencyInjection;


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


// Use memory cache for session storage
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.Cookie.Name = ".ResetPasswordSession";  // Set cookie name for session
    options.IdleTimeout = TimeSpan.FromMinutes(30);  // Set session timeout
});


//Database Connection Code
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));


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

// use some accessibility
app.UseCors();
app.UseSession();
app.UseRouting();
app.MapControllers();
app.UseAuthorization();
app.UseHttpsRedirection();


// Map routes for serving HTML files
app.MapGet("/cv", () => "CV Website Successfully Run!!");

//Url Hit to Home Page
app.MapGet("/cv/home", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/home.html");
});

//Url Hit to Login Page
app.MapGet("/cv/login", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/Login.html");
});


//Url Hit to Resister Page
app.MapGet("/cv/register", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/Register.html");
});

//Url Hit to Contact Us Page
app.MapGet("/cv/contactus", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/ContactUs.html");
});


//Url Hit FAQ Page
app.MapGet("/cv/faq", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/FAQ.html");
});


//Url Hit to the Custom Generate CV
app.MapGet("/cv/generatecv", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/CustomCV.html");
});


//Url Hit to the Template1 CV
app.MapGet("/cv/Template1Home", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/Template1Home.html");
});

//Url Hit to the Template3 CV
app.MapGet("/cv/Template3Home", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/Template3Home.html");
});

//Url Hit to the Template4 CV
app.MapGet("/cv/Template4Home", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/Template4Home.html");
});

//Url Hit to the Template6 CV
app.MapGet("/cv/Template6Home", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/Template6Home.html");
});

app.MapGet("/cv/forgotpassword", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/ForgotPassword.html");
});

app.MapGet("/cv/otp", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/OTP.html");
});

app.MapGet("/cv/resetpassword", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/ResetPassword.html");
});

app.MapGet("/cv/UserHome", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/UserHome.html");
});


app.Run();