import {useState} from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";

const FilterAdjust = ({open, setOpen, handleAdd}) => {
    const [inputs, setInputs] = useState({
        startDate: "",
        endDate: ""
    })
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [channel, setChannel] = useState("");
    const [applicationId, setApplicationId] = useState("");
    const [email, setEmail] = useState("");


    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };

    const handleIdChange = (e) => {
        setApplicationId(e.target.value)
        setEmail("")
        setName("")
        setPhone("")
        setChannel("")
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setApplicationId("")
        setName("")
        setPhone("")
        setChannel("")
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
        setEmail("")
        setApplicationId("")
        setPhone("")
        setChannel("")
    }
    const handlePhoneChange = (e, isNumeric= false) => {
        const numericRegex = /^\d{0,11}$/;
        if ((isNumeric && numericRegex.test(e.target.value)) || !isNumeric) {
            setPhone(e.target.value)
        }
        setName("")
        setEmail("")
        setApplicationId("")
        setChannel("")
    }
    const handleChannelChange = (e) => {
        setChannel(e.target.value)
        setName("")
        setEmail("")
        setApplicationId("")
        setPhone("")
    }
    const handleRefresh = () => {
        setChannel("")
        setName("")
        setEmail("")
        setApplicationId("")
        setPhone("")
        setInputs({
            startDate: "",
            endDate: ""
        })
    }


    return (
        <div>
            <Dialog.Root
                open={Boolean(open)}
                onOpenChange={(open) => {
                    !open && setOpen(undefined);
                }}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black bg-opacity-20 z-[100] data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[45%] left-[50%] max-h-[90vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[32px] text-[#343434] font-extrabold -mt-8">Filter</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div>
                                <div className="flex items-center">
                                    <div className='py-2 flex items-center'>
                                        <span>
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Application ID
                                          </h3>
                                          <input
                                              type="text"
                                              value={applicationId}
                                              onChange={handleIdChange}
                                              placeholder="Enter application id"
                                              className="font-medium w-[300px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                        <span className="ml-4">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                           Phone Number
                                          </h3>
                                              <input
                                                  type="number"
                                                  value={phone}
                                                  onChange={(e)=>handlePhoneChange(e, true)}
                                                  placeholder="Enter phone"
                                                  className="font-medium w-[300px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                              />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <div className='py-2 flex items-center'>
                                        <span>
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Applicant's Name
                                          </h3>
                                          <input
                                              type="text"
                                              value={name}
                                              onChange={handleNameChange}
                                              placeholder="Enter applicant name"
                                              className="font-medium w-[300px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                        <span className="ml-4">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Official Email Address
                                          </h3>
                                          <input
                                              type="email"
                                              value={email}
                                              onChange={handleEmailChange}
                                              placeholder="Enter official email address"
                                              className="font-medium w-[300px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <div className='py-2 flex items-center'>
                                        <div>
                                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                                Start Date
                                            </h3>
                                            <input
                                                type="date"
                                                value={inputs.startDate}
                                                onChange={(event) => handleChange(event, "startDate")}
                                                placeholder="Enter start date"
                                                className="font-medium w-[300px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                                End Date
                                            </h3>
                                            <input
                                                type="date"
                                                value={inputs.endDate}
                                                onChange={(event) => handleChange(event, "endDate")}
                                                placeholder="Enter end date"
                                                className="font-medium w-[300px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <div>
                                        <span>
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Channel
                                          </h3>
                                          <input
                                              type="text"
                                              value={channel}
                                              onChange={handleChannelChange}
                                              placeholder="Enter channel"
                                              className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-3 float-right">
                                <button className="bg-gray-300 rounded py-2 px-6 flex text-black mt-8"
                                        onClick={handleRefresh}>Refresh
                                </button>
                                <button className="bg-[#00C796] rounded py-2 px-6 flex text-white mt-8"
                                        onClick={handleAdd}>Search</button>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[40px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Close/>
                            </button>
                        </Dialog.Close>`
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
};

export default FilterAdjust;