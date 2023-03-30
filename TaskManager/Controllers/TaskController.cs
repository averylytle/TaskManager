using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using TaskManager.Domain.Entities;
using TaskManager.ReadModels;
using TaskManager.Dtos;
using TaskManager.Data;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace TaskManager.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class TaskController : ControllerBase
	{
		private readonly ILogger<TaskController> _logger;

		//needed for dependency injection
		private readonly Entities _entities;

		/*public static Random random = new Random();

		static private IList<TasksRm> tasksRm = new List<TasksRm>
		{
		new ( Guid.NewGuid(),
			"Azure Training",
			"Complete all the azure training required",
			"Avery",
			"Lytle",
			"avery@gmail.com",
			"Low",
			0
			),
		new ( Guid.NewGuid(),
			"Chores",
			"Do all my house chores",
			"Avery",
			"Lytle",
			"avery@gmail.com",
			"Medium",
			0
			)
		};*/


		public TaskController(ILogger<TaskController> logger, Entities entities)
		{
			_logger = logger;
			_entities = entities;
		}





		[ProducesResponseType(400)]//client side error
		[ProducesResponseType(500)]//server side error. database connection string failure 
		[ProducesResponseType(typeof(IEnumerable<TasksRm>), 200)]
		[HttpGet]//will always use a readmodel
		public IEnumerable<TasksRm> Search()
		{
			var tasksRmList = _entities.Tasks.
				Where(t => t.IsComplete == 0).
				Select(task => new TasksRm(
				task.TaskId,
				task.Name,
				task.Description,
				task.AssignedFirstName,
				task.AssignedLastName,
				task.AssignedEmail,
				task.Priority,
				task.IsComplete));

			return tasksRmList;
		}

/*		[ProducesResponseType(400)]//client side error
		[ProducesResponseType(500)]//server side error. database connection string failure 
		[ProducesResponseType(typeof(IEnumerable<TasksRm>), 200)]
		[HttpGet("{taskId}")]//will always use a readmodel
		public IEnumerable<TasksRm> ListComplete(Guid taskId)
		{
			// the problem here is it will only return one task. I want all of them. 
			var tasksRmList = _entities.Tasks.
				Where(t => t.IsComplete == 1 && t.TaskId == taskId).
				Select(task => new TasksRm(
				task.TaskId,
				task.Name,
				task.Description,
				task.AssignedFirstName,
				task.AssignedLastName,
				task.Priority,
				task.IsComplete));

			return tasksRmList;
		}*/


		/*		[HttpGet("{id}")]
				public IEnumerable<CompletedTasksRm> SearchCompleted()
				{
					return completedTasksRm;
				}
		*/

		[HttpPost]
		[ProducesResponseType(400)]
		[ProducesResponseType(500)]//missing database connection or something
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(201)]//new create
		public IActionResult AddTask(TasksDto dto)
		{

			try
			{
				_entities.Tasks.Add(new Tasks(
				dto.TaskId,
				dto.Name,
				dto.Description ?? "",
				dto.AssignedFirstName ?? "",
				dto.AssignedLastName ?? "",
				dto.AssignedEmail ?? "",
				dto.Priority ?? "",
				dto.IsComplete));
			}
			
			catch (System.InvalidOperationException ex)
			{
				//eventually log the error 
				return Conflict("A Task with that taskId already exists.");
			}

			_entities.SaveChanges();

			return CreatedAtAction("Task Created", new { id = dto.TaskId });

		}

		//Endpoints take DTOs ALWAYS
		[HttpDelete]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(200)]
		[ProducesResponseType(500)]
		[ProducesResponseType(StatusCodes.Status400BadRequest)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public IActionResult Complete(Guid taskId)//Guid taskId
		{
			//var task = _entities.Tasks.Find(dto.TaskId);
			var task = _entities.Tasks.Find(taskId);

			if (task == null)
			{
				return NotFound();
			}

			task.Complete();
			//task.IsComplete = 1;

			_entities.SaveChanges();

			return Ok("Task Completed.");

		}

		[HttpPut]
		[ProducesResponseType(200)]
		[ProducesResponseType(400)]
		[ProducesResponseType(500)]//missing database connection or something
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		//@ just makes params a param bc it's normally a reserved keyword in C#
		public IActionResult Edit(TasksDto dto)
		{
			//i think that when angular sends the dto over, there won't be any "string" being sent. it'll be
			//filled out with whatever that dto actually is. 
			var task = _entities.Tasks.Find(dto.TaskId);

			if (task == null)
			{
				return NotFound();
			}

			if (task.Name != dto.Name && dto.Name != null)
				task.Name = dto.Name;

			if (task.Description != dto.Description && dto.Description != null)
				task.Description = dto.Description;

			if (task.AssignedFirstName != dto.AssignedFirstName && dto.AssignedFirstName != null)
				task.AssignedFirstName = dto.AssignedFirstName;

			if (task.AssignedLastName != dto.AssignedLastName && dto.AssignedLastName != null)
				task.AssignedLastName = dto.AssignedLastName;

			if (task.Priority != dto.Priority && dto.Priority != null)
				task.Priority = dto.Priority;


			_entities.SaveChanges();

			return Ok("Task updated.");


			/*
			 Maybe I can send a TaskDto. and see if each parameter of the DTO matches?


			Right now it'll update it, but it'll update every field. I want to leave the 
			unchanged fields unchanged


			maybe make the swagger fields not required? optional?


			Guid taskId, string name, string description, string assignedFirstName, string assignedLastName, string priority

			var task = _entities.Tasks.Find(taskId);

			if (task == null)
			{
				return NotFound();
			}

			if (task.Name != name && (name != "''" || name != null))
				task.Name = name;

			if (task.Description != description && (description != "''" || description != null)) 
				task.Description = description;

			if (task.AssignedFirstName != assignedFirstName && (assignedFirstName != "" || assignedFirstName != null) )
				task.AssignedFirstName = assignedFirstName;

			if (task.AssignedLastName != assignedLastName && (assignedLastName != "" || assignedLastName != null))
				task.AssignedLastName = assignedLastName;

			if (task.Priority != priority && (priority != "" || priority != null))
				task.Priority = priority;

			_entities.SaveChanges();

			return Ok("Task edited.");

			var task = _entities.Tasks.Where(t => t.TaskId == dto.TaskId).FirstOrDefault();

			//var task = _entities.Tasks.Find(dto.TaskId);

			if (task == null)
			{
				return NotFound();
			}

			if (task.Name != dto.Name && (dto.Name != "" || dto.Name != null))
				task.Name = dto.Name;

			return Ok();
			 */


		}
	}
}

