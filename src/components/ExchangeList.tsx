import { useState, useEffect } from 'react';
import {
    SimpleGrid,
    Box,
    Input,
    Select,
    Stack,
    Heading,
    Container,
    Text,
    Center,
} from '@chakra-ui/react';
import ExchangeCard from './ExchangeCard';
import { Exchange } from '../types/exchange';
import { fetchExchanges } from '../services/api';

interface ExchangeListProps {
    type: 'CEX' | 'DEX';
    title: string;
}

export default function ExchangeList({ type, title }: ExchangeListProps) {
    const [exchanges, setExchanges] = useState<Exchange[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('name');

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await fetchExchanges(type);
            setExchanges(data);
            setLoading(false);
        };
        getData();
    }, [type]);

    const filteredExchanges = exchanges
        .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'name') return a.name.localeCompare(b.name);
            if (sortBy === 'fee') {
                const feeA = parseFloat(a.swapFee || a.takerFee);
                const feeB = parseFloat(b.swapFee || b.takerFee);
                return feeA - feeB;
            }
            return 0;
        });

    return (
        <Container maxW={'7xl'} py={12}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={12}>
                <Heading fontSize={'3xl'}>{title}</Heading>
                <Text color={'gray.600'} fontSize={'xl'}>
                    Explore the best {type} exchanges and their trading fees.
                </Text>
            </Stack>

            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={8}>
                <Input
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    maxW={{ md: '300px' }}
                />
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    maxW={{ md: '200px' }}>
                    <option value="name">Sort by Name</option>
                    <option value="fee">Sort by Fee</option>
                </Select>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                {loading
                    ? Array(6)
                        .fill(0)
                        .map((_, i) => <ExchangeCard key={i} isLoading={true} />)
                    : filteredExchanges.map((exchange) => (
                        <ExchangeCard key={exchange.id} exchange={exchange} />
                    ))}
            </SimpleGrid>

            {(!loading && filteredExchanges.length === 0) && (
                <Center py={10}>
                    <Text fontSize="lg" color="gray.500">No exchanges found matching your criteria.</Text>
                </Center>
            )}
        </Container>
    );
}
