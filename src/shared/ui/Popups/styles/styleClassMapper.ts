import { type DropdownDirection } from '@/shared/types/ui';
import cls from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
    'top left': cls.optionTopLeft,
    'top right': cls.optionTopRight,
    'bottom left': cls.optionBottomLeft,
    'bottom right': cls.optionBottomRight
};
