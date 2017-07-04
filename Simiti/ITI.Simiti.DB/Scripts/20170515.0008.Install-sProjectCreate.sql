create proc iti.sProjectCreate
(
	@Name nvarchar(32),
	@Project nvarchar(200),
	@UserId int
)
as 
begin
	insert into iti.tProject([Name], Project, UserId) values (@Name, @Project, @UserId);
	return 0;
end;