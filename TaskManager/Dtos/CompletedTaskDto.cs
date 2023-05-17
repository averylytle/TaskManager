using System.ComponentModel.DataAnnotations;

namespace TaskManager.Dtos
{
	public record CompletedTaskDto(
		[Required] Guid ProjectId,//Do I need this???? required to assign a task to a project
		[Required] Guid TaskId,
		string CompletorEmail
		);
}
