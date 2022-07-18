import { Box } from "@chakra-ui/react";
import Header from "../Header/header";

export default function Layout({ children }) {
    return (
        <Box className="layout" style={{ height: '100vh' }}>
            <Header />
            {children}
        </Box>
    )
}