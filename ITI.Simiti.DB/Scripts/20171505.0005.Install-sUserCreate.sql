create proc iti.sUserCreate
(
	@Pseudo nvarchar(32),
	@Adress nvarchar(64),
	@UserPassword varbinary(128)
)
as 
begin
	insert into iti.tUser(Pseudo, Adress, UserPassword) values (@Pseudo, @Adress,@UserPassword);
	return 0;
end;