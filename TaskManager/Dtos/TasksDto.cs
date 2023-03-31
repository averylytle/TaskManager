using System.ComponentModel.DataAnnotations;

namespace TaskManager.Dtos
{
	public record TasksDto(
		[Required] Guid ProjectId,//required to assign a task to a project
		[Required] Guid TaskId,
		[Required] string Name,
		//might need to change string length to accommodate description
		[StringLength(1000)] string Description,
		//DateTime DueDate,
		string? AssignedFirstName,
		string? AssignedLastName,
		string? AssignedEmail,
		string? Priority,
		byte IsComplete = 0
		);
}


/*public record TasksRm(
	Guid TaskId,
	string Name,
	string Description,
	DateTime CreatedDate,
	DateTime DueDate,
	string AssignedFirstName,
	string AssignedLastName,
	string Priority
	);*/