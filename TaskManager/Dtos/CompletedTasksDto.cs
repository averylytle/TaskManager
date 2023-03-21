﻿using System.ComponentModel.DataAnnotations;

namespace TaskManager.Dtos
{
	public record CompletedTasksDto(
		[Required] Guid TaskId,
		[Required] string Name,
		//might need to change string length to accommodate description
		[StringLength(1000)] string Description,
		//DateTime DueDate,
		string? AssignedFirstName,
		string? AssignedLastName,
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