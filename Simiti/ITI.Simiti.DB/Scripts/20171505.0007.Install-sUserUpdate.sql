create proc iti.sUserUpdate
(
	@UserId int,
	@Pseudo nvarchar(32),
	@Adress nvarchar(150),
	@UserPassword nvarchar(150)
)
as
begin
	update iti.tUser
	set Pseudo = @Pseudo,
		Adress = @Adress,
		UserPassword =@UserPassword
	where UserId = @UserId
	return 0;
end;