/**
 * Script to populate portfolio with images from Cloudinary
 * 
 * USAGE:
 * 1. Open https://sassystudio.co.uk/en (any page)
 * 2. Open browser console (F12)
 * 3. Copy and paste this entire script
 * 4. Press Enter
 * 5. Navigate to the Portfolio page to see the images
 */

async function populatePortfolioFromCloudinary() {
  try {
    console.log('🎨 Creating portfolio items...');
    
    // Create portfolio items using actual Cloudinary portfolio images
    const portfolioItems = [
      {
        id: crypto.randomUUID(),
        clientName: 'Boutique Hotel Collection',
        category: 'Hotels',
        imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769907635/13_zojapz.jpg',
        description: 'Luxury hotel interiors showcasing refined elegance and authentic hospitality experiences.'
      },
      {
        id: crypto.randomUUID(),
        clientName: 'Culinary Artistry',
        category: 'Restaurants',
        imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769907635/10_axezaw.jpg',
        description: 'Fine dining photography capturing the essence of gastronomic excellence and ambiance.'
      },
      {
        id: crypto.randomUUID(),
        clientName: 'Urban Sanctuary',
        category: 'Hotels',
        imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769907635/14_cee6xa.jpg',
        description: 'Contemporary hotel design merging modern aesthetics with timeless comfort.'
      },
      {
        id: crypto.randomUUID(),
        clientName: 'Heritage Residence',
        category: 'Brand Identity',
        imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769907634/12_tnrbkp.jpg',
        description: 'Brand storytelling through architectural photography and curated visual narratives.'
      },
      {
        id: crypto.randomUUID(),
        clientName: 'Coastal Retreat',
        category: 'Editorial',
        imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769907634/9_r3ewme.jpg',
        description: 'Editorial photography capturing serene moments and luxurious getaway experiences.'
      },
      {
        id: crypto.randomUUID(),
        clientName: 'Gastro Experience',
        category: 'Restaurants',
        imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769907634/11_u2huyo.jpg',
        description: 'Restaurant interior and culinary content highlighting atmosphere and craftsmanship.'
      },
      {
        id: crypto.randomUUID(),
        clientName: 'Design Studio',
        category: 'Brand Identity',
        imageUrl: 'https://res.cloudinary.com/ds86m2xm0/image/upload/f_auto,q_auto/v1769907634/6_jgrvin.jpg',
        description: 'Visual identity development and brand positioning for luxury hospitality clients.'
      }
    ];
    
    // Save to localStorage
    localStorage.setItem('sassy_portfolio', JSON.stringify(portfolioItems));
    
    console.log(`✅ Portfolio populated with ${portfolioItems.length} items`);
    console.log('📋 Portfolio items:', portfolioItems);
    console.log('📍 Navigate to /portfolio to view them');
    
    return portfolioItems;
  } catch (error) {
    console.error('❌ Error populating portfolio:', error);
    throw error;
  }
}

// Run the script
populatePortfolioFromCloudinary();
