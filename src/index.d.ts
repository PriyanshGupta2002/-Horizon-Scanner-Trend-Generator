export interface ListingTableProps {
  status: boolean;
  email: string;
  trends: string;
  geography: string;
  folderName: string;
  fileName: string;
  display_name: string
}

interface InputData {
  Trends: string;
  filename: string;
  no_of_gen: number;
  email: string;
  dept: string;
  geography: string;
  additional_details: string;
}

export interface DataStructure {
  _id: string;
  Foldername: string;
  Status: boolean;
  input_data: InputData;
  display_name: string,
}
