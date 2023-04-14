using System.ComponentModel.DataAnnotations;

namespace TaskManager.Domain.Entities
{
	public class User
	{
		[Key]
		public string Email { get; set; }//primary key
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;
		public Project Project { get; set; } = null!;

		public User() { }

		//, Project project
		public User(string email, string firstName, string lastName, Project project)
		{
			Email = email;
			FirstName = firstName;
			LastName = lastName;
			Project = project;
		}
	}
}
