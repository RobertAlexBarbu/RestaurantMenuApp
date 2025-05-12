namespace WebAPI.Domain.Entities;

public class ElementCategory
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string Name { get; set; }

    public int UserId { get; set; }
    public User User { get; set; }
}