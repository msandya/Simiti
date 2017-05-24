create procedure iti.sPasswordUserCreate
(
    @Email    nvarchar(150),
	@Pseudo   nvarchar(150),
    @Password varbinary(128)
)
as
begin
    insert into iti.tUser(Pseudo, Email) values(@Pseudo, @Email);
    declare @userId int;
    select @userId = scope_identity();
    insert into iti.tPasswordUser(UserId,  [Password])
                           values(@userId, @Password);
    return 0;
end;