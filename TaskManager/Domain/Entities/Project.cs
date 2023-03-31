﻿using TaskManager.Domain.Errors;

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

		internal object? AddTask(Tasks tasks)
		{
			var project = this;

			//could Task task ever be null? Added null check just in case


			//checking if task already exists
			if (tasks == null)
			{
				return new DuplicateTaskError();
			}

			//project.AddTask(tasks);
			project.Tasks.Add(tasks
				);

/*			new Tasks(
					tasks.TaskId,
					tasks.Name,
					tasks.Description,
					tasks.AssignedFirstName,
					tasks.AssignedLastName,
					tasks.AssignedEmail,
					tasks.Priority,
					tasks.IsComplete)*/

			return null;
		}

		internal object? AddUser(User user) 
		{
			var project = this;

			if(user == null)
			{
				return new DuplicateUserError();
			}

			//project.AddUser(user);
			project.Users.Add(user);

			return null;
		}
	}
}