using Microsoft.EntityFrameworkCore;
using TaskManager.Domain.Entities;
using TaskManager.ReadModels;

namespace TaskManager.Data
{
	public class Entities : DbContext
	{
		public DbSet<Tasks> Tasks => Set<Tasks>();

		public DbSet<User> Users => Set<User>();
		public DbSet<Project> Projects => Set<Project>();

		public Entities(DbContextOptions<Entities> options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			//setting the primary key for Tasks
			modelBuilder.Entity<Tasks>().HasKey(t => t.TaskId);

			modelBuilder.Entity<User>().HasKey(p => p.Email);

			modelBuilder.Entity<Project>().HasKey(p => p.ProjectId);
		}

	}
}
