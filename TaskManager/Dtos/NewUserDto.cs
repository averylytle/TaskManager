using System.ComponentModel.DataAnnotations;

namespace TaskManager.Dtos
{
	//DTO means Data Transfer Object. Only for data transferring 
	//never write to the database, only for transferring 
	//use for submitting data from A to B, then you use a read model to save to the DB

	//this could contain more information than the passenger read model, such as flightinfo
	public record NewUserDto(
		[Required][EmailAddress][StringLength(100, MinimumLength = 5)] string Email,
		[Required][MinLength(2)][MaxLength(50)] string FirstName,
		[Required][MinLength(2)][MaxLength(50)] string LastName
		);
}
