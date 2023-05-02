using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
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


		[HttpPost]
		[ProducesResponseType(201)]
		[ProducesResponseType(400)]
		[ProducesResponseType(500)]
		[ProducesResponseType(409)]
		public IActionResult Register(NewUserDto dto)
		{

			//Registering a user should maybe not be associated with Project. A user should be able to register
			//on the website without being in a project first. Then get assigned to a project. Ugh. 


			//Guid is to the empty project. We will assign a new user always to the empty project
			//workaround until I can figure out how to register a user with a null
			var project = _entities.Projects.FirstOrDefault(p => p.ProjectId == Global.EMPTY_PROJECT);



			//checking to see if a user is already registered
			if (_entities.Users.FirstOrDefault(u => u.Email == dto.Email) != null)
			{
				return Conflict(new { message = "A user with that email already exists." });
			}

			_entities.Users.Add(new User(
				dto.Email,
				dto.FirstName,
				dto.LastName,
				new List<Project>(),//must add these empty lists for EF many to many relationship
				new List<ProjectUser>()
				));

			_entities.SaveChanges();

			return CreatedAtAction(nameof(GetUserDetails), new { email = dto.Email });

		}



		//all users
		[HttpGet]
		[ProducesResponseType(500)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		[ProducesResponseType(typeof(IEnumerable<UserRm>), 200)]
		public ActionResult<IEnumerable<UserRm>> FindAllUsers()
		{

			var users = _entities.Users;

			IList<UserRm> usersRm = new List<UserRm>();

			foreach(var user in users)
			{
				usersRm.Add(new UserRm(
					user.Email
					,user.FirstName
					, user.LastName));
			}

			return Ok(usersRm);
		}


		//This works
		[HttpGet("{email}")]
		public ActionResult<UserRm> GetUserDetails(string email)
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

		



		[HttpPut("{email}")]
		public IActionResult Edit(string email)
		{
			return Ok();
		}
	}
}
