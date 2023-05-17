﻿namespace TaskManager.ReadModels
{
	public record TasksRm(
		Guid TaskId,
		string Name,
		string Description,
		string? AssignedFirstName,
		string? AssignedLastName,
		string? AssignedEmail,
		string Priority
		);

}
