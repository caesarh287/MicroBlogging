import { Box, Flex, Button } from "@chakra-ui/react";
import { useContext } from "react";
import routes from "../../../config/routes";
import AuthContext from "../../../Context/AuthContext";
import MenuItem from "./menuitem";

export default function Header() {
    const { isLoggedIn, signout } = useContext(AuthContext);
    return (
        <Flex
            align="center"
            bgColor="blue.500"
        >
            <Box>
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg" width="200" alt="logo" />
            </Box>
            <Flex>
                {isLoggedIn ? (
                    routes.filter((r) => r.protected).map((route) => (
                        <MenuItem key={route.path} to={route.path} label={route.label} />
                    ))
                ) : (
                    routes.filter((r) => !r.protected).map((route) => (
                        <MenuItem key={route.path} to={route.path} label={route.label} />
                    ))
                )}
                {isLoggedIn && <Button backgroundColor="black" onClick={signout}>Sign out</Button>}
            </Flex>
        </Flex>
    )
}