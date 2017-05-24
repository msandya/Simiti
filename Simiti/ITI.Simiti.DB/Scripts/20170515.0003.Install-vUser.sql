create view iti.vUser
as
	select
		UserId = t.UserId,
		Pseudo = t.Pseudo,
		Email = t.Email
	from iti.tUser t
	where t.UserId <> 0;