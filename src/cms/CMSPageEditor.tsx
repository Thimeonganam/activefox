import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';
import { Save, Loader2, CheckCircle2 } from 'lucide-react';
import { cmsPages, PageConfig, BlockConfig, FieldConfig } from './cmsConfig';

export default function CMSPageEditor() {
  const { pageId } = useParams<{ pageId: string }>();
  const [pageConfig, setPageConfig] = useState<PageConfig | null>(null);
  const [data, setData] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null); // Track which block is saving
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const config = cmsPages.find(p => p.id === pageId);
    if (!config) {
      setPageConfig(null);
      setLoading(false);
      return;
    }
    setPageConfig(config);
    setLoading(true);

    const fetchContent = async () => {
      try {
        const newData: Record<string, Record<string, string>> = {};
        
        // Ensure page document exists
        await setDoc(doc(db, 'pages', config.id), {
          title: config.title,
          path: config.path,
          updatedAt: serverTimestamp()
        }, { merge: true });

        // Fetch all blocks
        for (const block of config.blocks) {
          const docRef = doc(db, 'pages', config.id, 'blocks', block.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            newData[block.id] = docSnap.data() as Record<string, string>;
          } else {
            newData[block.id] = { name: block.name };
          }
        }
        setData(newData);
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'pages/' + config.id);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [pageId]);

  const handleFieldChange = (blockId: string, fieldKey: string, value: string) => {
    setData(prev => ({
      ...prev,
      [blockId]: {
        ...prev[blockId],
        [fieldKey]: value
      }
    }));
  };

  const handleSaveBlock = async (block: BlockConfig) => {
    if (!pageConfig) return;
    setSaving(block.id);
    setSuccess(null);
    try {
      const blockData = { ...data[block.id], name: block.name, updatedAt: serverTimestamp() };
      await setDoc(doc(db, 'pages', pageConfig.id, 'blocks', block.id), blockData, { merge: true });
      setSuccess(block.id);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `pages/${pageConfig.id}/blocks/${block.id}`);
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-24">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!pageConfig) {
    return <div className="p-12 text-center text-neutral-400">Page not found or not configured in CMS.</div>;
  }

  return (
    <div className="p-6 md:p-12 max-w-4xl mx-auto pb-32">
      <div className="mb-12 border-b border-white/10 pb-6">
        <h2 className="text-3xl font-monument uppercase tracking-wider mb-2">{pageConfig.title}</h2>
        <p className="text-brand-orange text-sm tracking-widest font-bold uppercase">{pageConfig.path}</p>
      </div>

      <div className="space-y-16">
        {pageConfig.blocks.map(block => (
          <div key={block.id} className="bg-neutral-900 border border-white/5 relative">
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/40">
              <h3 className="font-bold uppercase tracking-widest text-[#dcdcdc]">{block.name}</h3>
              <button
                onClick={() => handleSaveBlock(block)}
                disabled={saving === block.id}
                className="flex items-center gap-2 bg-white/10 hover:bg-brand-orange text-white px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all disabled:opacity-50"
              >
                {saving === block.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                {saving === block.id ? 'Loading...' : 'Lưu Khu Vực Này'}
              </button>
            </div>

            {success === block.id && (
              <div className="bg-green-500/20 text-green-400 border-b border-green-500/50 p-3 px-6 flex items-center gap-2 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Đã lưu thành công!
              </div>
            )}

            <div className="p-6 md:p-8 space-y-6">
              {block.fields.map(field => (
                <div key={field.key} className="space-y-2">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                    {field.label}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea 
                      rows={5}
                      value={data[block.id]?.[field.key] || ''}
                      onChange={(e) => handleFieldChange(block.id, field.key, e.target.value)}
                      className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors resize-y min-h-[100px]"
                    />
                  ) : field.type === 'image' ? (
                    <div>
                      <input 
                        type="text" 
                        value={data[block.id]?.[field.key] || ''}
                        onChange={(e) => handleFieldChange(block.id, field.key, e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                      />
                      {data[block.id]?.[field.key] && (
                        <div className="mt-3 relative w-32 h-20 bg-black border border-white/10 overflow-hidden">
                          {data[block.id][field.key].endsWith('.mp4') ? (
                             <video src={data[block.id][field.key]} className="w-full h-full object-cover opacity-50" muted />
                          ) : (
                             <img src={data[block.id][field.key]} alt="Preview" className="w-full h-full object-cover" />
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <input 
                      type="text" 
                      value={data[block.id]?.[field.key] || ''}
                      onChange={(e) => handleFieldChange(block.id, field.key, e.target.value)}
                      className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-brand-orange transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
