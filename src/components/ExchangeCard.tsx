import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Badge,
    HStack,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
} from '@chakra-ui/react';
import { Exchange } from '../types/exchange';

interface ExchangeCardProps {
    exchange?: Exchange;
    isLoading?: boolean;
}

export default function ExchangeCard({ exchange, isLoading }: ExchangeCardProps) {
    const bgColor = useColorModeValue('white', 'gray.800');

    if (isLoading) {
        return (
            <Box
                role={'group'}
                p={6}
                maxW={'330px'}
                w={'full'}
                bg={bgColor}
                boxShadow={'2xl'}
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        bg: 'blue.500',
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <Skeleton height="full" rounded="lg" />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Skeleton height="20px" width="120px" />
                    <SkeletonText mt="4" noOfLines={2} spacing="4" width="full" />
                </Stack>
            </Box>
        );
    }

    if (!exchange) return null;

    return (
        <Center py={12}>
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
                _hover={{ transform: 'translateY(-10px)' }}>
                <Box
                    rounded={'lg'}
                    mt={-12}
                    pos={'relative'}
                    height={'230px'}
                    _after={{
                        transition: 'all .3s ease',
                        content: '""',
                        w: 'full',
                        h: 'full',
                        pos: 'absolute',
                        top: 5,
                        left: 0,
                        backgroundImage: `url(${exchange.logo})`,
                        filter: 'blur(15px)',
                        zIndex: -1,
                    }}
                    _groupHover={{
                        _after: {
                            filter: 'blur(20px)',
                        },
                    }}>
                    <Image
                        rounded={'lg'}
                        height={230}
                        width={282}
                        objectFit={'contain'}
                        src={exchange.logo}
                        bg="white"
                        p={4}
                        alt={exchange.name}
                    />
                </Box>
                <Stack pt={10} align={'center'}>
                    <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                        {exchange.type}
                    </Text>
                    <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                        {exchange.name}
                    </Heading>
                    <Stack direction={'row'} align={'center'}>
                        <Text fontWeight={800} fontSize={'xl'}>
                            Fee: {exchange.swapFee || exchange.takerFee}
                        </Text>
                        {exchange.makerFee && (
                            <Text textDecoration={'line-through'} color={'gray.600'}>
                                {exchange.makerFee}
                            </Text>
                        )}
                    </Stack>
                    <HStack spacing={2} wrap="wrap" justify="center" mt={2}>
                        {exchange.features.map(f => (
                            <Badge key={f} colorScheme="blue" variant="subtle" fontSize="0.7em">
                                {f}
                            </Badge>
                        ))}
                    </HStack>
                </Stack>
            </Box>
        </Center>
    );
}
