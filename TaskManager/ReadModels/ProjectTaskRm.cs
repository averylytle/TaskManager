namespace TaskManager.ReadModels
{
	public record ProjectTaskRm
	(
		string ProjectName,
		string ProjectDescription,
		string TaskName,
		string TaskDescription,
/*		DateTime CreatedDate,
		DateTime DueDate,*/
		string? AssignedFirstName,
		string? AssignedLastName,
		string? AssignedEmail,
		string Priority,
		byte IsComplete
	);
}
