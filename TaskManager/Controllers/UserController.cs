using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Domain.Entities;
using TaskManager.Dtos;
using TaskManager.ReadModels;

namespace TaskManager.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private static IList<User> Users = new List<User>();

		[HttpPost]
		[ProducesResponseType(201)]
		[ProducesResponseType(400)]
		[ProducesResponseType(500)]
		public IActionResult Register(NewUserDto dto)
		{
			Users.Add(new User(
				dto.Email,
				dto.FirstName,
				dto.LastName));

			return CreatedAtAction(nameof(Find), new {email = dto.Email});
		}

		[HttpGet("{email}")]
		public ActionResult<UserRm> Find(string email)
		{
			var user = Users.FirstOrDefault(p => p.Email == email);

			if (user == null)
				return NotFound();

			var rm = new UserRm(
				user.Email,
				user.FirstName,
				user.LastName
				);

			return Ok(rm);
		}
	}
}
