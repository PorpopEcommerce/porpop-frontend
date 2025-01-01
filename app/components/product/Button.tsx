'use client';

import { IconType } from "react-icons";

interface ButtonProps{
    label: string,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    custom?: string,
    icon?: IconType,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ label, disabled, outline, small, custom, icon: Icon, onClick}) => {
    return ( 
        <button 
        onClick={onClick}
        disabled = {disabled}
        className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-sm
        hover:opacity-80
        transition
        w-full
        flex
        items-center
        justify-center
        gap-2
        ${outline ? 'bg-white' : 'bg-[#9bf618]'}
        ${outline ? 'text-slate-700' : ''}
        ${small ? 'text-sm font-light' : 'text-md font-semibold'}
        ${small ? 'py-1 px-2 border-[1px]' : 'py-2 px-3 border-2'}
        ${custom ? custom : ''}
        `}>
            {label}
        </button>
     );
}
 
export default Button;