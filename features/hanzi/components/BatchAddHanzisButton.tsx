'use client';

import { useToast } from '@/components/ui/use-toast';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { batchAddHanzisAction } from '../actions';
import HANZIS_JSON from '../json/hanzis.json';
import { Hanzi } from '../schema';

const hanzis = HANZIS_JSON as Hanzi[];

const BatchAddHanzisButton = () => {
  const { toast } = useToast();

  const handleSubmit = async () => {
    await batchAddHanzisAction(hanzis);
    toast({ description: `added ${hanzis.length} hanzis` });
  };

  return (
    <form action={handleSubmit}>
      <ServerActionPendingButton label={`Add Hanizis (${hanzis.length})`} />
    </form>
  );
};

export default BatchAddHanzisButton;

const ServerActionPendingButton = ({
  label,
  disabled,
}: {
  label: string;
  disabled?: boolean;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={disabled || pending}>
      <div className='flex items-center gap-2'>
        <span className='whitespace-nowrap'>{label}</span>
        {pending ? <Loader2 className='animate-spin' /> : null}
      </div>
    </Button>
  );
};
