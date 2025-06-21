import { useMutation } from '@tanstack/react-query';
import { createTransaction } from '../service/transactionService';

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: createTransaction,
  });
};
