create proc iti.sUserUpdate
(
	@UserId int,
	@Pseudo nvarchar(150),
	@Email nvarchar(150)
)
as
begin
	update iti.tUser
	set Pseudo = @Pseudo,
		Email = @Email
	where UserId = @UserId
	return 0;
end;