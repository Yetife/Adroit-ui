import Layout from "./Layout.jsx";
import { Avatar, Stack, Text} from "@chakra-ui/react";
import pana from '../assets/pana.svg'
import recovery from '../assets/recovery.png'
import cloud from '../assets/cloud.svg'
import help from '../assets/help.svg'
import {DemoItem} from "@mui/x-date-pickers/internals/demo/index.js";
import {DateCalendar} from "@mui/x-date-pickers";
import user from '../assets/avatar.svg'

const Dashboard = () => {
    let data;

    if (typeof window !== 'undefined'){
        data = JSON.parse(sessionStorage.getItem('validate'))
    }

    return (
        <Layout>
            <>
                <div className='flex flex-col md:flex md:flex-row w-full h-auto my-12 space-x-0 md:space-x-8 md:h-[16rem]'>
                    <div className='flex py-3 w-full md:w-3/5 lg:w-4/5 md:h-[290px] h-[350px]'>
                        <div className='w-full bg-[#00C795] shadow-md rounded p-4'>
                            <Stack direction={{md: "row", base: "column"}} justifyContent={{md: "space-between"}} p={{base:"10px", md:"40px"}}>
                                <Stack>
                                    <Text color="#FFF"  textAlign="center" fontFamily="Inter" fontSize="28px" fontStyle="normal" fontWeight="700" lineHeight="21.6px">Welcome back Kenny!</Text>
                                    <Text color="#FFF"  fontFamily="Inter" fontSize="11px" fontStyle="normal" fontWeight="500" lineHeight="21.6px">Your last login was 12:00pm 09 Jul, 2023</Text>
                                </Stack>
                                <Stack p={{base: "20px 0", md: 0}}>
                                    <img src={pana} alt={'dashboard'}/>
                                </Stack>
                            </Stack>
                        </div>
                    </div>

                    <div className='w-[300px] p-5  border border-gray-100 bg-white text-center shadow-lg md:h-[290px] h-[300px] rounded'>
                        <Stack direction="column" justifyContent="center" alignItems="center">
                            <Avatar src={user} boxSize="166px" />
                            <Text color="#343434" textAlign="center" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="700" lineHeight="normal">Adekunle Adebona</Text>
                            <Text color="#343434" textAlign="center" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="normal">UI/UX Designer</Text>
                        </Stack>
                    </div>
                </div>


                <div className='flex flex-col md:flex md:flex-row w-full h-auto my-12 space-x-0 md:space-x-8 md:h-[40rem]'>
                    <div className='bg-white border w-full border-gray-100 h-full md:w-3/5 lg:w-4/5 shadow-lg rounded-lg px-6 py-8'>
                        <Stack>
                            <Stack direction="row" justifyContent="space-between" p={{md:"20px", base: "15px"}}>
                                <Text color="#343434" textAlign="center" fontFamily="Inter" fontSize="18px" fontStyle="normal" fontWeight="600" lineHeight="normal">Application</Text>
                                <Text color="#00C796" textAlign="center" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="700" lineHeight="normal">See more</Text>
                            </Stack>
                        </Stack>
                        <Stack direction={{md: "row", base: "column"}} spacing={6} p="20px">
                            <Stack backgroundColor="#DDFFF7" borderRadius="10px" width="220px" h="147px" p="10px">
                                <img alt={"recovery"} src={recovery} style={{width: "31px", height: "31px"}}/>
                                <Text color="#384642" fontFamily="Inter" fontSize="24px" fontStyle="normal" fontWeight="700" lineHeight="normal">Recovery</Text>
                                <Stack direction="row" justifyContent="space-between" pt="20px">
                                    <Text color="#343434" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="500" lineHeight="normal">01/08/2023</Text>
                                    <Text color="white" fontFamily="Inter" fontSize="10px" background="#135D54" borderRadius="8px" fontStyle="normal" fontWeight="500" p="4px" lineHeight="normal">Active</Text>
                                </Stack>
                            </Stack>
                            <Stack backgroundColor="#DDFFF7" borderRadius="10px" width="220px" h="147px" p="10px">
                                <img src={cloud} style={{width: "31px", height: "31px"}}/>
                                <Text color="#384642" fontFamily="Inter" fontSize="24px" fontStyle="normal" fontWeight="700" lineHeight="normal">Single Sign-on</Text>
                                <Stack direction="row" justifyContent="space-between" pt="20px">
                                    <Text color="#343434" fontFamily="Inter" fontSize="12px" fontStyle="normal" fontWeight="500" lineHeight="normal">04/08/2023</Text>
                                    <Text color="white" fontFamily="Inter" fontSize="10px" background="#135D54" borderRadius="8px" fontStyle="normal" fontWeight="500" p="4px" lineHeight="normal">Active</Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </div>

                    <div className='w-full md:w-2/5  lg:w-1/4 space-y-6 text-center h-full '>
                        <div className='h-fit md:h-[49%] w-[280px] m-auto py-0 mt-4 md:my-0 md:py-0 border shadow-lg border-gray-100 rounded-lg'>
                            <Stack direction="column" justifyContent="center" alignItems="center">
                                <DemoItem>
                                    <DateCalendar views={['day']} />
                                </DemoItem>
                            </Stack>
                        </div>
                        <div className='h-[48%] w-[280px] p-5 shadow-lg border border-gray-100 rounded-lg'>
                            <img className='m-auto' src={help} alt='bro-dashboard' width={200} height={170} />
                            <div className='pt-4 mt-2'>
                                <h4 className='font-semibold font-manrope text-sm'>Need Help</h4>
                                <h4 className='font-normal text-xs font-manrope '>Do you have any problem when using CreditWave SSO?</h4>
                                <button className='font-manrope py-2 px-4 my-1 rounded-md bg-[#00C795] text-white'>Contact Us Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </Layout>
    );
};

export default Dashboard;