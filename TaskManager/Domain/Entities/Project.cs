using System.ComponentModel.DataAnnotations;
using TaskManager.Domain.Errors;

namespace TaskManager.Domain.Entities
{
	//use this for tasks actually assigned to people. This is the 'Flight'
/*
 A project can contain many tasks and many users but a task can only be assigned to one project
Users can be assigned to many projects.
 */
	public class Project
	{
		public Guid ProjectId { get; set; }
		public string ProjectName { get; set; }
		public string? ProjectDescription { get; set; }
		public IList<User>? Users { get; set; } = new List<User>();
		public IList<Tasks>? Tasks { get; set; } = new List<Tasks>();

		public Project() { }

		public Project(Guid projectId, string projectName, string projectDescription, IList<User>? users, IList<Tasks>? tasks)
		{
			ProjectId = projectId;
			ProjectName = projectName;
			ProjectDescription = projectDescription;
			Users = users;
			Tasks = tasks;
		}

		internal object? GetProjectId(string email)
		{
			var project = this;

			var user = project.Users.FirstOrDefault(x => x.Email == email);

			if (project.Users.Contains(user))
			{
				return project.ProjectId;
			}

			return new UserNotAssignedError();
		}

		internal object? AddTask(Tasks tasks)
		{
			var project = this;

			//could Task task ever be null? Added null check just in case


		    //checking if task already exists
			if((project.Tasks.FirstOrDefault(t => t.TaskId == tasks.TaskId))!=null)
			{
				return new DuplicateTaskError();
			}

			project.Tasks.Add(tasks);

			return null;
		}

		internal object? AddUser(User user) 
		{
			var project = this;

			if (project.Users.Contains(user))
			{
				return new DuplicateUserError();
			}

			project.Users.Add(user);

			return null;
		}

		/*internal object? RemoveTask(Tasks tasks)
		{
			var project = this;

			//could Task task ever be null? Added null check just in case


			//making sure task exists
			if (project.Tasks.FirstOrDefault(t => t.TaskId == tasks.TaskId) != null)
			{
				project.Tasks.Remove(tasks);
			}
			else
			{
				return new DuplicateTaskError();
			}

			return null;
		}*/

		internal object? RemoveUser(User user)//redesign with an error
		{
			var project = this;

			//if the user is assigned to the project, then remove the user
			if (project.Users.Contains(user))
			{
				project.Users.Remove(user);
			}
			else
			{
				return new UserNotAssignedError();
			}
			return null;
		}
	}
}
