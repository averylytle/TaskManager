namespace TaskManager.ReadModels
{
	public record ProjectTaskRm
	(
		string ProjectName,
		string ProjectDescription,
		string TaskName,
		string TaskDescription,
		string? AssignedFirstName,
		string? AssignedLastName,
		string? AssignedEmail,
		string Priority
	);
}
