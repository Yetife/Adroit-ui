import {Link as ReactLink, useLocation, useNavigate} from "react-router-dom";
import {useGetClientByIdQuery} from "../../store/features/crm/api.js";
import Layout from "../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import {CircularProgress, ThemeProvider} from "@mui/material";
import themes from "../../components/reusables/theme.jsx";
import * as base64 from "base64-js";

const ViewPage = () => {
    const location = useLocation();
    const router = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const custId = queryParams.get("cid");
    const {data, isFetching, error} = useGetClientByIdQuery(custId)

    const decode = (base64String) => {
        return  new TextDecoder('utf-8').decode(base64.toByteArray(base64String));
    }
    return (
        <Layout>
            {
                isFetching ? <ThemeProvider theme={themes}>
                    <CircularProgress color={"waveGreen"} sx={{display: "flex", margin: "auto", justifyContent: "center" }}/>
                </ThemeProvider> : <div>
                    <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto px-20 h-[550px]">
                        <div>
                            <div className="mt-4">
                                <p className="text-[20px] font-[inter] leading-5 text-[#4A5D58] font-bold">Personal Information</p>
                                <p className="text-[13px] font-[inter] leading-5 text-[#979797] font-medium py-4">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                                <div>
                            <span>
                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Title</p>
                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.title}</p>
                            </span>
                                    <div className="flex space-x-40">
                                        <div>
                                            <div className="py-6">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">First name</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.firstName}</p>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Date Of Birth</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.dob}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="py-6">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Middle name (Optional)</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.middleName}</p>
                                            </div>
                                            <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Marital Status</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.marritalStatus}</p>
                                    </span>
                                        </div>
                                        <div>
                                            <div className="py-6">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Last Name</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.lastName}</p>
                                            </div>
                                            <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">No. Of Dependent</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.noOfde}</p>
                                    </span>
                                        </div>
                                        <div>
                                            <div className="py-6">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Gender</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.gender}</p>
                                            </div>
                                            <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Educational Level</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.eduLevel}</p>
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
                                    <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.phone}</p>
                                 </span>
                                        <div>
                                            <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Alternative Phone Number</p>
                                            <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.altPhone}</p>
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Email address</p>
                                            <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.personalandcontactInformation?.email}</p>
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
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.organizationId}</p>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Address</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.address}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="py-6">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">State Of Posting</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.stateId}</p>
                                            </div>
                                            <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Nearest Landmark</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.nearestLandmark}</p>
                                    </span>
                                        </div>
                                        <div>
                                            <div className="py-6">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">LGA</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.lgaId}</p>
                                            </div>
                                            <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Phone Number</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.phoneNumber}</p>
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
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.staffId}</p>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Job Role / Grade</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.jobRole}</p>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Employment Type</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.employmentTypeId}</p>
                                            </div>
                                            <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Date Of Employment</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.dateOfEmployment}</p>
                                    </span>
                                        </div>
                                        <div className="flex space-x-40">
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Email Address</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.emailAddress}</p>
                                            </div>
                                            <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Salary Range</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.salaryRange}</p>
                                    </span>
                                            <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Salary Payment Day</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.employerInformation?.salaryPaymentDay}</p>
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
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.residentialInformation?.stateId}</p>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Nearest Landmark</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.residentialInformation?.nearestLandmark}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="py-6">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">LGA</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.residentialInformation?.lgaId}</p>
                                            </div>
                                            <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Residential Status</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.residentialInformation?.residentialStatus}</p>
                                    </span>
                                        </div>
                                        <div>
                                            <div className="py-6">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Permanent Address</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.residentialInformation?.permanentAddress}</p>
                                            </div>
                                            <span>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">No. Of Years At Residence</p>
                                        <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.residentialInformation?.noOfYearsAtResidence}</p>
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
                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.nextOfKin?.titleId}</p>
                            </span>
                                    <div>
                                        <div className="flex space-x-40 py-6">
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">First name</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.nextOfKin?.firstName}</p>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Middle name (Optional)</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.nextOfKin?.middleName}</p>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Last Name</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.nextOfKin?.lastName}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-40 py-4">
                                    <span>
                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Phone Number</p>
                                    <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.nextOfKin?.phoneNumber}</p>
                                 </span>
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Alternative Phone Number</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.nextOfKin?.altPhoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-40 py-4">
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Email address</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.nextOfKin?.emailAddress}</p>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Permanent Address</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.nextOfKin?.permanentAddress}</p>
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
                                    <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.bankDetail?.bankId}</p>
                                </span>
                                    <div>
                                        <div className="flex space-x-40 py-6">
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium"> Account Number</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.bankDetail?.accountNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-medium">Account Name</p>
                                                <p className="text-[14px] font-[inter] leading-5 text-[#4A5D58] font-medium">{data?.data?.bankDetail?.accountName}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Document Upload</p>
                                <p className="text-[14px] leading-5 bg-[#EAFFFA] text-[#007970] px-3 font-medium w-[680px] py-2 my-4">Ensure all documents are uploaded and tagged properly. Files should be in .jpg, .png or .pdf formats</p>
                                {/*<div>*/}
                                {/*    {decode(data?.data?.documentUpload?.passportPhotograph)}*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-1 my-8 float-right">
                        <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="35px" size='md'
                                as={ReactLink} w={'100px'} onClick={()=>router(-1)}>
                            <Text color="white">Back</Text>
                        </Button>

                    </div>
                </div>
            }
        </Layout>
    );
};

export default ViewPage;