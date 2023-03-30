using Microsoft.OpenApi.Models;
using TaskManager.Data;
using TaskManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<Entities>(options =>
	options.UseInMemoryDatabase(databaseName: "Tasks"),
	ServiceLifetime.Singleton);

builder.Services.AddControllersWithViews();

//required for SwaggerAPI and OpenAPI (RESTful API) so our client app can communicate with the server
builder.Services.AddSwaggerGen(c =>
{
	//Angular sends parameters in pascal case, whereas ASP.NET expects CamelCase
	//this handles that issues
	c.DescribeAllParametersInCamelCase();

	c.AddServer(new OpenApiServer
	{
		Description = "Development Server",
		Url = "https://localhost:7130"
	});

	c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"] + e.ActionDescriptor.RouteValues["controller"]}");
});

builder.Services.AddSingleton<Entities>();

var app = builder.Build();

var entities = app.Services.CreateScope().ServiceProvider.GetService<Entities>();

Tasks[] tasksToSeed = new Tasks[]
{
	new ( Guid.NewGuid(),
			"Azure Training",
			"Complete all the azure training required",
			"Avery",
			"Lytle",
			"Low",
			0
			),
		new ( Guid.NewGuid(),
			"Chores",
			"Do all my house chores",
			"Avery",
			"Lytle",
			"Medium",
			0
			)
};

entities.Tasks.AddRange(tasksToSeed);

entities.SaveChanges();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}


app.UseCors(builder => builder
.WithOrigins("*")
.AllowAnyMethod()
.AllowAnyHeader());

//required for SwaggerAPI
app.UseSwagger().UseSwaggerUI();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
	name: "default",
	pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
