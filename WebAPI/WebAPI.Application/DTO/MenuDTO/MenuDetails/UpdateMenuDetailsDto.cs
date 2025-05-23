namespace WebAPI.Application.DTO.MenuDTO.MenuDetails;

public class UpdateMenuDetailsDto
{
    public string? WifiNetworkName { get; set; }
    public string? WifiPassword { get; set; }
    public bool? WifiNetworkVisible { get; set; }

    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }

    public bool? ContactInformationVisibile { get; set; }

    public string? MonFriOpen{ get; set; }
    public string? MonFriClose { get; set; }
    public string? WeekendOpen { get; set; }
    public string? WeekendClose { get; set; }
    public bool? OpeningHoursVisible { get; set; }

    public string? Street { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }

    public string? ZipCode { get; set; }
    public bool? AddressVisible { get; set; }
}