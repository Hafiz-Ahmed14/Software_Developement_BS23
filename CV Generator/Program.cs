// Basic of API Create
var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();


app.UseHttpsRedirection();

app.MapGet("/", () =>
{
    return "CV Website Successfully Run!!";
});
app.MapGet("/cv/home", () =>
{
    return "Hello I am home Page";
});

app.MapGet("/cv/login", () =>
{
    return "Hello I am login Page";
});
app.Run();