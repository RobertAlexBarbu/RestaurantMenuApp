
export interface MenuDetailsDto {
    id: number;
    menuId: number;
    userId: number;

    wifiNetworkName: string;
    wifiPassword: string;
    wifiNetworkVisible: boolean;

    phoneNumber: string;
    email: string;
    contactInformationVisibile: boolean;

    monFriOpen: string;
    monFriClose: string;
    weekendOpen: string;
    weekendClose: string;
    openingHoursVisible: boolean;

    street: string;
    city: string;
    state: string;
    zipCode: string;
    addressVisible: boolean;
}

