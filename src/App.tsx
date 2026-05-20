import { useMemo, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { Camera, CheckCircle2, ClipboardList, Database, FileText, Home, ImagePlus, Moon, Package, Search, Sun } from 'lucide-react';

const modules = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/media', label: 'Media Handling', icon: ImagePlus },
  { path: '/dr', label: 'DR Workflow', icon: ClipboardList },
  { path: '/checklist', label: 'Embedded Checklist', icon: CheckCircle2 },
  { path: '/stock', label: 'Stock Movement', icon: Package },
  { path: '/cfd', label: 'CFD Notes', icon: FileText },
  { path: '/master', label: 'Checklist Master', icon: Database },
];

const kpis = [
  ['Active Jobs', '142'], ['Upload Queue', '23'], ['Storage Used', '1.26 TB / 2 TB'], ['Approvals Pending', '17']
];

function Layout({ children, dark, setDark }: { children: React.ReactNode; dark: boolean; setDark: (v: boolean)=>void }) {
  return <div className={dark ? 'dark' : ''}><div className='min-h-screen md:grid md:grid-cols-[270px_1fr]'>
    <aside className='border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900'>
      <h1 className='text-lg font-semibold'>AutoDR Enterprise DMS</h1>
      <p className='mt-1 text-xs text-slate-500'>Service Advisor Tablet Suite</p>
      <nav className='mt-4 space-y-1'>{modules.map(m => <NavLink key={m.path} to={m.path} className={({isActive})=>`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${isActive?'bg-brand-600 text-white':'hover:bg-slate-100 dark:hover:bg-slate-800'}`}><m.icon size={16}/>{m.label}</NavLink>)}</nav>
    </aside>
    <main>
      <header className='sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90'>
        <div className='flex items-center gap-2'><Search size={16}/><input className='input w-64' placeholder='Search appointments, VIN, customer...'/></div>
        <div className='flex items-center gap-2'>
          <select className='input'><option>Service Advisor</option><option>Supervisor</option><option>Admin</option></select>
          <button className='btn border border-slate-300 dark:border-slate-700' onClick={()=>setDark(!dark)}>{dark?<Sun size={16}/>:<Moon size={16}/>}</button>
        </div>
      </header>
      <div className='p-4'>{children}</div>
    </main>
  </div></div>;
}

const Dashboard = () => <div className='space-y-4'><div className='grid gap-3 md:grid-cols-4'>{kpis.map(([k,v])=><div key={k} className='card'><p className='text-xs text-slate-500'>{k}</p><p className='mt-2 text-2xl font-semibold'>{v}</p></div>)}</div>
<div className='card'><h2 className='font-semibold'>Workflow Map</h2><p className='mt-2 text-sm'>GRP → Tablet / Classic UI → Old DMS Integration</p><div className='mt-3 h-2 rounded bg-slate-200 dark:bg-slate-700'><div className='h-2 w-2/3 rounded bg-brand-600'/></div></div></div>;

const Media = () => <div className='grid gap-4 xl:grid-cols-[2fr_1fr]'>
<div className='space-y-4'>
<div className='card'><h2 className='font-semibold'>Media Upload Panel</h2><div className='mt-3 rounded-lg border-2 border-dashed border-slate-300 p-8 text-center dark:border-slate-700'><Camera className='mx-auto mb-2'/><p>Drag & drop photos or capture from tablet camera</p><button className='btn-primary mt-3'>Select Files</button></div><div className='mt-3 grid grid-cols-4 gap-2'>{Array.from({length:8}).map((_,i)=><div key={i} className='aspect-square rounded bg-slate-200 dark:bg-slate-800'/>)}</div></div>
<div className='card'><h2 className='font-semibold'>Validation Summary</h2><ul className='mt-2 space-y-1 text-sm'><li>✅ File type and size validation</li><li>✅ Duplicate detection active</li><li>⚠️ 2 mandatory checkpoint photos missing</li><li>✅ Retry queue: 3 items (offline-safe)</li></ul></div></div>
<div className='space-y-4'><div className='card'><h3 className='font-semibold'>Upload Statistics</h3><p className='mt-2 text-sm'>Compressed: 78% | Avg upload: 1.8s</p><p className='mt-2 text-sm'>Storage: 1.26 TB / 2 TB</p><div className='mt-2 h-2 rounded bg-slate-200 dark:bg-slate-700'><div className='h-2 w-3/5 rounded bg-brand-600'/></div></div><div className='card'><h3 className='font-semibold'>Checklist Media Status</h3><p className='mt-2 text-sm'>Uploaded 16 / Required 18</p></div></div></div>;

