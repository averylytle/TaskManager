using System.ComponentModel.DataAnnotations;

namespace TaskManager.Dtos
{
	public record TasksDto(
		[Required] Guid ProjectId,//required to assign a task to a project
		[Required] Guid TaskId,
		[Required] string Name,
		[StringLength(1000)] string Description,
		string? AssignedEmail,
		string? Priority
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