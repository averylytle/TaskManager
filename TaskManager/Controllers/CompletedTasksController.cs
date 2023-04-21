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
			/*ar tasksRmList = _entities.Tasks.
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
*/

			var query = (from t in _entities.Tasks
						 join u in _entities.Users
						 on t.AssignedEmail equals u.Email
						 where t.IsComplete == 1 // 0 works but why doesn't 1?
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


			return tasksRm;
		}
	}
}
