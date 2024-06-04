import React from "react";

type Props = {
    children: React.ReactNode;
}

export const Container = ({ children }: Props) => {
    return (
        <div className="max-w-[1100px] mx-auto bg-white min-h-screen flex flex-col justify-between border-l border-r">
            {children}
        </div>
    );
};