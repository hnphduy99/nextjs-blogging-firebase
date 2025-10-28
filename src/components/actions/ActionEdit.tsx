import { SquarePen } from 'lucide-react';
import { Button } from '../ui/button';

export default function ActionEdit({ onClick = () => {} }: { onClick?: () => void }) {
  return (
    <Button variant='outline' size='icon' onClick={onClick}>
      <SquarePen />
    </Button>
  );
}
