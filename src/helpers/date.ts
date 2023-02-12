import { format } from 'date-fns';


export const formatDate = (date?: Date): string => {
    const target = date || new Date();
    return format(target, 'MM/dd/yyyy @ h:ma');
};