using System.ComponentModel.DataAnnotations;

namespace TaskManager.Domain.Entities
{
	public class User
	{
		[Key]
		public string Email { get; set; }//primary key
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;
		public IList<Project> Projects { get; set; } = null!;
		public IList<ProjectUser>? ProjectUsers { get; set; } = new List<ProjectUser>();

		public User() { }

		//, Project project
		public User(string email, string firstName, string lastName, IList<Project>? projects, IList<ProjectUser>? projectUsers)
		{
			Email = email;
			FirstName = firstName;
			LastName = lastName;
			Projects = projects;
			ProjectUsers = projectUsers;
		}
	}
}
