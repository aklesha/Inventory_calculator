import React, { useState } from 'react';

const InventoryCalculator = () => {
  const [items, setItems] = useState([]);
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [itemCounter, setItemCounter] = useState(1);

  const addItem = () => {
    if (!stock || !price) {
      setError('Please fill both stock and price fields');
      return;
    }

    if (isNaN(stock) || isNaN(price) || Number(stock) <= 0 || Number(price) <= 0) {
      setError('Stock and price must be positive numbers');
      return;
    }

    const stockNum = Number(stock);
    const priceNum = Number(price);
    const total = stockNum * priceNum;

    const newItem = {
      id: Date.now(),
      name: `Item ${itemCounter}`,
      stock: stockNum,
      price: priceNum,
      total: total
    };

    setItems([...items, newItem]);
    setItemCounter(itemCounter + 1);
    setStock('');
    setPrice('');
    setError('');
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getTotalValue = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  // Calculate totals quickly with keyboard
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
      <div className="w-full max-w-3xl backdrop-blur-lg bg-white/40 rounded-2xl shadow-xl p-6 border border-white/50">
        <h1 className="text-3xl font-bold text-center mb-6 text-orange-800">Quick Inventory Calculator</h1>
        
        <div className="mb-6 backdrop-blur-sm bg-white/60 p-5 rounded-xl shadow-md border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Stock Quantity</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 rounded-lg bg-white/70 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Quantity"
                min="1"
                autoFocus
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Unit Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 rounded-lg bg-white/70 border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Unit price"
                min="0.01"
                step="0.01"
              />
            </div>
          </div>
          
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          
          <button
            onClick={addItem}
            className="mt-4 w-full px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-lg shadow-md hover:from-orange-600 hover:to-amber-600 transition-all duration-300"
          >
            Add Item
          </button>
        </div>
        
        {items.length > 0 ? (
          <div className="backdrop-blur-sm bg-white/60 rounded-xl shadow-md border border-white/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-orange-100/80">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-orange-800">Item</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-orange-800">Stock</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-orange-800">Price</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-orange-800">Total Value</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-orange-800">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-orange-50/50">
                      <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800">{item.stock}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-800">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-right font-medium text-orange-700">${item.total.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-orange-200/60">
                    <td colSpan="3" className="px-4 py-3 text-right font-bold text-orange-800">Total Inventory Value:</td>
                    <td className="px-4 py-3 text-right font-bold text-lg text-orange-800">${getTotalValue().toFixed(2)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 backdrop-blur-sm bg-white/60 rounded-xl shadow-md border border-white/50">
            No items added yet. Start by entering stock and price values.
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryCalculator;
