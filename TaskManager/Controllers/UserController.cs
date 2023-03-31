using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using TaskManager.Data;
using TaskManager.Domain.Entities;
using TaskManager.Domain.Errors;
using TaskManager.Dtos;
using TaskManager.ReadModels;

namespace TaskManager.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly Entities _entities;

		public UserController(Entities entities)
		{
			_entities = entities;
		}

		//private static IList<User> Users = new List<User>();

		[HttpPost]
		[ProducesResponseType(201)]
		[ProducesResponseType(400)]
		[ProducesResponseType(500)]
		public IActionResult Register(NewUserDto dto)
		{

			//Registering a user should maybe not be associated with Project. A user should be able to register
			//on the website without being in a project first. Then get assigned to a project. Ugh. 

			_entities.Users.Add(new User(
				dto.Email,
				dto.FirstName,
				dto.LastName
				));

			_entities.SaveChanges();

			return CreatedAtAction(nameof(Find), new { email = dto.Email });


			/*Users.Add(new User(
				dto.Email,
				dto.FirstName,
				dto.LastName));

			return CreatedAtAction(nameof(Find), new { email = dto.Email });*/
		}
		

		//This works
		[HttpGet("{email}")]
		public ActionResult<UserRm> Find(string email)
		{
			var user = _entities.Users.FirstOrDefault(u => u.Email == email);

			if (user == null) { return NotFound(); }

			var rm = new UserRm(
				user.Email,
				user.FirstName,
				user.LastName
				);

			return Ok(rm);
		}


		[HttpPut]
		[ProducesResponseType(200)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		[ProducesResponseType(409)]
		[ProducesResponseType(500)]//missing database connection or something
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult AssignUser(Guid projectId, string email)//NewUserDto 
		{

			//Business logic: to be assigned to a project, the user must first be registered

			//finding the project
			var project = _entities.Projects.Find(projectId);
			if (project == null) { return NotFound("The Project Id is invalid."); }

			//I need to find the user with the email
			var user = _entities.Users.FirstOrDefault(p => p.Email == email);

			if (user == null) { return NotFound("The user must be registered first.");}

			//checking if user is already assigned to project.

			var error = project.AddUser(user);

			if(error is DuplicateUserError)
			{
				return Conflict(new { message = "The user is already assigned to this project." });
			}
			
			_entities.SaveChanges();

			/*if (project.Users.Contains(user))
			{
				return NotFound("The user is already assigned to this project.");
			}

			project.AddUser(user);*/

			return Ok("User assigned to project");
			/*

			project.AddUser(new User(
				dto.Email,
				dto.FirstName,
				dto.LastName
				));

			return Ok("User assigned to project");*/
		}

	}
}
