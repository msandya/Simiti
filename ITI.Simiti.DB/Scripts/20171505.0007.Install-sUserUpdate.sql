create proc iti.sUserUpdate
(
	@UserId int,
	@Pseudo nvarchar(32),
	@Adress nvarchar(64),
	@UserPassword varbinary(128)
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