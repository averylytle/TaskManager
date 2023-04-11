using Microsoft.OpenApi.Models;
using TaskManager.Data;
using TaskManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


//Connection string stored in appsettings.json
builder.Services.AddDbContext<Entities>(options => 
options.UseSqlServer(builder.Configuration.GetConnectionString("TaskManager")));

/*builder.Services.AddDbContext<Entities>(options =>
	options.UseInMemoryDatabase(databaseName: "TaskManager"),
	ServiceLifetime.Singleton);*/

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

builder.Services.AddScoped<Entities>();

var app = builder.Build();

var entities = app.Services.CreateScope().ServiceProvider.GetService<Entities>();

entities.Database.EnsureCreated();

if (!entities.Projects.Any())
{
	IList<Tasks> tasksToSeed = new List<Tasks>
{
	new ( Guid.NewGuid(),
			"Azure Training",
			"Complete all the azure training required",
/*			"Avery",
			"Lytle",*/
			"avery@gmail.com",
			"Low",
			0
			),
		new ( Guid.NewGuid(),
			"Chores",
			"Do all my house chores",
/*			"Avery",
			"Lytle",*/
			"avery@gmail.com",
			"Medium",
			0
			),
		new ( Guid.NewGuid(),
			"C# stuff",
			"He's really good at C#!",
/*			"John",
			"Rajikannu",*/
			"john@gmail.com",
			"Medium",
			0
			)
};

	/*IList<User> users = new List<User>
{
	new ("avery@gmail.com",
		"Avery",
		"Lytle"
		),
	new ("john@gmail.com",
		"John",
		"Rajikannu")
};*/

	IList<Project> projectsToSeed = new List<Project>
{
	new (Guid.NewGuid(),
		"House Cleaning",
		"All the cleaning I need to do for my house",
		new List<User>(),
		new List<Tasks>()
	),
	new (Guid.NewGuid(),
	"Empty Project",
	"Project without any users or tasks assigned yet.",
	new List<User>(),
	new List<Tasks>())
};

	entities.Projects.AddRange(projectsToSeed);
	entities.SaveChanges();
}


app.UseCors(builder => builder
.WithOrigins("*")
.AllowAnyMethod()
.AllowAnyHeader());

//required for SwaggerAPI
app.UseSwagger().UseSwaggerUI();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}


app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
	name: "default",
	pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
