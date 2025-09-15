 
interface Watchlist {
  id: number;
  name: string;
  terms: string[];
}
interface WatchlistFormProps {
  onCreated?: () => void;  
}
interface WatchlistCardProps {
  id: number;
  name: string;
  terms: string[];
  onDeleted?: () => void;
  onUpdated?: () => void;
}
