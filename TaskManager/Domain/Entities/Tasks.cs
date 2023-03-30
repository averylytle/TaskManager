﻿namespace TaskManager.Domain.Entities
{
	public class Tasks //can I change this to a record?
	{
		public Guid TaskId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string AssignedFirstName { get; set; } = string.Empty;
		public string AssignedLastName { get; set; } = string.Empty;
		public string Priority { get; set; } = string.Empty;

		public byte IsComplete { get; set; } = 0;

		//public IList<TasksAssigned> TasksAssigned = new List<TasksAssigned>();


		public Tasks() { }

		public Tasks(Guid taskId, string name, string description, string assignedFirstName, string assignedLastName, string priority, byte isComplete)
		{
			TaskId = taskId;
			Name = name;
			Description = description;
			AssignedFirstName = assignedFirstName;
			AssignedLastName = assignedLastName;
			Priority = priority;
			IsComplete = isComplete;
		}

		public void Complete()
		{
			var task = this;

			if(task.IsComplete == 0)
			{
				task.IsComplete= 1;
			}

			//might move this to a different method
/*			else
			{
				task.IsComplete= 0;
			}*/
		}
	}

	
	
}
