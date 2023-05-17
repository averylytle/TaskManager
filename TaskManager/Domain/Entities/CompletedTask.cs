using System.ComponentModel.DataAnnotations;

namespace TaskManager.Domain.Entities
{
	public class CompletedTask
	{
		[Key]
		public Guid TaskId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string? AssignedEmail { get; set; } = string.Empty;
		public string Priority { get; set; } = string.Empty;

		public Project Project { get; set; } = null!;
		public string CompletorEmail { get; set; } = string.Empty;
		public DateTime CompletedDate { get; set; }


		public CompletedTask() { }

		public CompletedTask(Guid taskId, string name, string description, string assignedEmail, string priority, Project project, string completorEmail, DateTime completedDate)
		{
			TaskId = taskId;
			Name = name;
			Description = description;
			AssignedEmail = assignedEmail;
			Priority = priority;
			Project = project;
			CompletorEmail = completorEmail;
			CompletedDate = completedDate;
		}
	}
}
