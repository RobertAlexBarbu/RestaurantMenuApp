namespace WebAPI.Application.DTO.Element;

public class CreateElementDto
{
    public float Weight { get; set; }
    public string Name { get; set; }
    public string Symbol { get; set; }
    public float Density { get; set; }
    public float MeltingPoint { get; set; }
    public float BoilingPoint { get; set; }
    public int AtomicRadius { get; set; }
    public int CategoryId { get; set; }
    public string Description { get; set; }
    public int Position { get; set; }
}