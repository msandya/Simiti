create view iti.vProject
as
	select
		ProjectId = p.ProjectId,
		[Name] = p.[Name],
		Project = p.Project,
		UserId = p.UserId
	from iti.tProject p
	where p.ProjectId <> 0;