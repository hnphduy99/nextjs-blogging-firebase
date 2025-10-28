import { Eye } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

export default function ActionView({ onClick = () => {} }: { onClick?: () => void }) {
  return (
    <Button variant='outline' size='icon' onClick={onClick}>
      <Eye />
    </Button>
  );
}
