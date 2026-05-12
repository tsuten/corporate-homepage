const SpecificPageLayout = ({ children, title }) => {
  return (
    <section>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-zinc-900 text-start px-8">{title}</h1>
      {children}
    </section>
  )
}
export default SpecificPageLayout