import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    HStack,
    Spacer,
    Text,
    useMediaQuery,
    VStack,
} from "@chakra-ui/react"
import { ConnectButton } from "web3uikit"
import { FaEthereum } from "react-icons/fa"
import Welcome from "./Welcome"
import {useEffect} from "react";

export default function Header() {
    const [isSmallerThan721] = useMediaQuery("(max-width: 721px)")

    return isSmallerThan721 ? (
        <Box bgGradient={"linear(to-r, red.500, yellow.500)"}>
            <VStack
                spacing={"3vh"}
                maxW={"100%"}
                justifyContent={"center"}
                bgGradient={"linear(to-r, #7C82FF,teal.400 )"}
                height={"11vh"}
                position={"relative"}
                zIndex={"3"}
                pt={"16vh"}
                mb={"17vh"}
            >
                <VStack> <Heading color={"white"} size={"4xl"}>
                    10Club
                </Heading>
                <Heading size={"4xl"} color={"white"}>
                    <Text>Lottery </Text>
                </Heading> </VStack>
                <Spacer />

                <Box
                    bgGradient={"linear(to-r, red.500, yellow.500)"}
                    paddingBottom={"3px"}
                    paddingTop={"3px"}
                    borderRadius={"10"}
                    position={"relative"}
                    zIndex={"4"}
                    marginTop={"5vh"}
                >
                    <Center>
                        <HStack>
                            <FaEthereum size={"50px"} color={"#7C82FF"} />
                            <ConnectButton moralisAuth={false} colour />
                            <FaEthereum size={"50px"} color={"teal"} />
                        </HStack>
                    </Center>
                </Box>
            </VStack>

            <Box
                className="custom-shape-divider-top-1664755733"
                bgGradient={"linear(to-r, #7C82FF,teal.400 )"}
            >
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </Box>
        </Box>
    ) : (
        <Box bgGradient={"linear(to-r, #7C82FF,teal.400 )"}>
            <Flex
                alignItems={"center"}
                maxW={"100%"}
                bgGradient={"linear(to-r, #7C82FF,teal.400 )"}
                height={"11vh"}
                position={"relative"}
                zIndex={"5"}
                pt={"2vh"}
                mb={"5vh"}
            >
                <Heading ml={"10vh"} color={"white"} size={"4xl"}>
                    10Club
                </Heading>
                <Heading size={"4xl"} color={"white"} ml={"2vh"}>
                    <Text>Lottery </Text>
                </Heading>
                <Spacer />

                <Box
                    bgGradient={"linear(to-r, red.500, yellow.500)"}
                    paddingBottom={"3px"}
                    paddingTop={"3px"}
                    borderRadius={"10"}
                    mr={"15.5vh"}
                >
                    <Center>
                        <HStack>
                            <FaEthereum size={"50px"} color={"#7C82FF"} />
                            <ConnectButton moralisAuth={false} colour />
                            <FaEthereum size={"50px"} color={"#7C82FF"} />
                        </HStack>
                    </Center>
                </Box>
            </Flex>

            <Box
                className="custom-shape-divider-top-1664755733"
                bgGradient={"linear(to-r, #7C82FF,teal.400 )"}
                position={"relative"}
                zIndex={"2"}
                mb={"-70vh"}
            >
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </Box>
        </Box>
    )
}
