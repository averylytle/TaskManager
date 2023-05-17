namespace TaskManager.ReadModels
{
	public record CompletedTasksRm(
		Guid TaskId,
		string Name,
		string? Description,
		string? AssignedFirstName,
		string? AssignedLastName,
		string? AssignedEmail,
		string? Priority,
		string CompletorEmail,
		DateTime CompletedDate
		);
}
