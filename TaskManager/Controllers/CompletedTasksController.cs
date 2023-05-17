using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Dtos;
using TaskManager.ReadModels;

namespace TaskManager.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class CompletedTasksController : ControllerBase
	{
		//needed for dependency injection
		private readonly Entities _entities;

		private readonly Guid guid = new Guid();

		public CompletedTasksController(Entities entities)
		{
			_entities = entities;
		}

		//[Route("[controller]/{email:string?}")]
		[HttpGet]//will always use a readmodel
		[ProducesResponseType(400)]//client side error
		[ProducesResponseType(500)]//server side error. database connection string failure 
		[ProducesResponseType(typeof(IEnumerable<CompletedTasksRm>), 200)]
		public IEnumerable<CompletedTasksRm> ListComplete(Guid projectId, string email = "")
		{
			if(email == "")
			{
				var query = (from t in _entities.CompletedTasks
							 join u in _entities.Users
							 on t.AssignedEmail equals u.Email
							 where (t.Project.ProjectId == projectId)
							 select new
							 {
								 t.TaskId,
								 t.Name,
								 t.Description,
								 AssignedFirstName = u.FirstName,
								 AssignedLastName = u.LastName,
								 t.AssignedEmail,
								 t.Priority,
								 t.CompletorEmail,
								 t.CompletedDate
							 }).ToList();

				//Converting query to a TasksRm
				List<CompletedTasksRm> deletedTasksRm = new List<CompletedTasksRm>();

				foreach (var task in query)
				{
					deletedTasksRm.Add(new CompletedTasksRm(
						task.TaskId, task.Name, task.Description, task.AssignedFirstName, task.AssignedLastName, task.AssignedEmail,
						task.Priority, task.CompletorEmail, task.CompletedDate));
				}


				return deletedTasksRm;

			}
			else
			{
				var query = (from t in _entities.CompletedTasks
							 join u in _entities.Users
							 on t.AssignedEmail equals u.Email
							 where (t.Project.ProjectId == projectId) && (u.Email == email)
							 select new
							 {
								 t.TaskId,
								 t.Name,
								 t.Description,
								 AssignedFirstName = u.FirstName,
								 AssignedLastName = u.LastName,
								 t.AssignedEmail,
								 t.Priority,
								 t.CompletorEmail,
								 t.CompletedDate
							 }).ToList();

				//Converting query to a TasksRm
				List<CompletedTasksRm> deletedTasksRm = new List<CompletedTasksRm>();

				foreach (var task in query)
				{
					deletedTasksRm.Add(new CompletedTasksRm(
						task.TaskId, task.Name, task.Description, task.AssignedFirstName, task.AssignedLastName, task.AssignedEmail,
						task.Priority, task.CompletorEmail, task.CompletedDate));
				}


				return deletedTasksRm;

			}


		}



		[HttpGet("{email}")]//will always use a readmodel
		[ProducesResponseType(400)]//client side error
		[ProducesResponseType(500)]//server side error. database connection string failure 
		[ProducesResponseType(typeof(IEnumerable<CompletedTasksRm>), 200)]
		public IEnumerable<CompletedTasksRm> CompleteByEmail(string email)
		{
			var query = (from t in _entities.CompletedTasks
						 join u in _entities.Users
						 on t.AssignedEmail equals u.Email
						 where (u.Email == email)
						 select new
						 {
							 t.TaskId,
							 t.Name,
							 t.Description,
							 AssignedFirstName = u.FirstName,
							 AssignedLastName = u.LastName,
							 t.AssignedEmail,
							 t.Priority,
							 t.CompletorEmail,
							 t.CompletedDate
						 }).ToList();

			//Converting query to a TasksRm
			List<CompletedTasksRm> deletedTasksRm = new List<CompletedTasksRm>();

			foreach (var task in query)
			{
				deletedTasksRm.Add(new CompletedTasksRm(
					task.TaskId, task.Name, task.Description, task.AssignedFirstName, task.AssignedLastName, task.AssignedEmail,
					task.Priority, task.CompletorEmail, task.CompletedDate));
			}


			return deletedTasksRm;
		}


	}
}

