type StatusColor = {
    Applied?: string;
    Interview?: string;
    Offer?: string;
    Rejected?: string;
  }

  export const statusColors: StatusColor = {
    Applied: 'bg-blue-100 text-blue-700 border-blue-200',
    Interview: 'bg-purple-100 text-purple-700 border-purple-200',
    Offer: 'bg-green-100 text-green-700 border-green-200',
    Rejected: 'bg-gray-100 text-gray-700 border-gray-200',
  };