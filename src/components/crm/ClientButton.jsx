import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";

const ClientButton = ({onNext,onPrevious,}) => {
    return (
        <div>
            <div className="flex space-x-1 my-8 float-right">
            <Button variant="primary" bgColor="rgba(0, 199, 150, 0.20)" borderRadius="4px" height="35px" size='md'
                        as={ReactLink} w={'100px'} onClick={onPrevious}>
                    <Text color="#00C796">Previous</Text>
                </Button>
                <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="35px" size='md'
                        as={ReactLink} w={'100px'} onClick={onNext}>
                    <Text color="white">Next</Text>
                </Button>

            </div>
        </div>
    );
};

export default ClientButton;