import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import AuthContext from '../Context/AuthContext';
import firebase from 'firebase/compat/app';
import { auth2 } from '../config/FirebaseController';

export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false)
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = () => {
        setLoading(true);
        login(inputs.email, inputs.password).then((user) => {
            console.log('user logged in', user);
        }).catch((e) => {
            setLoading(false);
            setError(e.message);
        });
    }

    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth2.signInWithPopup(provider)
    }
    return (
        <>
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
                <Button isLoading={isLoading} onClick={handleSubmit} backgroundColor="black" marginRight="30px" marginTop="10px">Login</Button>
                <Button backgroundColor="black" marginTop="10px" onClick={signInWithGoogle}>Sign In With Google</Button>
            </Box>
        </>
    )
}