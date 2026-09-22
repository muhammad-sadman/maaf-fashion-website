export default function StatCard({ label, value, suffix }) {
  return (
    <div className="border-l-2 border-gold-500 pl-5 py-1">
      <div className="font-mono-data text-3xl md:text-4xl font-semibold text-white">
        {value}
        <span className="text-gold-400 ml-1 text-xl md:text-2xl">{suffix}</span>
      </div>
      <p className="mt-1 text-sm text-white/60 uppercase tracking-wide">{label}</p>
    </div>
  );
}
