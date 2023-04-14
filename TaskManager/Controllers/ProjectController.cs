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

			SELECT *
			FROM Projects p
			JOIN Users u on u.ProjectId = p.ProjectId
			WHERE u.Email = 'avery@gmail.com';


			 */

			var query = (from p in _entities.Projects
						 join u in _entities.Users
						 on p.ProjectId equals u.Project.ProjectId
						 where u.Email== email
						 select new
						 {
							 ProjectId = p.ProjectId
						 }).ToList();
			
			IList<Guid> result = new List<Guid>();

			foreach(var item in query)
			{
				result.Add(item.ProjectId);
			}

			return result;
		}



		/*
		 Getting all the projects. Leaving the ProjectRM with Users and Tasks for now
		to test the API. Might remove later


		MAYBE we don't get all projects ever. What would be a use case for that? Maybe we get the projectIds 
		based on email first, then get all the projects based on that projectId?


		 */
		[HttpGet]
		[ProducesResponseType(400)]//client side error
		[ProducesResponseType(500)]//server side error. database connection string failure 
		[ProducesResponseType(typeof(IEnumerable<ProjectRm>), 200)]
		public IEnumerable<ProjectRm> GetProjects()
		{


			var projectsList = _entities.Projects.ToArray();

			var tasksList = _entities.Tasks.ToArray();

			var query = projectsList.Join(
				tasksList,
				project => project.ProjectId,//key
				task => task.Project.ProjectId,//primary key
				(project, task) => new
				{
					//trying to get everything I need for a ProjectRm
					project.ProjectId,
					project.ProjectName,
					project.ProjectDescription,
					Users = project.Users.ToArray(),
					Tasks = project.Tasks.ToArray()
				}
				).ToList();






			//need the projectIds to call the stored procedure. For each project Id, I'll get the users
			List<Guid> projectIds = new List<Guid>();

			foreach (var project in projectsList)
			{
				projectIds.Add(project.ProjectId);
			}



			/*


			 4/12/2023
			I can send all projects, but each task has a project...



			 */

			//I only want to send back a userRM and TasksRm in the projectRm. How do I do that?

			//

			var testing = _entities.Tasks.ToArray().Select(p => p.Project);



			var projects = _entities.Projects.ToArray().Select(project => new ProjectRm(
				project.ProjectId,
					project.ProjectName,
					project.ProjectDescription ?? "",
					null,
					null
					
					/*project.Users ?? null,
					project.Tasks ?? null*/
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
