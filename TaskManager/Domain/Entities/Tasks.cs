﻿using System.ComponentModel.DataAnnotations;

namespace TaskManager.Domain.Entities
{
	public class Tasks 
	{
		[Key]
		public Guid TaskId { get; set; }

		public string Name { get; set; }
		public string Description { get; set; }
		public string? AssignedEmail { get; set; } = string.Empty;
		public string Priority { get; set; } = string.Empty;

		public Project Project { get; set; } = null!;

		public Tasks() { }

		public Tasks(Guid taskId, string name, string description, string assignedEmail, string priority, Project project)
		{
			TaskId = taskId;
			Name = name;
			Description = description;
			AssignedEmail = assignedEmail;
			Priority = priority;
			Project = project;
		}

	}
	
}
