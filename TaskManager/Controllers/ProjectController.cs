using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Linq.Expressions;
using TaskManager.Data;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Errors;
using TaskManager.Dtos;
using TaskManager.ReadModels;

namespace TaskManager.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class ProjectController : ControllerBase
	{





	/*
	 I'm not sure what I want to do here. Do I just list the projects only?
	How do I show tasks associated to specific projects when a user logs in. 
	I.e. only show projects the user is assigned to, and the tasks assigned to that project.
	 
	 
	 */






		private readonly Entities _entities;

		public ProjectController(Entities entities)
		{
			_entities = entities;
		}


		[HttpGet("{email}")]
		[ProducesResponseType(400)]//client side error
		[ProducesResponseType(500)]//server side error. database connection string failure 
		[ProducesResponseType(typeof(IEnumerable<Guid>), 200)]
		public IEnumerable<Guid> GetProjectIds(string email)
		{
			/*
			 What I'm trying to do is get all the project Ids associated to the user. If the user is in two projects,
			two project ids

			will use project ids to list off all projects and tasks?


			Can I get to the project with just an email?

			

			SELECT u.FirstName, u.LastName, *
			FROM Projects p
			JOIN Users u ON p.ProjectId = u.ProjectId;

			 */

			var users = _entities.Projects.ToArray().SelectMany(u => u.Users).Where(u => u.Email == email);

			var query = (from project in _entities.Projects
						 from user in users
						 select project.ProjectId);

			//var user = _entities.Users.FirstOrDefault(u => u.Email == email);

			//Grabbing all projects
			//var projects = _entities.Projects.Select(p => p.Users.FirstOrDefault(u => u.Email == email) == user);

			//var test = _entities.Projects.Select(p => p.ProjectId).Where(p => p.);

			//var test2 = test.Select(p => p.Users.FirstOrDefault(p => p.Email == email));

			//var guids = _entities.Projects.Select(p => p.ProjectId);

			
			



			/*var guids = _entities.Projects.ToArray().Select(p => p.ProjectId);

			var tasks = _entities.Projects.ToArray().SelectMany(p => p.Tasks
					.Where(t => t.AssignedEmail == email && t.IsComplete == 0))//only shows the active tasks
					.Select(p => new TasksRm(
						p.TaskId,
						p.Name,
						p.Description,
						user.FirstName,
						user.LastName,
						p.AssignedEmail ?? "",
						p.Priority,
						p.IsComplete

						));
*/


			return null;
		}



		/*
		 Getting all the projects. Leaving the ProjectRM with Users and Tasks for now
		to test the API. Might remove later
		 */
		[HttpGet]
		[ProducesResponseType(400)]//client side error
		[ProducesResponseType(500)]//server side error. database connection string failure 
		[ProducesResponseType(typeof(IEnumerable<ProjectRm>), 200)]
		public IEnumerable<ProjectRm> GetProjects()
		{

			var projectsTest = _entities.Projects;

			var projects = _entities.Projects.ToArray().Select(project => new ProjectRm(
				project.ProjectId,
					project.ProjectName,
					project.ProjectDescription ?? "",
					/*null,
					null*/
					project.Users ?? null,
					project.Tasks ?? null
				));

			/*var projectRmList = _entities.Projects
				.Select(project => new ProjectRm(
					project.ProjectId,
					project.ProjectName,
					project.ProjectDescription ?? "",
					project.Users ?? null,
					project.Tasks ?? null
					));*/

			return projects;

		}


		[HttpPost]
		[ProducesResponseType(400)]
		[ProducesResponseType(500)]//missing database connection or something
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(201)]//new create
		public IActionResult CreateProject(ProjectDto dto)
		{
			//All I need is an ID and a Description, all else is nullable
			try
			{
				_entities.Projects.Add(new Project(
				dto.ProjectId,
				dto.ProjectName,
				dto.Description,
				new List<User>(),
				new List<Tasks>()
				));
			}

			catch (System.InvalidOperationException ex)
			{
				//eventually log the error 
				return Conflict("A Project with that ProjectId already exists.");
			}

			_entities.SaveChanges();

			return CreatedAtAction("Project Created", new { id = dto.ProjectId });

		}

		

	}
}
