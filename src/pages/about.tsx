import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    Flex,
    Icon,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { FcAssistant, FcDataSheet, FcLock } from 'react-icons/fc';

interface FeatureProps {
    title: string;
    text: string;
    icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    );
};

export default function About() {
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>About CryptoFees</Heading>
                <Text color={'gray.600'} fontSize={'xl'}>
                    We provide real-time updates on cryptocurrency exchange fees to help you
                    make informed decisions about where to trade your assets.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    <Feature
                        icon={<Icon as={FcAssistant as any} w={10} h={10} />}
                        title={'Free Information'}
                        text={
                            'Our platform is completely free to use. We believe in open access to financial data.'
                        }
                    />
                    <Feature
                        icon={<Icon as={FcDataSheet as any} w={10} h={10} />}
                        title={'Comprehensive Data'}
                        text={
                            'We track fees across both centralized and decentralized exchanges, including taker, maker, and swap fees.'
                        }
                    />
                    <Feature
                        icon={<Icon as={FcLock as any} w={10} h={10} />}
                        title={'Secure & Privacy-First'}
                        text={
                            'We do not track your personal trades. We only provide the data you need to trade smarter.'
                        }
                    />
                </SimpleGrid>
            </Container>
        </Box>
    );
}
