create proc iti.sUserCreate
(
	@Pseudo nvarchar(150),
	@Email nvarchar(150)
)
as 
begin
	insert into iti.tUser(Pseudo, Email) values (@Pseudo, @Email);
	return 0;
end;