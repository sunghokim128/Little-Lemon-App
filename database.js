import * as SQLite from 'expo-sqlite';
// Open database with new API
const db = SQLite.openDatabaseSync('little_lemon');

export async function createTable() {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS menuitems (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        price REAL, 
        description TEXT,
        image TEXT,
        category TEXT
      );
    `);
  } catch (error) {
    throw new Error('Failed to create table: ' + error.message);
  }
}

export async function getMenuItems() {
  try {
    const result = await db.getAllAsync('SELECT * FROM menuitems');
    return result;
  } catch (error) {
    throw new Error('Failed to get menu items: ' + error.message);
  }
}

export async function saveMenuItems(menuItems) {
  try {
    await db.withTransactionAsync(async () => {
      // Clear existing data
      await db.runAsync('DELETE FROM menuitems');
      
      // Insert new data
      for (const item of menuItems) {
        await db.runAsync(
            'INSERT INTO menuitems (id, name, price, description, image, category) VALUES (?, ?, ?, ?, ?, ?)',
            [item.id, item.name, item.price, item.description, item.image, item.category]
        );
      }
    });
  } catch (error) {
    throw new Error('Failed to save menu items: ' + error.message);
  }
}

export async function filterByCategory(category) {
  try {
    if (category === 'all') {
      return await db.getAllAsync('SELECT * FROM menuitems ORDER BY category, name');
    } else {
      return await db.getAllAsync(
        'SELECT * FROM menuitems WHERE LOWER(category) = LOWER(?) ORDER BY name',
        [category]
      );
    }
  } catch (error) {
    throw new Error('Failed to filter by category: ' + error.message);
  }
}

export async function searchMenuItems(query) {
  try {
    if (!query || query.trim() === '') {
      return await db.getAllAsync('SELECT * FROM menuitems ORDER BY category, name');
    }
    
    const searchTerm = `%${query.trim()}%`;
    return await db.getAllAsync(
      'SELECT * FROM menuitems WHERE LOWER(name) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?) ORDER BY category, name',
      [searchTerm, searchTerm]
    );
  } catch (error) {
    throw new Error('Failed to search menu items: ' + error.message);
  }
}