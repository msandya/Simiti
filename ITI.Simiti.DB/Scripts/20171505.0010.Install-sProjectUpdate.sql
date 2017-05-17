create proc iti.sProjectUpdate
(
	@ProjectId int,
	@Name nvarchar(32),
	@Project xml
)
as
begin
	update iti.tProject
	set [Name] = @Name,
		Project = @Project
	where ProjectId = @ProjectId
	return 0;
end;