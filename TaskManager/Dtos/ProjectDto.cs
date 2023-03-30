using System.ComponentModel.DataAnnotations;

namespace TaskManager.Dtos
{
	public record ProjectDto(
		[Required] Guid ProjectId,
		[Required] string ProjectName

		//Do I need to add anything else when creating a new project?
		);
}
