import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Plus } from 'lucide-react';
import { createProduct } from '../lib/firebase';
import { uploadImageToImgBB } from '../lib/imgbb';

const CATEGORIES = ['Solar', 'Security', 'Smart Home', 'Farming', 'Furniture', 'Beddings'];

export default function AdminProductUpload() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Solar');
  const [price, setPrice] = useState('');
  const [featured, setFeatured] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage('');
    setSuccessMessage('');
    setSelectedFile(file);

    if (previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !category || !selectedFile) {
      setErrorMessage('Please provide a product name, category, and image.');
      return;
    }

    const parsedPrice = price.trim() ? Number(price) : 0;
    if (price.trim() && (Number.isNaN(parsedPrice) || parsedPrice < 0)) {
      setErrorMessage('Please enter a valid non-negative price or leave it blank.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setUploadProgress(0);

    try {
      const imageUrl = await uploadImageToImgBB(selectedFile, setUploadProgress);
      await createProduct({
        name: name.trim(),
        description: description.trim(),
        category,
        price: parsedPrice,
        image: imageUrl,
        featured,
      });

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('product-updated'));
      }

      setSuccessMessage('Product saved successfully.');
      setName('');
      setDescription('');
      setCategory('Solar');
      setPrice('');
      setFeatured(false);
      setSelectedFile(null);
      if (previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl('');
      setUploadProgress(0);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      setErrorMessage((error as Error)?.message || 'Failed to save product.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-brand-bg">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="glass rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
          <p className="text-white/60 mb-8">Upload a product image to ImgBB and save a Firestore product document.</p>

          {successMessage && (
            <motion.div
              className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {successMessage}
            </motion.div>
          )}

          {errorMessage && (
            <motion.div
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errorMessage}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="product-image" className="block text-sm text-white/60 mb-2">Product Image</label>
              <div className="relative">
                {previewUrl ? (
                  <div className="relative rounded-2xl overflow-hidden h-64">
                    <img src={previewUrl} alt="Selected product" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        if (previewUrl.startsWith('blob:')) {
                          URL.revokeObjectURL(previewUrl);
                        }
                        setSelectedFile(null);
                        setPreviewUrl('');
                      }}
                      className="absolute top-3 right-3 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-brand-gold/50 transition-colors">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                      <p className="text-sm text-white/60">Select a product image to upload to ImgBB</p>
                    </div>
                    <input
                      id="product-image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isSubmitting}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <label htmlFor="product-name" className="block text-sm text-white/60 mb-2">Product Name</label>
                <input
                  id="product-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/50 transition-colors"
                  placeholder="Solar inverter, CCTV kit, smart hub..."
                  required
                />
              </div>

            </div>

            

            <div className="grid gap-6 lg:grid-cols-2">
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

            </div>

            {isSubmitting && (
              <div className="mt-2">
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full bg-brand-gold transition-all" style={{ width: `${uploadProgress}%` }} />
                </div>
                <p className="mt-2 text-sm text-white/60">Uploading image: {uploadProgress}%</p>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting || !selectedFile || !name.trim()}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-gold text-brand-bg font-semibold rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              <Plus className="w-4 h-4" />
              Save Product
            </motion.button>
          </form>

          <div className="mt-8 p-4 bg-white/5 rounded-xl">
            <h3 className="text-sm font-semibold text-brand-gold mb-2">Setup Instructions:</h3>
            <ol className="text-xs text-white/60 space-y-1 list-decimal list-inside">
              <li>Create a Firebase project and enable Firestore.</li>
              <li>Add the following env values to your <code>.env</code> file:</li>
              <li><code>VITE_FIREBASE_API_KEY</code></li>
              <li><code>VITE_FIREBASE_AUTH_DOMAIN</code></li>
              <li><code>VITE_FIREBASE_PROJECT_ID</code></li>
              <li><code>VITE_FIREBASE_MESSAGING_SENDER_ID</code></li>
              <li><code>VITE_FIREBASE_APP_ID</code></li>
              <li><code>VITE_IMGBB_API_KEY</code></li>
              <li>Save and deploy — products will now be saved to Firestore with ImgBB image URLs.</li>
            </ol>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

  