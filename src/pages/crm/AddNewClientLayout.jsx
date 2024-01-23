import Layout from "../Layout.jsx";
import ClientTimeLineComponent from "../../components/crm/ClientTimeLineComponent.jsx";
import PersonalInformation from "./PersonalInformation.jsx";
import EmploymentInformation from "./EmploymentInformation.jsx";
import ResidentialInformation from "./ResidentialInformation.jsx";
import NextOfKinInfo from "./NextOfKinInfo.jsx";
import BankDetails from "./BankDetails.jsx";
import DocumentUpload from "./DocumentUpload.jsx";
import PreviewPage from "./PreviewPage.jsx";

const AddNewClientLayout = () => {
    const searchParams = new URLSearchParams(location.search);
    console.log(location);
    console.log(searchParams);
    let step = searchParams.get("step");
    console.log("STEP>>>", step);


    const component = {
        one: {
            component: <PersonalInformation />,
            step: 0
        },
        two: {
            component: <EmploymentInformation />,
            step: 1
        },
        three: {
            component: <ResidentialInformation />,
            step: 2
        },
        four: {
            component: <NextOfKinInfo />,
            step: 3
        },
        five: {
            component: <BankDetails />,
            step: 4
        },
        six: {
            component: <DocumentUpload />,
            step: 5
        },
        seven: {
                component: <PreviewPage />,
                step: 6
            },
    }
    const steps = [
        {
            name: 'Personal Information',
        },
        {
            name: 'Employment Information',
        },
        {
            name: 'Residential Information',
        },
        {
            name: 'Next of Kin',
        },{
            name: 'Bank Details',
        },{
            name: 'Document Upload',
        },
        {
            name: 'Preview',
        },
    ];
    console.log("Selected Component:", component[step].component);
    const placement = {
        'Personal Information': 'one',
        'Employment Information': 'two',
        'Residential Information': 'three',
        'Next of Kin': 'four',
        'Bank Details': 'five',
        'Document Upload': 'six',
        'Preview': 'seven',
        // 'Publish': 'four'
    }
    return (
        <Layout>
            <div>
                <ClientTimeLineComponent index={component[step].step} steps={steps} placement={placement}/>
            </div>
            <div>{component[step].component}</div>
        </Layout>
    );
};

export default AddNewClientLayout;