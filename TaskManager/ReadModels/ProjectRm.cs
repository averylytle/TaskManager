using TaskManager.Domain.Entities;

namespace TaskManager.ReadModels
{
	public record ProjectRm(
		Guid ProjectId,
		string ProjectName,
		string? ProjectDescription,
		IList<User>? Users,
		IList<Tasks>? Tasks
		);
}



/*public record ProjectRm(
		Guid ProjectId,
		string ProjectName,
		string ProjectDescription,
		IList<UserRm> Users,
		IList<TasksRm> Tasks
		);*/