//https://pro.chakra-ui.com/components/marketing/footers

import { ButtonGroup, Container, IconButton, Stack, Text } from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { Logo } from './Logo'

import { EMARKA_GREEN } from '../../../consts';
//import NavItem from './NavItem';

export const Footer = () => (
  <Container
    as="footer"
    role="contentinfo"
    py={{
      base: '12',
      md: '16',
    }}
  >
    <Stack
      spacing={{
        base: '4',
        md: '5',
      }}
    >
      <center>
      <Text fontSize="sm" color="subtle">
         &copy;Wing Orienteringsklubb 
      </Text>
      </center>
    </Stack>
  </Container>
)
export default Footer;
