import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
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
      <Hero title="Top Ranked Crypto Exchanges" />

      <Container maxW={'7xl'} py={16}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mb={16}>
          <Heading fontSize={'4xl'} fontWeight={'bold'}>
            AI-Powered Exchange Rankings
          </Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            We use Google Gemini AI to analyze and rank the top cryptocurrency
            exchanges globally. Discover the most trusted platforms for your trading needs.
          </Text>
        </Stack>

        <Stack spacing={20}>
          {/* CEX Preview */}
          <Box>
            <Flex justify="space-between" align="center" mb={8} direction={{ base: 'column', md: 'row' }}>
              <Box mb={{ base: 4, md: 0 }}>
                <Heading size="lg" mb={2}>Centralized Favorites (CEXs)</Heading>
                <Text color="gray.600">Top-tier exchanges with high liquidity and trust.</Text>
              </Box>
              <Button as={NextLink} href="/cex" colorScheme="blue" variant="outline">View Top 50 CEXs</Button>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
              {loading
                ? [1, 2].map((i) => <ExchangeCard key={i} isLoading={true} />)
                : previews.cex.map((e) => <ExchangeCard key={e.id} exchange={e} />)}
            </SimpleGrid>
          </Box>

          {/* DEX Preview */}
          <Box>
            <Flex justify="space-between" align="center" mb={8} direction={{ base: 'column', md: 'row' }}>
              <Box mb={{ base: 4, md: 0 }}>
                <Heading size="lg" mb={2}>Leading DEXs</Heading>
                <Text color="gray.600">The best decentralized platforms for permissionless trading.</Text>
              </Box>
              <Button as={NextLink} href="/dex" colorScheme="purple" variant="outline">View Top 50 DEXs</Button>
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
              Never miss a <br />
              <Text as={'span'} color={'blue.400'}>
                ranking update
              </Text>
            </Heading>
            <Text color={'gray.500'}>
              Our lists are updated nightly using the latest market data and
              AI analysis. Stay informed about the shifting crypto landscape.
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
                Join Newsletter
              </Button>
              <Button as={NextLink} href="/about" variant={'link'} colorScheme={'blue'} size={'sm'}>
                How our AI rankings work
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
