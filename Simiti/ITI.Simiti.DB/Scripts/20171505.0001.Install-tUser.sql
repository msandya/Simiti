create table iti.tUser
(

	UserId int identity(0,1),
	Pseudo nvarchar(32) not null,
	Adress nvarchar(64),
	UserPassword varbinary(128) not null,

	constraint PK_tUser primary key(UserId),
	constraint UK_tUser unique(Pseudo),
	constraint CK_tUser_Pseudo check(Pseudo <> N'')
);

--insert into iti.tUser( Pseudo,									Adress,									UserPassword) 
--values				 (left(convert(nvarchar(32), newid()),32),  left(convert(nvarchar(64), newid()),64), convert(varbinary(128),newid()));