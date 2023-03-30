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
		string Priority,
		byte IsComplete
		);

	/*	public class TaskRm
		{
			private Guid TaskId { get; set; }
			private string TaskName { get; set; }
			private string TaskDescription { get; set; } = string.Empty;
			private string AssignedFirstName { get; set; }	
			private string AssignedLastName { get; set;}
			private string Priority { get; set; }
			private byte IsComplete { get; set; } = 0;

		}*/
}
