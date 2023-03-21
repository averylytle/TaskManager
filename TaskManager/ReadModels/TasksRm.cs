namespace TaskManager.ReadModels
{
	public record TasksRm(
		Guid TaskId,
		string Name,
		string Description,
/*		DateTime CreatedDate,
		DateTime DueDate,*/
		string AssignedFirstName,
		string AssignedLastName,
		string Priority
		);
}
