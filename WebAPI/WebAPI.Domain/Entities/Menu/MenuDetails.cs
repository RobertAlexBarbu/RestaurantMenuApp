namespace WebAPI.Domain.Entities.Menu;

public class MenuDetails
{
    public int Id { get; set; }
    public int MenuId { get; set; }
    public Menu Menu { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    

    public string WifiNetworkName { get; set; } = string.Empty;
    public string WifiPassword { get; set; } = string.Empty;
    public bool WifiNetworkVisible { get; set; } = false;

    public string PhoneNumber { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public bool ContactInformationVisibile { get; set; } = false;

    public string MonFriOpen{ get; set; } = string.Empty;
    public string MonFriClose { get; set; } = string.Empty;
    public string WeekendOpen { get; set; } = string.Empty;
    public string WeekendClose { get; set; } = string.Empty;
    public bool OpeningHoursVisible { get; set; } = false;

    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;

    public string ZipCode { get; set; } = string.Empty;
    public bool AddressVisible { get; set; } = false;

}