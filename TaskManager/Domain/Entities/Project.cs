using TaskManager.Domain.Errors;

namespace TaskManager.Domain.Entities
{
	//use this for tasks actually assigned to people. compare to 'Booking' 
/*
 A project can contain many tasks and many users but a task can only be assigned to one project
Users can be assigned to many projects.
 */
	public class Project
	{
		public Guid ProjectId { get; set; }
		public string ProjectName { get; set; }
		public string? ProjectDescription { get; set; }
		public IList<User>? Users { get; set; }
		public IList<Tasks>? Tasks { get; set; }

		public Project() { }

		public Project(Guid projectId, string projectName, string projectDescription, IList<User>? users, IList<Tasks>? tasks)
		{
			ProjectId = projectId;
			ProjectName = projectName;
			ProjectDescription = projectDescription;
			Users = users;
			Tasks = tasks;
		}

		internal object? AddTask(Task task)
		{
			var project = this;

			//could Task task ever be null? Added null check just in case

			if (task == null)
			{
				return new DuplicateTaskError();
			}

			project.AddTask(task);

			return null;
		}

		internal object? AddUser(User user) 
		{
			var project = this;

			if(user == null)
			{
				return new DuplicateUserError();
			}

			project.AddUser(user);

			return null;
		}
	}
}
