import mongoose from 'mongoose';
import Transaction from '../models/Transaction';
import fs from 'fs';
import path from 'path';

async function importTransactions() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://shimpirohit02:1234@backendapi.kymt5.mongodb.net/FinanceDB?retryWrites=true&w=majority&appName=backEndApi');
    
    // Read JSON file
    const jsonPath = path.join(__dirname, '../../data/transactions.json');
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const transactions = JSON.parse(rawData);
    
    // Transform data (remove id field, MongoDB will auto-generate _id)
    const transformedTransactions = transactions.map((transaction: any) => {
      const { id, ...rest } = transaction; // Remove id field
      return {
        ...rest,
        date: new Date(rest.date) // Ensure date is proper Date object
      };
    });
    
    // Clear existing transactions (optional)
    await Transaction.deleteMany({});
    
    // Insert transactions
    const result = await Transaction.insertMany(transformedTransactions);
    console.log(`Successfully inserted ${result.length} transactions`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error importing transactions:', error);
    process.exit(1);
  }
}

importTransactions();