import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopWidth={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={10}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Stack direction={'row'} spacing={6}>
          <Link as={NextLink} href={'/'}>Home</Link>
          <Link as={NextLink} href={'/about'}>About</Link>
          <Link as={NextLink} href={'/cex'}>CEX</Link>
          <Link as={NextLink} href={'/dex'}>DEX</Link>
          <Link as={NextLink} href={'/contact'}>Contact</Link>
        </Stack>
        <Text>© 2026 CryptoFees Exchange. All rights reserved</Text>
      </Container>
    </Box>
  );
};
