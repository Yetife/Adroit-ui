import { useState, useEffect, useRef } from 'react';
import {ChevronDown} from "react-feather";

const CustomAutocomplete = ({ options, onSelect, isDropdownOpen, setIsDropdownOpen, updateInputs }) => {
    const [inputValue, setInputValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState([]);
    const inputRef = useRef();

    useEffect(() => {
        // Filter options based on inputValue
        const filtered = options.filter(
            (option) =>
                option.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
                option.lastName.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [inputValue, options]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // const handleSelectOption = (option) => {
    //     setInputValue(`${option.firstName} ${option.lastName}`);
    //     onSelect(option);
    //     setIsDropdownOpen(false); // Close the dropdown when an option is selected
    // };

    const handleSelectOption = (option) => {
        setInputValue(`${option.firstName} ${option.lastName}`);
        onSelect(option);
        setIsDropdownOpen(false);
        updateInputs({
            firstName: option.firstName,
            lastName: option.lastName,
            emailAddress: option.email || '', // Assuming email is available in the option object
        });
    };

    // Focus the input when the dropdown opens
    useEffect(() => {
        if (isDropdownOpen) {
            inputRef.current.focus();
        }
    }, [isDropdownOpen]);

    return (
        <div className="relative">
            <div className="flex items-center">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type to search..."
                    className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded border border-neutral-300 focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
                    onClick={() => setIsDropdownOpen(true)}
                    ref={inputRef}
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </span>
            </div>
            {isDropdownOpen && (
                <ul className="absolute z-10 mt-2 bg-white rounded-md shadow-lg border w-full max-h-[10rem] overflow-y-auto">
                    {filteredOptions.map((option) => (
                        <li
                            key={option.id}
                            onClick={() => handleSelectOption(option)}
                            className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                        >
                            {`${option.firstName} ${option.lastName}`}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomAutocomplete;
