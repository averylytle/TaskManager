using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Domain.Errors;
using TaskManager.Dtos;

namespace TaskManager.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class UserProjectController : ControllerBase
	{
		private readonly ILogger<TaskController> _logger;

		//needed for dependency injection
		private readonly Entities _entities;


		public UserProjectController(ILogger<TaskController> logger, Entities entities)
		{
			_logger = logger;
			_entities = entities;
		}

		//I would need to assign user to a project

		[HttpPost]
		[ProducesResponseType(200)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		[ProducesResponseType(409)]
		[ProducesResponseType(500)]//missing database connection or something
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult AssignUserToProject(Guid projectId, string email)
		{

			//Business logic: to be assigned to a project, the user must first be registered

			//finding the project
			var project = _entities.Projects.Find(projectId);
			if (project == null) { return NotFound("The Project Id is invalid."); }

			//I need to find the user with the email
			var user = _entities.Users.FirstOrDefault(p => p.Email == email);

			if (user == null) { return NotFound("The user must be registered first."); }

			//checking if user is already assigned to project.

			var error = project.AddUser(user);

			if (error is DuplicateUserError)
			{
				return Conflict(new { message = "The user is already assigned to this project." });
			}

			_entities.SaveChanges();

			return Ok("User assigned to project");
			
		}

		/*
		 * Removing a user from a project.
		 * In order to do so, the user must first be unassigned from all tasks
		 * 
		 * */

		[HttpDelete]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(500)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult RemoveUserFromProject(Guid projectId, string email)
		{

			var project = _entities.Projects.Find(projectId);

			//I need to find the user with the email
			var user = _entities.Users.FirstOrDefault(p => p.Email == email);
			if (user == null) { return NotFound("The user must be registered."); }


			//Get a list of all the tasks the user is assigned to FROM THIS PROJECT ONLY and remove the user
			var listoftasks = project.Tasks.ToArray().Where(u => u.AssignedEmail == email);

			//null check on listoftasks
			if (listoftasks == null)
			{
				//if the user isn't assigned to any tasks, then just remove the user from the project
				var error = project.RemoveUser(user);

				if (error == null)
				{
					_entities.SaveChanges();
					//success call saying I deleted something and there's no content
					return NoContent();
				}

				if (error is UserNotAssignedError)
				{
					return NotFound("The user is not assigned to the project.");
				}

				throw new Exception($"The error of type: {error.GetType().Name} " +
				$"occurred while removing the user from project id {projectId}");
			}
			else
			{
				//first unassign the user from all tasks
				foreach ( var task in listoftasks )
				{
					task.AssignedEmail = "";
				}

				//now remove the user form the project
				var error = project.RemoveUser(user);

				if (error == null)
				{
					_entities.SaveChanges();
					//success call saying I deleted something and there's no content
					return NoContent();
				}

				if (error is UserNotAssignedError)
				{
					return NotFound("The user is not assigned to the project.");
				}

				throw new Exception($"The error of type: {error.GetType().Name} " +
				$"occurred while removing the user from project id {projectId}");
			}

			
		}


	}
}
