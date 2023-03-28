import bcrypt from 'bcryptjs';
import Parent from '../models/parentModel';

// Register parent
export const registerParent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if a parent with this email already exists
    const existingParent = await Parent.findOne({ email });
    if (existingParent) {
      return res.status(400).json({ message: 'Parent with such email already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 12);

    const parent = new Parent({ email, password: hashedPassword });

    await parent.save();

    res.status(201).json({ message: 'Parent created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add child for parent
export const addChild = async (req, res) => {
  const { name, age } = req.body;
  const parentId = req.user._id;

  try {
    const existingParent = await Parent.findById(parentId);
    if (!existingParent) {
      return res.status(404).json({ message: 'Parent not found' });
    }

    existingParent.children.push({ name, age });

    await existingParent.save();

    res.status(201).json({ message: 'Child added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
