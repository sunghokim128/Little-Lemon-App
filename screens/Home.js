import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SectionList, Image, TouchableOpacity } from 'react-native';
import { Text, ActivityIndicator, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createTable, getMenuItems as getMenuItemsFromDB, saveMenuItems, filterByCategory, searchMenuItems } from '../database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

/**
 * Home Screen - Main Menu Display
 * 
 * This is the primary screen users see after logging in. It displays:
 * - Restaurant header with logo and profile navigation
 * - Introduction section with restaurant description
 * - Search functionality with debounced input
 * - Category filtering (All, Starters, Mains, Desserts)
 * - Menu items displayed in a grouped list by category
 * 
 * Key Features:
 * - Fetches menu data from API on first load, then stores in SQLite database
 * - Real-time search with 500ms debouncing for performance
 * - Category filtering with visual feedback
 * - Responsive design with proper keyboard handling
 */

// Fetch menu data from external API
async function fetchMenuFromAPI() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
      const json = await response.json();
      return json;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
  

export default function Home() {
  // State management for menu data and UI
  const [sections, setSections] = useState([]); // Menu items grouped by category for SectionList
  const [loading, setLoading] = useState(true); // Loading state for initial data fetch
  const [error, setError] = useState(null); // Error state for API/database failures
  const [selectedCategory, setSelectedCategory] = useState('all'); // Currently selected category filter
  const [isInitialized, setIsInitialized] = useState(false); // Database initialization flag
  const [searchQuery, setSearchQuery] = useState(''); // Current search input
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(''); // Debounced search for performance
  const [avatar, setAvatar] = useState(null); // User's profile avatar
  const navigation = useNavigation();

  // Available menu categories for filtering
  const categories = [
    { key: 'all', label: 'All' },
    { key: 'starters', label: 'Starters' },
    { key: 'mains', label: 'Mains' },
    { key: 'desserts', label: 'Desserts' }
  ];

  /**
   * Initialize the app on first load
   * - Creates database table if it doesn't exist
   * - Fetches menu data from API if database is empty
   * - Loads initial menu items
   */
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize database table
        await createTable();
        
        // Try to get menu items from database first
        let menuItems = await getMenuItemsFromDB();
        
        // If database is empty, fetch from API and save to database
        if (!menuItems || menuItems.length === 0) {
          console.log('Database is empty, fetching from API...');
          const apiData = await fetchMenuFromAPI();
          
          if (apiData && apiData.menu) {
            // Save menu items to database
            await saveMenuItems(apiData.menu);
            menuItems = apiData.menu;
            console.log('Menu items saved to database');
          }
        } else {
          console.log('Loading menu items from database');
        }
        
        // Load initial data
        await loadMenuByCategory('all', menuItems);
        setIsInitialized(true);
      } catch (err) {
        console.error('Error initializing app:', err);
        setError(err.message || 'Error initializing app');
      } finally {
        setLoading(false);
      }
    };
    
    initializeApp();
  }, []);

  /**
   * Load user's avatar from AsyncStorage
   */
  useEffect(() => {
    const loadAvatar = async () => {
      const storedAvatar = await AsyncStorage.getItem('avatar');
      if (storedAvatar) setAvatar(storedAvatar);
    };
    loadAvatar();
  }, []);

  /**
   * Debounce search query to improve performance
   * Only triggers search after user stops typing for 500ms
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /**
   * Handle menu filtering and searching
   * - If search query exists, search across all menu items
   * - If no search query, filter by selected category
   * - Groups results by category for SectionList display
   */
  useEffect(() => {
    if (isInitialized) {
      if (debouncedSearchQuery.trim()) {
        // Use database search function directly
        searchMenuItems(debouncedSearchQuery).then(menuItems => {
          setLoading(true);
          
          // Transform data to SectionList format
          if (menuItems && menuItems.length > 0) {
            // Group by category
            const grouped = {};
            menuItems.forEach(item => {
              if (!grouped[item.category]) grouped[item.category] = [];
              grouped[item.category].push(item);
            });
            
            const sectionData = Object.keys(grouped).map(category => ({
              title: category,
              data: grouped[category]
            }));
            
            setSections(sectionData);
          } else {
            setSections([]);
          }
          setLoading(false);
        }).catch(err => {
          console.error('Error searching menu:', err);
          setError(err.message || 'Error searching menu');
          setLoading(false);
        });
      } else {
        loadMenuByCategory(selectedCategory);
      }
    }
  }, [selectedCategory, debouncedSearchQuery, isInitialized]);

  /**
   * Load menu items by category
   * @param {string} category - Category to filter by ('all', 'starters', 'mains', 'desserts')
   * @param {Array} existingMenuItems - Optional existing items to use (for initial load)
   */
  const loadMenuByCategory = async (category, existingMenuItems = null) => {
    setLoading(true);
    
    try {
      let menuItems;
      
      if (existingMenuItems) {
        // Use existing items (for initial load)
        menuItems = existingMenuItems;
      } else {
        // Fetch from database
        menuItems = await filterByCategory(category);
      }
      
      // Transform data to SectionList format
      if (menuItems && menuItems.length > 0) {
        // Group by category
        const grouped = {};
        menuItems.forEach(item => {
          if (!grouped[item.category]) grouped[item.category] = [];
          grouped[item.category].push(item);
        });
        
        const sectionData = Object.keys(grouped).map(category => ({
          title: category,
          data: grouped[category]
        }));
        
        setSections(sectionData);
      } else {
        setSections([]);
      }
    } catch (err) {
      console.error('Error loading menu by category:', err);
      setError(err.message || 'Error loading menu');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle category button press
   * @param {string} category - Selected category
   */
  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when category is selected
  };

  /**
   * Handle search input changes
   * @param {string} query - Search query text
   */
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      setSelectedCategory('all'); // Reset category when searching
    }
  };

  // Loading state
  if (loading) {
    return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
          <Text>Loading menu...</Text>
        </View>
    );
  }

  // Error state
  if (error) {
    return (
        <View style={styles.container}>
          <Text>Error: {error}</Text>
        </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header with logo, title, and profile navigation */}
      <View style={styles.headerRow}>
        <Image
          source={require('../assets/lemon_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Little Lemon</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={avatar ? { uri: avatar } : require('../assets/lemon_logo.png')}
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
      </View>
      
      {/* Restaurant introduction section */}
      <View style={styles.introSection}>
        <View style={styles.introTextBlock}>
          <Text style={styles.introMainTitle}>Little Lemon</Text>
          <Text style={styles.introSubheader}>Georgia</Text>
          <Text>
            We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
          </Text>
        </View>
        <Image
          source={require('../assets/restaurant.png')}
          style={styles.introImage}
          resizeMode="cover"
        />
      </View>
      
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search menu items..."
          onChangeText={handleSearchChange}
          value={searchQuery}
          style={styles.searchBar}
          iconColor="#495E57"
        />
      </View>
      
      {/* Category filter buttons */}
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryButton,
              selectedCategory === category.key && styles.categoryButtonActive
            ]}
            onPress={() => handleCategoryPress(category.key)}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category.key && styles.categoryButtonTextActive
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Menu items list grouped by category */}
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Image
              source={{ uri: `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${item.image}` }}
              style={styles.itemImage}
            />
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  headerRow: {
    backgroundColor: '#495E57',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 15,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4CE14',
    marginBottom: 2,
  },
  searchContainer: {
    padding: 6,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    elevation: 0,
  },
  categoryContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#495E57',
  },
  categoryButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  categoryButtonTextActive: {
    color: '#F4CE14',
  },
  listContainer: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#e0e0e0',
  },
  itemContainer: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 14,
    color: '#388e3c',
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 13,
    color: '#555',
  },
  itemImage: {
    width: '100%', 
    height: 120, 
    borderRadius: 8, 
    marginTop: 6 
  },
  introSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  introTextBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  introMainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#495E57',
    marginBottom: 4,
  },
  introSubheader: {
    fontSize: 18,
    fontFamily: 'Georgia',
    color: '#333',
    marginBottom: 12,
  },
  introImage: {
    width: 100,
    height: 110,
    borderRadius: 8,
    marginLeft: 20,
  },
  headerAvatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#fff',
    marginRight: 12,
  },
});