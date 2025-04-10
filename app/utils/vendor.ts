

export const calculateCompletion = (vendor: any): number => {
    if (!vendor) return 0; // Handle undefined vendorData
  
    const requiredFields = [
      "shop_name",
      "shop_url",
      "city",
      "street",
      "shop_description",
      "country",
      "shop_logo",
    ];
  
    // Count filled required fields
    const filledFields = requiredFields.filter((field) => vendor[field]);
  
    // Calculate completion percentage
    return Math.min(
      Math.round((filledFields.length / requiredFields.length) * 100),
      100
    );
  };