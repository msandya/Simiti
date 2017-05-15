create proc iti.sProjectDelete
(
	@ProjectId int
)
as
begin
	 delete from iti.tProject where ProjectId = @ProjectId;
	return 0;
end;