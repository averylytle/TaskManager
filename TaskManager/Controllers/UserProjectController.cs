using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Errors;
using TaskManager.Dtos;
using TaskManager.ReadModels;

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
			var project = _entities.Projects.SingleOrDefault(p => p.ProjectId == projectId);
			if (project == null) { return NotFound("The Project Id is invalid."); }

			//I need to find the user with the email
			var user = _entities.Users.FirstOrDefault(p => p.Email == email);

			if (user == null) { return NotFound("The user must be registered first."); }



			//returns a productId if the user is assigned to that project. count = 1 if true, else 0
			var query = (from p in _entities.Projects
							 //join t in _entities.Tasks
							 //on p.ProjectId equals t.Project.ProjectId
						 join pu in _entities.ProjectUser
						 on p.ProjectId equals pu.Project.ProjectId
						 join u in _entities.Users
						 on pu.User.Email equals u.Email
						 //where pu.Project.ProjectId == projectId
						 where u.Email == email && pu.Project.ProjectId == projectId
						 select new
						 {
							 p.ProjectId
						 }).ToList();

			//if the above query doesn't have a result, it means the user isn't assigned to the project.
			if (query.Count > 0)
			{
				return Conflict(new { message = "The user is already assigned to this project." });
			}





			/*//project.Users is 0, doesn't have any users. even though it does. 
			var projectEmail = project.Users.FirstOrDefault(u => u.Email == email);

			//need a null check on project.Users
			if (project.Users.FirstOrDefault(u => u.Email == email) != null)
			{
				return Conflict(new { message = "The user is already assigned to this project." });
			}
*/

			/*//checking if user is already assigned to project.
			//BROKEN. If a user is assigned to any project, this won't be null
			var projectUser = _entities.ProjectUser.FirstOrDefault(u => u.User.Email == email);

			if (projectUser != null)
			{
				return Conflict(new { message = "The user is already assigned to this project." });
			}
*/


			/*var error = project.AddUser(user);

			if (error is DuplicateUserError)
			{
				return Conflict(new { message = "The user is already assigned to this project." });
			}*/

			User newUser = new User(
					user.Email,
					user.FirstName,
					user.LastName,
					//project
					new List<Project>(),
					new List<ProjectUser>()
					);

			//adding the project to the newUser 
			newUser.Projects.Add(project);

			var users = _entities.Users;

			//removing the user from _entities because the user already exists. 
			//is there a way to modify it instead of deleting and readding?
			_entities.Users.Remove(user);

			_entities.Users.Add(newUser);

			var users2 = _entities.Users;

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
			if (project == null) { return NotFound("The project id is invalid."); }

			//I need to find the user with the email
			var user = _entities.Users.FirstOrDefault(p => p.Email == email);
			if (user == null) { return NotFound("The user must be registered."); }



			//I need to make sure the user is actually in the project, not just that the projectid or email isn't null

			//returns all projectIds associated with the user
			var query = (from p in _entities.Projects
							 //join t in _entities.Tasks
							 //on p.ProjectId equals t.Project.ProjectId
						 join pu in _entities.ProjectUser
						 on p.ProjectId equals pu.Project.ProjectId
						 join u in _entities.Users
						 on pu.User.Email equals u.Email
						 //where pu.Project.ProjectId == projectId
						 where u.Email == email && pu.Project.ProjectId == projectId
						 select new
						 {
							 p.ProjectId
						 }).ToList();


			if (query.Count <= 0)
			{
				return Conflict(new { message = "The user is not yet assigned to the project." });
			}


			//creating a new projectUser based off project and user to delete from ProjectUser entity
			ProjectUser projectUser = new ProjectUser()
			{
				Project = project,
				User = user
			};

			//Get a list of all the tasks the user is assigned to FROM THIS PROJECT ONLY and remove the user
			//var listoftasks = project.Tasks.ToArray().Where(u => u.AssignedEmail == email);
			var listoftasks = _entities.Tasks.ToArray().Where(u => u.AssignedEmail == email);

			//null check on listoftasks
			if (!listoftasks.Any())
			{
				//if the user isn't assigned to any tasks, then just remove the user from the project
				_entities.ProjectUser.Remove(projectUser);

				_entities.SaveChanges();
				//success call saying I deleted something and there's no content
				return NoContent();

			}
			else
			{
				//first unassign the user from all tasks
				foreach (var task in listoftasks)
				{
					task.AssignedEmail = "";
				}

				_entities.ProjectUser.Remove(projectUser);

				_entities.SaveChanges();
				//success call saying I deleted something and there's no content
				return NoContent();

			}


		}





		//Get all users NOT assigned to a project, this is used to assign users to projects
		//and not be able to assign users to projects they're already assigned to 
		[HttpGet("{projectId}")]
		[ProducesResponseType(500)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		[ProducesResponseType(typeof(IEnumerable<UserRm>), 200)]
		public ActionResult<IEnumerable<UserRm>> Find(Guid projectId)
		{
			
			//stored procedure returns all users not assigned to the specific projectId
			var results = _entities.Users.FromSql($"exec sp_getUsersNotInProject {projectId}").ToList();

			List<UserRm> usersRm = new List<UserRm>();

			foreach(var user in results)
			{
				usersRm.Add(new UserRm(
					user.Email
					, user.FirstName
					, user.LastName));
			}
			
			return Ok(usersRm);
		}


		/*
		 
			Putting this here for now although it isn't a perfect fit. Might create a new controller for ids only 
		 
		 */
		[HttpGet]
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
