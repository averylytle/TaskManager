using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.ReadModels;

namespace TaskManager.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class CompletedTasksController : ControllerBase
	{
		//needed for dependency injection
		private readonly Entities _entities;

		public CompletedTasksController(Entities entities) 
		{
			_entities = entities;
		}

		[ProducesResponseType(400)]//client side error
		[ProducesResponseType(500)]//server side error. database connection string failure 
		[ProducesResponseType(typeof(IEnumerable<TasksRm>), 200)]
		[HttpGet]//will always use a readmodel
		public IEnumerable<TasksRm> ListComplete()
		{
			var tasksRmList = _entities.Tasks.
				Where(t => t.IsComplete == 1).
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
	}
}
