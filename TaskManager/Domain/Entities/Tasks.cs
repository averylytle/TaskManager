namespace TaskManager.Domain.Entities
{
	public class Tasks
	{
		private Guid TaskId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		//public DateTime CreatedDate { get; set; } //probably don't need this one
		//public DateOnly DueDate { get; set;}
		public string AssignedFirstName { get; set; } = string.Empty;
		public string AssignedLastName { get; set; } = string.Empty;
		public string Priority { get; set; } = string.Empty;

		public IList<TasksAssigned> TasksAssigned = new List<TasksAssigned>();


		public Tasks() { }

		public Tasks(Guid taskId, string name, string description, DateOnly createdDate, DateTime dueDate, string assignedFirstName, string assignedLastName, string priority)
		{
			TaskId = taskId;
			Name = name;
			Description = description;
/*			CreatedDate = createdDate;
			DueDate = dueDate;*/
			AssignedFirstName = assignedFirstName;
			AssignedLastName = assignedLastName;
			Priority = priority;
		}

		//returning OverbookError class object. nullable
/*		internal object? CreateTask(string passengerEmail, byte numberOfSeats)
		{
			var task = this;
			//making sure we can't book a flight with more seats than are remaining
			//this is a domain-rule validation. you can't have negative seats
			if (flight.RemainingNumberOfSeats < numberOfSeats)
			{
				return new OverbookError();
			}

			//adding bookings to the flight entity
			flight.Bookings.Add(
				new Booking(
					passengerEmail,
					numberOfSeats)
				);

			//decrease the seats by the number of seats just booked
			flight.RemainingNumberOfSeats -= numberOfSeats;

			return null;
		}

		public object? CancelBooking(string passengerEmail, byte numberOfSeats)
		{
			var booking = Bookings.FirstOrDefault(b => numberOfSeats == b.NumberOfSeats
			&& passengerEmail.ToLower() == b.PassengerEmail.ToLower());

			if (booking == null)
			{
				return new NotFoundError();
			}

			Bookings.Remove(booking);
			RemainingNumberOfSeats += booking.NumberOfSeats;

			return null;
		}*/
	}

	
	
}
