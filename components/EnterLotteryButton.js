import { useWeb3Contract } from "react-moralis";
import {useMoralis} from "react-moralis";
import {Form, Formik, Field} from "formik";
import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel, Heading,
    Spacer,
    Text, useMediaQuery
} from "@chakra-ui/react";
import {Input} from "@chakra-ui/react";
import abi from "../constants/abi.json"
import {useEffect} from "react";
import  {ethers} from "ethers";
import {useNotification} from "web3uikit";
import Image from 'next/image'
import ticket from "../public/output-onlinepngtools (2).png"
export default function EnterLotteryButton() {

    const { isWeb3Enabled } = useMoralis()
    const [isSmallerThan721] = useMediaQuery('(max-width: 721px)')

    useEffect(() => {
        if(isWeb3Enabled){

        }
    })

    const dispatch = useNotification()

    const {runContractFunction: EnterLottery} =
        useWeb3Contract({});

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Lottery Entered Successfully!",
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
                 bg={"white"} padding={"1vh"} pb={"4vh"} maxW={"100%"}>
                <Center mt={isSmallerThan721 ? "8vh" : "15vh"} mb={"5vh"}> <Heading size={"3xl"} bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} mb={"3vh"}> Enter the Club  </Heading> </Center>
             <Center> <Text fontSize={"lg"}>
                 Enter the lottery by providing a minimum entrance fee of 0.01 ETH. You can only enter the lottery once so make sure to send all the ETH you want in one go.
                  </Text>  </Center>
                <Box width={"100%"} height={"2px"} bgGradient={"linear(to-r, red.500, yellow.500)"}> </Box>

                <Center mt={"6vh"} > <Box minWidth={"50%"}>
            <Formik
                initialValues={{ fee: '' }}
                onSubmit={ async (values) => {
                    await EnterLottery({ params: {
                            abi: abi,
                            contractAddress: "0x438e726Ae87D228bF3970E252B81E82D4512C194",
                            functionName: "enterLottery",
                            params: {},
                            msgValue: ethers.utils.parseEther(values.fee)

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
                                    <Input {...field} placeholder='Your entrance fee in ETH' borderColor={"#7C82FF"}/>
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
                            Buy a ticket
                        </Button>
                    </Form>
                )}
            </Formik>
            </Box>
                </Center>
            </Flex>
        )
    }
