SELECT *
FROM Projects p
JOIN Users u on u.ProjectId = p.ProjectId
WHERE u.Email = 'avery@gmail.com';

SELECT * 
FROM Users;


SELECT *
FROM Projects;

SELECT *
FROM Tasks
WHERE IsComplete = CAST(1 AS tinyint);

UPDATE Users 
SET ProjectId = '3FA85F64-5717-4562-B3FC-2C963F66AFA6'
WHERE Email = 'avery@gmail.com';

--UPDATE Tasks
--SET AssignedEmail = 'avery@gmail.com';

--UPDATE Tasks
--SET AssignedEmail = '';


--DELETE FROM Users;

--DELETE FROM Tasks;

--INSERT INTO Users (Email, FirstName, LastName, ProjectId)
--VALUES ('avery@gmail.com','Avery','Lytle','3FA85F64-5717-4562-B3FC-2C963F66AFA6')




SELECT [t].[TaskId], [t].[Name], [t].[Description], [u].[FirstName] AS [AssignedFirstName], [u].[LastName] AS [AssignedLastName], [t].[AssignedEmail], [t].[Priority], [t].[IsComplete]
FROM [Tasks] AS [t]
INNER JOIN [Users] AS [u] ON [t].[AssignedEmail] = [u].[Email]
WHERE [t].[IsComplete] = CAST(1 AS tinyint)