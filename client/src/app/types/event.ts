interface Event {
  id: number;
  description: string;
  severity: string;
  suggestion: string;
  watchlistId: number;
}

interface EventCardProps {
  id: number;
  description: string;
  severity: string;
  suggestion: string;
  onDeleted?: () => void;
  onUpdated?: () => void;
}
