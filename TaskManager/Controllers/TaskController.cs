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
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class TaskController : ControllerBase
	{
		private readonly ILogger<TaskController> _logger;

		//needed for dependency injection
		private readonly Entities _entities;

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

		
		[HttpGet]
		[ProducesResponseType(500)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		[ProducesResponseType(typeof(IEnumerable<ProjectTaskRm>), 200)]
		public ActionResult<IEnumerable<ProjectTaskRm>> ListTasks(Guid projectId)
		{

			/*

						BROKEN - won't return tasks because the userlist is empty

			 */

			var query = (from p in _entities.Projects
						 join t in _entities.Tasks
						 on p.ProjectId equals t.Project.ProjectId
						 join u in _entities.Users
						 on p.ProjectId equals u.Project.ProjectId
						 where p.ProjectId == projectId
						 select new
						 {
							 ProjectName = p.ProjectName,
							 ProjectDescription = p.ProjectDescription,
							 TaskId = t.TaskId,
							 Name = t.Name,
							 Description = t.Description,
							 AssignedFirstName = u.FirstName, 
							 AssignedLastName = u.LastName,
							 AssignedEmail = t.AssignedEmail,
							 Priority = t.Priority,
							 IsComplete = t.IsComplete
						 }).ToList();


			//Converting query to a TasksRm
			List<TasksRm> tasksRm = new List<TasksRm>();

			List<ProjectTaskRm> projectTasksRm = new List<ProjectTaskRm>();

			/*foreach (var task in query)
			{
				tasksRm.Add(new TasksRm(
					task.TaskId, task.Name, task.Description, task.AssignedFirstName, task.AssignedLastName, task.AssignedEmail,
					task.Priority, task.IsComplete));
			}*/

			foreach (var task in query)
			{
				projectTasksRm.Add(new ProjectTaskRm(
					task.ProjectName, 
					task.ProjectDescription,
					task.Name, 
					task.Description, 
					task.AssignedFirstName, 
					task.AssignedLastName, 
					task.AssignedEmail,
					task.Priority,
					task.IsComplete));
			}

			return Ok(projectTasksRm);
			
		}

		//was originally in project controller but now in task controller
		[HttpGet("{email}")]
		[ProducesResponseType(500)]
		[ProducesResponseType(400)]
		[ProducesResponseType(404)]
		[ProducesResponseType(typeof(IEnumerable<TasksRm>), 200)]
		//List all tasks related to a project based on user email
		public ActionResult<IEnumerable<TasksRm>> ListTasksByUser(string email)
		{
			try
			{
				//getting the user based on email to use in linq query below
				var user = _entities.Users.FirstOrDefault(u => u.Email == email);

				//grabbing all the tasks assigned to the user, using var user to send firstname and lastname back

				var query = (from t in _entities.Tasks
								join u in _entities.Users
								on t.AssignedEmail equals u.Email
								where (t.IsComplete == 0) && (t.AssignedEmail == email)  //only return active tasks
								select new
								{
									TaskId = t.TaskId,
									Name = t.Name,
									Description = t.Description,
									AssignedFirstName = u.FirstName,
									AssignedLastName = u.LastName,
									AssignedEmail = t.AssignedEmail,
									Priority = t.Priority,
									IsComplete = t.IsComplete
								}).ToList();

				//Converting query to a TasksRm
				List<TasksRm> tasksRm = new List<TasksRm>();

				foreach (var task in query)
				{
					tasksRm.Add(new TasksRm(
						task.TaskId, task.Name, task.Description, task.AssignedFirstName, task.AssignedLastName, task.AssignedEmail,
						task.Priority, task.IsComplete));
				}

				if (user == null)
				{
					return NotFound($"The user with email {email} is not registered.");
				}

				if (!tasksRm.Any())//if it is false
				{
					return NotFound("No tasks found for that user.");
				}

				return Ok(tasksRm);
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
			//task Guid
			Guid taskGuid = Guid.NewGuid();

			//getting the project that we want to add a task to
			var project = _entities.Projects.SingleOrDefault(p => p.ProjectId == dto.ProjectId);

			if (project == null) { return NotFound("The project id is invalid."); }


			/*//task assignment is left blank to keep tasks about tasks, not users. 
			//will add a function to assign a user to a task
			var error = project.AddTask(new Tasks(
				dto.TaskId,
				dto.Name,
				dto.Description ?? "",
				"",//no assigned email because user assignment takes place in a different location
				dto.Priority ?? "",
				0,
				project));

			if (error is DuplicateTaskError)
			{
				//eventually log the error 
				return Conflict(new { message = "A Task with that taskId already exists." });
			}*/
			try 
			{
				_entities.Tasks.Add(new Tasks(
				//dto.TaskId,
				taskGuid,
				dto.Name,
				dto.Description ?? "",
				dto.AssignedEmail ?? "",//keeping assigned email for ease of adding task on front-end
				dto.Priority ?? "",
				0,
				project));

				_entities.SaveChanges();

			}
			catch(DbUpdateException ex)
			{
				return Conflict(ex.Message);
			}


			return CreatedAtAction("Task Created", new { id = taskGuid });

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

			if (project == null)
			{
				return NotFound();
			}

			var task = _entities.Tasks.Find(taskId);

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

			/*//success call saying I deleted something and theres no content anymore
			return NoContent();*/

		}

		[HttpPut]
		[ProducesResponseType(200)]
		[ProducesResponseType(400)]
		[ProducesResponseType(500)]//missing database connection or something
		[ProducesResponseType(StatusCodes.Status404NotFound)]

		public IActionResult Edit(TasksDto dto)
		{
			//i think that when angular sends the dto over, there won't be any "string" being sent. it'll be
			//filled out with whatever that dto actually is. 


			//maybe I don't need to edit the first name and last name here. I just add the user and it shows.
			//Only email
			//editing user later on will change it on the task and project


			var project = _entities.Projects.Find(dto.ProjectId);
			//what's the difference between find and first or default
			var task = _entities.Tasks.FirstOrDefault(t => t.TaskId == dto.TaskId);


			if (task == null)
			{
				return NotFound();
			}

			if (task.Name != dto.Name && dto.Name != null)
				task.Name = dto.Name;

			if (task.Description != dto.Description && dto.Description != null)
				task.Description = dto.Description;

			if (task.AssignedEmail != dto.AssignedEmail && dto.AssignedEmail != null)
			{
				task.AssignedEmail = dto.AssignedEmail;
			}

			if (task.Priority != dto.Priority && dto.Priority != null)
				task.Priority = dto.Priority;


			_entities.SaveChanges();

			return Ok("Task updated.");

		}


	}
}

