import {useWeb3Contract, useWeb3ExecuteFunction, useWeb3Transfer} from "react-moralis";
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
    FormLabel,
    Heading, HStack,
    Spacer, Text
} from "@chakra-ui/react";
import {Input} from "@chakra-ui/react";
import abi from "../constants/abi.json"
import {useEffect, useState} from "react";
import  {ethers} from "ethers";
import {useNotification} from "web3uikit";
import Moralis from "moralis-v1";
export default function FundLinkButton() {

    const { isWeb3Enabled } = useMoralis()

    const [subBalance, setSubBalance] = useState("0")
    const [linkRate, setLinkRate] = useState("0")


    async function updateUIValues() {
        // Another way we could make a contract call:
        // const options = { abi, contractAddress: raffleAddress }
        // const fee = await Moralis.executeFunction({
        //     functionName: "getEntranceFee",
        //     ...options,
        // })
        const sub = await getSub()
        const balance = sub[0]._hex.toString()
        const link = await getPrice().toString()

        setSubBalance(link)
        setSubBalance(ethers.utils.formatUnits(balance, "ether"))

    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues().then(r => console.log(r))
        }
    }, [isWeb3Enabled])

    const {runContractFunction: getSub} =
        useWeb3Contract({
            abi: abi,
            contractAddress: "0x9CB7A11015AA6DD3E16E5e59EeE9D3eA4DF08D47",
            functionName: "getSub",
            params: {},
        });


    const {runContractFunction: getPrice} =
        useWeb3Contract({
            abi: abi,
            contractAddress: "",
            functionName: "",
            params: {},
        });

    const dispatch = useNotification()

    const {fetch: FundLink} =
        useWeb3Transfer({});



    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Funded the Raffle with LINK successfully!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
    }

    const handleSuccessLink = async (tx) => {
        await tx.wait(1)
        await LinkToVRF({ params: {
                abi: abi,
                contractAddress: "0x9CB7A11015AA6DD3E16E5e59EeE9D3eA4DF08D47",
                functionName: "linkToVRF",
                params: {amount: Moralis.Units.Token(values.fee, 18)},

            }, onSuccess: {handleSuccess}, onError: (error) => console.log(JSON.stringify(error))})
    }

    const {fetch: LinkToVRF} = useWeb3ExecuteFunction({});




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
            <Center mt={"9vh"} mb={"3vh"}> <Heading size={"3xl"}  bgClip={"text"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'} mb={"3vh"}> Fund with LINK  </Heading> </Center>

            <Center mb={"2vh"}>
                <Flex> <Heading mr={"2vh"} color={"black"} size={"lg"}> {"Balance of LINK:" + " "}</Heading> <Heading mr={"3vh"} bgGradient={"linear(to-r, red.500, yellow.500)"} bgClip={"text"} size={"lg"}> {subBalance} </Heading>
                    <Heading ml={"3vh"} mr={"2vh"} color={"black"} size={"lg"}> Current LINK/USD: </Heading> <Heading  bgGradient={"linear(to-r, red.500, yellow.500)"} bgClip={"text"} size={"lg"}> 0.013454355000000000 </Heading>
                </Flex>
            </Center>
            <Center><Box>  <Text fontSize={"lg"}>
                    Make sure to approve both transactions, the initial one, sending LINK to this lottery and the final one that will appear within a minute
            </Text> <Box width={"100%"} height={"2px"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'}> </Box>
                  </Box> </Center>

            <Center><Box>
                <Text fontSize={"lg"}>
                    of approving the first, sending LINK from this lottery to ChainLINK VRF to get a truly random number.
                </Text> <Box width={"100%"} height={"2px"} bgGradient={'linear(to-r, #7C82FF,teal.400 )'}> </Box> </Box> </Center>

            <Center mt={"8vh"} > <Box minWidth={"50%"}>
            <Formik
                initialValues={{ fee: '' }}
                onSubmit={ async (values) => {
                    await FundLink({ params: {
                            amount: Moralis.Units.Token(values.fee, 18),
                            receiver: "0x9CB7A11015AA6DD3E16E5e59EeE9D3eA4DF08D47",
                            type: "erc20",
                            contractAddress: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",

                        }, onSuccess: async (tx) => {
                        await tx.wait(1)
                        await LinkToVRF({ params: {
                                abi: abi,
                                contractAddress: "0x9CB7A11015AA6DD3E16E5e59EeE9D3eA4DF08D47",
                                functionName: "linkToVRF",
                                params: {amount: Moralis.Units.Token(values.fee, 18)},

                            }, onSuccess: handleSuccess, onError: (error) => console.log(JSON.stringify(error))})
                    }})





                }


                }
            >
                {( { isSubmitting}) => (
                    <Form>
                        <Field name='fee' validate={validateName}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.fee && form.touched.fee}>
                                    <FormErrorMessage>{form.errors.fee}</FormErrorMessage>
                                    <Input {...field} placeholder='Your entrance fee in ETH' />
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={"3vh"}
                            _hover={{
                                bgGradient: 'linear(to-r, red.400, yellow.400)',
                            }}
                            bgGradient={"linear(to-r, red.500, yellow.500)"}
                            width={"100%"}
                            height={"7vh"}
                            disabled={isSubmitting}
                            type='submit'
                        >
                            Fund Link
                        </Button>
                    </Form>
                )}
            </Formik>
            </Box>
            </Center>
        </Flex>
    )
}
