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
        <AlertDialogFooter>
          <Button onClick={onCancel}>Non</Button>
          <Button className='bg-[#36a37b]' onClick={onConfirm} variant="destructive">
            Oui
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
