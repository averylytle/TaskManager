using System.ComponentModel.DataAnnotations;

namespace TaskManager.Dtos
{
	public record ProjectDto(
		//[Required] Guid ProjectId, removed because the system creates a new GUID, not the front-end
		[Required] string ProjectName,
		string Description

		//Do I need to add anything else when creating a new project?
		);
}
