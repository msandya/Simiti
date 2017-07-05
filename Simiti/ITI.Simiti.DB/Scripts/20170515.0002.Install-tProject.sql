create table iti.tProject
(

	ProjectId int identity(0,1),
	[Name] nvarchar(32) not null,
	Project nvarchar(1000) not null,
	UserId int not null,

	constraint PK_tProject primary key(ProjectId),
	constraint FK_tProject_tUser foreign key(UserId) references iti.tUser(UserId),
	constraint UK_tProject unique([Name]),
	constraint CK_tProject_Name check([Name] <> N'')
);

insert into iti.tProject([Name], Project, UserId) 
				 values ('N'   , 'N'	, 0);