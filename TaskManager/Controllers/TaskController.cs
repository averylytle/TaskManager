using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using TaskManager.Domain.Entities;
using TaskManager.ReadModels;
using TaskManager.Dtos;

namespace TaskManager.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class TaskController : ControllerBase
	{
		private readonly ILogger<TaskController> _logger;

		public static Random random= new Random();

		static private IList<TasksRm> tasksRm = new List<TasksRm>
		{
		new ( Guid.NewGuid(),
			"Azure Training",
			"Complete all the azure training required",
			"Avery",
			"Lytle",
			"Low"
			),
		new ( Guid.NewGuid(),
			"Chores",
			"Do all my house chores",
			"Avery",
			"Lytle",
			"Medium"
			)
		};
		static private IList<CompletedTasksRm> completedTasksRm = new List<CompletedTasksRm>();

		static private IList<TasksDto> Tasks = new List<TasksDto>(); 

		/*[ProducesResponseType(400)]//client side error
		[ProducesResponseType(500)]//server side error. database connection string failure 
		[ProducesResponseType(typeof(IEnumerable<TasksRm>), 200)]*/
		[HttpGet]
		public IEnumerable<TasksRm> Search()
		{
			return tasksRm;
		}

		[HttpPost]
		[ProducesResponseType(400)]
		[ProducesResponseType(500)]//missing database connection or something
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(201)]//new create
		public IActionResult AddTask(TasksDto dto)
		{
/*			var validTask = tasks.SingleOrDefault(t => t.TaskId== dto.TaskId);

			if (validTask != null)
			{
				return NotFound();
			}*/

			DateTime localDate = DateTime.Now;

			tasksRm.Add(new TasksRm(
				dto.TaskId,
				dto.Name,
				dto.Description ?? "",
				dto.AssignedFirstName ?? "",
				dto.AssignedLastName ?? "",
				dto.Priority ?? ""
				));

			//Tasks.Add(dto);
			return CreatedAtAction("Task added", new {id = dto.Name});

		}

		//Endpoints take DTOs ALWAYS
		[HttpDelete]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(200)]
		[ProducesResponseType(500)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Delete(Guid taskId)
		{
			var task = tasksRm.FirstOrDefault(t => t.TaskId == taskId);

			if (task == null)
			{
				return NoContent();
			}

			tasksRm.Remove(task);

			return Ok("Deleted successfullly.");
		}

	}
}


/*
 			=> new TasksRm[]
			{
				new ( Guid.NewGuid(),
			"Azure Training",
			"Complete all the azure training required",
			DateTime.Now.AddHours(random.Next(1,3)),
			DateTime.Now.AddHours(random.Next(1,3)),
			"Avery",
			"Lytle",
			"Low"
			),
		new ( Guid.NewGuid(),
			"Chores",
			"Do all my house chores",
			DateTime.Now.AddHours(random.Next(1,3)),
			DateTime.Now.AddHours(random.Next(1,3)),
			"Avery",
			"Lytle",
			"Medium"
			)
			};*/