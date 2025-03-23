import React from 'react';

const NeedHelp = ({ className }) => {
    const phoneNumber = "+09060064870";

    const handleClick = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <div className={`w-full flex justify-end ${className}`}>
            <button
                onClick={handleClick}
                className="flex items-center pt-4"
            >
                <div className="flex items-center justify-center w-12 h-12 border-2 border-black rounded-full mr-4">
                    <span className="text-xl font-bold">?</span>
                </div>
                <div className="text-left">
                    <h2>Need Help?</h2>
                    <p>{phoneNumber}</p>
                </div>
            </button>
        </div>
    );
};

export default NeedHelp;
