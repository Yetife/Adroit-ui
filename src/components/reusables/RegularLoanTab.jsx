import {useState} from 'react';

const RegularLoanTab = ({getTabState}) => {
    const [tab, setTab] = useState('interest');

    const handleToggle = (tab) => {
        getTabState(tab)
        setTab(tab)
    }

    return (
        <div className="p-0 m-0">
            <div className="flex m-0 p-0 border border-gray-200 rounded-md cursor-pointer">
                <div onClick={() => handleToggle('interest')} className={`${tab === 'interest' && 'bg-[#00C795] text-white'}  w-[234px] rounded-tl-sm rounded-bl-sm text-[16px] text-center text-middle py-2 px-3`} value="interest">Regular Loan Interest Rate</div>
                <div onClick={() => handleToggle('charges')} className={`${tab === 'charges' && 'bg-[#00C795] text-white'}  w-[204px] rounded-tr-sm rounded-br-sm   text-[16px] text-center text-middle py-2 px-3`} value="charges">Regular Loan Charges</div>
            </div>
        </div>
    );
};

export default RegularLoanTab;