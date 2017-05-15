create view iti.vUser
as
	select
		UserId = t.UserId,
		Pseudo = t.Pseudo,
		Adress = t.Adress,
		UserPassword = t.UserPassword
	from iti.tUser t
	where t.UserId <> 0;