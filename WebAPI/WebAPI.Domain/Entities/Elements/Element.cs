namespace WebAPI.Domain.Entities;

public class Element
{
    public int Id { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int Position { get; set; }
    public double Weight { get; set; }

    public string Name { get; set; }

    public string Description { get; set; }
    public string Symbol { get; set; }
    public double Density { get; set; }
    public double MeltingPoint { get; set; }
    public double BoilingPoint { get; set; }
    public int AtomicRadius { get; set; }
    public bool IsVisible { get; set; } = true;

    public int CategoryId { get; set; }
    public ElementCategory Category { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}