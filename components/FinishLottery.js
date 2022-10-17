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
    HStack,
    Spacer, Text
} from "@chakra-ui/react";
import {Input} from "@chakra-ui/react";
import abi from "../constants/abi.json"
import {useEffect} from "react";
import  {ethers} from "ethers";
import {useNotification} from "web3uikit";
export default function FinishLottery() {

    const { isWeb3Enabled } = useMoralis()

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
            message: "Winner chosen successfully!",
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

    return (
        <Flex direction={"column"} position={"relative"} zIndex={"1"}
              bg={"white"} padding={"1vh"} pb={"5vh"} mb={"3vh"} maxW={"100%"}>
            <Center mt={"4vh"} mb={"3vh"}> <Heading size={"3xl"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} mb={"3vh"}> Request a Winner  </Heading> </Center>

            <Center><Box>  <Text fontSize={"lg"}>
                This costs around 0.28 LINK so make sure the balance is big enough. In cases where the gas prices are high and LINK cost will increase,
            </Text> <Box width={"100%"} height={"2px"} bgGradient={"linear(to-r, red.500, yellow.500)"}> </Box>
            </Box> </Center>

            <Center><Box>
                <Text fontSize={"lg"}>
                    the request for the winner will be pending, waiting for balance to get big enough and getting cancelled after 24 hours
                </Text> <Box width={"100%"} height={"2px"} bgGradient={"linear(to-r, red.500, yellow.500)"}> </Box> </Box> </Center>

            <Center><Box>
                <Text fontSize={"lg"}>
                    You can either wait for gas prices to go down or top up with LINK in small increments and seeing if the transaction goes through
                </Text> <Box width={"100%"} height={"2px"} bgGradient={"linear(to-r, red.500, yellow.500)"}> </Box> </Box> </Center>
            <Center mt={"6vh"} > <Box minWidth={"50%"}>
            <Formik
                initialValues={{ fee: '' }}
                onSubmit={ async (values) => {
                    await requestWinner({ params: {
                            abi: abi,
                            contractAddress: "0x9CB7A11015AA6DD3E16E5e59EeE9D3eA4DF08D47",
                            functionName: "requestRandomWinner",
                            params: {},

                        }, onSuccess: handleSuccess, onError: (error) => console.log(JSON.stringify(error))})
                }


                }
            >
                {( { isSubmitting}) => (
                    <Form>
                        <Field name='fee' validate={validateName}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.fee && form.touched.fee} bg={"white"} >
                                    <FormErrorMessage bg={"white"}>{form.errors.fee}</FormErrorMessage>
                                    <Input {...field} placeholder='Your entrance fee in ETH'/>
                                </FormControl>
                            )}
                        </Field>
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
        </Flex>
    )
}