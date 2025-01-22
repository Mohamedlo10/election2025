// ConfirmDeleteDialog.tsx
import React from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogTitle } from './alert-dialog';
import { Button } from './button';

type ConfirmDeleteDialogProps = {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  message: string;
};

const ConfirmDialog: React.FC<ConfirmDeleteDialogProps> = ({ onConfirm, onCancel, isOpen, message }) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <AlertDialog open={isOpen} onOpenChange={(open: any) => !open && onCancel()}>
        <AlertDialogTitle className='hidden'>
            AMEES
        </AlertDialogTitle>
      <AlertDialogContent>
        <div className='font-bold h-10 items-center justify-start flex -p-8 w-full border-b '>Confirmation</div>
        <p>{message}</p>
        <AlertDialogFooter className='flex w-full items-center justify-center flex-row gap-8'>
          <Button className='w-20' onClick={onCancel}>Non</Button>
          <Button className='bg-[#36a37b] w-20' onClick={onConfirm} variant="destructive">
            Oui
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
