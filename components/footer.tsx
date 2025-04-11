export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-12 py-6 text-center text-sm text-slate-500">
      <p>
        © {currentYear} a{" "}
        <a
          href="https://nytemode.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-600 hover:text-slate-800 transition-colors underline underline-offset-2"
        >
          nytemode
        </a>{" "}
        project.
      </p>
    </footer>
  )
}
