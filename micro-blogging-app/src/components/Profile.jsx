import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import APIController from "../config/FirebaseController";
function Profile() {
    const { displayName, updateDisplayName } = useContext(AuthContext);
    const [input, setInput] = useState('');
    const changeUsername = async () => {
        try {
            await APIController.updateDisplayName(input)
            updateDisplayName(input)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Box
            bgColor="gray.600"
            maxWidth="500px"
            margin="20px auto"
            padding="4"
            borderRadius="4px"
        >
            <Box fontWeight="bold" fontSize="1.3rem">
                {displayName}
            </Box>
            <Flex align="center">
                <Box width="160px">New display name:</Box>
                <Input type="text" onChange={(e) => setInput(e.target.value)} />
            </Flex>
            <Button width="100%" mt="2" onClick={() => changeUsername()}>Save</Button>
        </Box>
    )
}

export default Profile;