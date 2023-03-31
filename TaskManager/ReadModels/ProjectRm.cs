using TaskManager.Domain.Entities;

namespace TaskManager.ReadModels
{

	/*
		Leaving the ProjectRM with Users and Tasks for now
		to test the API. Might remove later
		 */
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