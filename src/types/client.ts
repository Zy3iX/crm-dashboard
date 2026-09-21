type ClientType = {
  firstName: string;
  secondName?: string;
  lastName: string;
  email?: string;
  phone: string;
  preferredLanguage: string;
  fromCountry: string;
  notes: string;
  birthDate: Date;
  status: "New" | "Contacted" | "Customer" | "Lost" | "Qualified";
  source:
    | "Instagram"
    | "Facebook"
    | "Whatsapp"
    | "Website"
    | "Referral"
    | "Other";
  activeManager: string | null;
  createdAt: Date;
  updatedAt: Date;
};
