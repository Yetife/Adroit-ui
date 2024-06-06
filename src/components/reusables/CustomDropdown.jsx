import { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options, selectedOption, onSelect, width }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef} style={{ width }}>
            <div>
                <button
                    type="button"
                    className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedOption}
                    <span className="float-right">&#x25BC;</span>
                </button>
            </div>
            {isOpen && (
                <ul className="origin-top-right absolute w-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
                    style={{zIndex: 1000}}>
                    {options.map((option) => (
                        <li
                            key={option}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomDropdown;
