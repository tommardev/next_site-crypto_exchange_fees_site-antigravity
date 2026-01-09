import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Hero } from '../components/Hero';
import { fetchExchanges } from '../services/api';
import { useEffect, useState } from 'react';
import { Exchange } from '../types/exchange';
import ExchangeCard from '../components/ExchangeCard';

export default function Home() {
  const [previews, setPreviews] = useState<{ cex: Exchange[]; dex: Exchange[] }>({
    cex: [],
    dex: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPreviews = async () => {
      const cexItems = await fetchExchanges('CEX');
      const dexItems = await fetchExchanges('DEX');
      setPreviews({
        cex: cexItems.slice(0, 2),
        dex: dexItems.slice(0, 2),
      });
      setLoading(false);
    };
    loadPreviews();
  }, []);

  return (
    <>
      <Hero title="Optimize Your Trading Fees" />

      <Container maxW={'7xl'} py={16}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={16}>
          <Heading fontSize={'4xl'} fontWeight={'bold'}>
            The Hub for Crypto Exchange Fees
          </Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Comparing fees across multiple platforms can be a headache. We've
            aggregated the most important data so you can trade with confidence
            and keep more of your profits.
          </Text>
        </Stack>

        <Stack spacing={20}>
          {/* CEX Preview */}
          <Box>
            <Flex justify="space-between" align="center" mb={8}>
              <Box>
                <Heading size="lg" mb={2}>Centralized Exchanges (CEXs)</Heading>
                <Text color="gray.600">Secure, liquid, and industry-standard platforms.</Text>
              </Box>
              <Button as={NextLink} href="/cex" colorScheme="blue" variant="outline">View All CEXs</Button>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {loading
                ? [1, 2].map((i) => <ExchangeCard key={i} isLoading={true} />)
                : previews.cex.map((e) => <ExchangeCard key={e.id} exchange={e} />)}
            </SimpleGrid>
          </Box>

          {/* DEX Preview */}
          <Box>
            <Flex justify="space-between" align="center" mb={8}>
              <Box>
                <Heading size="lg" mb={2}>Decentralized Exchanges (DEXs)</Heading>
                <Text color="gray.600">Permissionless swapping and yield opportunities.</Text>
              </Box>
              <Button as={NextLink} href="/dex" colorScheme="purple" variant="outline">View All DEXs</Button>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {loading
                ? [1, 2].map((i) => <ExchangeCard key={i} isLoading={true} />)
                : previews.dex.map((e) => <ExchangeCard key={e.id} exchange={e} />)}
            </SimpleGrid>
          </Box>
        </Stack>
      </Container>

      {/* CTA Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20}>
        <Container maxW={'5xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Stay ahead of the <br />
              <Text as={'span'} color={'blue.400'}>
                market fees
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Our data is updated regularly to ensure you have the most accurate
              information. Join our newsletter to get weekly summaries of fee
              changes and new exchange listings.
            </Text>
            <Stack
              direction={'column'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}>
              <Button
                colorScheme={'blue'}
                bg={'blue.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'blue.500',
                }}>
                Get Started
              </Button>
              <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                Learn more
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
