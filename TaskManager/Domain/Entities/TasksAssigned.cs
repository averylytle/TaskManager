namespace TaskManager.Domain.Entities
{
	//use this for tasks actually assigned to people. compare to 'Booking' 
	public record TasksAssigned(
		string Email,
		Guid TaskId,
		string Name,
		string Description,
		string AssignedFirstName,
		string AssignedLastName,
		string Priority
		);
}
