// Basic of API Create
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDirectoryBrowser();

builder.Services.AddOpenApi();

var app = builder.Build();

app.UseStaticFiles();

app.UseDirectoryBrowser();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();



app.MapGet("/cv", () =>
{
    return "CV Website Successfully Run!!";
});

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

app.MapGet("cv/generatecv", async context =>
{
    await context.Response.SendFileAsync("Pages/Html/CvGenerator.html");
});

app.Run();
