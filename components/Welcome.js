import {
    Box,
    Center,
    Divider,
    Flex,
    Heading,
    HStack,
    Link,
    ScaleFade,
    Spacer,
    Text,
    useMediaQuery,
    VStack
} from "@chakra-ui/react";
import Header from "./Header";
import NextLink from "next/link";
import {FaGithub} from "react-icons/fa";


export default function Welcome() {

    const [isSmallerThan721] = useMediaQuery('(max-width: 721px)')

    return (<Center>
        <Box className={"welcome"} bgGradient={"linear(to-r, red.500, yellow.500)"} padding={"1.5vh"}
             borderRadius={"10"}
             mt={ isSmallerThan721 ? 0 : "17vh"}
        >
            <Box  bg={"white"} padding={"2vh"}>
            <Heading size={"xl"} color={"black"}>
                <Center> { isSmallerThan721 ? <VStack>  <Text> Welcome to </Text> <Flex>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <Text mr={"1vh"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} > 10'Club Raffle </Text>
                    </Flex> </VStack>



                    : <HStack>  <Text> Welcome to </Text> <Flex>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <Text mr={"1vh"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} > 10'sClub Raffle </Text>
                </Flex> </HStack> } </Center>
            </Heading>

            <Box width={"100%"} height={"2px"}  bgGradient={'linear(to-r, #7C82FF,teal.400 )'}> </Box>
                {isSmallerThan721 ?

                    <Text align={"center"} fontSize={"lg"}> This DApp simulates a raffle-type activity where up-to 10 players can send ETH, thereby entering the Club,
                        into a pool and once any of the players finishes the lottery, sending a bit of LINK as payment in order to to get
                        a truly random number through ChainLink VRF, a winner is chosen and gets sent 50% of the ETH in the pool while
                        the rest of the players receive the other 50% split equally between them. As the name and the maximum number of
                        players implies, this DApp is intended to be used purely for small raffles between players who can verify each other </Text>


                :
            <VStack justifyContent={"center"} my={"2vh"} >
            <Text fontSize={"lg"}> This DApp simulates a raffle-type activity where up-to 10 players can send ETH, thereby entering the Club,  </Text>
            <Text fontSize={"lg"}> into a pool and once any of the players finishes the lottery, sending a bit of LINK as payment in order to get  </Text>
            <Text fontSize={"lg"}> a truly random number through ChainLink VRF, a winner is chosen and gets sent 50% of the ETH in the pool while </Text>
            <Text fontSize={"lg"}> the rest of the players receive the other 50% split equally between them. As the name and the maximum number of  </Text>
            <Text fontSize={"lg"}> players implies, this DApp is intended to be used purely for small raffles between players who can verify each other </Text>
            </VStack> }
                <Box width={"100%"} height={"2px"}  bgGradient={'linear(to-r, #7C82FF,teal.400 )'}> </Box>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <Center mt={"1vh"}> <HStack> <Heading size={"md"}> 10'sClub Raffle at </Heading>
                    <NextLink href="https://goerli.etherscan.io/address/0x5cfC465bcC4f50A71E96b648F27D0A2c404D7c01#code" passHref>
                        <Link> <Heading size={"md"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} bgClip={"text"}> Etherscan </Heading> </Link>
                    </NextLink> </HStack> </Center>

            </Box>
        </Box>
        </Center>
    )
}