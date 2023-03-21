using Microsoft.EntityFrameworkCore;
using TaskManager.Domain.Entities;

namespace TaskManager.Data
{
	public class Entities : DbContext
	{
		public DbSet<Tasks> Tasks => Set<Tasks>();
	}
}
