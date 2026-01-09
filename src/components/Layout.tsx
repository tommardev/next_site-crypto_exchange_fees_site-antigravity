import { Box, Flex } from '@chakra-ui/react';
import Navbar from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Flex direction="column" minH="100vh">
            <Navbar />
            <Box as="main" flex="1" py={8}>
                {children}
            </Box>
            <Footer />
        </Flex>
    );
};
