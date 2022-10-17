import {Box, Button, Center, Flex, Heading, HStack, Spacer, Text} from "@chakra-ui/react";
import { ConnectButton } from "web3uikit";
import { FaEthereum } from "react-icons/fa";
import Welcome from "./Welcome";

export default function Header() {
  return (
      <Box bgGradient={"linear(to-r, red.500, yellow.500)"} >
    <Flex

      alignItems={"center"}
      maxW={"100%"}
      bgGradient={'linear(to-r, #7C82FF,teal.400 )'}
      height={"11vh"}
      position={"relative"}
      zIndex={"3"}
      pt={"2vh"}
    >

      <Heading ml={"10vh"} color={"white"} size={"4xl"}>
        10'sClub
      </Heading>
      <Heading size={"4xl"} color={"white"} ml={"2vh"}>
        <Text >Raffle </Text>
      </Heading>
      <Spacer />

        <Box

            bgGradient={"linear(to-r, red.500, yellow.500)"}
            paddingBottom={"3px"}
            paddingTop={"3px"}
            borderRadius={"10"}
            position={"relative"}
            zIndex={"4"}
            mr={"15.5vh"}

        > <Center> <HStack>
            {" "}
            <FaEthereum size={"50px"} color={"#7C82FF"} />
            <ConnectButton moralisAuth={false} colour />
            <FaEthereum size={"50px"} color={"#7C82FF"} />
        </HStack> </Center>

        </Box>

    </Flex>


        <Box className="custom-shape-divider-top-1664755733" bgGradient={'linear(to-r, #7C82FF,teal.400 )'}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
          </svg>
        </Box>
      </Box>
  );
}
