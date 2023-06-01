import { Container, Select, Heading, FormControl, FormLabel, Input, FormHelperText, Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from '@chakra-ui/react'
import { useState } from "react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dietList = ["Whole eggs", "Leafy greens", "Salmon", "Cruciferous vegetables", "Chicken breast and some lean meats", "Potatoes and other root vegetables", "Tuna", "Beans and legumes", "Soups", "Cottage cheese", "Avocados", "Nuts", "Whole grains", "Chili pepper", "Fruit", "Grapefruit", "Chia seeds", "Full fat (whole) Greek yogurt"];
  
  const [ formData, setFormData ] = useState([]);
  const [ data, setData ] = useState({
    name: "",
    diet: ""
  })

  const changeHandler = (e) => {
    setData((prev) => {
      return { ...prev, [e.target.name] : e.target.value };
    })
  }

  const submitHandler = (e) => {
    e.preventDefault();
    let newFormData = formData;
    newFormData.push(data);
    setFormData( newFormData )
    console.log(formData);
  }

  const noHandler = () => {
    onClose();
  }
  const yesHandler = () => {
    console.log(formData);
    onClose();
    setData({
      name: "",
      diet: ""
    });
  }

  return (
    <>
      <Container>
        <Heading as="h1" align="center" my="30px">
          Dietary List
        </Heading>

        <form onSubmit={submitHandler}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input type='text' value={data.name} name="name" onChange={ changeHandler } placeholder='Name'  />
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Select Diet Require</FormLabel>
            <Select name="diet" value={data.diet} variant='filled' placeholder='Select from the list' onChange={ changeHandler }>
              {
                dietList.map((diet, i) => {
                  return (
                    <option value={diet} key={i}>{diet}</option>
                    )
                  })
                }
            </Select>
          </FormControl>
          <Button mt={4} colorScheme='teal' type='submit' onClick={onOpen}>Submit</Button>
        </form>
        
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Dietary Plan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                  Name: {data.name } <br />
                  Diet Plan: {data.diet }
            </ModalBody>

            <ModalFooter>
              <Button variant='ghost' onClick={noHandler}>No</Button>
              <Button colorScheme='teal' mr={3} onClick={yesHandler}>
                Yes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {
          formData.length > 0 ?  
          <Box mt="20px" border='2px' borderColor='gray.200' borderRadius='10px'>
            <TableContainer>
              <Table variant='simple' colorScheme='teal'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead backgroundColor='teal'>
                  <Tr>
                    <Th color='white'>Sl. No.</Th>
                    <Th color='white'>Name</Th>
                    <Th color='white'>Diet</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    formData.map( (item, i) => {
                      return (
                        <Tr>
                          <Td>{ i }</Td>
                          <Td>{ item.name }</Td>
                          <Td>{ item.diet }</Td>
                        </Tr>
                      )
                    })
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          : 
          " Please, Enter some data."
        }

      </Container>
    </>
  );
}

export default App;
