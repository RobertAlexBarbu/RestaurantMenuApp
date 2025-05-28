namespace WebAPI.Domain.Entities.Menu;

public class MenuReview
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Rating { get; set; }
    public string Message { get; set; }
    public int MenuId { get; set; }
    public Menu Menu { get; set; }

}