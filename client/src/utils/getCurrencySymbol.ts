export const getCurrencySymbol = (code: string) => {
  switch (code) {
    case "USD": return "$";
    case "EUR": return "€";
    case "GBP": return "£";
    case "PHP": return "₱";
    case "INR": return "₹";
    case "JPY": return "¥";
    case "AUD": return "$";
    case "CAD": return "$";
    default: return "";
  }
};