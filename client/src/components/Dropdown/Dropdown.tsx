import React, {FC, ReactNode} from 'react';

type Props = {
	isOpen: boolean
	children: ReactNode
	className?: string
}

const Dropdown: FC<Props> = ({isOpen, children, className=""}) => {
	return  isOpen && (
		<div className={`absolute ${className}`}>
			{children}
  </div>
	);
};

export default Dropdown;