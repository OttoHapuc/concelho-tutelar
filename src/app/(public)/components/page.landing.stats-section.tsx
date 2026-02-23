const stats = [
  {
    value: "180 mil",
    label: "Denuncias recebidas anualmente pelo Disque 100",
  },
  {
    value: "70%",
    label: "Dos casos de violencia ocorrem dentro de casa",
  },
  {
    value: "24h",
    label: "Tempo maximo para inicio da apuracao apos denuncia",
  },
  {
    value: "100%",
    label: "Das denuncias sao investigadas pelo Conselho Tutelar",
  },
];

export function StatsSection() {
  return (
    <section className="bg-secondary py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl font-bold text-primary lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-secondary-foreground/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
