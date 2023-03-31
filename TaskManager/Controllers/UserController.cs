using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Domain.Entities;
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

		private static IList<User> Users = new List<User>();

		/*[HttpPost]
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

			return CreatedAtAction(nameof(Find), new {email = dto.Email});


			*//*Users.Add(new User(
				dto.Email,
				dto.FirstName,
				dto.LastName));

			return CreatedAtAction(nameof(Find), new {email = dto.Email});*//*
		}

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
		}*/
	}
}
