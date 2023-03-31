using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using TaskManager.Domain.Entities;
using TaskManager.ReadModels;
using TaskManager.Dtos;
using TaskManager.Data;
using System.Threading.Tasks;
using System.Xml.Linq;
using TaskManager.Domain.Errors;

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




		/*//Might not need this, Project Controller will take care of it?
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
		}*/

		//was originally in project controller but now in task controller
		[HttpGet("{email}")]
		[ProducesResponseType(500)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		[ProducesResponseType(typeof(IEnumerable<TasksRm>), 200)]
		//List all tasks related to a project based on user email
		public ActionResult<IEnumerable<TasksRm>> ListTasks(string email)
		{
			try
			{
				var tasks = _entities.Projects.ToArray().SelectMany(p => p.Tasks
					.Where(t => t.AssignedEmail == email && t.IsComplete == 0))//only shows the active tasks
					.Select(p => new TasksRm(
						p.TaskId,
						p.Name,
						p.Description,
						p.AssignedFirstName,
						p.AssignedLastName,
						p.AssignedEmail,
						p.Priority,
						p.IsComplete

						));
				if (tasks.Count() <= 0)
				{
					return NotFound("No tasks found for that user.");
				}

				return Ok(tasks);
			}
			catch (ArgumentNullException ex)
			{
				return NotFound(ex.Message);
			}

		}






		//Adding a task has to be associated to a project
		[HttpPost]
		[ProducesResponseType(400)]
		[ProducesResponseType(500)]//missing database connection or something
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		[ProducesResponseType(201)]//new create
		public IActionResult AddTask(TasksDto dto) 
		{
			//getting the project that we want to add a task to
			var project = _entities.Projects.SingleOrDefault(p => p.ProjectId == dto.ProjectId);

			if (project == null) { return NotFound(); }

			var error = project.AddTask(new Tasks(
				dto.TaskId,
				dto.Name,
				dto.Description ?? "",
				dto.AssignedFirstName ?? "",
				dto.AssignedLastName ?? "",
				dto.AssignedEmail ?? "",
				dto.Priority ?? "",
				dto.IsComplete));
			
			if (error is DuplicateTaskError)
			{
				//eventually log the error 
				return Conflict(new {message = "A Task with that taskId already exists." });
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
		public IActionResult Complete(Guid projectId, Guid taskId)//Guid taskId
		{

			/*
			 Now that tasks are in projects, I need to find the task in a project.
			Do I need to find the project first? Probably

			Can I find a project via a task Id? maybe if I pass a project Id and a taskId
			 */
			var project = _entities.Projects.Find(projectId);

			var task = project.Tasks.FirstOrDefault(t => t.TaskId == taskId);

			//var task = _entities.Tasks.Find(dto.TaskId);
			/*var task = _entities.Tasks.Find(taskId);*/

			if (task == null)
			{
				return NotFound();
			}

			task.Complete();
			//task.IsComplete = 1;

			_entities.SaveChanges();

			return Ok("Task Completed.");

		}

		/*[HttpPut]
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


		}*/
	}
}

