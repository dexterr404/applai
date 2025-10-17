  import { DollarSign, Euro, PoundSterling, IndianRupee, Coins } from 'lucide-react';
  
  export const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', icon: DollarSign },
    { code: 'EUR', symbol: '€', name: 'Euro', icon: Euro },
    { code: 'GBP', symbol: '£', name: 'British Pound', icon: PoundSterling },
    { code: 'PHP', symbol: '₱', name: 'Philippine Peso', icon: Coins },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', icon: IndianRupee },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', icon: Coins },
    { code: 'AUD', symbol: '$', name: 'Australian Dollar', icon: DollarSign },
    { code: 'CAD', symbol: '$', name: 'Canadian Dollar', icon: DollarSign },
  ];
