namespace WebAPI.Domain.Entities.Menu;

public class MenuDetails
{
    public int Id { get; set; }
    public int MenuId { get; set; }
    public Menu Menu { get; set; }
}