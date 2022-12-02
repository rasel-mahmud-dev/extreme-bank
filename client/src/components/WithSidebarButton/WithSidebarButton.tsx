import React, { FC, HTMLAttributes, ReactNode } from "react";
import { HiBars4 } from "react-icons/all";
import { ACTION_TYPES } from "../../types";
import useStore from "context/useStore";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const WithSidebarButton: FC<Props> = ({ children, ...attr }) => {
    const [{}, dispatch] = useStore();

    return (
        <div {...attr}>
            <div className="flex items-center gap-x-1">
                <HiBars4
                    onClick={() => {
                        dispatch({ type: ACTION_TYPES.TOGGLE_SIDEBAR });
                    }}
                    className="block lg:hidden text-2xl text-dark-800 dark:text-dark-20"
                />
                {children}
            </div>
        </div>
    );
};

export default WithSidebarButton;
