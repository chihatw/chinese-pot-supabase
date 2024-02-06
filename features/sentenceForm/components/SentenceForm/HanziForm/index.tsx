'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import HanziFormDialogContent from './HanziFormDialogContent';

const HanziForm = ({
  form,
  articleId,
}: {
  form: string;
  articleId?: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          size='sm'
          variant='ghost'
          className=' flex items-center gap-1 text-destructive hover:text-destructive'
        >
          <div className='text-xs'>新規登録</div>
          <Plus size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <HanziFormDialogContent
          form={form}
          setOpen={setOpen}
          articleId={articleId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default HanziForm;
