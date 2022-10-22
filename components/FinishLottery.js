import { useWeb3Contract } from "react-moralis";
import {useMoralis} from "react-moralis";
import {Form, Formik, Field} from "formik";
import { GiPodiumWinner } from "react-icons/gi";
import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack, ScaleFade,
    Spacer, Text, useMediaQuery, VStack
} from "@chakra-ui/react";
import {Input} from "@chakra-ui/react";
import abi from "../constants/abi.json"
import {useEffect, useRef} from "react";
import  {ethers} from "ethers";
import {useNotification} from "web3uikit";
import {useInViewport} from "react-in-viewport";
export default function FinishLottery() {

    const ref = useRef(null);
    const { enterCount } = useInViewport(ref,{ rootMargin: "-20%"}, {disconnectOnLeave: false}, {})

    const { isWeb3Enabled } = useMoralis()
    const [isSmallerThan721] = useMediaQuery('(max-width: 721px)')

    useEffect(() => {
        if(isWeb3Enabled){

        }
    })

    const dispatch = useNotification()

    const {runContractFunction: requestWinner} =
        useWeb3Contract({});

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Winner requested successfully! May take a few minutes",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
    }




    function validateName(value) {
        let error
        if (!value) {
            error = 'Min entrance fee is required'
        } else if (value < 0.01) {
            error = "Please input at least 0.01 ETH"
        }
        return error
    }

    return (<ScaleFade whileHover={{scale: 1.1}} initialScale={0.001} in={ enterCount > 0} >
        <Flex direction={"column"} position={"relative"} zIndex={"1"} ref={ref}
              bg={"white"} padding={"1vh"} pb={"5vh"} mb={"3vh"} maxW={"100%"}>
            <Center mt={isSmallerThan721 ? "3vh" : "15vh"} mb={"3vh"}> {isSmallerThan721 ?

                    <VStack> <Heading size={"3xl"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'}> Request   </Heading>
                        <Heading size={"3xl"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} > a   </Heading>
                        <Heading size={"3xl"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} mb={"3vh"}> Winner  </Heading></VStack> :

                <Heading size={"3xl"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} mb={"3vh"}> Request a Winner  </Heading>} </Center>
            {isSmallerThan721 ?

                <Center><Box>  <Text align={"center"} fontSize={"lg"}>
                    This costs around 1 LINK, however due to the nature of ChainLinkVRF limits, always make sure the balance is at least 12 LINK. In cases where the gas price is high and LINK cost will increase,
                    there is a chance that the request for the winner will not go through and will be pending, waiting for the balance to get big enough and getting cancelled after 24 hours.
                    You can either wait for gas price to go down or top up with LINK in small increments and seeing if the transaction goes through.

                </Text> <Box width={"100%"} height={"2px"} bgGradient={"linear(to-r, red.500, yellow.500)"}> </Box>
                </Box> </Center>

                : <>
                        <Center><Box>  <Text fontSize={"lg"}>
                            This costs around 0.5 - 2 LINK, however due to the nature of ChainLinkVRF limits, always make sure the balance is at least 12 LINK.
                        </Text> <Box width={"100%"} height={"2px"} bgGradient={"linear(to-r, red.500, yellow.500)"}> </Box>
                        </Box> </Center>

                    <Center><Box>
                        <Text fontSize={"lg"}>
                            In cases where the gas price is high and LINK cost will increase, there is a chance that the request for the winner will not
                        </Text> <Box width={"100%"} height={"2px"} bgGradient={"linear(to-r, red.500, yellow.500)"}> </Box> </Box> </Center>
            <Center><Box>

                <Text fontSize={"lg"}>
                            go through and will be pending, waiting for the balance to get big enough and getting cancelled after 24 hours. You can either wait
                </Text> <Box width={"100%"} height={"2px"} bgGradient={"linear(to-r, red.500, yellow.500)"}> </Box> </Box> </Center>

            <Center><Box>
                <Text fontSize={"lg"}>
                    for gas price to go down or top up with LINK in small increments and seeing if the transaction goes through.
                </Text> <Box width={"100%"} height={"2px"} bgGradient={"linear(to-r, red.500, yellow.500)"}> </Box> </Box> </Center> </> }
            <Center mt={"6vh"} > <Box minWidth={"50%"}>
            <Formik
                initialValues={{ fee: '' }}
                onSubmit={ async (values) => {
                    await requestWinner({ params: {
                            abi: abi,
                            contractAddress: "0x5D34E7FFd3865F19Ff33Ee1D630A349671FCc7aF",
                            functionName: "requestRandomWinner",
                            params: {},

                        }, onSuccess: handleSuccess, onError: (error) => console.log(JSON.stringify(error))})
                }


                }
            >
                {( { isSubmitting}) => (
                    <Form>
                        <Button
                            mt={"2vh"}
                            _hover={{
                                bgGradient: 'linear(to-r, red.400, yellow.400)',
                            }}
                            bgGradient={"linear(to-r, red.500, yellow.500)"}
                            width={"100%"}
                            height={"7vh"}
                            disabled={isSubmitting}
                            type='submit'
                        >
                            Request a Winner
                        </Button>
                    </Form>
                )}
            </Formik>
            </Box>
            </Center>
        </Flex> </ScaleFade>
    )
}