namespace WebAPI.Domain.Entities.Menu;

public class MenuDetails
{
    public int Id { get; set; }
    public int MenuId { get; set; }
    public Menu Menu { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}