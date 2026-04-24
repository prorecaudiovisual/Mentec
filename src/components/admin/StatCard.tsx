interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color?: string;
}

export default function StatCard({ label, value, icon, color = "bg-brand-orange" }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
      <div className={`${color} text-white p-3 rounded-lg`}>{icon}</div>
      <div>
        <p className="text-2xl font-bold text-navy-900">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
