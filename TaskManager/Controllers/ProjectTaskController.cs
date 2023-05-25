using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.ReadModels;

namespace TaskManager.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class ProjectTaskController : ControllerBase
	{
		private readonly ILogger<ProjectTaskController> _logger;

		//needed for dependency injection
		private readonly Entities _entities;

		public ProjectTaskController(ILogger<ProjectTaskController> logger, Entities entities)
		{
			_logger = logger;
			_entities = entities;
		}

		/*
		 Used to get all tasks related to a project. This is a crutial function for the tasks page  
		 */
		[HttpGet]
		[ProducesResponseType(500)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		[ProducesResponseType(typeof(IEnumerable<ProjectTaskRm>), 200)]
		public ActionResult<IEnumerable<ProjectTaskRm>> ListTasksByProject(Guid projectId)
		{
			var query = (from u in _entities.Users
						 join t in _entities.Tasks
						 on u.Email equals t.AssignedEmail
						 join p in _entities.Projects
						 on t.Project.ProjectId equals p.ProjectId
						 where t.Project.ProjectId == projectId
						 select new
						 {
							 p.ProjectName,
							 p.ProjectDescription,
							 t.TaskId,
							 t.Name,
							 t.Description,
							 AssignedFirstName = u.FirstName,
							 AssignedLastName = u.LastName,
							 t.AssignedEmail,
							 t.Priority
						 }
						 ).ToList();


			//Converting query to a ProjectTaskRm
			List<ProjectTaskRm> projectTasksRm = new List<ProjectTaskRm>();


			foreach (var task in query)
			{
				projectTasksRm.Add(new ProjectTaskRm(
					task.ProjectName,
					task.ProjectDescription,
					task.Name,
					task.Description,
					task.AssignedFirstName,
					task.AssignedLastName,
					task.AssignedEmail,
					task.Priority));
			}

			return Ok(projectTasksRm);

		}

		/*
		 Used in EditTaskComponent. Need the ProjectId to send a TasksDTO to the API
		 */
		[HttpGet("{taskId}")]
		[ProducesResponseType(400)]//client side error
		[ProducesResponseType(500)]//server side error. database connection string failure 
		[ProducesResponseType(typeof(Guid), 200)]
		public Guid GetProjectIdFromTaskId(Guid taskId)
		{

			var projectIdEnum = (from p in _entities.Tasks
								 where p.TaskId == taskId
								 select new
								 {
									 p.Project.ProjectId
								 }
							 ).ToList();



			IList<Guid> results = new List<Guid>();

			foreach (var item in projectIdEnum)
			{
				results.Add(item.ProjectId);
			}

			//there is only one result 
			return results[0];

		}
	}
}
