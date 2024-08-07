
'use client';
import styles from '../app/page.module.css';
import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { firestore } from '../app/firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, Timestamp } from "firebase/firestore";
import DeleteIcon from '@mui/icons-material/Delete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getRecipeSuggestions } from '../src/services/groqService';
import { getAuth } from "firebase/auth";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [items, setItems] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleGetSuggestions = async () => {
    try {
      const recipeSuggestions = await getRecipeSuggestions(items);
      setSuggestions(recipeSuggestions);
    } catch (error) {
      console.error('Error getting suggestions:', error);
    }
  };

  const updateInventory = async () => {
    if (!user) return;
    const snapshot = query(collection(firestore, `users/${user.uid}/inventory`));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    const itemsList = [];
    docs.forEach((doc) => {
      const data = doc.data();
      inventoryList.push({ name: doc.id, ...data });
      itemsList.push(doc.id); // Add item name to items list
    });
    setInventory(inventoryList);
    setItems(itemsList); // Set items state
  };

  useEffect(() => {
    updateInventory();
  }, [user]);

  const addItem = async (item) => {
    if (!user) return;
    const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item.name);
    const docSnap = await getDoc(docRef);
    const newItem = {
      ...item,
      expirationDate: item.expirationDate ? Timestamp.fromDate(new Date(item.expirationDate)) : null,
    };
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { ...newItem, quantity: quantity + 1 });
    } else {
      await setDoc(docRef, newItem);
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    if (!user) return;
    const docRef = doc(collection(firestore, `users/${user.uid}/inventory`), item);
    await deleteDoc(docRef);
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box className={styles.container}>
      <Box className={styles.contentWrapper}>
        <Box className={styles.formWrapper}>
          <Typography variant="h6" gutterBottom>Add Pantry Item</Typography>
          <TextField fullWidth label="Name" value={itemName} onChange={(e) => setItemName(e.target.value)} margin="normal" />
          <TextField fullWidth label="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} margin="normal" />
          <DatePicker
            selected={expirationDate}
            onChange={(date) => setExpirationDate(date)}
            dateFormat="MM/dd/yyyy"
            customInput={<TextField fullWidth label="Expiration Date" margin="normal" />}
          />
          <Button variant="contained" fullWidth onClick={() => addItem({ name: itemName, quantity, expirationDate })}>Add Item</Button>
          <Button className="mt-2" variant="contained" fullWidth onClick={handleGetSuggestions}>Get Recipe Suggestions</Button>
        </Box>
        <Box className={styles.tableWrapper}>
          <Typography variant="h6" gutterBottom>Pantry Items</Typography>
          <TextField fullWidth label="Search Items" margin="normal" />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Expiration</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventory.map(({ name, quantity, expirationDate }) => (
                  <TableRow key={name}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{quantity}</TableCell>
                    <TableCell>{expirationDate instanceof Timestamp ? expirationDate.toDate().toLocaleDateString() : expirationDate}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => removeItem(name)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {suggestions.length > 0 && (
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>Recipe Suggestions</Typography>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}