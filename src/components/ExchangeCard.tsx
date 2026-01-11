import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Badge,
    HStack,
    Skeleton,
    SkeletonText,
    Circle,
} from '@chakra-ui/react';
import { Exchange } from '../types/exchange';

interface ExchangeCardProps {
    exchange?: Exchange;
    isLoading?: boolean;
}

export default function ExchangeCard({ exchange, isLoading }: ExchangeCardProps) {
    const bgColor = useColorModeValue('white', 'gray.800');
    const accentColor = useColorModeValue('blue.500', 'blue.300');

    if (isLoading) {
        return (
            <Center py={6}>
                <Box
                    p={6}
                    maxW={'330px'}
                    w={'full'}
                    bg={bgColor}
                    boxShadow={'2xl'}
                    rounded={'lg'}
                    pos={'relative'}
                    zIndex={1}>
                    <Skeleton height="150px" rounded="lg" mb={4} />
                    <Stack align={'center'}>
                        <Skeleton height="20px" width="120px" />
                        <SkeletonText mt="4" noOfLines={2} spacing="4" width="full" />
                    </Stack>
                </Box>
            </Center>
        );
    }

    if (!exchange) return null;

    return (
        <Center py={6}>
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={bgColor}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}
                transition="all 0.3s ease"
                _hover={{ transform: 'translateY(-10px)', boxShadow: '3xl' }}>

                <Box align="center" mb={4}>
                    <Circle
                        size="80px"
                        bg={accentColor}
                        color="white"
                        fontSize="2xl"
                        fontWeight="bold"
                        boxShadow="lg">
                        #{exchange.exchange_rank}
                    </Circle>
                </Box>

                <Stack align={'center'} spacing={3}>
                    <Text color={'gray.500'} fontSize={'xs'} textTransform={'uppercase'} fontWeight="bold">
                        {exchange.type} Exchange
                    </Text>
                    <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={700} textAlign="center">
                        {exchange.exchange_name}
                    </Heading>

                    <HStack spacing={4} justify="center" w="full">
                        {exchange.exchange_trustscore && (
                            <Box textAlign="center">
                                <Text fontSize="xs" color="gray.500">Trust Score</Text>
                                <Badge colorScheme="green" variant="subtle" px={2} py={1} rounded="md">
                                    {exchange.exchange_trustscore}
                                </Badge>
                            </Box>
                        )}

                        {exchange.exchange_marketshare && (
                            <Box textAlign="center">
                                <Text fontSize="xs" color="gray.500">Market Share</Text>
                                <Badge colorScheme="purple" variant="subtle" px={2} py={1} rounded="md">
                                    {exchange.exchange_marketshare}
                                </Badge>
                            </Box>
                        )}
                    </HStack>

                    <Box pt={4} w="full">
                        <Badge variant="outline" colorScheme="blue" w="full" textAlign="center" py={1}>
                            Ranked #{exchange.exchange_rank} globally
                        </Badge>
                    </Box>
                </Stack>
            </Box>
        </Center>
    );
}
