import Layout from "../Layout.jsx";

const PreviewPage = () => {
    return (
        <div>
            <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto px-20 h-[550px]">
                <div>
                    <div className="mt-4">
                        <p className="text-[20px] font-[inter] leading-5 text-[#4A5D58] font-bold">Personal Information</p>
                        <p className="text-[13px] font-[inter] leading-5 text-[#979797] font-medium py-4">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                        <div>
                            <span>
                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Title</p>
                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Mr</p>
                            </span>
                            <div className="flex space-x-40">
                                <div>
                                  <div className="py-6">
                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">First name</p>
                                    <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Adekunleeeee</p>
                                  </div>
                                  <div>
                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Date Of Birth</p>
                                    <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">10 - Sept - 1981</p>
                                  </div>
                                </div>
                                <div>
                                    <div className="py-6">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Middle name (Optional)</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Samuel</p>
                                    </div>
                                    <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Marital Status</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Married</p>
                                    </span>
                                </div>
                                <div>
                                   <div className="py-6">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Last Name</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Adebona</p>
                                    </div>
                                    <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">No. Of Dependent</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">4</p>
                                    </span>
                                </div>
                                <div>
                                    <div className="py-6">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Gender</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Male</p>
                                    </div>
                                    <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Educational Level</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Tertiary</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-14">
                        <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Contact Information</p>
                        <p className="text-[13px] leading-5 text-[#979797] font-medium py-4">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                        <div>
                            <div className="flex space-x-32">
                                 <span>
                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Phone Number</p>
                                    <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">+234 09012345678</p>
                                 </span>
                                <div>
                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Alternative Phone Number</p>
                                    <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">+234 09012345678</p>
                                </div>
                                <div>
                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Email address</p>
                                    <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">adekunleadebona@creditwaveng.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-14">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Employer's Information</p>
                        <p className="text-[14px] leading-5 text-[#979797] font-medium py-3">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                        <div>
                            <div className="flex space-x-40">
                                <div>
                                    <div className="py-6">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Organization</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Adekunleeeee</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Address</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">10 - Sept - 1981</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="py-6">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">State Of Posting</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Samuel</p>
                                    </div>
                                    <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Nearest Landmark</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Eko hotels</p>
                                    </span>
                                </div>
                                <div>
                                    <div className="py-6">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">LGA</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Adebona</p>
                                    </div>
                                    <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Phone Number</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">+234 09012345678</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-14 mb-10">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Work Details</p>
                        <p className="text-[14px] leading-5 text-[#979797] font-medium py-3">Fill in the information below to help us identify you as an employed worker of a company</p>
                        <div>
                            <div>
                                <div className="flex space-x-40 my-6">
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium"> Staff ID</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Adekunleeeee</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Job Role / Grade</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">10 - Sept - 1981</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Employment Type</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Samuel</p>
                                    </div>
                                    <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Date Of Employment</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Eko hotels</p>
                                    </span>
                                </div>
                                <div className="flex space-x-40">
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Email Address</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Adebona</p>
                                    </div>
                                    <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Salary Range</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">+234 09012345678</p>
                                    </span>
                                    <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Salary Payment Day</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">+234 09012345678</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-14">
                        <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Residential Information</p>
                        <p className="text-[14px] leading-5 text-[#979797] font-medium py-3">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                        <div>
                            <div className="flex space-x-40">
                                <div>
                                    <div className="py-6">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Permanent Residential State</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Adekunleeeee</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Nearest Landmark</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">10 - Sept - 1981</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="py-6">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">LGA</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Samuel</p>
                                    </div>
                                    <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Residential Status</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Eko hotels</p>
                                    </span>
                                </div>
                                <div>
                                    <div className="py-6">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Permanent Address</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Adebona</p>
                                    </div>
                                    <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">No. Of Years At Residence</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">+234 09012345678</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-14">
                        <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Next of Kin</p>
                        <p className="text-[13px] leading-5 text-[#979797] font-medium py-4">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                        <div>
                            <span>
                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Title</p>
                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Mr</p>
                            </span>
                            <div>
                                <div className="flex space-x-40 py-6">
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">First name</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Adekunleeeee</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Middle name (Optional)</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Samuel</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Last Name</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Adebona</p>
                                    </div>
                                </div>
                                <div className="flex space-x-40 py-4">
                                    <span>
                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Phone Number</p>
                                    <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">+234 09012345678</p>
                                 </span>
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Alternative Phone Number</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">+234 09012345678</p>
                                    </div>
                                </div>
                                <div className="flex space-x-40 py-4">
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Email address</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">adekunleadebona@creditwaveng.com</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Permanent Address</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">adekunleadebona@creditwaveng.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-14">
                        <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Bank Details</p>
                        <p className="text-[13px] leading-5 text-[#979797] font-medium py-4">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                        <div>
                            <span>
                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Bank</p>
                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Mr</p>
                            </span>
                            <div>
                                <div className="flex space-x-40 py-6">
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium"> Account Number</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Adekunleeeee</p>
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Account Name</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">Samuel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;