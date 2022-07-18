import { Box, Button, Flex, Input } from '@chakra-ui/react';
import AuthContext from '../Context/AuthContext';
import { useState, useContext } from 'react';

export default function SignupPage() {
    const { signup } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = () => {
        signup(inputs.email, inputs.password).then((user) => {
            console.log('user signed up', user);
        }).catch((e) => {
            setError(e.message);
        });
    }
    return (
        <Box
            w="400px"
            m="20px auto"
            borderRadius="4px"
            p="2"
            bgColor="gray.500"
        >
            <Flex align="center">
                <Box flexBasis="150px">Email</Box>
                <Input type="text" name="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
            </Flex>
            <Flex align="center" mt="10px">
                <Box flexBasis="150px">Password</Box>
                <Input type="text" name="password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
            </Flex>
            <Box color="red">{error}</Box>
            <Button backgroundColor="black" marginTop="10px" onClick={handleSubmit}>Signup</Button>
        </Box>
    )
}