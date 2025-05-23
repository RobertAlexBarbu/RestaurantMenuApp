namespace WebAPI.Domain.Entities.Menu;

public class MenuDetails
{
    public int Id { get; set; }
    public int MenuId { get; set; }
    public Menu Menu { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    
    // // WiFi Information
    // public string WifiNetworkName { get; set; } = string.Empty;
    // public string WifiPassword { get; set; } = string.Empty;
    // public bool HasFreeWifi { get; set; }
    //
    // // Contact Information
    // public string PhoneNumber { get; set; } = string.Empty;
    // public string Email { get; set; } = string.Empty;
    // public string WebsiteUrl { get; set; } = string.Empty;
    // public string FacebookPage { get; set; } = string.Empty;
    // public string InstagramHandle { get; set; } = string.Empty;
    //
    // // Opening Hours
    // public string MondayHours { get; set; } = string.Empty;
    // public string TuesdayHours { get; set; } = string.Empty;
    // public string WednesdayHours { get; set; } = string.Empty;
    // public string ThursdayHours { get; set; } = string.Empty;
    // public string FridayHours { get; set; } = string.Empty;
    // public string SaturdayHours { get; set; } = string.Empty;
    // public string SundayHours { get; set; } = string.Empty;
    // public string SpecialHoursNote { get; set; } = string.Empty;
    //
    // // Address Information
    // public string StreetAddress { get; set; } = string.Empty;
    // public string City { get; set; } = string.Empty;
    // public string StateProvince { get; set; } = string.Empty;
    // public string PostalCode { get; set; } = string.Empty;
    // public string Country { get; set; } = string.Empty;
    // public string GoogleMapsLink { get; set; } = string.Empty;
}