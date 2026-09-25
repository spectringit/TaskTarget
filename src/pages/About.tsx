const stack = ['React 18', 'TypeScript', 'JavaScript (ES2020)', 'Tailwind CSS', 'SASS/SCSS', 'React Router', 'Redux Toolkit', 'Formik + Yup', 'Vite']

export default function About() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="page-title">ჩვენს შესახებ</h1>
      <p className="text-slate-600">
        TaskTarget არის საგამოცდო პროექტი ჯაბა ბუთიაშვილის მიერ, მისი მიზანია ამოცანების მანიპულაცია მაგალითად: შექმნა, წაშლა, რედაქტირება, და გაფილტვრა.
      </p>
      <section>
        <h2 className="mb-3 text-lg font-semibold">გამოყენებული ტექნოლოგიები</h2>
        <div className="flex flex-wrap gap-2">
          {stack.map((s) => <span key={s} className="badge bg-brand-100 text-brand-700">{s}</span>)}
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {[['1', 'დაგეგმვა', 'რისკები, ეტაპები, როლები'], ['2', 'რეალიზაცია', 'კომპონენტები და სტეიტი'], ['3', 'გამოშვება', 'ოპტიმიზაცია და GitHub']].map(([n, t, d]) => (
          <div key={n} className="card p-4">
            <div className="text-2xl font-bold text-brand-600">{n}</div>
            <h3 className="font-semibold">{t}</h3>
            <p className="text-sm text-slate-500">{d}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
