namespace TaskManager.Domain.Entities
{
	public class ProjectUser
	{
		//public Guid ProjectId { get; set; }
		//public string Email { get; set; }
		public Project Project { get; set; } = null!;
		public User User { get; set; } = null!;
	}
}
