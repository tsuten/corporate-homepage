const SpecificPageLayout = ({ breadcrumb, children, title, showTitle = true }) => {
  return (
    <section>
      {breadcrumb}
      {showTitle && title ? (
        <h1 className="py-6 text-2xl font-semibold tracking-tight text-zinc-900 text-start px-8">{title}</h1>
      ) : null}
      {children}
    </section>
  )
}
export default SpecificPageLayout