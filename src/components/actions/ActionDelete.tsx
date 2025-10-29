import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

export default function ActionDelete({ onClick = () => {} }: { onClick?: () => void }) {
  return (
    <Button variant='outline' size='icon' onClick={onClick}>
      <Trash2 />
    </Button>
  );
}
