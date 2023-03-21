namespace TaskManager.Domain.Entities
{
	public class User
	{
		public string Email { get; set; }
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;

		public User(string email, string firstName, string lastName)
		{
			Email = email;
			FirstName = firstName;
			LastName = lastName;
		}
	}
}
