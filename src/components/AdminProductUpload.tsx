import { type ChangeEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Plus } from 'lucide-react';

const CATEGORIES = ['Solar', 'Security', 'Smart Home', 'Farming', 'Furniture', 'Beddings'];

function saveGalleryItem(item: { name: string; category: string; image: string }) {
  if (typeof window === 'undefined') return;
  const existing = window.localStorage.getItem('blessed-rico-gallery');
  const gallery = existing ? JSON.parse(existing) : [];
  gallery.unshift(item);
  window.localStorage.setItem('blessed-rico-gallery', JSON.stringify(gallery));
  window.dispatchEvent(new Event('gallery-update'));
}

export default function AdminProductUpload() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Solar');
  const [image, setImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;

        const response = await fetch('/.netlify/functions/upload-imgbb', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, name }),
        });

        const data = await response.json();

        if (response.ok && data.url) {
          setImage(data.url);
          setSuccessMessage('Image uploaded successfully!');
          setTimeout(() => setSuccessMessage(''), 3000);
        } else {
          setUploadError(data.error || 'Failed to upload image');
        }

        setIsUploading(false);
      };
      reader.onerror = () => {
        setUploadError('Failed to read file');
        setIsUploading(false);
      };
    } catch (error) {
      setUploadError('Failed to upload image');
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || !image) {
      setUploadError('Please fill in all fields');
      return;
    }

    saveGalleryItem({ name, category, image });
    setSuccessMessage('Product added successfully! It now appears in the gallery.');
    setName('');
    setCategory('Solar');
    setImage('');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-brand-bg">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="glass rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
          <p className="text-white/60 mb-8">Upload an image and add product details</p>

          {successMessage && (
            <motion.div
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {successMessage}
            </motion.div>
          )}

          {uploadError && (
            <motion.div
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {uploadError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm text-white/60 mb-2">Product Image</label>
              <div className="relative">
                {image ? (
                  <div className="relative rounded-2xl overflow-hidden h-64">
                    <img
                      src={image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      className="absolute top-3 right-3 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-brand-gold/50 transition-colors">
                    <div className="text-center">
                      {isUploading ? (
                        <div className="animate-spin w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full mx-auto mb-2" />
                      ) : (
                        <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                      )}
                      <p className="text-sm text-white/60">
                        {isUploading ? 'Uploading...' : 'Click to upload image'}
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Product Name */}
            <div>
              <label htmlFor="product-name" className="block text-sm text-white/60 mb-2">Product Name</label>
              <input
                id="product-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
                placeholder="e.g., Solar Panel 400W"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="product-category" className="block text-sm text-white/60 mb-2">Category</label>
              <select
                id="product-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-brand-bg">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!name || !category || !image}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-gold text-brand-bg font-semibold rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              Add Product
            </motion.button>
          </form>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-white/5 rounded-xl">
            <h3 className="text-sm font-semibold text-brand-gold mb-2">Setup Instructions:</h3>
            <ol className="text-xs text-white/60 space-y-1 list-decimal list-inside">
              <li>Get a free ImgBB API key from https://api.imgbb.com/</li>
              <li>Add VITE_IMGBB_API_KEY to your Netlify environment variables (Site Settings → Environment variables)</li>
              <li>In production, connect this to a database to persist products</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