const DR = () => <div className='space-y-4'><div className='card flex flex-wrap gap-2'><input type='date' className='input' defaultValue={new Date().toISOString().slice(0,10)} /><select className='input'><option>All Programs</option></select><input className='input' placeholder='Search orders'/></div>
<div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>{['Pending','In Progress','Completed','Submitted'].map((s,i)=><div key={s} className='card'><p className='text-xs text-slate-500'>{s}</p><p className='mt-2 text-xl font-semibold'>{12+i*4}</p><button className='btn mt-3 border border-slate-300 dark:border-slate-700'>Open</button></div>)}</div>
<button className='fixed bottom-6 right-6 h-14 w-14 rounded-full bg-brand-600 text-3xl text-white shadow-lg'>+</button></div>;

const Checklist = () => <div className='grid gap-4 xl:grid-cols-2'><div className='card'><h2 className='font-semibold'>Inspection Checklist</h2><div className='mt-3 h-2 rounded bg-slate-200 dark:bg-slate-700'><div className='h-2 w-1/2 rounded bg-brand-600'/></div>{['Exterior','Engine Bay','Interior'].map(s=><details key={s} className='mt-3 rounded border border-slate-200 p-2 dark:border-slate-700' open><summary>{s}</summary><div className='mt-2 text-sm'>Status: <span className='badge bg-amber-100 text-amber-700'>Warning</span> <textarea className='input mt-2 w-full' placeholder='Comment'/></div></details>)}</div><div className='card'><h2 className='font-semibold'>Embedded Media Preview</h2><div className='mt-3 h-80 rounded bg-slate-200 dark:bg-slate-800'/></div></div>;

const Stock = () => <div className='space-y-4'><div className='grid gap-3 md:grid-cols-3'>{['Total Value','Pending Approvals','Variance'].map(t=><div className='card' key={t}><p className='text-xs text-slate-500'>{t}</p><p className='mt-2 text-xl font-semibold'>$24,800</p></div>)}</div><div className='card overflow-x-auto'><table className='min-w-full text-sm'><thead><tr className='text-left'><th>Part</th><th>Qty</th><th>MAP</th><th>Adj Qty</th><th>Adj MAP</th><th>Status</th></tr></thead><tbody>{['Brake Pad','Oil Filter','Battery'].map(p=><tr key={p} className='border-t border-slate-200 dark:border-slate-700'><td>{p}</td><td>10</td><td>55</td><td><input className='input w-20' defaultValue='2'/></td><td><input className='input w-24' defaultValue='57'/></td><td><span className='badge bg-green-100 text-green-700'>Validated</span></td></tr>)}</tbody></table></div></div>;

const CFD = () => <div className='grid gap-4 xl:grid-cols-[2fr_1fr]'><div className='card'><h2 className='font-semibold'>360° Vehicle Diagram Canvas</h2><div className='mt-3 h-96 rounded-lg bg-slate-200 dark:bg-slate-800'/><div className='mt-3 flex gap-2'><button className='btn border border-slate-300 dark:border-slate-700'>Pen</button><button className='btn border border-slate-300 dark:border-slate-700'>Marker</button><button className='btn-primary'>Export PDF</button></div></div><div className='card'><h2 className='font-semibold'>CFD Notes</h2><textarea className='input mt-3 h-64 w-full' placeholder='Add notes directly on checkpoints...'/></div></div>;

const Master = () => {
  const rows = useMemo(()=>Array.from({length:8}).map((_,i)=>({brand:'A',model:`A1${i}`,kupl:`2201${i}`,start:'2026-09-01',end:'2026-09-30',program:['Summer','Winter'][i%2],desc:i%2?'B':'A'})),[]);
  return <div className='space-y-4'><div className='card flex flex-wrap gap-2'><input className='input' placeholder='Search brand/model'/><select className='input'><option>Program</option></select><button className='btn-primary'>+ New Checklist</button><button className='btn border border-slate-300 dark:border-slate-700'>Bulk Upload</button></div><div className='card overflow-x-auto'><table className='min-w-full text-sm'><thead><tr className='text-left'><th>Brand</th><th>Model Year</th><th>KUPL</th><th>Start</th><th>End</th><th>Program</th><th>Description</th><th>Status</th></tr></thead><tbody>{rows.map((r,i)=><tr key={i} className='border-t border-slate-200 dark:border-slate-700'><td>{r.brand}</td><td>{r.model}</td><td>{r.kupl}</td><td>{r.start}</td><td>{r.end}</td><td>{r.program}</td><td>{r.desc}</td><td><button className='badge bg-blue-100 text-blue-700'>Active</button></td></tr>)}</tbody></table></div></div>;
};

export function App() {
  const [dark, setDark] = useState(false);
  return <Layout dark={dark} setDark={setDark}><Routes>
    <Route path='/' element={<Dashboard />} />
    <Route path='/media' element={<Media />} />
    <Route path='/dr' element={<DR />} />
    <Route path='/checklist' element={<Checklist />} />
    <Route path='/stock' element={<Stock />} />
    <Route path='/cfd' element={<CFD />} />
    <Route path='/master' element={<Master />} />
  </Routes></Layout>;
}
