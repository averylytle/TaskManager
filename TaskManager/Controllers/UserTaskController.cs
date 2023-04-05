using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Domain.Errors;

namespace TaskManager.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class UserTaskController : ControllerBase
	{
		private readonly ILogger<TaskController> _logger;

		//needed for dependency injection
		private readonly Entities _entities;


		public UserTaskController(ILogger<TaskController> logger, Entities entities)
		{
			_logger = logger;
			_entities = entities;
		}

		//assign user to a task
		[HttpPost]
		[ProducesResponseType(200)]
		[ProducesResponseType(400)]
		[ProducesResponseType(500)]//missing database connection or something
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult AssignUserToTask(Guid projectId, Guid taskId, string email)
		{

			//make sure the user is registered
			var userRegistered = _entities.Users.FirstOrDefault(u => u.Email == email);

			if (userRegistered == null)
			{ return NotFound("The user must be registered first."); }


			//make sure the user is assigned to the project

			//what am I doing...I have the project, I need to grab a list of the users assigned to that project
			//WHERE dto.AssignedEmail == Users.Email


			//
			var userProject = _entities.Projects.ToArray().SelectMany(p => p.Users
				.Where(u => u.Email == email && p.ProjectId == projectId));
			//if userProject is null, the user must first be added to the project.

			if (userProject == null)
			{
				return NotFound("The user must first be assigned to the project before assigning to task.");
			}

			//by now, we've verified the user is registered and assigned to the project. 
			//now we can add to the task

			var project = _entities.Projects.Find(projectId);
			var task = project.Tasks.FirstOrDefault(t => t.TaskId == taskId);

			task.AssignedEmail = email;

			_entities.SaveChanges();

			return Ok("User assigned to task.");
		}



		//Remove a user from a task

		[HttpDelete]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(500)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult RemoveUserFromTask(Guid projectId, Guid taskId, string email)
		{

			//I need to find the user with the email
			var user = _entities.Users.FirstOrDefault(p => p.Email == email);
			if (user == null) { return NotFound("The user must be registered."); }

			//getting the project and the task
			var project = _entities.Projects.Find(projectId);
			if (project == null)
			{
				return NotFound();
			}

			var task = project.Tasks.FirstOrDefault(t => t.TaskId == taskId);
			if (task == null) 
			{ 
				return NotFound(); 
			}

			task.AssignedEmail = "";
			_entities.SaveChanges();
			//success call saying I deleted something and there's no content
			return NoContent();

		}
	}
}
