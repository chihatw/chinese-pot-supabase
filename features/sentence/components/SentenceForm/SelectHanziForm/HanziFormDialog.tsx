'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import HanziForm from '../../../../hanzi/components/HanziForm';

const HanziFormDialog = ({
  form,
  articleId,
}: {
  form: string;
  articleId: number;
}) => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
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
        <HanziForm
          form={form}
          articleId={articleId}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default HanziFormDialog;
