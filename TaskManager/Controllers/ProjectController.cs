using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Linq.Expressions;
using TaskManager.Data;
using TaskManager.Domain.Entities;
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

		/*//maybe move this to the task controller???
		[HttpGet("{email}")]
		[ProducesResponseType(500)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		[ProducesResponseType(typeof(IEnumerable<TasksRm>), 200)]
		//List all tasks related to a project based on user email
		public ActionResult<IEnumerable<TasksRm>> ListTasks(string email)
		{
			try
			{
				var tasks = _entities.Projects.ToArray().SelectMany(p => p.Tasks
					.Where(t => t.AssignedEmail == email && t.IsComplete == 0))//only shows the active tasks
					.Select(p => new TasksRm(
						p.TaskId,
						p.Name,
						p.Description,
						p.AssignedFirstName,
						p.AssignedLastName,
						p.AssignedEmail,
						p.Priority,
						p.IsComplete

						));
				if(tasks.Count() <= 0 )
				{
					return NotFound("No tasks found for that user.");
				}

				return Ok(tasks);
			}
			catch (Exception ex)
			{
				return NotFound(ex.Message);
			}
			
		}*/


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
				null,
				null
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
