interface Item {
  id: string;
  outputFileUrl?: string;
  status: string;
  createdAt: string;
}

interface ItemsResponse {
  currentPage: number;
  lastPage: number;
  data: Item[];
}
