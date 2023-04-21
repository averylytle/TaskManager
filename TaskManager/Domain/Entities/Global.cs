namespace TaskManager.Domain.Entities
{
	public static class Global
	{
		//this is the empty project Guid for each new user. Every new user is assigned to this project
		//as a default
		//I'm doing this because I can't assign a null to projectId when registering a new user
		public static Guid EMPTY_PROJECT = new Guid("2724C33C-DB2A-4A1B-8DFB-3F02388762AD");
	}
}
